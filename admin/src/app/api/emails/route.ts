import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

const SERVER   = process.env.MXROUTE_SERVER!;
const USERNAME = process.env.MXROUTE_USERNAME!;
const API_KEY  = process.env.MXROUTE_API_KEY!;
const DOMAIN   = process.env.MXROUTE_DOMAIN!;

function getAuth() {
  return 'Basic ' + Buffer.from(`${USERNAME}:${API_KEY}`).toString('base64');
}

function parseDA(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  const pairs = text.split('&');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx === -1) continue;
    const key = decodeURIComponent(pair.slice(0, idx));
    const val = decodeURIComponent(pair.slice(idx + 1));
    result[key] = val;
  }
  return result;
}

// Requête HTTP via le module https natif (contourne les restrictions fetch de Vercel sur port 2222)
function httpsRequest(options: https.RequestOptions, body?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request({ ...options, rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(new Error('Timeout')); });
    if (body) req.write(body);
    req.end();
  });
}

// GET /api/emails — liste tous les comptes email du domaine
export async function GET() {
  try {
    const text = await httpsRequest({
      hostname: SERVER,
      port: 2222,
      path: `/CMD_API_POP?domain=${DOMAIN}&action=list&type=list`,
      method: 'GET',
      headers: { Authorization: getAuth() },
    });

    const decoded = decodeURIComponent(text);
    const emails: string[] = [];
    const regex = /list\[\]=([^&]+)/g;
    let match;
    while ((match = regex.exec(decoded)) !== null) {
      emails.push(match[1]);
    }

    const details = emails.map((user) => ({ user, quota: '500', usage: '0' }));
    return NextResponse.json({ emails: details, domain: DOMAIN });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/emails — créer, supprimer ou changer le mot de passe d'un compte email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, user, password, quota } = body;

    if (!action || !user) {
      return NextResponse.json({ error: 'action et user requis' }, { status: 400 });
    }

    let params: URLSearchParams;

    if (action === 'create') {
      if (!password) return NextResponse.json({ error: 'Mot de passe requis' }, { status: 400 });
      params = new URLSearchParams({
        action: 'create', domain: DOMAIN, user,
        passwd: password, passwd2: password, quota: quota || '500',
      });
    } else if (action === 'delete') {
      params = new URLSearchParams({
        action: 'delete', domain: DOMAIN, user, select0: user,
      });
    } else if (action === 'change_password') {
      if (!password) return NextResponse.json({ error: 'Nouveau mot de passe requis' }, { status: 400 });
      params = new URLSearchParams({
        action: 'modify', domain: DOMAIN, user,
        passwd: password, passwd2: password, quota: quota || '500',
      });
    } else {
      return NextResponse.json({ error: 'Action invalide' }, { status: 400 });
    }

    const bodyStr = params.toString();
    const text = await httpsRequest({
      hostname: SERVER,
      port: 2222,
      path: '/CMD_API_POP',
      method: 'POST',
      headers: {
        Authorization: getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    }, bodyStr);

    const parsed = parseDA(text);
    if (parsed.error === '1') {
      return NextResponse.json({ error: parsed.details || text }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: parsed.details || 'OK' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

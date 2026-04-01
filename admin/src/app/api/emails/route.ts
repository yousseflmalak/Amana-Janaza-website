import { NextRequest, NextResponse } from 'next/server';

// API REST MXRoute sur port 443 (compatible Vercel serverless)
const BASE_URL = 'https://api.mxroute.com';
const DOMAIN   = process.env.MXROUTE_DOMAIN   || 'al-amanah-janaza.com';

function getHeaders() {
  return {
    'X-Server':   process.env.MXROUTE_SERVER   || 'heracles.mxrouting.net',
    'X-Username': process.env.MXROUTE_USERNAME || 'balerycc',
    'X-API-Key':  process.env.MXROUTE_API_KEY  || 'Mx33a6b58da39e2767fd662c42afefK1',
    'Content-Type': 'application/json',
  };
}

// GET /api/emails — liste tous les comptes email du domaine
export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/domains/${DOMAIN}/email-accounts`, {
      headers: getHeaders(),
    });
    const json = await res.json();

    if (!json.success) {
      return NextResponse.json({ error: json.error?.message || 'Erreur API' }, { status: 400 });
    }

    const emails = (json.data || []).map((acc: {
      username: string; quota: number; usage: number; suspended: boolean;
    }) => ({
      user: acc.username,
      quota: `${acc.quota} MB`,
      usage: `${(acc.usage || 0).toFixed(0)} MB`,
      suspended: acc.suspended,
    }));

    return NextResponse.json({ emails, domain: DOMAIN });
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

    let res: Response;

    if (action === 'create') {
      if (!password) return NextResponse.json({ error: 'Mot de passe requis' }, { status: 400 });
      res = await fetch(`${BASE_URL}/domains/${DOMAIN}/email-accounts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username: user, password, quota: Number(quota) || 500 }),
      });

    } else if (action === 'delete') {
      res = await fetch(`${BASE_URL}/domains/${DOMAIN}/email-accounts/${user}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (res.status === 204) {
        return NextResponse.json({ success: true, message: 'Compte supprimé' });
      }

    } else if (action === 'change_password') {
      if (!password) return NextResponse.json({ error: 'Nouveau mot de passe requis' }, { status: 400 });
      res = await fetch(`${BASE_URL}/domains/${DOMAIN}/email-accounts/${user}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ password }),
      });

    } else {
      return NextResponse.json({ error: 'Action invalide' }, { status: 400 });
    }

    const json = await res.json();
    if (!json.success) {
      return NextResponse.json({ error: json.error?.message || 'Erreur API' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'OK' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

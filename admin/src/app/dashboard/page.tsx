import { Users, Mail, Instagram, Activity } from 'lucide-react';
import { createServiceClient } from '@/lib/supabase/service';
import { StatCard, QuickLink } from './DashboardClient';

async function fetchStats() {
  const supabase = createServiceClient();

  // Count des employés actifs
  const { count: employesCount } = await supabase
    .from('employes')
    .select('*', { count: 'exact', head: true })
    .eq('actif', true);

  // Count des emails via MXRoute
  let emailsCount: number | null = null;
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/emails`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      emailsCount = Array.isArray(data.emails) ? data.emails.length : null;
    }
  } catch {
    emailsCount = null;
  }

  return { employesCount, emailsCount };
}

export default async function DashboardPage() {
  const { employesCount, emailsCount } = await fetchStats();

  const stats = [
    {
      icon: <Users size={18} color="var(--gold)" strokeWidth={1.8} />,
      label: 'Collaborateurs',
      value: employesCount !== null ? String(employesCount) : '—',
      sub: 'Membres actifs',
      href: '/dashboard/employes',
    },
    {
      icon: <Mail size={18} color="var(--gold)" strokeWidth={1.8} />,
      label: 'Comptes Email',
      value: emailsCount !== null ? String(emailsCount) : '—',
      sub: 'amana-janaza.com',
      href: '/dashboard/emails',
    },
    {
      icon: <Instagram size={18} color="var(--gold)" strokeWidth={1.8} />,
      label: 'Instagram',
      value: '@alaamanah',
      sub: 'Gérer la présence',
      href: '/dashboard/instagram',
    },
    {
      icon: <Activity size={18} color="#3ecf8e" strokeWidth={1.8} />,
      label: 'Statut système',
      value: 'Actif',
      sub: 'Session admin en cours',
      color: '#3ecf8e',
      href: null,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: '#f0ece3',
            marginBottom: '6px',
          }}
        >
          Tableau de bord
        </h2>
        <p
          style={{
            color: '#999',
            fontSize: '0.875rem',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Vue d&apos;ensemble de l&apos;activité Al Amanah Funérailles
        </p>
        <div className="gold-line" style={{ marginTop: '16px' }} />
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Navigation rapide */}
      <div
        style={{
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: '12px',
          padding: '24px 28px',
        }}
      >
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: '12px',
          }}
        >
          Navigation rapide
        </p>
        <ul
          style={{
            listStyle: 'none',
            color: '#aaa',
            fontSize: '0.85rem',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: '2.4',
          }}
        >
          <QuickLink href="/dashboard/employes">Gérer les collaborateurs</QuickLink>
          <QuickLink href="/dashboard/emails">Gérer les emails</QuickLink>
          <QuickLink href="/dashboard/instagram">Instagram — @alaamanah.be</QuickLink>
          <QuickLink href="/dashboard/settings">Paramètres du compte</QuickLink>
        </ul>
      </div>
    </div>
  );
}

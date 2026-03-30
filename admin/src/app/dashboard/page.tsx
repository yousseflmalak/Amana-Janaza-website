'use client';
import { Users, Mail, Instagram, Clock } from 'lucide-react';

const stats = [
  { icon: Users,     label: 'Collaborateurs',  value: '—', sub: 'Gérer les collaborateurs' },
  { icon: Mail,      label: 'Emails',           value: '—', sub: 'amana-janaza.com' },
  { icon: Instagram, label: 'Abonnés Instagram', value: '—', sub: '@alaamanah.be' },
  { icon: Clock,     label: 'Dernière activité', value: 'Active', sub: 'Session en cours', color: '#3ecf8e' },
];

export default function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 600,
          color: '#f0ece3', marginBottom: '6px' }}>
          Tableau de bord
        </h2>
        <p style={{ color: '#999', fontSize: '0.875rem', fontFamily: 'Outfit, sans-serif' }}>
          Vue d&apos;ensemble de l&apos;activité Al Amanah Funérailles
        </p>
        <div className="gold-line" style={{ marginTop: '16px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #222',
            borderRadius: '12px', padding: '24px', transition: 'border-color 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.3)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#222')}>
            <div style={{ width: '38px', height: '38px', background: 'rgba(201,168,76,0.1)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px' }}>
              <stat.icon size={18} color="var(--gold)" strokeWidth={1.8} />
            </div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', color: '#f0ece3',
              marginBottom: '4px', fontWeight: 600 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#ccc', fontFamily: 'Outfit, sans-serif',
              marginBottom: '4px', fontWeight: 500 }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'Outfit, sans-serif' }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '12px', padding: '24px 28px' }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '12px' }}>
          Navigation rapide
        </p>
        <ul style={{ listStyle: 'none', color: '#aaa', fontSize: '0.85rem',
          fontFamily: 'Outfit, sans-serif', lineHeight: '2.2' }}>
          <li>→ <a href="/dashboard/employes" style={{ color: '#aaa', textDecoration: 'none' }}>Gérer les collaborateurs</a></li>
          <li>→ <a href="/dashboard/emails" style={{ color: '#aaa', textDecoration: 'none' }}>Gérer les emails</a></li>
          <li>→ Instagram (bientôt)</li>
          <li>→ Paramètres (bientôt)</li>
        </ul>
      </div>
    </div>
  );
}

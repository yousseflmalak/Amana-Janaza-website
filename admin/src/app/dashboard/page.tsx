'use client';
import { Users, Mail, Instagram, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Collaborateurs',
    value: '—',
    sub: 'À configurer (Phase 2)',
    color: '#C9A84C',
  },
  {
    icon: Mail,
    label: 'Boîtes email MXRoute',
    value: '—',
    sub: 'À connecter',
    color: '#C9A84C',
  },
  {
    icon: Instagram,
    label: 'Abonnés Instagram',
    value: '—',
    sub: '@alaamanah.be',
    color: '#C9A84C',
  },
  {
    icon: Clock,
    label: 'Dernière activité',
    value: 'Maintenant',
    sub: 'Session active',
    color: '#3ecf8e',
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* En-tête */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.3rem',
            color: '#f0ece3',
            fontWeight: 400,
            letterSpacing: '0.05em',
            marginBottom: '6px',
          }}
        >
          Tableau de bord
        </h2>
        <p style={{ color: '#555', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
          Vue d&apos;ensemble de l&apos;activité Al Amanah Funérailles
        </p>
        <div className="gold-line" style={{ marginTop: '16px' }} />
      </div>

      {/* Grille de stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid #222',
              borderRadius: '12px',
              padding: '24px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.3)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = '#222')
            }
          >
            <div
              style={{
                width: '38px', height: '38px',
                background: `rgba(201,168,76,0.1)`,
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <stat.icon size={18} color={stat.color} strokeWidth={1.8} />
            </div>
            <p
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.5rem',
                color: '#f0ece3',
                marginBottom: '4px',
                fontWeight: 400,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#888',
                fontFamily: 'Outfit, sans-serif',
                marginBottom: '6px',
              }}
            >
              {stat.label}
            </p>
            <p style={{ fontSize: '0.72rem', color: '#444', fontFamily: 'Outfit, sans-serif' }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bloc info — prochaines étapes */}
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
            fontFamily: 'Cinzel, serif',
            fontSize: '0.85rem',
            color: 'var(--gold)',
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          Prochaines étapes
        </p>
        <ul
          style={{
            listStyle: 'none',
            color: '#666',
            fontSize: '0.83rem',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: '2',
          }}
        >
          <li>→ Connexion Supabase (base de données employés)</li>
          <li>→ Authentification Super-Admin sécurisée</li>
          <li>→ Module gestion des collaborateurs (CRUD)</li>
          <li>→ Intégration API MXRoute (création emails automatique)</li>
        </ul>
      </div>
    </div>
  );
}

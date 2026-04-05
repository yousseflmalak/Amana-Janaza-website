'use client';
import { useState } from 'react';
import {
  Instagram,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  Users,
  TrendingUp,
  BookOpen,
  Hash,
} from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/alamanahjanaza';

const tips = [
  {
    icon: TrendingUp,
    title: 'Fréquence',
    desc: '3 à 5 publications par semaine pour maintenir l\'algorithme actif.',
  },
  {
    icon: Hash,
    title: 'Hashtags',
    desc: '#janaza #funerailles #islam #belgique #bruxelles #alaamanah #funéraire',
  },
  {
    icon: ImageIcon,
    title: 'Format',
    desc: 'Privilégier les Reels (portée x3). Photos carrées 1080×1080 px.',
  },
  {
    icon: BookOpen,
    title: 'Contenu',
    desc: 'Citations coraniques, services proposés, témoignages (avec permission).',
  },
];

// Formulaire édition stats manuelles
function StatEditor({
  label,
  value,
  onSave,
}: {
  label: string;
  value: string;
  onSave: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (editing) {
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--gold)',
            borderRadius: '6px',
            padding: '6px 10px',
            color: '#f0ece3',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.4rem',
            fontWeight: 600,
            width: '120px',
            outline: 'none',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { onSave(draft); setEditing(false); }
            if (e.key === 'Escape') { setDraft(value); setEditing(false); }
          }}
        />
        <button
          onClick={() => { onSave(draft); setEditing(false); }}
          style={{
            background: 'var(--gold)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#0d0d0d',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(true); }}
      title="Cliquer pour modifier"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1.6rem',
        fontWeight: 600,
        color: '#f0ece3',
        borderBottom: '1px dashed #444',
        display: 'block',
      }}
    >
      {value || '—'}
    </button>
  );
}

export default function InstagramPage() {
  const [stats, setStats] = useState({
    abonnes: '—',
    publications: '—',
    reach: '—',
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 600,
              color: '#f0ece3',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Instagram size={22} color="var(--gold)" strokeWidth={1.8} />
            Instagram
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
            Présence sociale — @alamanahjanaza
          </p>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
          }}
        >
          <ExternalLink size={15} />
          Ouvrir Instagram
        </a>
      </div>
      <div className="gold-line" style={{ marginBottom: '32px' }} />

      {/* Identifiants de connexion */}
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '28px',
        }}
      >
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#f0ece3', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Identifiants du compte
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Outfit, sans-serif' }}>Modifié le 01/04/2026 - Email / Utilisateur</p>
            <p style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#fff', background: '#0a0a0a', padding: '10px 14px', borderRadius: '8px', border: '1px solid #222' }}>
              contact@al-amanah-janaza.com
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Outfit, sans-serif' }}>Mot de passe</p>
            <p style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#fff', background: '#0a0a0a', padding: '10px 14px', borderRadius: '8px', border: '1px solid #222' }}>
              Alamanah@2026
            </p>
          </div>
        </div>
      </div>

      {/* Stats manuelles */}
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.72rem',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}
        >
          Statistiques — cliquer une valeur pour la modifier
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { key: 'abonnes' as const, label: 'Abonnés', icon: Users },
            { key: 'publications' as const, label: 'Publications', icon: ImageIcon },
            { key: 'reach' as const, label: 'Portée moy.', icon: Heart },
          ].map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid #222',
                borderRadius: '12px',
                padding: '22px 20px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  background: 'rgba(201,168,76,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon size={16} color="var(--gold)" strokeWidth={1.8} />
              </div>
              <StatEditor
                label={label}
                value={stats[key]}
                onSave={(v) => setStats((prev) => ({ ...prev, [key]: v }))}
              />
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#666',
                  fontFamily: 'Outfit, sans-serif',
                  marginTop: '6px',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conseils */}
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
            marginBottom: '20px',
          }}
        >
          Bonnes pratiques
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {tips.map((tip, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'rgba(201,168,76,0.08)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <tip.icon size={14} color="var(--gold)" strokeWidth={1.8} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#ccc',
                    marginBottom: '4px',
                  }}
                >
                  {tip.title}
                </p>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.78rem',
                    color: '#666',
                    lineHeight: '1.5',
                  }}
                >
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

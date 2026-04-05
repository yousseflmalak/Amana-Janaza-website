'use client';
import { useState } from 'react';
import {
  Facebook,
  ExternalLink,
  ThumbsUp,
  Users,
  Image as ImageIcon,
  TrendingUp,
  Hash,
  BookOpen,
  Star,
  Plus,
} from 'lucide-react';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61574317744932';
const FACEBOOK_CREATE_PAGE = 'https://www.facebook.com/pages/create';

const tips = [
  {
    icon: TrendingUp,
    title: 'Fréquence',
    desc: '3 à 5 publications par semaine. Publier en soirée (20h–22h) pour maximiser la portée.',
  },
  {
    icon: Hash,
    title: 'Hashtags',
    desc: '#janaza #funerailles #islam #belgique #bruxelles #alamanah #funeraire #musulman',
  },
  {
    icon: ImageIcon,
    title: 'Format',
    desc: 'Vidéos courtes (Reels) et photos carrées 1200×1200 px. Stories quotidiennes.',
  },
  {
    icon: BookOpen,
    title: 'Contenu',
    desc: 'Citations islamiques, conseils pratiques, annonces de services, témoignages.',
  },
];

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

export default function FacebookPage() {
  const [stats, setStats] = useState({
    abonnes: '—',
    jaime: '—',
    publications: '—',
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
            <Facebook size={22} color="#1877F2" strokeWidth={1.8} />
            Facebook
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
            Présence sociale — Al-Amanah-Janaza
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1877F2',
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
            Ouvrir le profil
          </a>
          <a
            href={FACEBOOK_CREATE_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(24,119,242,0.1)',
              color: '#1877F2',
              border: '1px solid rgba(24,119,242,0.3)',
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
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
            }}
          >
            <Plus size={15} />
            Créer une Page Business
          </a>
        </div>
      </div>
      <div className="gold-line" style={{ marginBottom: '24px' }} />

      {/* Bannière : page business à créer */}
      <div
        style={{
          background: 'rgba(24,119,242,0.06)',
          border: '1px solid rgba(24,119,242,0.2)',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Star size={16} color="#1877F2" strokeWidth={1.8} style={{ flexShrink: 0 }} />
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.83rem', color: '#aaa', lineHeight: '1.5' }}>
          <span style={{ color: '#1877F2', fontWeight: 600 }}>À faire :</span> Convertir le profil personnel en{' '}
          <strong style={{ color: '#ccc' }}>Page Business Facebook</strong> pour accéder aux statistiques, publicités et Meta Business Suite.
          Cliquer sur «&nbsp;Créer une Page Business&nbsp;» ci-dessus.
        </p>
      </div>

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
      <div style={{ marginBottom: '28px' }}>
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
            { key: 'jaime' as const, label: 'J\'aime', icon: ThumbsUp },
            { key: 'publications' as const, label: 'Publications', icon: ImageIcon },
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
                  background: 'rgba(24,119,242,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon size={16} color="#1877F2" strokeWidth={1.8} />
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

      {/* Bonnes pratiques */}
      <div
        style={{
          background: 'rgba(24,119,242,0.04)',
          border: '1px solid rgba(24,119,242,0.15)',
          borderRadius: '12px',
          padding: '24px 28px',
        }}
      >
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#1877F2',
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
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  background: 'rgba(24,119,242,0.1)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <tip.icon size={14} color="#1877F2" strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#ccc', marginBottom: '4px' }}>
                  {tip.title}
                </p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#666', lineHeight: '1.5' }}>
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

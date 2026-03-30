'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Settings,
  User,
  Lock,
  ExternalLink,
  Database,
  Server,
  Globe,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

const QUICK_LINKS = [
  {
    label: 'DirectAdmin (MXRoute)',
    url: 'https://heracles.mxrouting.net:2222/',
    icon: Server,
    desc: 'Gestion serveur mail',
  },
  {
    label: 'Webmail Roundcube',
    url: 'https://heracles.mxrouting.net/roundcube/',
    icon: Globe,
    desc: 'Interface webmail',
  },
  {
    label: 'Supabase Dashboard',
    url: 'https://supabase.com/dashboard/project/aptpkfivtrjrmgatzqwc',
    icon: Database,
    desc: 'Base de données',
  },
  {
    label: 'Vercel Dashboard',
    url: 'https://vercel.com/dashboard',
    icon: Globe,
    desc: 'Déploiement & logs',
  },
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#f0ece3',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem',
  color: '#777',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  fontFamily: 'Outfit, sans-serif',
  marginBottom: '8px',
};

export default function SettingsPage() {
  const supabase = createClient();

  // Changer le mot de passe
  const [pwForm, setPwForm] = useState({ nouveau: '', confirmation: '' });
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handlePasswordChange = async () => {
    setPwMsg(null);
    if (!pwForm.nouveau.trim()) {
      setPwMsg({ type: 'err', text: 'Le nouveau mot de passe est requis.' });
      return;
    }
    if (pwForm.nouveau.length < 8) {
      setPwMsg({ type: 'err', text: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }
    if (pwForm.nouveau !== pwForm.confirmation) {
      setPwMsg({ type: 'err', text: 'Les mots de passe ne correspondent pas.' });
      return;
    }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwForm.nouveau });
    setPwLoading(false);
    if (error) {
      setPwMsg({ type: 'err', text: error.message });
    } else {
      setPwMsg({ type: 'ok', text: 'Mot de passe mis à jour avec succès.' });
      setPwForm({ nouveau: '', confirmation: '' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
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
          <Settings size={22} color="var(--gold)" strokeWidth={1.8} />
          Paramètres
        </h2>
        <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
          Configuration du compte administrateur
        </p>
      </div>
      <div className="gold-line" style={{ marginBottom: '32px' }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Profil admin */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
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
              }}
            >
              <User size={16} color="var(--gold)" strokeWidth={1.8} />
            </div>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#f0ece3',
              }}
            >
              Profil
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email administrateur</label>
            <div
              style={{
                ...inputStyle,
                color: '#888',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'not-allowed',
              }}
            >
              admin@amana-janaza.com
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Rôle</label>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Super Admin
            </div>
          </div>

          <div>
            <label style={labelStyle}>Statut session</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.85rem',
                color: '#3ecf8e',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#3ecf8e',
                  boxShadow: '0 0 6px rgba(62,207,142,0.6)',
                }}
              />
              Connecté — session active
            </div>
          </div>
        </div>

        {/* Changer le mot de passe */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
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
              }}
            >
              <Lock size={16} color="var(--gold)" strokeWidth={1.8} />
            </div>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#f0ece3',
              }}
            >
              Changer le mot de passe
            </p>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Nouveau mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                value={pwForm.nouveau}
                onChange={(e) => setPwForm({ ...pwForm, nouveau: e.target.value })}
                placeholder="Min. 8 caractères"
                style={{ ...inputStyle, paddingRight: '42px' }}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--gold)')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#333')}
              />
              <button
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#555',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Confirmer le mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConf ? 'text' : 'password'}
                value={pwForm.confirmation}
                onChange={(e) => setPwForm({ ...pwForm, confirmation: e.target.value })}
                placeholder="Répéter le mot de passe"
                style={{ ...inputStyle, paddingRight: '42px' }}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--gold)')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#333')}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordChange()}
              />
              <button
                onClick={() => setShowConf(!showConf)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#555',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {pwMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '8px',
                background:
                  pwMsg.type === 'ok'
                    ? 'rgba(62,207,142,0.08)'
                    : 'rgba(224,80,80,0.08)',
                border: `1px solid ${pwMsg.type === 'ok' ? 'rgba(62,207,142,0.2)' : 'rgba(224,80,80,0.2)'}`,
                marginBottom: '16px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.82rem',
                color: pwMsg.type === 'ok' ? '#3ecf8e' : '#e05050',
              }}
            >
              {pwMsg.type === 'ok' ? (
                <CheckCircle size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              {pwMsg.text}
            </div>
          )}

          <button
            onClick={handlePasswordChange}
            disabled={pwLoading}
            style={{
              width: '100%',
              background: pwLoading
                ? 'rgba(201,168,76,0.3)'
                : 'linear-gradient(135deg, #A07830, #C9A84C)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              color: pwLoading ? '#888' : '#0d0d0d',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: pwLoading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!pwLoading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
          >
            {pwLoading ? 'Mise à jour…' : 'Mettre à jour le mot de passe'}
          </button>
        </div>
      </div>

      {/* Liens rapides */}
      <div style={{ marginTop: '24px' }}>
        <p
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: '16px',
          }}
        >
          Accès rapides
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          {QUICK_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid #222',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  'rgba(201,168,76,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#222';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'rgba(201,168,76,0.08)',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <link.icon size={15} color="var(--gold)" strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.83rem',
                    fontWeight: 500,
                    color: '#ccc',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {link.label}
                </p>
                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.73rem',
                    color: '#555',
                  }}
                >
                  {link.desc}
                </p>
              </div>
              <ExternalLink size={12} color="#444" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      {/* Info système */}
      <div
        style={{
          marginTop: '24px',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #1a1a1a',
          borderRadius: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {[
          { label: 'Framework', value: 'Next.js 14 (App Router)' },
          { label: 'Base de données', value: 'Supabase (PostgreSQL)' },
          { label: 'Hébergement', value: 'Vercel' },
          { label: 'Domaine email', value: 'amana-janaza.com (MXRoute)' },
        ].map((info, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.7rem',
                color: '#555',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '3px',
              }}
            >
              {info.label}
            </p>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.82rem',
                color: '#888',
              }}
            >
              {info.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

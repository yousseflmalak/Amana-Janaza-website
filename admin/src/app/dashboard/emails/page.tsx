'use client';
import { useState, useEffect, useCallback } from 'react';
import { Mail, Plus, Trash2, RefreshCw, Copy, Check } from 'lucide-react';

type EmailAccount = { user: string; quota: string; usage: string };

const DOMAIN = 'amana-janaza.com';

export default function EmailsPage() {
  const [emails, setEmails]       = useState<EmailAccount[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [copied, setCopied]       = useState<string | null>(null);
  const [form, setForm]           = useState({ user: '', password: '', quota: '500' });
  const [formError, setFormError] = useState('');

  const fetchEmails = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/emails');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      setEmails(data.emails || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmails(); }, [fetchEmails]);

  const handleCreate = async () => {
    if (!form.user.trim()) { setFormError('Nom du compte requis.'); return; }
    if (!form.password || form.password.length < 8) {
      setFormError('Mot de passe : 8 caractères minimum.'); return;
    }
    setSaving(true); setFormError('');
    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', user: form.user.trim(),
          password: form.password, quota: form.quota }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur création');
      setShowForm(false);
      setForm({ user: '', password: '', quota: '500' });
      fetchEmails();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : 'Erreur');
    } finally { setSaving(false); }
  };

  const handleDelete = async (user: string) => {
    if (!confirm(`Supprimer ${user}@${DOMAIN} ? Cette action est irréversible.`)) return;
    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', user }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      fetchEmails();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Erreur suppression');
    }
  };

  const copyEmail = (user: string) => {
    navigator.clipboard.writeText(`${user}@${DOMAIN}`);
    setCopied(user);
    setTimeout(() => setCopied(null), 2000);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid #333',
    borderRadius: '7px', padding: '10px 12px', color: '#f0ece3',
    fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '6px',
    textTransform: 'uppercase' as const, letterSpacing: '0.06em', fontFamily: 'Outfit, sans-serif',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 600,
            color: '#f0ece3', marginBottom: '4px' }}>
            Emails MXRoute
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
            Domaine : <span style={{ color: 'var(--gold)' }}>{DOMAIN}</span>
            {' · '}{emails.length} compte{emails.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchEmails} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px',
              background: 'transparent', border: '1px solid #333', borderRadius: '8px',
              color: '#888', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem',
              transition: 'all 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#555')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#333')}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Actualiser
          </button>
          <button onClick={() => { setShowForm(true); setFormError(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
              background: 'linear-gradient(135deg, #A07830, #C9A84C)', color: '#0d0d0d',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>
            <Plus size={16} /> Créer un email
          </button>
        </div>
      </div>
      <div className="gold-line" style={{ marginBottom: '28px' }} />

      {/* Erreur globale */}
      {error && (
        <div style={{ background: 'rgba(224,80,80,0.08)', border: '1px solid rgba(224,80,80,0.25)',
          borderRadius: '10px', padding: '16px 20px', marginBottom: '24px',
          color: '#e05050', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Tableau */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#555',
          fontFamily: 'Outfit, sans-serif' }}>
          <RefreshCw size={24} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
          Connexion à MXRoute…
        </div>
      ) : emails.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#444',
          fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem' }}>
          <Mail size={32} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
          Aucun compte email. Créez le premier.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Outfit, sans-serif' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222' }}>
                {['Adresse email', 'Quota (Mo)', 'Utilisation', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left',
                    fontSize: '0.72rem', color: '#666', textTransform: 'uppercase',
                    letterSpacing: '0.08em', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emails.map((acc) => (
                <tr key={acc.user} style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', background: 'rgba(201,168,76,0.1)',
                        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={14} color="var(--gold)" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p style={{ color: '#f0ece3', fontSize: '0.875rem', fontWeight: 500 }}>
                          {acc.user}@{DOMAIN}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px', color: '#ccc', fontSize: '0.85rem' }}>
                    {acc.quota !== '—' ? `${acc.quota} Mo` : '—'}
                  </td>
                  <td style={{ padding: '14px 12px', color: '#ccc', fontSize: '0.85rem' }}>
                    {acc.usage !== '0' ? `${acc.usage} Mo` : '< 1 Mo'}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => copyEmail(acc.user)}
                        title="Copier l'adresse"
                        style={{ background: 'none', border: '1px solid #333', borderRadius: '6px',
                          padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                          color: copied === acc.user ? '#3ecf8e' : '#888', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#555')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#333')}>
                        {copied === acc.user ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                      <button onClick={() => handleDelete(acc.user)}
                        title="Supprimer"
                        style={{ background: 'none', border: '1px solid #333', borderRadius: '6px',
                          padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                          color: '#888', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e05050'; e.currentTarget.style.color = '#e05050'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Création */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px',
            padding: '32px', width: '100%', maxWidth: '440px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 600,
              color: '#f0ece3', marginBottom: '4px' }}>
              Nouveau compte email
            </h3>
            <p style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'Outfit, sans-serif', marginBottom: '0' }}>
              Le compte sera créé sur @{DOMAIN}
            </p>
            <div className="gold-line" style={{ margin: '16px 0 24px' }} />

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Nom du compte</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #333',
                borderRadius: '7px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                <input style={{ ...inputStyle, border: 'none', background: 'transparent', flex: 1 }}
                  placeholder="prenom.nom"
                  value={form.user}
                  onChange={(e) => setForm({ ...form, user: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '') })} />
                <span style={{ padding: '0 12px', color: '#555', fontSize: '0.85rem',
                  fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>
                  @{DOMAIN}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input type="password" style={inputStyle} placeholder="Min. 8 caractères"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Quota (Mo)</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.quota}
                onChange={(e) => setForm({ ...form, quota: e.target.value })}>
                <option value="250" style={{ background: '#111' }}>250 Mo</option>
                <option value="500" style={{ background: '#111' }}>500 Mo (défaut)</option>
                <option value="1000" style={{ background: '#111' }}>1 Go</option>
                <option value="2000" style={{ background: '#111' }}>2 Go</option>
                <option value="0" style={{ background: '#111' }}>Illimité</option>
              </select>
            </div>

            {formError && (
              <p style={{ color: '#e05050', fontSize: '0.82rem', marginBottom: '16px',
                fontFamily: 'Outfit, sans-serif' }}>{formError}</p>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowForm(false)}
                style={{ flex: 1, padding: '11px', background: 'transparent',
                  border: '1px solid #333', borderRadius: '8px', color: '#888',
                  cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem' }}>
                Annuler
              </button>
              <button onClick={handleCreate} disabled={saving}
                style={{ flex: 1, padding: '11px',
                  background: 'linear-gradient(135deg, #A07830, #C9A84C)', border: 'none',
                  borderRadius: '8px', color: '#0d0d0d', cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                  opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Création…' : 'Créer le compte'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

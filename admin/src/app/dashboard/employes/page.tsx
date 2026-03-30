'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';

type Role = 'super_admin' | 'secretariat' | 'laveur' | 'chauffeur' | 'staff';
type Employe = {
  id: string; prenom: string; nom: string;
  email: string | null; telephone: string | null;
  role: Role; actif: boolean; created_at: string;
};

const ROLES: Record<Role, string> = {
  super_admin: 'Super Admin', secretariat: 'Secrétariat',
  laveur: 'Laveur', chauffeur: 'Chauffeur', staff: 'Staff',
};

const ROLE_COLORS: Record<Role, string> = {
  super_admin: '#C9A84C', secretariat: '#7dd3fc',
  laveur: '#86efac', chauffeur: '#fca5a5', staff: '#d1d5db',
};

const emptyForm = { prenom: '', nom: '', email: '', telephone: '', role: 'staff' as Role, actif: true };

export default function EmployesPage() {
  const [employes, setEmployes]   = useState<Employe[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<Employe | null>(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');

  const supabase = createClient();

  const fetchEmployes = async () => {
    setLoading(true);
    const { data } = await supabase.from('employes').select('*').order('nom');
    setEmployes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEmployes(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setError(''); setShowForm(true); };
  const openEdit = (e: Employe) => {
    setEditing(e);
    setForm({ prenom: e.prenom, nom: e.nom, email: e.email || '', telephone: e.telephone || '',
      role: e.role, actif: e.actif });
    setError(''); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.prenom.trim() || !form.nom.trim()) { setError('Prénom et Nom obligatoires.'); return; }
    setSaving(true); setError('');
    const payload = { prenom: form.prenom.trim(), nom: form.nom.trim(),
      email: form.email.trim() || null, telephone: form.telephone.trim() || null,
      role: form.role, actif: form.actif };
    const { error: err } = editing
      ? await supabase.from('employes').update(payload).eq('id', editing.id)
      : await supabase.from('employes').insert(payload);
    if (err) { setError(err.message); setSaving(false); return; }
    setShowForm(false); fetchEmployes(); setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce collaborateur ?')) return;
    await supabase.from('employes').delete().eq('id', id);
    fetchEmployes();
  };

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid #333', borderRadius: '7px', padding: '10px 12px',
    color: '#f0ece3', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '6px',
    textTransform: 'uppercase' as const, letterSpacing: '0.06em', fontFamily: 'Outfit, sans-serif' };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 600,
            color: '#f0ece3', marginBottom: '4px' }}>
            Collaborateurs
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>
            {employes.length} membre{employes.length !== 1 ? 's' : ''} enregistré{employes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg, #A07830, #C9A84C)', color: '#0d0d0d',
          border: 'none', borderRadius: '8px', padding: '10px 18px', cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="gold-line" style={{ marginBottom: '28px' }} />

      {/* Table */}
      {loading ? (
        <p style={{ color: '#555', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem' }}>Chargement…</p>
      ) : employes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#444',
          fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem' }}>
          Aucun collaborateur. Cliquez sur &quot;Ajouter&quot; pour commencer.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Outfit, sans-serif' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222' }}>
                {['Nom','Email','Téléphone','Rôle','Statut','Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.72rem',
                    color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em',
                    fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employes.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '14px 12px', color: '#f0ece3', fontSize: '0.875rem', fontWeight: 500 }}>
                    {emp.prenom} {emp.nom}
                  </td>
                  <td style={{ padding: '14px 12px', color: '#999', fontSize: '0.85rem' }}>
                    {emp.email || '—'}
                  </td>
                  <td style={{ padding: '14px 12px', color: '#999', fontSize: '0.85rem' }}>
                    {emp.telephone || '—'}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ background: `${ROLE_COLORS[emp.role]}15`,
                      border: `1px solid ${ROLE_COLORS[emp.role]}40`,
                      color: ROLE_COLORS[emp.role], fontSize: '0.72rem',
                      padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}>
                      {ROLES[emp.role]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.78rem', color: emp.actif ? '#3ecf8e' : '#666' }}>
                      {emp.actif ? <Check size={12} /> : <X size={12} />}
                      {emp.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEdit(emp)}
                        style={{ background: 'none', border: '1px solid #333', borderRadius: '6px',
                          padding: '6px 8px', cursor: 'pointer', color: '#888',
                          transition: 'all 0.15s', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(emp.id)}
                        style={{ background: 'none', border: '1px solid #333', borderRadius: '6px',
                          padding: '6px 8px', cursor: 'pointer', color: '#888',
                          transition: 'all 0.15s', display: 'flex', alignItems: 'center' }}
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

      {/* Modal Formulaire */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px',
            padding: '32px', width: '100%', maxWidth: '480px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 600,
              color: '#f0ece3', marginBottom: '4px' }}>
              {editing ? 'Modifier le collaborateur' : 'Nouveau collaborateur'}
            </h3>
            <div className="gold-line" style={{ margin: '16px 0 24px' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Prénom *</label>
                <input style={inputStyle} value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Nom *</label>
                <input style={inputStyle} value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email</label>
              <input type="email" style={inputStyle} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Téléphone</label>
                <input style={inputStyle} value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Rôle</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
                  {Object.entries(ROLES).map(([k, v]) => (
                    <option key={k} value={k} style={{ background: '#111' }}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <input type="checkbox" id="actif" checked={form.actif}
                onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} />
              <label htmlFor="actif" style={{ color: '#ccc', fontFamily: 'Outfit, sans-serif',
                fontSize: '0.875rem', cursor: 'pointer' }}>
                Collaborateur actif
              </label>
            </div>

            {error && <p style={{ color: '#e05050', fontSize: '0.82rem', marginBottom: '16px',
              fontFamily: 'Outfit, sans-serif' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '11px',
                background: 'transparent', border: '1px solid #333', borderRadius: '8px',
                color: '#888', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem' }}>
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '11px',
                background: 'linear-gradient(135deg, #A07830, #C9A84C)', border: 'none',
                borderRadius: '8px', color: '#0d0d0d', cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>
                {saving ? 'Enregistrement…' : editing ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

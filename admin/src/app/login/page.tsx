'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}
      className="flex items-center justify-center p-4">
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="fade-in-up" style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '420px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid #2a2a2a',
        borderRadius: '16px',
        padding: '48px 40px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
      }}>
        <div className="flex flex-col items-center mb-8 delay-1 fade-in-up">
          <Image
            src="https://www.al-amanah-janaza.com/assets/logo-dark-moon.png"
            alt="Al Amanah Funérailles"
            width={160} height={80}
            style={{ objectFit: 'contain', marginBottom: '20px' }}
            priority
          />
          <div className="gold-line" />
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#777',
            marginTop: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Accès Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="delay-2 fade-in-up">
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.78rem', color: '#888',
              marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif' }}>
              Adresse Email
            </label>
            <input id="email" type="email" className="input-gold"
              placeholder="admin@al-amanah-janaza.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required autoComplete="email" />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.78rem', color: '#888',
              marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif' }}>
              Mot de passe
            </label>
            <input id="password" type="password" className="input-gold"
              placeholder="••••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required autoComplete="current-password" />
          </div>

          {error && (
            <p style={{ color: '#e05050', fontSize: '0.82rem', marginBottom: '16px',
              textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
              {error}
            </p>
          )}

          <button id="login-submit-btn" type="submit" className="btn-gold" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="delay-3 fade-in-up" style={{ textAlign: 'center', marginTop: '28px' }}>
          <div className="gold-line" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '0.72rem', color: '#444', fontFamily: 'Outfit, sans-serif' }}>
            Accès réservé au personnel autorisé
          </p>
        </div>
      </div>
    </main>
  );
}

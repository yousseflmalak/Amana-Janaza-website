'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Mail, Instagram, Settings, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
  { icon: Users,           label: 'Collaborateurs',  href: '/dashboard/employes' },
  { icon: Mail,            label: 'Emails',           href: '/dashboard/emails' },
  { icon: Instagram,       label: 'Instagram',        href: '/dashboard/instagram' },
  { icon: Settings,        label: 'Paramètres',       href: '/dashboard/settings' },
];

const SIDEBAR_W = 248;
const MOBILE_BP = 768;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [isMobile, setIsMobile]       = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Fermer le menu quand on navigue (mobile)
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const sidebarVisible = !isMobile || sidebarOpen;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--charcoal)' }}>

      {/* Overlay mobile */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.7)' }} />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        position: isMobile ? 'fixed' : 'relative',
        top: 0, left: 0, bottom: 0,
        width: `${SIDEBAR_W}px`,
        flexShrink: 0,
        zIndex: 40,
        background: '#0f0f0f',
        borderRight: '1px solid #1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        transform: sidebarVisible ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Logo */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard">
            <Image src="https://www.amana-janaza.com/assets/logo-dark-moon.png"
              alt="Al Amanah" width={100} height={48}
              style={{ objectFit: 'contain' }} priority />
          </Link>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)}
              style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Badge */}
        <div style={{ padding: '10px 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)',
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: '4px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
            Super Admin
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  borderRadius: '8px', marginBottom: '2px', textDecoration: 'none',
                  color: isActive ? 'var(--gold)' : '#aaa',
                  background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                  fontSize: '0.875rem', fontFamily: 'Outfit, sans-serif',
                  fontWeight: isActive ? 500 : 400, transition: 'all 0.15s',
                  borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent' }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ddd';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#aaa';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }
                }}>
                <item.icon size={16} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #1a1a1a' }}>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: '10px 12px', borderRadius: '8px', border: 'none', background: 'transparent',
              color: '#666', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'Outfit, sans-serif',
              transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e05050')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}>
            <LogOut size={16} strokeWidth={1.8} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        marginLeft: isMobile ? 0 : 0 }}>

        {/* Header */}
        <header style={{ height: '56px', flexShrink: 0, background: 'rgba(10,10,10,0.95)',
          borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center',
          padding: '0 20px', gap: '12px', position: 'sticky', top: 0, zIndex: 20,
          backdropFilter: 'blur(12px)' }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer' }}>
              <Menu size={20} />
            </button>
          )}
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.88rem', color: '#f0ece3',
              fontWeight: 400, letterSpacing: '0.04em' }}>Al Amanah</span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: '#555',
              marginLeft: '8px' }}>— Espace Administration</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3ecf8e',
              boxShadow: '0 0 5px rgba(62,207,142,0.5)' }} />
            <span style={{ fontSize: '0.78rem', color: '#666', fontFamily: 'Outfit, sans-serif' }}>
              En ligne
            </span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Mail,
  Instagram,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
  { icon: Users,           label: 'Collaborateurs',  href: '/dashboard/employes' },
  { icon: Mail,            label: 'Emails MXRoute',  href: '/dashboard/emails' },
  { icon: Instagram,       label: 'Instagram',        href: '/dashboard/instagram' },
  { icon: Settings,        label: 'Paramètres',       href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--charcoal)' }}>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 30,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: '260px', zIndex: 40,
          background: '#111111',
          borderRight: '1px solid #222',
          display: 'flex', flexDirection: 'column',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
        className="lg:translate-x-0 lg:static lg:transform-none"
      >
        {/* Logo */}
        <div
          style={{
            padding: '28px 24px 20px',
            borderBottom: '1px solid #1e1e1e',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="https://www.amana-janaza.com/assets/logo-dark-moon.png"
              alt="Al Amanah"
              width={110}
              height={50}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}
            className="lg:hidden"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Badge admin */}
        <div style={{ padding: '12px 24px' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'var(--gold)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              fontFamily: 'Cinzel, serif',
            }}
          >
            Super Admin
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px',
                  borderRadius: '8px',
                  marginBottom: '2px',
                  textDecoration: 'none',
                  color: isActive ? 'var(--gold)' : '#888',
                  background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                  fontSize: '0.88rem',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.15s',
                  borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                }}
              >
                <item.icon size={17} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #1e1e1e' }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', padding: '11px 12px',
              borderRadius: '8px', border: 'none',
              background: 'transparent',
              color: '#555', cursor: 'pointer',
              fontSize: '0.88rem', fontFamily: 'Outfit, sans-serif',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e05050')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
          >
            <LogOut size={17} strokeWidth={1.8} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
           className="lg:ml-[260px]">

        {/* HEADER */}
        <header
          style={{
            height: '64px', flexShrink: 0,
            background: 'rgba(13,13,13,0.95)',
            borderBottom: '1px solid #1e1e1e',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center',
            padding: '0 24px', gap: '16px',
            position: 'sticky', top: 0, zIndex: 20,
          }}
        >
          {/* Burger mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none', border: 'none', color: '#888',
              cursor: 'pointer', padding: '4px',
            }}
            className="lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>

          {/* Titre page */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.9rem',
                color: '#f0ece3',
                letterSpacing: '0.06em',
                fontWeight: 400,
              }}
            >
              Al Amanah —{' '}
              <span style={{ color: 'var(--gold)' }}>Espace Administration</span>
            </h1>
          </div>

          {/* Indicateur statut */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#3ecf8e',
                boxShadow: '0 0 6px rgba(62,207,142,0.5)',
              }}
            />
            <span style={{ fontSize: '0.78rem', color: '#555', fontFamily: 'Outfit, sans-serif' }}>
              En ligne
            </span>
          </div>
        </header>

        {/* Contenu principal */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';
import { type ReactNode } from 'react';

type StatCardProps = {
  value: string;
  label: string;
  sub: string;
  color?: string;
  icon: ReactNode;
  href: string | null;
};

export function StatCard({ value, label, sub, color, icon, href }: StatCardProps) {
  const inner = (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid #222',
        borderRadius: '12px',
        padding: '24px',
        transition: 'border-color 0.2s, transform 0.15s',
        cursor: href ? 'pointer' : 'default',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.3)';
        if (href) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#222';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          background: color ? `${color}18` : 'rgba(201,168,76,0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.6rem',
          color: color || '#f0ece3',
          marginBottom: '4px',
          fontWeight: 600,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: '0.85rem',
          color: '#ccc',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: '4px',
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '0.75rem',
          color: '#666',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {sub}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </a>
    );
  }
  return inner;
}

type QuickLinkProps = {
  href: string;
  children: ReactNode;
};

export function QuickLink({ href, children }: QuickLinkProps) {
  return (
    <li>
      →{' '}
      <a
        href={href}
        style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.15s' }}
        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--gold)')}
        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#aaa')}
      >
        {children}
      </a>
    </li>
  );
}

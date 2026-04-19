import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Mama Hala',
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F9E8E2 55%, #F3EFE8 100%)',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C8A97D',
          marginBottom: '16px',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 700,
          color: '#7A3B5E',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#6B6580',
          maxWidth: '420px',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/en"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#7A3B5E',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        <Home size={16} />
        Go to Homepage
      </Link>
      <p
        style={{
          fontSize: '12px',
          color: '#A09BAD',
          marginTop: '48px',
        }}
      >
        &copy; {new Date().getFullYear()} Mama Hala
      </p>
    </div>
  );
}

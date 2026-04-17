'use client';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
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
          Error
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
          Something went wrong
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
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => unstable_retry()}
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
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <p
          style={{
            fontSize: '12px',
            color: '#A09BAD',
            marginTop: '48px',
          }}
        >
          &copy; {new Date().getFullYear()} Mama Hala Consulting Group
        </p>
      </body>
    </html>
  );
}

import { ImageResponse } from 'next/og';

export const alt = 'Mama Hala Consulting — Dr. Hala Ali';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAF7F2',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative mauve arc — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'rgba(122, 59, 94, 0.08)',
            display: 'flex',
          }}
        />

        {/* Decorative mauve arc — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-160px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(122, 59, 94, 0.06)',
            display: 'flex',
          }}
        />

        {/* Gold accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #C8A97D 0%, #7A3B5E 50%, #C8A97D 100%)',
            display: 'flex',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '60px 80px',
          }}
        >
          {/* Gold decorative element above title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div style={{ width: '60px', height: '2px', backgroundColor: '#C8A97D', display: 'flex' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C8A97D', display: 'flex' }} />
            <div style={{ width: '60px', height: '2px', backgroundColor: '#C8A97D', display: 'flex' }} />
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#7A3B5E',
              lineHeight: 1.1,
              textAlign: 'center',
              marginBottom: '20px',
              display: 'flex',
              fontFamily: 'Georgia, serif',
            }}
          >
            Mama Hala Consulting
          </div>

          {/* Subtitle — Dr. Hala Ali */}
          <div
            style={{
              fontSize: '30px',
              fontWeight: 500,
              color: '#C8A97D',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: '28px',
              display: 'flex',
            }}
          >
            Dr. Hala Ali
          </div>

          {/* Gold divider */}
          <div style={{ width: '100px', height: '2px', backgroundColor: '#C8A97D', marginBottom: '28px', display: 'flex' }} />

          {/* Tagline */}
          <div
            style={{
              fontSize: '26px',
              color: '#4A4A5C',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '700px',
              display: 'flex',
            }}
          >
            Professional Counseling for Individuals, Couples & Families
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 80px' }}>
          <div style={{ fontSize: '18px', color: 'rgba(122, 59, 94, 0.5)', letterSpacing: '2px', display: 'flex' }}>
            mamahala.ca
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

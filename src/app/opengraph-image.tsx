import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Artisans On Main — Curated Art Gallery in Weaverville, NC';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#FAF8F5',
          padding: '60px',
        }}
      >
        {/* Outer border */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px solid #C67D5B',
            padding: '40px',
          }}
        >
          {/* Top decorative line */}
          <div
            style={{
              display: 'flex',
              width: '80px',
              height: '2px',
              backgroundColor: '#C67D5B',
              marginBottom: '40px',
            }}
          />

          {/* Gallery name */}
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: '#2C2420',
              letterSpacing: '-1px',
              textAlign: 'center',
            }}
          >
            Artisans On Main
          </div>

          {/* Middle decorative line */}
          <div
            style={{
              display: 'flex',
              width: '120px',
              height: '1px',
              backgroundColor: '#C67D5B',
              marginTop: '32px',
              marginBottom: '32px',
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: '#6B5E57',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Curated Art Gallery
          </div>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              fontFamily: 'sans-serif',
              fontWeight: 400,
              color: '#9B8E87',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            Weaverville, NC
          </div>

          {/* Bottom decorative line */}
          <div
            style={{
              display: 'flex',
              width: '80px',
              height: '2px',
              backgroundColor: '#C67D5B',
              marginTop: '40px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}

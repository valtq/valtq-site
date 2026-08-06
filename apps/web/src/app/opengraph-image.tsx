import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TITLE, SITE_URL } from '@/config/site';

export const runtime = 'edge';
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B1E36',
          color: '#FFFFFF',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <div
              key={`v-${i}`}
              style={{
                width: 1,
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`h-${i}`}
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 80,
            width: 72,
            height: 4,
            backgroundColor: '#2B4EFF',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: 4,
              color: '#22E5FF',
              textTransform: 'uppercase',
            }}
          >
            Premium Software Development
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 20,
              letterSpacing: 1,
              color: '#94A3B8',
            }}
          >
            {host}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

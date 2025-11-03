import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Workflow Audit - Seventeen Labs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            AI Workflow Audit
          </div>
          
          <div
            style={{
              fontSize: 36,
              color: '#cbd5e1',
              textAlign: 'center',
              maxWidth: '900px',
              marginBottom: '40px',
            }}
          >
            Discover automation opportunities, reduce errors, and scale with AI
          </div>

          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #60a5fa, #34d399)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                $499
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: '#94a3b8',
                }}
              >
                Full Analysis
              </div>
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #a78bfa, #ec4899)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                3-5 Days
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: '#94a3b8',
                }}
              >
                Delivery Time
              </div>
            </div>
          </div>
          
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              marginTop: '60px',
              fontWeight: 'bold',
            }}
          >
            SEVENTEEN LABS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

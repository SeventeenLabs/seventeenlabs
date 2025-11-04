import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Agency Automation Blueprint - Save 15+ Hours/Week | Seventeen Labs';
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
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
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
          {/* Badge */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '20px',
              fontWeight: 300,
            }}
          >
            Agency Automation Blueprint
          </div>
          
          {/* Main Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Save 15+ Hours per Week
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: '900px',
              marginBottom: '50px',
            }}
          >
            3 Custom Automations to Scale Your Agency
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '60px',
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
                  fontWeight: 300,
                  color: '#ffffff',
                }}
              >
                $499
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 300,
                }}
              >
                Early Adopter
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
                  fontWeight: 300,
                  color: '#ffffff',
                }}
              >
                5-7 Days
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 300,
                }}
              >
                Delivery
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
                  fontWeight: 300,
                  color: '#ffffff',
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 300,
                }}
              >
                Human Analysis
              </div>
            </div>
          </div>
          
          {/* Bottom branding */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.4)',
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

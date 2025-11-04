import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1a0a0a, #2d1010, #4a1a1a)',
          padding: '60px 80px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="40" height="40" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.4278 0H0V35.5849L17.2997 35.6174L17.5041 149.951H49.4278V0Z" fill="white"/>
            <path d="M150 0.0491029C137.485 0.0491134 49.4686 -0.0615805 49.4289 0.0493983V35.8513L97.723 35.7641C91.1229 53.2963 82.6619 80.5867 76.6142 105.6C73.6486 117.83 68.3278 146.487 68.3278 150H100.78C105.984 115.228 117.814 72.6175 133.543 34.6907C138.108 23.6965 144.447 10.1976 148.575 2.65129L150 0.0491029Z" fill="white"/>
          </svg>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>
            SEVENTEENLABS
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
          <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            Agency Automation Blueprint
          </div>
          <div style={{ fontSize: '56px', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '20px' }}>
            Save 15+ Hours per Week
          </div>
          <div style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
            3 Custom Automations to Scale Your Agency
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '60px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '36px', color: 'white' }}>$499</div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Early Adopter</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '36px', color: 'white' }}>5-7 Days</div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Delivery</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '36px', color: 'white' }}>100%</div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Human Analysis</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

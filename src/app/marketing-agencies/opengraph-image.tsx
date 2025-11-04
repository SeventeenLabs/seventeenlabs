import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Marketing Agency Automation Solutions | Seventeen Labs';
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
          position: 'relative',
          background: 'linear-gradient(135deg, #0a1a14 0%, #0f2820 25%, #1a4d3a 50%, #0f2820 75%, #0a1a14 100%)',
        }}
      >
        {/* Digital forest-like gradient overlays - green/teal theme */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 25% 75%, rgba(5, 150, 105, 0.15) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 65%, rgba(20, 184, 166, 0.12) 0%, transparent 40%)' }} />
        
        {/* Left fade gradient for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)', width: '50%' }} />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: '60px 80px', width: '100%', height: '100%', justifyContent: 'space-between' }}>
          {/* Logo - SVG "17" with text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="40" height="40" viewBox="0 0 150 150" fill="none">
              <path d="M49.4278 0H0V35.5849L17.2997 35.6174L17.5041 149.951H49.4278V0Z" fill="white"/>
              <path d="M150 0.0491029C137.485 0.0491134 49.4686 -0.0615805 49.4289 0.0493983V35.8513L97.723 35.7641C91.1229 53.2963 82.6619 80.5867 76.6142 105.6C73.6486 117.83 68.3278 146.487 68.3278 150H100.78C105.984 115.228 117.814 72.6175 133.543 34.6907C138.108 23.6965 144.447 10.1976 148.575 2.65129L150 0.0491029Z" fill="white"/>
            </svg>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff', letterSpacing: '2px' }}>
              SEVENTEENLABS
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', fontWeight: 300 }}>
              For Marketing Agencies
            </div>
            <div style={{ fontSize: 56, fontWeight: 300, color: '#ffffff', lineHeight: 1.1, marginBottom: '20px' }}>
              Scale Your Agency with Intelligent Automation
            </div>
            <div style={{ fontSize: 20, fontWeight: 300, color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
              Automate repetitive tasks and deliver exceptional results
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '60px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: '#ffffff' }}>70%</div>
              <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300 }}>Time Saved</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: '#ffffff' }}>3x</div>
              <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300 }}>More Clients</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: '#ffffff' }}>24/7</div>
              <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 300 }}>Automation</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

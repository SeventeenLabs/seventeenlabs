import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'SeventeenLabs - AI-Powered Workflow Automation';
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
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            SeventeenLabs
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#e2e8f0',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            AI-Powered Workflow Automation & Custom Development
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            Transform Your Business with Intelligent Automation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

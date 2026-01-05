import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Get parameters for dynamic content
  const title = searchParams.get('title') || 'SeventeenLabs';
  const description = searchParams.get('description') || 'AI Automation Agency';
  const type = searchParams.get('type') || 'default'; // default, blog, service, product
  const category = searchParams.get('category') || '';
  const author = searchParams.get('author') || '';
  const date = searchParams.get('date') || '';

  // Color schemes based on type
  const colorSchemes = {
    default: {
      gradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3a, #2d1b4e)',
      accent: '#818cf8',
    },
    blog: {
      gradient: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
      accent: '#38bdf8',
    },
    service: {
      gradient: 'linear-gradient(135deg, #0a0a1a, #1e1b4b, #312e81)',
      accent: '#a78bfa',
    },
    product: {
      gradient: 'linear-gradient(135deg, #0c0a09, #1c1917, #292524)',
      accent: '#fbbf24',
    },
  };

  const scheme = colorSchemes[type as keyof typeof colorSchemes] || colorSchemes.default;

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
          background: scheme.gradient,
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle at center, ${scheme.accent}20, transparent)`,
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          }}
        />
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
          <svg width="36" height="36" viewBox="0 0 150 150" fill="none">
            <path d="M49.4278 0H0V35.5849L17.2997 35.6174L17.5041 149.951H49.4278V0Z" fill="white"/>
            <path d="M150 0.0491029C137.485 0.0491134 49.4686 -0.0615805 49.4289 0.0493983V35.8513L97.723 35.7641C91.1229 53.2963 82.6619 80.5867 76.6142 105.6C73.6486 117.83 68.3278 146.487 68.3278 150H100.78C105.984 115.228 117.814 72.6175 133.543 34.6907C138.108 23.6965 144.447 10.1976 148.575 2.65129L150 0.0491029Z" fill="white"/>
          </svg>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>
            SEVENTEENLABS
          </div>
          {category && (
            <div
              style={{
                marginLeft: '20px',
                padding: '4px 12px',
                background: `${scheme.accent}30`,
                borderRadius: '20px',
                fontSize: '14px',
                color: scheme.accent,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px', zIndex: 1 }}>
          <div
            style={{
              fontSize: title.length > 60 ? '42px' : title.length > 40 ? '48px' : '56px',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '24px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: '22px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', zIndex: 1 }}>
          {author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${scheme.accent}, ${scheme.accent}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                {author.charAt(0).toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', color: 'white', fontWeight: 500 }}>{author}</div>
                {date && (
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>{date}</div>
                )}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
              seventeenlabs.io
            </div>
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

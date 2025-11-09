'use client';

interface ReadingProgressBarProps {
  progress: number;
  isVisible: boolean;
}

export function ReadingProgressBar({ progress, isVisible }: ReadingProgressBarProps) {
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-[9999] no-print shadow-sm transition-opacity duration-300 ease-in-out ${
        progress > 0 ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-blue-800 will-change-transform"
        style={{ 
          width: `${progress}%`,
          transform: 'translateZ(0)', // Hardware acceleration
          transition: 'none' // Remove CSS transition for smoother scroll-based animation
        }}
      />
    </div>
  );
}
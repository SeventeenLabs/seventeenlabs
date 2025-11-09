import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const offset = 120; // Account for fixed header
        
        return {
          id: item.id,
          top: rect.top,
          isVisible: rect.top <= offset && rect.bottom >= 0
        };
      }).filter(Boolean);

      // Find the heading that's currently in view
      const visibleHeading = headings.find(heading => heading?.isVisible);
      
      // If no heading is visible, find the one closest to the top
      if (!visibleHeading && headings.length > 0) {
        const closestHeading = headings.reduce((closest, current) => {
          if (!current || !closest) return current || closest;
          return Math.abs(current.top) < Math.abs(closest.top) ? current : closest;
        });
        
        if (closestHeading) {
          setActiveId(closestHeading.id);
        }
      } else if (visibleHeading) {
        setActiveId(visibleHeading.id);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900">Contents</h3>
      </div>
      
      {/* TOC Navigation */}
      <nav className="space-y-1">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          
          return (
            <button
              key={index}
              onClick={() => handleScrollTo(item.id)}
              className={`block w-full text-left py-1.5 px-2 text-sm rounded hover:bg-gray-100 transition-colors duration-150 ${
                item.level === 1 ? 'font-medium text-gray-900' : 
                item.level === 2 ? 'font-normal text-gray-700 ml-3' : 
                'text-gray-600 ml-6'
              } ${
                isActive 
                  ? 'bg-gray-200 text-gray-900 font-medium' 
                  : 'hover:text-gray-900'
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
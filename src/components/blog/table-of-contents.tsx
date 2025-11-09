import Link from 'next/link';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <h3 className="text-base font-semibold text-gray-900">Contents</h3>
      </div>
      
      {/* TOC Navigation */}
      <nav className="space-y-1">
        {items.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            className={`block py-1.5 px-2 text-sm rounded hover:bg-gray-100 transition-colors duration-150 ${
              item.level === 1 ? 'font-medium text-gray-900' : 
              item.level === 2 ? 'font-normal text-gray-700 ml-3' : 
              'text-gray-600 ml-6'
            } hover:text-gray-900`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
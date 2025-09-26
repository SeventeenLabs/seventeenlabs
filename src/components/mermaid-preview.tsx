'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidPreviewProps {
  chart: string;
  className?: string;
}

export default function MermaidPreview({ chart, className = '' }: MermaidPreviewProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      fontSize: 16,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart.trim() || !elementRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        // Clear previous content
        elementRef.current.innerHTML = '';

        // Generate unique ID for this diagram
        const id = `mermaid-${Date.now()}`;

        // Validate and render the diagram
        const { svg } = await mermaid.render(id, chart);
        elementRef.current.innerHTML = svg;
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        setError(err.message || 'Failed to render Mermaid diagram');
        elementRef.current.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 class="text-red-800 font-semibold mb-2">Mermaid Syntax Error</h3>
            <p class="text-red-600 text-sm">${err.message || 'Invalid Mermaid syntax'}</p>
          </div>
        `;
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div 
        ref={elementRef} 
        className="w-full h-full overflow-auto bg-white border rounded-lg p-4"
        style={{ minHeight: '300px' }}
      />
      {error && (
        <div className="mt-2 text-sm text-red-600">
          <strong>Preview Error:</strong> Check your Mermaid syntax
        </div>
      )}
    </div>
  );
}
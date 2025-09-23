"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const loadMermaid = async () => {
      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        if (!mounted) return;

        // Initialize mermaid with N8N-like styling
        mermaid.initialize({ 
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#ffffff',
            primaryTextColor: '#374151',
            primaryBorderColor: '#d1d5db',
            lineColor: '#9ca3af',
            secondaryColor: '#f8fafc',
            tertiaryColor: '#ffffff',
            background: '#ffffff',
            mainBkg: '#ffffff',
            secondBkg: '#f8fafc',
            tertiaryBkg: '#ffffff',
            nodeBorder: '#d1d5db',
            clusterBkg: '#f8fafc',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#374151'
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 80,
            rankSpacing: 120,
            padding: 20
          }
        });

        if (diagramRef.current && chart) {
          // Clear previous content
          diagramRef.current.innerHTML = '';
          
          // Generate unique ID for this diagram
          const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Render the diagram
          const { svg } = await mermaid.render(id, chart);
          diagramRef.current.innerHTML = svg;
          
          // Style the SVG for N8N-like appearance
          const svgElement = diagramRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
            svgElement.style.maxWidth = 'none';
            svgElement.style.cursor = 'grab';
            
            // Apply N8N-like styles to nodes
            const nodes = svgElement.querySelectorAll('.node rect, .node circle, .node polygon');
            nodes.forEach((node: any) => {
              node.style.fill = '#ffffff';
              node.style.stroke = '#d1d5db';
              node.style.strokeWidth = '2px';
              node.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
            });

            // Style decision nodes (diamonds)
            const decisions = svgElement.querySelectorAll('.node polygon');
            decisions.forEach((node: any) => {
              node.style.fill = '#fef3c7';
              node.style.stroke = '#f59e0b';
            });

            // Style text - ensure it's dark and visible
            const texts = svgElement.querySelectorAll('.node text, .nodeLabel, .node .label');
            texts.forEach((text: any) => {
              text.style.fill = '#374151';
              text.style.fontSize = '14px';
              text.style.fontWeight = '500';
              text.style.color = '#374151';
              text.setAttribute('fill', '#374151');
            });

            // Style edges (connections)
            const edges = svgElement.querySelectorAll('.edge path');
            edges.forEach((edge: any) => {
              edge.style.stroke = '#9ca3af';
              edge.style.strokeWidth = '2px';
            });

            // Style edge labels
            const edgeLabels = svgElement.querySelectorAll('.edge text, .edgeLabel');
            edgeLabels.forEach((label: any) => {
              label.style.fill = '#6b7280';
              label.style.fontSize = '12px';
              label.style.color = '#6b7280';
              label.setAttribute('fill', '#6b7280');
            });
          }
          
          setIsLoaded(true);
        }
      } catch (err) {
        console.error('Error loading mermaid:', err);
        setError('Failed to load diagram');
      }
    };

    loadMermaid();

    return () => {
      mounted = false;
    };
  }, [chart]);

  // Mouse wheel zoom handler
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.2, Math.min(3, prev + delta)));
  }, []);

  // Mouse down handler for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      if (diagramRef.current) {
        diagramRef.current.style.cursor = 'grabbing';
      }
    }
  }, [pan]);

  // Mouse move handler for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (diagramRef.current) {
      diagramRef.current.style.cursor = 'grab';
    }
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, handleMouseUp]);

  // Update transform when zoom or pan changes
  useEffect(() => {
    if (diagramRef.current) {
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.transform = `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`;
        svgElement.style.transformOrigin = '0 0';
      }
    }
  }, [zoom, pan]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.2));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFitToView = () => {
    if (containerRef.current && diagramRef.current) {
      const container = containerRef.current;
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        const containerRect = container.getBoundingClientRect();
        const svgRect = svgElement.getBoundingClientRect();
        
        const scaleX = (containerRect.width - 40) / svgRect.width;
        const scaleY = (containerRect.height - 40) / svgRect.height;
        const newZoom = Math.min(scaleX, scaleY, 1);
        
        setZoom(newZoom);
        setPan({ x: 0, y: 0 });
      }
    }
  };

  if (error) {
    return (
      <div className={`p-4 border border-red-200 rounded-lg bg-red-50 ${className}`}>
        <p className="text-red-600 text-sm">Error loading diagram: {error}</p>
      </div>
    );
  }

  return (
    <div className={`mermaid-container relative bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
      {/* Zoom Controls - N8N Style */}
      {isLoaded && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFitToView}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            title="Fit to View"
          >
            <Maximize className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            title="Reset View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.2}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading workflow diagram...</span>
        </div>
      )}

      {/* Interactive Diagram Container */}
      <div 
        ref={containerRef}
        className={`${!isLoaded ? 'hidden' : ''} overflow-hidden relative`}
        style={{ 
          minHeight: '400px',
          maxHeight: '600px',
          width: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          ref={diagramRef}
          className="absolute top-0 left-0"
          style={{ 
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            userSelect: 'none'
          }}
        />
      </div>
      
      {/* Zoom Level and Instructions */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded px-3 py-1 text-xs text-gray-600 shadow-sm">
            {Math.round(zoom * 100)}%
          </div>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded px-3 py-1 text-xs text-gray-500 shadow-sm">
            Scroll to zoom • Drag to pan
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  isPreview?: boolean;
}

export default function MermaidDiagram({ chart, className = "", isPreview = false }: MermaidDiagramProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(true);
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
            
            // Apply workflow-specific styles to nodes based on their type
            const allNodes = svgElement.querySelectorAll('.node');
            
            // Parse the chart to find hiddenNode class assignments
            const hiddenNodeIds = new Set<string>();
            const classMatches = chart.match(/class\s+([^=\n]+)\s+hiddenNode/g);
            if (classMatches) {
              classMatches.forEach(match => {
                const nodeIds = match.replace(/class\s+/, '').replace(/\s+hiddenNode/, '').split(',');
                nodeIds.forEach(id => hiddenNodeIds.add(id.trim()));
              });
            }
            
            allNodes.forEach((nodeGroup: any, index: number) => {
              const nodeShape = nodeGroup.querySelector('rect, circle, polygon');
              const nodeText = nodeGroup.querySelector('text, .nodeLabel, .label');
              const nodeId = nodeGroup.id || '';
              const nodeClass = nodeGroup.className?.baseVal || '';
              
              // Extract clean node ID from the DOM (Mermaid adds prefixes)
              const cleanNodeId = nodeId.replace(/^flowchart-[^-]+-/, '').replace(/-\d+$/, '');
              
              if (nodeShape) {
                // Default styling for all nodes
                nodeShape.style.strokeWidth = '2px';
                nodeShape.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
                
                // Check if this node should be hidden (in preview mode)
                const isHiddenNode = isPreview && (
                  hiddenNodeIds.has(cleanNodeId) ||
                  nodeText?.textContent?.includes('...') || 
                  nodeText?.textContent?.includes('Hidden') ||
                  nodeText?.textContent?.includes('Premium') ||
                  nodeId.toLowerCase().includes('hidden') ||
                  nodeClass.toLowerCase().includes('hidden')
                );
                
                if (isHiddenNode) {
                  // Hidden/Premium nodes - Gray with dashed border
                  nodeShape.style.fill = '#f3f4f6';
                  nodeShape.style.stroke = '#9ca3af';
                  nodeShape.style.strokeDasharray = '5,5';
                  nodeShape.style.opacity = '0.7';
                } else if (nodeShape.tagName === 'polygon') {
                  // Decision nodes (diamonds) - Orange
                  nodeShape.style.fill = '#fed7aa';
                  nodeShape.style.stroke = '#f97316';
                } else if (nodeId.toLowerCase().includes('start') || nodeClass.toLowerCase().includes('start') || index === 0) {
                  // Start/Trigger nodes - Green
                  nodeShape.style.fill = '#dcfce7';
                  nodeShape.style.stroke = '#22c55e';
                } else if (nodeId.toLowerCase().includes('end') || nodeClass.toLowerCase().includes('end') || 
                          nodeId.toLowerCase().includes('finish') || nodeClass.toLowerCase().includes('finish')) {
                  // End/Result nodes - Purple
                  nodeShape.style.fill = '#e9d5ff';
                  nodeShape.style.stroke = '#a855f7';
                } else {
                  // Process Step nodes - Blue (default for middle nodes)
                  nodeShape.style.fill = '#dbeafe';
                  nodeShape.style.stroke = '#3b82f6';
                }
                
                // Style hidden node text differently
                if (isHiddenNode && nodeText) {
                  nodeText.style.fontStyle = 'italic';
                  nodeText.style.opacity = '0.6';
                }
              }
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
    // Reset to fit-to-view instead of zoom level 1
    setTimeout(() => {
      handleFitToView();
    }, 50);
  };

  const handleFitToView = useCallback(() => {
    if (containerRef.current && diagramRef.current) {
      const container = containerRef.current;
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        // Get container dimensions
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Get SVG viewBox or fallback to getBBox()
        const viewBox = svgElement.viewBox.baseVal;
        let svgWidth = viewBox.width;
        let svgHeight = viewBox.height;
        
        // If viewBox is empty, try to get the actual content dimensions
        if (!svgWidth || !svgHeight) {
          try {
            const bbox = svgElement.getBBox();
            svgWidth = bbox.width || 800;
            svgHeight = bbox.height || 600;
          } catch {
            svgWidth = 800;
            svgHeight = 600;
          }
        }
        
        // Calculate scale to fit with some padding
        const padding = 40;
        const scaleX = (containerWidth - padding) / svgWidth;
        const scaleY = (containerHeight - padding) / svgHeight;
        const newZoom = Math.min(scaleX, scaleY, 1);
        
        setZoom(newZoom);
        
        // Center the diagram at the new zoom level
        setTimeout(() => {
          const centerX = Math.max(0, (containerWidth - svgWidth * newZoom) / 2);
          const centerY = Math.max(0, (containerHeight - svgHeight * newZoom) / 2);
          setPan({ x: centerX, y: centerY });
        }, 50);
      }
    }
  }, []);

  // Re-fit to view on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        setTimeout(() => handleFitToView(), 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, handleFitToView]);

  // Separate effect for initial fit to view
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        handleFitToView();
        setTimeout(() => {
          handleFitToView();
        }, 200);
      }, 150);
    }
  }, [isLoaded, handleFitToView]);

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
          {!showLegend && (
            <button
              onClick={() => setShowLegend(true)}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-white hover:text-gray-700 transition-colors flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              Show Legend
            </button>
          )}
        </div>
      )}

      {/* Legend */}
      {isLoaded && showLegend && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg min-w-[180px]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Workflow Legend
              </h4>
              <button
                onClick={() => setShowLegend(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500 flex-shrink-0" style={{backgroundColor: '#dcfce7', borderColor: '#22c55e'}}></div>
                <span className="text-xs text-gray-600">Start/Trigger</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500 flex-shrink-0" style={{backgroundColor: '#dbeafe', borderColor: '#3b82f6'}}></div>
                <span className="text-xs text-gray-600">Process Step</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-orange-100 border-2 border-orange-500 flex-shrink-0" style={{backgroundColor: '#fed7aa', borderColor: '#f97316'}}></div>
                <span className="text-xs text-gray-600">Decision Point</span>
              </div>
              {isPreview && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-400 border-dashed flex-shrink-0"></div>
                    <span className="text-xs text-gray-600">Hidden Step</span>
                  </div>
                  <div className="pt-1 border-t border-gray-100">
                    <div className="text-xs text-amber-600 font-medium">🔒 Premium Content</div>
                  </div>
                </>
              )}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-500 flex-shrink-0" style={{backgroundColor: '#e9d5ff', borderColor: '#a855f7'}}></div>
                <span className="text-xs text-gray-600">End/Result</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
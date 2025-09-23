"use client";

import { motion } from "framer-motion";
import { Globe, Code, Workflow, Bot, MessageSquare, Brain } from "lucide-react";
import React from "react";

type Node = {
  id: string;
  x: number; // 0..100 (% of width)
  y: number; // 0..100 (% of height)
  icon: React.ComponentType<{ className?: string }>;
};

// Simple, responsive SVG workflow inspired by the Mercury AI layout.
// Renders three animated lanes and circular nodes connected by lines.
export function HeroWorkflow({ className = "", minimal = false }: { className?: string; minimal?: boolean }) {
  // Node positions in percentage for responsiveness
  const nodes: Node[] = [
    { id: "n1", x: 12, y: 20, icon: Globe },
    { id: "n2", x: 38, y: 20, icon: Code },
    { id: "n3", x: 64, y: 20, icon: Brain },

    { id: "n4", x: 22, y: 50, icon: Workflow },
    { id: "n5", x: 58, y: 50, icon: MessageSquare },

    { id: "n6", x: 16, y: 80, icon: Bot },
    { id: "n7", x: 42, y: 80, icon: Globe },
    { id: "n8", x: 78, y: 80, icon: MessageSquare },
  ];

  return (
    <div className={"relative " + className}>
      {/* Optional backdrop gradient for non-minimal variant */}
      {!minimal && (
        <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-[32px] blur-3xl" />
      )}

      <div className={
        minimal
          ? "relative rounded-2xl border border-slate-200 bg-white"
          : "relative rounded-[24px] border border-gray-200 bg-white/70 backdrop-blur-md shadow-xl"
      }>
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Lanes */}
          {[20, 50, 80].map((y, i) => (
            <motion.path
              key={y}
              d={`M 2 ${y} C 15 ${y} 85 ${y} 98 ${y}`}
              fill="none"
              stroke={minimal ? "#E5E7EB" : "#E5E7EB"}
              strokeWidth={0.6}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.15 }}
            />
          ))}

          {/* Connecting lines between sequential nodes on the same row */}
          {[
            ["n1", "n2"],
            ["n2", "n3"],
            ["n4", "n5"],
            ["n6", "n7"],
            ["n7", "n8"],
          ].map(([a, b], idx) => {
            const A = nodes.find((n) => n.id === a)!;
            const B = nodes.find((n) => n.id === b)!;
            return (
              <motion.line
                key={a + b}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke={minimal ? "#E5E7EB" : "#C7D2FE"}
                strokeWidth={0.6}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + idx * 0.1 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((n, idx) => {
            const Icon = n.icon;
            return (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                <motion.circle
                  r={4.8}
                  fill="white"
                  stroke="#E5E7EB"
                  strokeWidth={0.6}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                />
                {/* inner icon */}
                <foreignObject x={-3.2} y={-3.2} width={6.4} height={6.4}>
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon className={minimal ? "h-3.5 w-3.5 text-slate-600" : "h-3.5 w-3.5 text-slate-700"} />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default HeroWorkflow;

"use client";

import React, { useState } from "react";
import Image from "next/image";

// Global network nodes (coordinates in % of container width/height)
const nodes = [
  { id: "la", name: "Los Angeles", x: 18, y: 44, role: "Supplier Hub" },
  { id: "ny", name: "New York", x: 28, y: 38, role: "Logistics Hub" },
  { id: "sp", name: "São Paulo", x: 38, y: 72, role: "Supplier Hub" },
  { id: "ld", name: "London", x: 50, y: 30, role: "Matchmaking Node" },
  { id: "am", name: "Amsterdam", x: 52, y: 30, role: "Logistics Node" },
  { id: "cr", name: "Cairo", x: 58, y: 48, role: "Supplier Hub" },
  { id: "db", name: "Dubai", x: 62, y: 50, role: "Logistics Node" },
  { id: "sh", name: "Shanghai", x: 78, y: 40, role: "Manufacturing Partner" },
  { id: "tk", name: "Tokyo", x: 82, y: 38, role: "Technology Partner", highlighted: true },
  { id: "sd", name: "Sydney", x: 88, y: 80, role: "Supplier Hub" }
];

// Helper to construct curved Quadratic Bezier path string
const getCurvePath = (x1, y1, x2, y2) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const controlY = my - Math.abs(x1 - x2) * 0.18;
  return `M ${x1} ${y1} Q ${mx} ${controlY} ${x2} ${y2}`;
};

const connections = [
  { from: "ny", to: "ld" },
  { from: "la", to: "tk" },
  { from: "ld", to: "am" },
  { from: "am", to: "cr" },
  { from: "cr", to: "db" },
  { from: "db", to: "sh" },
  { from: "sh", to: "tk" },
  { from: "tk", to: "sd" },
  { from: "ny", to: "sp" },
  { from: "sp", to: "sd" }
];

export default function DemoMap() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeCircle, setActiveCircle] = useState(2); // The 3rd circle active by default

  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#222325] select-none group/map overflow-hidden">
      {/* Base map image */}
      <Image
        src="/world-map.png"
        alt="Wulfara Global Network Map"
        fill
        className="object-cover opacity-85 transition-transform duration-700 group-hover/map:scale-[1.01] filter grayscale brightness-95"
        priority
      />

      {/* Grid Overlay to match screenshot design style */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4%_6%] pointer-events-none"></div>

      {/* High-tech parameter readouts at the top */}
      <div className="absolute top-3 left-4 right-14 flex justify-between text-[8px] sm:text-[9px] text-slate-400 font-mono tracking-widest pointer-events-none opacity-80 uppercase">
        <span>sys.loc // active</span>
        <span>net.flow // 98.4%</span>
        <span>node.count // 10</span>
        <span className="hidden sm:inline">sync // 2026.07</span>
      </div>

      {/* Stacked map controls on the top-right */}
      <div className="absolute top-3 right-4 flex flex-col gap-1.5 z-20">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveCircle(idx)}
            className={`w-2.5 h-2.5 rounded-full border transition-all cursor-pointer ${
              activeCircle === idx
                ? "bg-[#dca12f] border-[#dca12f] shadow-[0_0_8px_#dca12f]"
                : "border-slate-500 hover:border-slate-300 bg-transparent"
            }`}
            aria-label={`Map style option ${idx + 1}`}
          />
        ))}
      </div>

      {/* Interactive SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Animated Connection Lines */}
        {connections.map((conn, idx) => {
          const start = nodes.find((n) => n.id === conn.from);
          const end = nodes.find((n) => n.id === conn.to);
          if (!start || !end) return null;

          const pathD = getCurvePath(start.x, start.y, end.x, end.y);

          return (
            <g key={idx}>
              {/* Curve background */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.3"
                strokeOpacity="0.1"
              />
              {/* Dotted curves representing connection paths */}
              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.25"
                strokeDasharray="1.5, 2.5"
                strokeOpacity="0.4"
                className="animate-flow-dash"
              />
            </g>
          );
        })}

        {/* Node Circles */}
        {nodes.map((node) => {
          const isHovered = hoveredNode?.id === node.id;
          return (
            <g key={node.id}>
              {/* Outer Pulsing Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 4.5 : 3.5}
                fill="none"
                stroke={node.highlighted ? "#dca12f" : "#ffffff"}
                strokeWidth="0.4"
                className="animate-pulse origin-center"
                style={{
                  transformOrigin: `${node.x}% ${node.y}%`
                }}
              />

              {/* Core Active Dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r="0.8"
                fill={node.highlighted ? "#dca12f" : "#ffffff"}
                stroke={node.highlighted ? "#dca12f" : "#ffffff"}
                strokeWidth="0.2"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Hover Areas (Invisible DOM elements for perfect hover response) */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer z-20"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
        />
      ))}

      {/* Tooltip Popup */}
      {hoveredNode && (
        <div
          className="absolute z-30 transform -translate-x-1/2 -translate-y-full bg-[#162235]/95 border border-[#dca12f]/80 text-white px-3 py-1.5 rounded shadow-2xl text-xs flex flex-col gap-0.5 pointer-events-none transition-all duration-200 animate-fadeIn"
          style={{
            left: `${hoveredNode.x}%`,
            top: `${hoveredNode.y - 3}%`
          }}
        >
          <span className="font-bold text-slate-100">{hoveredNode.name}</span>
          <span className="text-[10px] text-[#00f0ff] uppercase font-semibold">{hoveredNode.role}</span>
        </div>
      )}

      {/* CSS Animation defined locally for dash offset flow */}
      <style jsx>{`
        .animate-flow-dash {
          animation: flow 24s linear infinite;
        }
        @keyframes flow {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}

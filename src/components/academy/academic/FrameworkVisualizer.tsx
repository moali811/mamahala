'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { FrameworkDiagram } from '@/types';
import { t } from '@/lib/academy-helpers';
import { ease, drawLine, viewportOnce } from '@/lib/animations';

interface FrameworkVisualizerProps {
  diagram: FrameworkDiagram;
  isRTL: boolean;
  color?: string;
  interactive?: boolean;
  className?: string;
}

export default function FrameworkVisualizer({
  diagram,
  isRTL,
  color = '#7A3B5E',
  interactive = true,
  className = '',
}: FrameworkVisualizerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const title = t(diagram.titleEn, diagram.titleAr, isRTL);

  const renderTriangle = () => {
    const svgSize = 320;
    const cx = svgSize / 2;
    const padding = 40;
    // Equilateral triangle vertices
    const top = { x: cx, y: padding };
    const bl = { x: padding, y: svgSize - padding };
    const br = { x: svgSize - padding, y: svgSize - padding };
    const positions = [top, bl, br];

    return (
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[320px] mx-auto">
        {/* Connection lines */}
        {diagram.connections?.map((conn, i) => {
          const fromNode = diagram.nodes.find(n => n.id === conn.from);
          const toNode = diagram.nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          const fi = diagram.nodes.indexOf(fromNode);
          const ti = diagram.nodes.indexOf(toNode);
          const from = positions[fi] || positions[0];
          const to = positions[ti] || positions[0];
          return (
            <motion.line
              key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={`${color}30`}
              strokeWidth={2}
              variants={drawLine}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
          );
        })}

        {/* Nodes */}
        {diagram.nodes.map((node, i) => {
          const pos = positions[i] || positions[0];
          const isSelected = selectedNode === node.id;
          const nodeColor = node.color || color;
          return (
            <g key={node.id}>
              <motion.circle
                cx={pos.x} cy={pos.y} r={isSelected ? 32 : 28}
                fill={`${nodeColor}15`}
                stroke={nodeColor}
                strokeWidth={isSelected ? 3 : 2}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15, ease }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
              />
              <text
                x={pos.x} y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-semibold pointer-events-none"
                fill={nodeColor}
              >
                {t(node.labelEn, node.labelAr, isRTL)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderWheel = () => {
    const svgSize = 320;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const radius = 110;
    const count = diagram.nodes.length;

    return (
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[320px] mx-auto">
        {/* Center circle */}
        <motion.circle
          cx={cx} cy={cy} r={30}
          fill={`${color}10`} stroke={color} strokeWidth={2}
          initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease }}
        />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="text-[7px] font-bold pointer-events-none" fill={color}>
          <tspan x={cx} dy="-0.4em">{title.split(' ').slice(0, 2).join(' ')}</tspan>
          {title.split(' ').length > 2 && <tspan x={cx} dy="1.1em">{title.split(' ').slice(2, 4).join(' ')}</tspan>}
        </text>

        {/* Nodes around the wheel */}
        {diagram.nodes.map((node, i) => {
          const angle = (2 * Math.PI * i) / count - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          const isSelected = selectedNode === node.id;
          const nodeColor = node.color || color;
          const label = t(node.labelEn, node.labelAr, isRTL);
          const words = label.split(' ');
          const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
          const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');

          return (
            <g key={node.id}>
              <motion.line
                x1={cx} y1={cy} x2={x} y2={y}
                stroke={`${color}20`} strokeWidth={1}
                variants={drawLine}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.1 }}
              />
              <motion.circle
                cx={x} cy={y} r={isSelected ? 34 : 28}
                fill={`${nodeColor}12`}
                stroke={nodeColor}
                strokeWidth={isSelected ? 3 : 1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
              />
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[8px] font-medium pointer-events-none"
                fill={nodeColor}
              >
                <tspan x={x} dy={line2 ? '-0.4em' : '0'}>{line1}</tspan>
                {line2 && <tspan x={x} dy="1.1em">{line2}</tspan>}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderQuadrant = () => {
    const svgSize = 340;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const halfW = 130;
    const halfH = 120;

    // Position nodes in quadrants
    const quadrantPos = [
      { x: cx - halfW / 2, y: cy - halfH / 2 },
      { x: cx + halfW / 2, y: cy - halfH / 2 },
      { x: cx - halfW / 2, y: cy + halfH / 2 },
      { x: cx + halfW / 2, y: cy + halfH / 2 },
    ];

    return (
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[340px] mx-auto">
        {/* Grid lines */}
        <motion.line x1={cx} y1={cy - halfH - 20} x2={cx} y2={cy + halfH + 20} stroke={`${color}20`} strokeWidth={1.5} variants={drawLine} initial="hidden" animate={isInView ? 'visible' : 'hidden'} />
        <motion.line x1={cx - halfW - 20} y1={cy} x2={cx + halfW + 20} y2={cy} stroke={`${color}20`} strokeWidth={1.5} variants={drawLine} initial="hidden" animate={isInView ? 'visible' : 'hidden'} />

        {/* Quadrant nodes */}
        {diagram.nodes.slice(0, 4).map((node, i) => {
          const pos = quadrantPos[i];
          const isSelected = selectedNode === node.id;
          const nodeColor = node.color || color;
          return (
            <g key={node.id}>
              <motion.rect
                x={pos.x - 45} y={pos.y - 25}
                width={90} height={50}
                rx={12}
                fill={`${nodeColor}10`}
                stroke={isSelected ? nodeColor : `${nodeColor}40`}
                strokeWidth={isSelected ? 2 : 1}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12, ease }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
              />
              <text
                x={pos.x} y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-semibold pointer-events-none"
                fill={nodeColor}
              >
                {t(node.labelEn, node.labelAr, isRTL)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderIceberg = () => {
    const svgSize = 320;
    const waterY = svgSize * 0.4;

    return (
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-[320px] mx-auto">
        {/* Water line */}
        <motion.line
          x1={0} y1={waterY} x2={svgSize} y2={waterY}
          stroke="#5B8AC440" strokeWidth={1.5} strokeDasharray="6 4"
          variants={drawLine} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
        />
        {/* Water fill */}
        <rect x={0} y={waterY} width={svgSize} height={svgSize - waterY} fill="#5B8AC408" />

        {/* Nodes */}
        {diagram.nodes.map((node, i) => {
          const pct = node.position;
          const x = (pct.x / 100) * svgSize;
          const y = (pct.y / 100) * svgSize;
          const isAbove = y < waterY;
          const isSelected = selectedNode === node.id;
          const nodeColor = node.color || (isAbove ? '#C8A97D' : color);

          return (
            <g key={node.id}>
              <motion.rect
                x={x - 50} y={y - 16}
                width={100} height={32}
                rx={8}
                fill={`${nodeColor}12`}
                stroke={isSelected ? nodeColor : `${nodeColor}30`}
                strokeWidth={isSelected ? 2 : 1}
                initial={{ opacity: 0, y: isAbove ? -10 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
              />
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] font-medium pointer-events-none"
                fill={nodeColor}
              >
                {t(node.labelEn, node.labelAr, isRTL)}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        <text x={10} y={waterY - 10} className="text-[9px] font-medium" fill="#C8A97D">Visible</text>
        <text x={10} y={waterY + 18} className="text-[9px] font-medium" fill="#5B8AC4">Below the surface</text>
      </svg>
    );
  };

  const renderDefault = () => {
    // Generic node-based layout using position percentages
    return (
      <svg viewBox="0 0 320 260" className="w-full max-w-[320px] mx-auto">
        {diagram.connections?.map((conn, i) => {
          const fromNode = diagram.nodes.find(n => n.id === conn.from);
          const toNode = diagram.nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          return (
            <motion.line
              key={i}
              x1={(fromNode.position.x / 100) * 320}
              y1={(fromNode.position.y / 100) * 260}
              x2={(toNode.position.x / 100) * 320}
              y2={(toNode.position.y / 100) * 260}
              stroke={`${color}25`} strokeWidth={1.5}
              variants={drawLine} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
            />
          );
        })}
        {diagram.nodes.map((node, i) => {
          const x = (node.position.x / 100) * 320;
          const y = (node.position.y / 100) * 260;
          const isSelected = selectedNode === node.id;
          const nodeColor = node.color || color;
          return (
            <g key={node.id}>
              <motion.circle
                cx={x} cy={y} r={isSelected ? 28 : 24}
                fill={`${nodeColor}12`} stroke={nodeColor} strokeWidth={isSelected ? 2.5 : 1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
              />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-semibold pointer-events-none" fill={nodeColor}>
                {t(node.labelEn, node.labelAr, isRTL)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderers: Record<string, () => React.ReactNode> = {
    triangle: renderTriangle,
    wheel: renderWheel,
    quadrant: renderQuadrant,
    iceberg: renderIceberg,
    cycle: renderWheel,
    spectrum: renderDefault,
    flowchart: renderDefault,
  };

  const selectedNodeData = diagram.nodes.find(n => n.id === selectedNode);

  return (
    <div ref={ref} className={`rounded-2xl border border-[#F3EFE8] bg-white p-5 sm:p-6 my-6 ${className}`}>
      <h4 className="text-sm font-semibold text-[#2D2A33] mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h4>

      {(renderers[diagram.type] || renderDefault)()}

      {/* Node detail popover */}
      <AnimatePresence>
        {selectedNodeData && interactive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease }}
            className="mt-4 p-4 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2]"
          >
            <h5 className="text-sm font-bold text-[#2D2A33] mb-1">
              {t(selectedNodeData.labelEn, selectedNodeData.labelAr, isRTL)}
            </h5>
            <p className="text-sm text-[#4A4A5C] leading-relaxed">
              {t(selectedNodeData.descriptionEn, selectedNodeData.descriptionAr, isRTL)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {interactive && !selectedNode && (
        <p className="text-center text-[10px] text-[#8E8E9F] mt-3">
          {isRTL ? 'اضغط على أي عنصر لمعرفة المزيد' : 'Click any element to learn more'}
        </p>
      )}
    </div>
  );
}

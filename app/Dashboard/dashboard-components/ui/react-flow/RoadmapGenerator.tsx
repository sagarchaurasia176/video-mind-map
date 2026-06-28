"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  NodeProps,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
}

interface RoadmapEdge {
  source: string;
  target: string;
}

interface Roadmap {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

interface RoadMapGenerateFlowProps {
  roadmap: Roadmap;
}

function RoadmapNodeCard({ data, selected }: NodeProps) {
  const { title, description, isRoot } = data as {
    title: string;
    description: string;
    isRoot: boolean;
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: selected
          ? "2px solid #6366f1"
          : isRoot
            ? "2px solid #111827"
            : "1.5px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px 20px",
        width: "260px",
        boxShadow: selected
          ? "0 0 0 4px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.10)"
          : isRoot
            ? "0 4px 24px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        fontFamily: "Inter, system-ui, sans-serif",
        cursor: "default",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#6366f1", width: 8, height: 8, border: "2px solid #fff" }}
      />

      {/* Step badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: isRoot ? "#111827" : "#f3f4f6",
          color: isRoot ? "#ffffff" : "#6b7280",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "2px 8px",
          borderRadius: "999px",
          marginBottom: "10px",
        }}
      >
        {isRoot ? "🎯 Start" : "📍 Step"}
      </div>

      {/* Title */}
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "13px",
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.4,
        }}
      >
        {title}
      </p>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: "11.5px",
          color: "#6b7280",
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {description}
      </p>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#6366f1", width: 8, height: 8, border: "2px solid #fff" }}
      />
    </div>
  );
}

const nodeTypes = { roadmapNode: RoadmapNodeCard };

// ─── Layout helper (simple top-down tree layout) ──────────────────────────────

function buildLayout(
  rawNodes: RoadmapNode[],
  rawEdges: RoadmapEdge[],
) {
  // Find root nodes (no incoming edges)
  const hasParent = new Set(rawEdges.map((e) => e.target));
  const rootIds = rawNodes.filter((n) => !hasParent.has(n.id)).map((n) => n.id);

  // BFS to assign levels
  const level: Record<string, number> = {};
  const queue = [...rootIds];
  rootIds.forEach((id) => (level[id] = 0));

  while (queue.length) {
    const cur = queue.shift()!;
    const children = rawEdges
      .filter((e) => e.source === cur)
      .map((e) => e.target);
    children.forEach((child) => {
      if (level[child] === undefined) {
        level[child] = (level[cur] ?? 0) + 1;
        queue.push(child);
      }
    });
  }

  // Group nodes by level
  const byLevel: Record<number, string[]> = {};
  rawNodes.forEach((n) => {
    const l = level[n.id] ?? 0;
    if (!byLevel[l]) byLevel[l] = [];
    byLevel[l].push(n.id);
  });

  const NODE_W = 280;
  const NODE_H = 160;
  const H_GAP = 40;
  const V_GAP = 80;

  const positions: Record<string, { x: number; y: number }> = {};

  Object.entries(byLevel).forEach(([lvl, ids]) => {
    const y = Number(lvl) * (NODE_H + V_GAP);
    const totalW = ids.length * NODE_W + (ids.length - 1) * H_GAP;
    const startX = -totalW / 2;
    ids.forEach((id, i) => {
      positions[id] = { x: startX + i * (NODE_W + H_GAP), y };
    });
  });

  const flowNodes = rawNodes.map((n) => ({
    id: n.id,
    type: "roadmapNode",
    position: positions[n.id] ?? { x: 0, y: 0 },
    data: {
      title: n.title,
      description: n.description,
      isRoot: rootIds.includes(n.id),
    },
  }));

  const flowEdges = rawEdges.map((e, i) => ({
    id: `e-${e.source}-${e.target}-${i}`,
    source: e.source,
    target: e.target,
    type: "smoothstep",
    animated: false,
    style: { stroke: "#d1d5db", strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed" as const,
      color: "#9ca3af",
      width: 16,
      height: 16,
    },
  }));

  return { flowNodes, flowEdges };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RoadMapGenerateFlow({ roadmap }: RoadMapGenerateFlowProps) {
  const { flowNodes, flowEdges } = useMemo(
    () => buildLayout(roadmap.nodes, roadmap.edges),
    [roadmap],
  );

  const [nodes, setNodes] = useState(flowNodes);
  const [edges, setEdges] = useState(flowEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((n) => applyNodeChanges(changes, n)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((e) => applyEdgeChanges(changes, e)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((e) => addEdge(params, e)),
    [],
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1.5px solid #e5e7eb",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#111827",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Learning Roadmap
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#6b7280",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {roadmap.nodes.length} topics · {roadmap.edges.length} connections
        </span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        style={{ background: "#ffffff" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#f0f0f0"
        />
        <Controls
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        />
        <MiniMap
          nodeColor={() => "#6366f1"}
          maskColor="rgba(255,255,255,0.85)"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>
    </div>
  );
}
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Target, GitBranch, Maximize2, Minus, Plus, Move } from "lucide-react";
import { CATS, EdgeAnchor , EDGES , NODES , Node} from "./tree-nodes/Node";

const CANVAS_W = 1400;
const CANVAS_H = 760;
function edgePath(a: EdgeAnchor, b: EdgeAnchor): string {
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h;
  const bx = b.x + b.w / 2;
  const by = b.y;

  if (Math.abs(ax - bx) < 2) {
    return `M ${ax} ${ay} L ${bx} ${by}`;
  }
  const midY = ay + (by - ay) / 2;
  const r = 14;
  const dir = bx > ax ? 1 : -1;
  return `M ${ax} ${ay}
          L ${ax} ${midY - r}
          Q ${ax} ${midY} ${ax + dir * r} ${midY}
          L ${bx - dir * r} ${midY}
          Q ${bx} ${midY} ${bx} ${midY + r}
          L ${bx} ${by}`;
}

interface NodeCardProps {
  node: Node;
  pos: { x: number; y: number };
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  active: boolean;
  height: number | undefined;
}

function NodeCard({ node, pos, onPointerDown, active }: NodeCardProps) {
  const c = CATS[node.cat];
  const isRoot = node.cat === "root";
  const isStep = node.cat === "step";

  return (
    <div
      onPointerDown={(e) => onPointerDown(e, node.id)}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: node.w,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        zIndex: active ? 30 : 10,
      }}
      className="group"
    >
      <div
        style={{
          background: c.fill,
          border: `${isRoot ? 2 : 1.5}px solid ${c.border}`,
          borderRadius: isRoot ? 16 : 12,
          boxShadow: active
            ? "0 18px 38px -12px rgba(31,27,46,0.32), 0 0 0 3px rgba(109,91,208,0.18)"
            : "0 1px 2px rgba(16,15,30,0.04), 0 8px 20px -10px rgba(16,15,30,0.10)",
          transition: "box-shadow 160ms ease",
          padding: isRoot ? "18px 20px" : isStep ? "14px 16px" : "13px 15px",
        }}
        className="hover:shadow-lg"
      >
        {isRoot && (
          <>
            <span
              style={{ background: c.chip, color: c.text }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-full mb-3 font-mono"
            >
              {node.badge}
            </span>
            <p className="text-[15px] font-bold text-white leading-snug">
              {node.title}
            </p>
            <p className="text-[12px] text-white/60 mt-1.5">{node.body}</p>
          </>
        )}

        {isStep && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span
                style={{ color: c.accent }}
                className="text-[10px] font-mono font-bold tracking-widest"
              >
                ● {node.step}
              </span>
            </div>
            <p className="text-[14px] font-bold text-[#1F1B2E] leading-snug">
              {node.title}
            </p>
            <p className="text-[12px] text-[#5B5570] mt-1.5 leading-relaxed">
              {node.body}
            </p>
          </>
        )}

        {!isRoot && !isStep && (
          <>
            <span
              style={{ color: c.tag, background: `${c.border}14` }}
              className="inline-block text-[9.5px] font-mono font-extrabold tracking-widest px-2 py-[3px] rounded-md mb-2"
            >
              {node.tag}
            </span>
            <p
              style={{ color: c.text }}
              className="text-[13px] font-bold leading-snug"
            >
              {node.title}
            </p>
            <p
              style={{ color: c.text }}
              className="text-[11.5px] mt-1.5 leading-relaxed opacity-80"
            >
              {node.body}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

interface Position {
  x: number;
  y: number;
}

interface ViewState {
  x: number;
  y: number;
  scale: number;
}

export default function KnowledgeStructureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    const init: Record<string, Position> = {};
    NODES.forEach((n) => (init[n.id] = { x: n.x, y: n.y }));
    return init;
  });

  const [view, setView] = useState<ViewState>({ x: 0, y: 0, scale: 0.78 });
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [panState, setPanState] = useState<boolean>(false);
  const [, setPulse] = useState(0);

  useEffect(() => {
    const h: Record<string, number> = {};
    Object.entries(measureRefs.current).forEach(([id, el]) => {
      if (el) h[id] = el.offsetHeight;
    });
    setHeights(h);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 1000), 35);
    return () => clearInterval(id);
  }, []);

  const nodesById = useMemo(() => {
    const map: Record<string, Node> = {};
    NODES.forEach((n) => (map[n.id] = n));
    return map;
  }, []);

  const handleNodePointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const orig = positions[id];
      setDragNode(id);

      const move = (ev: PointerEvent) => {
        const dx = (ev.clientX - startX) / view.scale;
        const dy = (ev.clientY - startY) / view.scale;
        setPositions((prev) => ({
          ...prev,
          [id]: { x: orig.x + dx, y: orig.y + dy },
        }));
      };
      const up = () => {
        setDragNode(null);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [positions, view.scale],
  );

  const handleCanvasPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget && !e.currentTarget.contains(e.target as any))
        return;
      if ((e.target as HTMLElement).closest("[data-node-card]")) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const orig = { x: view.x, y: view.y };
      setPanState(true);

      const move = (ev: PointerEvent) => {
        setView((v) => ({
          ...v,
          x: orig.x + (ev.clientX - startX),
          y: orig.y + (ev.clientY - startY),
        }));
      };
      const up = () => {
        setPanState(false);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [view.x, view.y],
  );

  const zoom = (dir: number) => {
    setView((v) => {
      const next = Math.min(1.4, Math.max(0.4, v.scale + dir * 0.12));
      return { ...v, scale: next };
    });
  };

  const resetView = () => setView({ x: 0, y: 0, scale: 0.78 });

  const edgeGeo = useMemo(() => {
    return EDGES.map(([fromId, toId]) => {
      const from = nodesById[fromId];
      const to = nodesById[toId];
      const fp = positions[fromId];
      const tp = positions[toId];
      const a: EdgeAnchor = { x: fp.x, y: fp.y, w: from.w, h: heights[fromId] || 90 };
      const b: EdgeAnchor = { x: tp.x, y: tp.y, w: to.w, h: heights[toId] || 90 };
      return { id: `${fromId}-${toId}`, d: edgePath(a, b), from, to };
    });
  }, [positions, heights, nodesById]);

  return (
    <section className="py-24 px-4 bg-[#F7F6FB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 px-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1B2E]/5 text-[#6D5BD0] text-[11px] font-mono font-bold tracking-widest mb-5">
            <GitBranch size={12} strokeWidth={2.5} />
            CONCEPT GRAPH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#16151F] mb-4 tracking-tight">
            See How Concepts Connect
          </h2>
          <p className="text-[15px] text-[#5B5570] max-w-xl mx-auto">
            Drag nodes, pan the canvas, and zoom in — this is a live map of how
            one topic actually branches into prerequisites, related skills, and
            practice.
          </p>
        </div>

        <div className="max-w-6xl mx-auto ">
          <div className="bg-white border p-4 border-[#E7E4F2] rounded-2xl shadow-[0_1px_2px_rgba(16,15,30,0.04),0_20px_50px_-24px_rgba(16,15,30,0.18)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#EFEDF7] bg-white/80">
              <div className="flex items-center gap-2">
                <Target
                  size={14}
                  className="text-[#6D5BD0]"
                  strokeWidth={2.5}
                />
                <span className="text-[12.5px] font-semibold text-[#1F1B2E]">
                  Neural Networks Roadmap
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => zoom(-1)}
                  aria-label="Zoom out"
                  className="w-8 h-8 grid place-items-center rounded-lg border border-[#E7E4F2] text-[#5B5570] hover:bg-[#F7F6FB] hover:text-[#1F1B2E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6D5BD0] focus-visible:outline-offset-1"
                >
                  <Minus size={14} />
                </button>
                <span className="text-[11px] font-mono text-[#8B85A3] w-10 text-center tabular-nums">
                  {Math.round(view.scale * 100)}%
                </span>
                <button
                  onClick={() => zoom(1)}
                  aria-label="Zoom in"
                  className="w-8 h-8 grid place-items-center rounded-lg border border-[#E7E4F2] text-[#5B5570] hover:bg-[#F7F6FB] hover:text-[#1F1B2E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6D5BD0] focus-visible:outline-offset-1"
                >
                  <Plus size={14} />
                </button>
                <div className="w-px h-5 bg-[#EFEDF7] mx-1" />
                <button
                  onClick={resetView}
                  aria-label="Reset view"
                  className="w-8 h-8 grid place-items-center rounded-lg border border-[#E7E4F2] text-[#5B5570] hover:bg-[#F7F6FB] hover:text-[#1F1B2E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6D5BD0] focus-visible:outline-offset-1"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-2.5 border-b border-[#EFEDF7] bg-[#FBFAFD]">
              {[
                { label: "Step", color: CATS.step.accent },
                { label: "Prerequisite", color: CATS.prereq.tag },
                { label: "Core skill", color: CATS.core.tag },
                { label: "Learning path", color: CATS.path.tag },
                { label: "Practice", color: CATS.practice.tag },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: l.color }}
                  />
                  <span className="text-[11px] text-[#5B5570] font-medium">
                    {l.label}
                  </span>
                </div>
              ))}
              <span className="ml-auto flex items-center gap-1.5 text-[10.5px] text-[#A8A2BC] font-mono">
                <Move size={11} /> drag canvas · drag nodes
              </span>
            </div>

            <div
              ref={containerRef}
              onPointerDown={handleCanvasPointerDown}
              style={{
                height: 600,
                cursor: panState ? "grabbing" : "grab",
                backgroundImage:
                  "radial-gradient(circle, #E7E4F2 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                backgroundPosition: `${view.x % 22}px ${view.y % 22}px`,
              }}
              className="relative overflow-hidden bg-[#FCFBFE]"
            >
              <div
                style={{
                  position: "absolute",
                  transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                  transformOrigin: "0 0",
                  width: CANVAS_W,
                  height: CANVAS_H,
                  left: "50%",
                  marginLeft: -CANVAS_W * 0.42,
                  top: 0,
                }}
              >
                <svg
                  width={CANVAS_W}
                  height={CANVAS_H}
                  className="absolute inset-0 pointer-events-none"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="4"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" fill="#C7C2DC" />
                    </marker>
                  </defs>
                  {edgeGeo.map((e) => (
                    <g key={e.id}>
                      <path
                        d={e.d}
                        fill="none"
                        stroke="#D9D5E8"
                        strokeWidth={1.75}
                        markerEnd="url(#arrow)"
                      />
                      <circle r="3.2" fill="#6D5BD0">
                        <animateMotion
                          dur="2.6s"
                          repeatCount="indefinite"
                          path={e.d}
                        />
                      </circle>
                    </g>
                  ))}
                </svg>

                {NODES.map((n) => (
                  <div
                    key={n.id}
                    data-node-card
                    ref={(el) => { measureRefs.current[n.id] = el; }}
                  >
                    <NodeCard
                      node={n}
                      pos={positions[n.id]}
                      onPointerDown={handleNodePointerDown}
                      active={dragNode === n.id}
                      height={heights[n.id]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-10">
          <p className="text-[15px] text-[#5B5570] leading-relaxed">
            Understanding relationships between concepts often makes complex
            subjects easier to study than consuming videos individually. A
            roadmap shows you the structure — what comes first, what builds on
            what, and where you are in the learning journey.
          </p>
        </div>
      </div>
    </section>
  );
}
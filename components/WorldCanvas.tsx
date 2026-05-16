"use client";
import { useMemo, useState } from "react";
import ReactFlow, { Background, Connection, Controls, Edge, MarkerType, Node } from "reactflow";
import "reactflow/dist/style.css";
import { useWorldStore } from "@/store/worldStore";
import { NodeCard } from "@/components/NodeCard";
import { RelationshipModal } from "@/components/RelationshipModal";
import { BottomToolbar } from "@/components/BottomToolbar";

export function WorldCanvas({ query }: { query: string }) {
  const { worlds, activeWorldId, upsertEdge, upsertNode, addNodeAtCenter, loadSample, removeEdge, removeNode } = useWorldStore();
  const world = worlds.find((w) => w.id === activeWorldId);
  const [selection, setSelection] = useState<{ nodeId?: string; edgeId?: string }>({});
  const [pending, setPending] = useState<Connection | null>(null);
  const nodes = useMemo<Node[]>(() => (world?.nodes ?? []).filter((n) => [n.name, n.type, n.description, n.lore].join(" ").toLowerCase().includes(query.toLowerCase())).map((n) => ({ id: n.id, type: "card", position: n.position, data: n })), [world, query]);
  const edges = useMemo<Edge[]>(() => (world?.edges ?? []).map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.relationshipType, type: "default", markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" }, style: { stroke: "#94a3b8", strokeWidth: 1.4 }, data: e })), [world]);
  if (!world) return <div className="grid h-full place-items-center text-slate-500">Create a world to begin.</div>;
  return <div className="relative h-[calc(100vh-56px)] flex-1">
    {world.nodes.length === 0 && <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-xl border bg-white/95 p-4 text-center shadow-soft"><p>Start building your world</p><button className="mt-2 rounded border px-3 py-1" onClick={loadSample}>Load Beyonders sample world</button></div>}
    <ReactFlow nodeTypes={{ card: NodeCard as never }} nodes={nodes} edges={edges} fitView onConnect={(c) => setPending(c)} onNodesChange={(changes) => {
      changes.forEach((c) => { if (c.type === "position" && c.position) { const n = world.nodes.find((x) => x.id === c.id); if (n) upsertNode({ ...n, position: c.position }); } });
    }} onNodeClick={(_, n) => setSelection({ nodeId: n.id })} onEdgeClick={(_, e) => setSelection({ edgeId: e.id })} onPaneClick={() => setSelection({})}>
      <Background gap={24} color="#f1f5f9" />
      <Controls />
    </ReactFlow>
    <BottomToolbar onAdd={addNodeAtCenter} />
    {pending && <RelationshipModal onClose={() => setPending(null)} onSave={(type, lore) => { upsertEdge({ id: crypto.randomUUID(), source: pending.source!, target: pending.target!, relationshipType: type, lore }); setPending(null); }} />}
  </div>;
}

"use client";

import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorldStore } from "@/store/worldStore";
import { NodeCard } from "@/components/NodeCard";
import { RelationshipModal } from "@/components/RelationshipModal";
import { BottomToolbar } from "@/components/BottomToolbar";
import { NodeKind } from "@/types/world";

interface Props {
  query: string;
  selectedNodeId?: string;
  selectedEdgeId?: string;
  onSelectionChange: (selection: { nodeId?: string; edgeId?: string }) => void;
  onNodeCreated?: (nodeId: string) => void;
}

export function WorldCanvas({ query, onSelectionChange, onNodeCreated, selectedEdgeId, selectedNodeId }: Props) {
  const { worlds, activeWorldId, upsertEdge, upsertNode, addNodeAtCenter, loadSample } = useWorldStore();
  const world = worlds.find((w) => w.id === activeWorldId);
  const [pending, setPending] = useState<Connection | null>(null);

  const nodes = useMemo<Node[]>(
    () =>
      (world?.nodes ?? [])
        .filter((n) => [n.name, n.type, n.description, n.lore].join(" ").toLowerCase().includes(query.toLowerCase()))
        .map((n) => ({ id: n.id, type: "card", position: n.position, data: n, selected: selectedNodeId === n.id })),
    [world, query, selectedNodeId],
  );

  const edges = useMemo<Edge[]>(
    () =>
      (world?.edges ?? []).map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.relationshipType,
        type: "default",
        selected: selectedEdgeId === e.id,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
        style: { stroke: selectedEdgeId === e.id ? "#6366f1" : "#94a3b8", strokeWidth: selectedEdgeId === e.id ? 2.4 : 1.4 },
        labelStyle: { fill: "#475569", fontSize: 12 },
        data: e,
      })),
    [world, selectedEdgeId],
  );

  const createNode = (type: NodeKind) => {
    if (!world) return;
    const id = crypto.randomUUID();
    addNodeAtCenter(type, id);
    onSelectionChange({ nodeId: id });
    onNodeCreated?.(id);
  };

  if (!world) return <div className="grid h-full place-items-center text-slate-500">Create a world to begin.</div>;

  return (
    <div className="relative h-[calc(100vh-56px)] flex-1">
      {world.nodes.length === 0 && (
        <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-xl border bg-white/95 p-4 text-center shadow-soft">
          <p>Start building your world</p>
          <button className="mt-2 rounded border px-3 py-1" onClick={loadSample}>
            Load Beyonders sample world
          </button>
        </div>
      )}
      <ReactFlow
        nodeTypes={{ card: NodeCard as never }}
        nodes={nodes}
        edges={edges}
        fitView
        onConnect={(c) => setPending(c)}
        onNodesChange={(changes: NodeChange[]) => {
          changes.forEach((c) => {
            if (c.type === "position" && c.position) {
              const n = world.nodes.find((x) => x.id === c.id);
              if (n) upsertNode({ ...n, position: c.position });
            }
          });
        }}
        onNodeClick={(_, n) => onSelectionChange({ nodeId: n.id })}
        onEdgeClick={(_, e) => onSelectionChange({ edgeId: e.id })}
        onPaneClick={() => onSelectionChange({})}
      >
        <Background gap={24} color="#f1f5f9" />
        <Controls />
      </ReactFlow>
      <BottomToolbar onAdd={createNode} />
      {pending && (
        <RelationshipModal
          onClose={() => setPending(null)}
          onSave={(type, lore) => {
            upsertEdge({ id: crypto.randomUUID(), source: pending.source!, target: pending.target!, relationshipType: type, lore });
            setPending(null);
          }}
        />
      )}
    </div>
  );
}

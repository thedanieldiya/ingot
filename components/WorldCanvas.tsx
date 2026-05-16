"use client";

import { useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Connection, Controls, Edge, MarkerType, Node, NodeChange } from "reactflow";
import "reactflow/dist/style.css";
import { useWorldStore } from "@/store/worldStore";
import { NodeCard } from "@/components/NodeCard";
import { NodeContextMenu } from "@/components/NodeContextMenu";
import { RelationshipModal } from "@/components/RelationshipModal";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { NodeKind } from "@/types/world";

interface Props {
  query: string;
  selectedNodeId?: string;
  selectedEdgeId?: string;
  onSelectionChange: (selection: { nodeId?: string; edgeId?: string }) => void;
}

export function WorldCanvas({ query, onSelectionChange, selectedEdgeId, selectedNodeId }: Props) {
  const { worlds, activeWorldId, upsertEdge, upsertNode, removeNode, loadSample } = useWorldStore();
  const world = worlds.find((w) => w.id === activeWorldId);
  const [pending, setPending] = useState<Connection | null>(null);
  const [contextMenu, setContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        markerEnd: { type: MarkerType.ArrowClosed, color: selectedEdgeId === e.id ? "var(--edge-selected)" : "var(--edge)" },
        style: { stroke: selectedEdgeId === e.id ? "var(--edge-selected)" : "var(--edge)", strokeWidth: selectedEdgeId === e.id ? 2.4 : 1.4 },
        labelStyle: { fill: "var(--edge-label)", fontSize: 12 },
        data: e,
      })),
    [world, selectedEdgeId],
  );

  const contextNode = contextMenu ? world?.nodes.find((node) => node.id === contextMenu.nodeId) : undefined;

  const openContextMenu = (event: ReactMouseEvent, node: Node) => {
    event.preventDefault();
    const bounds = wrapperRef.current?.getBoundingClientRect();
    const rawX = bounds ? event.clientX - bounds.left : event.clientX;
    const rawY = bounds ? event.clientY - bounds.top : event.clientY;
    const maxX = Math.max(12, (bounds?.width ?? window.innerWidth) - 280);
    const maxY = Math.max(12, (bounds?.height ?? window.innerHeight) - 360);
    setContextMenu({
      nodeId: node.id,
      x: Math.min(Math.max(rawX, 12), maxX),
      y: Math.min(Math.max(rawY, 12), maxY),
    });
    onSelectionChange({ nodeId: node.id });
  };

  const updateContextNode = (updates: { name?: string; type?: NodeKind }) => {
    if (!contextNode) return;
    upsertNode({ ...contextNode, ...updates });
    onSelectionChange({ nodeId: contextNode.id });
  };

  const duplicateContextNode = () => {
    if (!contextNode) return;
    const duplicate = {
      ...contextNode,
      id: crypto.randomUUID(),
      name: `${contextNode.name} copy`,
      position: {
        x: contextNode.position.x + 48,
        y: contextNode.position.y + 48,
      },
    };
    upsertNode(duplicate);
    onSelectionChange({ nodeId: duplicate.id });
    setContextMenu(null);
  };

  if (!world) return <div className="grid h-full place-items-center text-gray-500 dark:text-gray-400">Create a world to begin.</div>;

  return (
    <div ref={wrapperRef} className="relative h-[calc(100vh-56px)] flex-1 bg-[var(--canvas-bg)]">
      {world.nodes.length === 0 && (
        <div className="absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-lg border border-gray-200 bg-white/95 p-4 text-center shadow-soft dark:border-neutral-700 dark:bg-neutral-900/95">
          <p className="font-medium text-gray-950 dark:text-gray-100">Start building your world</p>
          <button className="mt-2 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-200" onClick={() => loadSample("game-of-thrones")}>
            Load Game of Thrones sample
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
        onNodeContextMenu={openContextMenu}
        onPaneClick={() => {
          setContextMenu(null);
          onSelectionChange({});
        }}
      >
        <Background gap={24} color="var(--canvas-grid)" />
        <Controls />
      </ReactFlow>
      {contextMenu && contextNode && (
        <NodeContextMenu
          node={contextNode}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onSelect={() => {
            onSelectionChange({ nodeId: contextNode.id });
            setContextMenu(null);
          }}
          onRename={(name) => {
            updateContextNode({ name });
            setContextMenu(null);
          }}
          onChangeType={(type) => updateContextNode({ type })}
          onDuplicate={duplicateContextNode}
          onDelete={() => {
            removeNode(contextNode.id);
            onSelectionChange({});
            setContextMenu(null);
          }}
        />
      )}
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

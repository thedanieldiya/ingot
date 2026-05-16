"use client";

import { ChevronDown, ChevronRight, GripVertical, Layers, MoveDown } from "lucide-react";
import { useMemo, useState } from "react";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";
import { nodeTypeMeta } from "@/data/nodeTypes";
import type { WorldNode } from "@/types/world";

const dragMime = "application/x-ingot-node-id";

const isDescendant = (nodes: WorldNode[], possibleChildId: string, parentId: string): boolean => {
  const possibleChild = nodes.find((node) => node.id === possibleChildId);
  if (!possibleChild?.parentId) return false;
  if (possibleChild.parentId === parentId) return true;
  return isDescendant(nodes, possibleChild.parentId, parentId);
};

const buildChildren = (nodes: WorldNode[], parentId: string | null) =>
  nodes
    .filter((node) => (node.parentId ?? null) === parentId)
    .sort((a, b) => a.name.localeCompare(b.name));

function LayerRow({
  node,
  nodes,
  depth,
  selectedNodeId,
  expandedIds,
  dropTargetId,
  onToggle,
  onSelect,
  onMove,
  onDropTarget,
}: {
  node: WorldNode;
  nodes: WorldNode[];
  depth: number;
  selectedNodeId?: string;
  expandedIds: Set<string>;
  dropTargetId?: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onMove: (nodeId: string, parentId: string | null) => void;
  onDropTarget: (id?: string) => void;
}) {
  const children = buildChildren(nodes, node.id);
  const isOpen = expandedIds.has(node.id);
  const meta = nodeTypeMeta[node.type];
  const isSelected = selectedNodeId === node.id;
  const isDropTarget = dropTargetId === node.id;

  return (
    <div>
      <button
        type="button"
        draggable
        onClick={() => onSelect(node.id)}
        onDragStart={(event) => {
          event.dataTransfer.setData(dragMime, node.id);
          event.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(event) => {
          event.preventDefault();
          onDropTarget(node.id);
        }}
        onDragLeave={() => onDropTarget(undefined)}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const draggedId = event.dataTransfer.getData(dragMime);
          if (draggedId && draggedId !== node.id && !isDescendant(nodes, node.id, draggedId)) {
            onMove(draggedId, node.id);
            onToggle(node.id);
          }
          onDropTarget(undefined);
        }}
        className={`group flex h-9 w-full items-center gap-1 rounded-md px-2 text-left text-sm transition ${
          isSelected
            ? "bg-purple-100 text-purple-950 dark:bg-purple-400/20 dark:text-purple-100"
            : isDropTarget
              ? "bg-purple-50 text-purple-900 ring-1 ring-purple-300 dark:bg-purple-400/10 dark:text-purple-100 dark:ring-purple-300/50"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-900"
        }`}
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        <span
          className="grid h-5 w-5 place-items-center rounded text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
          onClick={(event) => {
            event.stopPropagation();
            onToggle(node.id);
          }}
        >
          {children.length ? isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5" />}
        </span>
        <GripVertical className="h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 transition group-hover:opacity-100 dark:text-gray-600" aria-hidden="true" />
        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded text-white ${meta.swatchClass}`}>
          <NodeTypeIcon type={node.type} className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate">{node.name || "Untitled node"}</span>
        {children.length > 0 && <span className="rounded bg-gray-200 px-1.5 text-[10px] text-gray-600 dark:bg-neutral-800 dark:text-gray-300">{children.length}</span>}
      </button>
      {isOpen &&
        children.map((child) => (
          <LayerRow
            key={child.id}
            node={child}
            nodes={nodes}
            depth={depth + 1}
            selectedNodeId={selectedNodeId}
            expandedIds={expandedIds}
            dropTargetId={dropTargetId}
            onToggle={onToggle}
            onSelect={onSelect}
            onMove={onMove}
            onDropTarget={onDropTarget}
          />
        ))}
    </div>
  );
}

export function NodeLayersSidebar({
  nodes,
  selectedNodeId,
  onSelect,
  onMove,
}: {
  nodes: WorldNode[];
  selectedNodeId?: string;
  onSelect: (id: string) => void;
  onMove: (nodeId: string, parentId: string | null) => void;
}) {
  const roots = useMemo(() => {
    const ids = new Set(nodes.map((node) => node.id));
    return nodes.filter((node) => !node.parentId || !ids.has(node.parentId)).sort((a, b) => a.name.localeCompare(b.name));
  }, [nodes]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(nodes.map((node) => node.id)));
  const [dropTargetId, setDropTargetId] = useState<string | undefined>();

  const toggle = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside
      className="flex w-72 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
      onDragOver={(event) => {
        event.preventDefault();
        setDropTargetId("root");
      }}
      onDragLeave={() => setDropTargetId(undefined)}
      onDrop={(event) => {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData(dragMime);
        if (draggedId) onMove(draggedId, null);
        setDropTargetId(undefined);
      }}
    >
      <div className="border-b border-gray-200 px-4 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          <Layers className="h-4 w-4" aria-hidden="true" />
          Layers
        </div>
        <h2 className="mt-1 text-lg font-semibold text-gray-950 dark:text-gray-50">Node nesting</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {nodes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500 dark:border-neutral-700 dark:text-gray-400">
            Create nodes from the floating dock, then drag layers here to nest them.
          </div>
        ) : (
          <div className="space-y-1">
            <div
              className={`mb-2 flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-xs ${
                dropTargetId === "root"
                  ? "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-300/50 dark:bg-purple-400/10 dark:text-purple-200"
                  : "border-gray-200 text-gray-500 dark:border-neutral-800 dark:text-gray-400"
              }`}
            >
              <MoveDown className="h-3.5 w-3.5" aria-hidden="true" />
              Drop here to move to top level
            </div>
            {roots.map((node) => (
              <LayerRow
                key={node.id}
                node={node}
                nodes={nodes}
                depth={0}
                selectedNodeId={selectedNodeId}
                expandedIds={expandedIds}
                dropTargetId={dropTargetId}
                onToggle={toggle}
                onSelect={onSelect}
                onMove={onMove}
                onDropTarget={setDropTargetId}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

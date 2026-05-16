"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, PanelRightOpen, Pencil, Tags, Trash2 } from "lucide-react";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";
import { nodeTypeList, nodeTypeMeta } from "@/data/nodeTypes";
import type { NodeKind, WorldNode } from "@/types/world";

export function NodeContextMenu({
  node,
  x,
  y,
  onClose,
  onSelect,
  onRename,
  onChangeType,
  onDuplicate,
  onDelete,
}: {
  node: WorldNode;
  x: number;
  y: number;
  onClose: () => void;
  onSelect: () => void;
  onRename: (name: string) => void;
  onChangeType: (type: NodeKind) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const [draftName, setDraftName] = useState(node.name);
  const menuRef = useRef<HTMLDivElement>(null);
  const meta = nodeTypeMeta[node.type];

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as globalThis.Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute z-40 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-soft dark:border-neutral-800 dark:bg-neutral-900"
      style={{ left: x, top: y }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="border-b border-gray-200 px-2 pb-2 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className={`grid h-8 w-8 place-items-center rounded-lg text-white ${meta.swatchClass}`}>
            <NodeTypeIcon type={node.type} className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-950 dark:text-gray-50">{node.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{meta.label}</div>
          </div>
        </div>
      </div>

      <form
        className="mt-2 space-y-2 px-1"
        onSubmit={(event) => {
          event.preventDefault();
          const nextName = draftName.trim();
          if (nextName) onRename(nextName);
        }}
      >
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Rename
        </label>
        <div className="flex gap-2">
          <input
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm text-gray-950 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100 dark:focus:border-purple-300 dark:focus:ring-purple-400/20"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
          />
          <button type="submit" className="rounded-lg bg-accent px-2.5 py-1.5 text-xs font-medium text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200">
            Save
          </button>
        </div>
      </form>

      <div className="mt-2 px-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Tags className="h-3.5 w-3.5" aria-hidden="true" />
          Type
        </label>
        <select
          className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100"
          value={node.type}
          onChange={(event) => onChangeType(event.target.value as NodeKind)}
        >
          {nodeTypeList.map((nodeType) => (
            <option key={nodeType.type} value={nodeType.type}>
              {nodeType.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 space-y-1 border-t border-gray-200 pt-2 dark:border-neutral-800">
        <button type="button" className="w-full rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800" onClick={onSelect}>
          <span className="inline-flex items-center gap-2">
            <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
            Open in inspector
          </span>
        </button>
        <button type="button" className="w-full rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800" onClick={onDuplicate}>
          <span className="inline-flex items-center gap-2">
            <Copy className="h-4 w-4" aria-hidden="true" />
            Duplicate node
          </span>
        </button>
        <button type="button" className="w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40" onClick={onDelete}>
          <span className="inline-flex items-center gap-2">
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete node
          </span>
        </button>
      </div>
    </div>
  );
}

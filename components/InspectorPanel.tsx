"use client";

import { ImagePlus, Link, Trash2 } from "lucide-react";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";
import { nodeTypeMeta } from "@/data/nodeTypes";
import type { NodeKind, WorldEdge, WorldNode } from "@/types/world";
import type { ChangeEvent } from "react";

const nodeSizes: Record<NodeKind, { width: number; height: number }> = {
  character: { width: 220, height: 104 },
  faction: { width: 260, height: 116 },
  territory: { width: 260, height: 124 },
  lore: { width: 220, height: 104 },
  event: { width: 220, height: 104 },
  species: { width: 230, height: 108 },
  kingdom: { width: 260, height: 120 },
  magicSystem: { width: 240, height: 110 },
};

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-950 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100 dark:focus:border-purple-300 dark:focus:ring-purple-400/20";
const labelClass = "text-xs font-medium text-gray-500 dark:text-gray-400";

export function InspectorPanel({
  node,
  edge,
  worldNodes,
  worldEdges,
  onNodeChange,
  onEdgeChange,
}: {
  node?: WorldNode;
  edge?: WorldEdge;
  worldNodes: WorldNode[];
  worldEdges: WorldEdge[];
  onNodeChange: (n: WorldNode) => void;
  onEdgeChange: (e: WorldEdge) => void;
}) {
  if (!node && !edge) {
    return (
      <aside className="w-80 border-l border-gray-200 bg-white p-4 text-sm text-gray-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-400">
        <h3 className="mb-2 text-base font-semibold text-gray-950 dark:text-gray-50">Inspector</h3>
        Select a node or connection to edit properties.
      </aside>
    );
  }

  if (node) {
    const meta = nodeTypeMeta[node.type];
    const size = nodeSizes[node.type];
    const linked = worldEdges.filter((e) => e.source === node.id || e.target === node.id);
    const addImageFromFile = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") onNodeChange({ ...node, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    };

    return (
      <aside className="w-80 space-y-4 overflow-y-auto border-l border-gray-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-950 dark:text-gray-50">{node.name || "Untitled node"}</h3>
            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase ${meta.badgeClass}`}>
              <NodeTypeIcon type={node.type} className="h-3 w-3" />
              {meta.label}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{meta.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="rounded-lg border border-gray-200 p-2 text-gray-600 dark:border-neutral-800 dark:text-gray-300">X: {Math.round(node.position.x)}</label>
          <label className="rounded-lg border border-gray-200 p-2 text-gray-600 dark:border-neutral-800 dark:text-gray-300">Y: {Math.round(node.position.y)}</label>
          <label className="rounded-lg border border-gray-200 p-2 text-gray-600 dark:border-neutral-800 dark:text-gray-300">W: {size.width}</label>
          <label className="rounded-lg border border-gray-200 p-2 text-gray-600 dark:border-neutral-800 dark:text-gray-300">H: {size.height}</label>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Name</label>
          <input className={fieldClass} value={node.name} onChange={(e) => onNodeChange({ ...node, name: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Type</label>
          <select className={fieldClass} value={node.type} onChange={(e) => onNodeChange({ ...node, type: e.target.value as WorldNode["type"] })}>
            <option value="character">Character</option>
            <option value="territory">Territory</option>
            <option value="faction">Faction</option>
            <option value="lore">Lore</option>
            <option value="event">Event</option>
            <option value="species">Species</option>
            <option value="kingdom">Kingdom</option>
            <option value="magicSystem">Magic System</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Image</label>
          {node.imageUrl && (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900">
              <img src={node.imageUrl} alt={`${node.name} image`} className="h-32 w-full object-cover" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-100 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-200 dark:hover:bg-purple-400/15">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              Upload
              <input className="sr-only" type="file" accept="image/*" onChange={addImageFromFile} />
            </label>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:text-gray-200"
              disabled={!node.imageUrl}
              onClick={() => onNodeChange({ ...node, imageUrl: undefined })}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Remove
            </button>
          </div>
          <div className="relative">
            <Link className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            <input
              className={`${fieldClass} pl-8`}
              value={node.imageUrl?.startsWith("data:") ? "" : node.imageUrl ?? ""}
              onChange={(e) => onNodeChange({ ...node, imageUrl: e.target.value })}
              placeholder="Paste image URL"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Description</label>
          <textarea className={`${fieldClass} h-20`} value={node.description} onChange={(e) => onNodeChange({ ...node, description: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Lore</label>
          <textarea className={`${fieldClass} h-24`} value={node.lore ?? ""} onChange={(e) => onNodeChange({ ...node, lore: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Parent</label>
          <select className={fieldClass} value={node.parentId ?? ""} onChange={(e) => onNodeChange({ ...node, parentId: e.target.value || null })}>
            <option value="">None</option>
            {worldNodes
              .filter((n) => n.id !== node.id)
              .map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Linked relationships ({linked.length})</h4>
          <div className="space-y-2">
            {linked.map((rel) => {
              const source = worldNodes.find((n) => n.id === rel.source)?.name ?? rel.source;
              const target = worldNodes.find((n) => n.id === rel.target)?.name ?? rel.target;

              return (
                <div key={rel.id} className="rounded-lg border border-gray-200 p-2 text-xs text-gray-600 dark:border-neutral-800 dark:text-gray-300">
                  <div className="font-medium text-gray-950 dark:text-gray-100">{rel.relationshipType}</div>
                  <div>
                    {source} -&gt; {target}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  const source = worldNodes.find((n) => n.id === edge!.source)?.name ?? edge!.source;
  const target = worldNodes.find((n) => n.id === edge!.target)?.name ?? edge!.target;

  return (
    <aside className="w-80 space-y-3 border-l border-gray-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-gray-950 dark:text-gray-50">Connection</h3>
      <div className="rounded-lg border border-gray-200 p-2 text-sm text-gray-600 dark:border-neutral-800 dark:text-gray-300">
        {source} -&gt; {target}
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Relationship type</label>
        <input className={fieldClass} value={edge!.relationshipType} onChange={(e) => onEdgeChange({ ...edge!, relationshipType: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Lore</label>
        <textarea className={`${fieldClass} h-28`} value={edge!.lore} onChange={(e) => onEdgeChange({ ...edge!, lore: e.target.value })} />
      </div>
    </aside>
  );
}

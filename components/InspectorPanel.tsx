"use client";

import { WorldEdge, WorldNode } from "@/types/world";

const nodeSizes: Record<string, { width: number; height: number }> = {
  character: { width: 220, height: 104 },
  faction: { width: 260, height: 116 },
  territory: { width: 260, height: 124 },
  lore: { width: 220, height: 104 },
  event: { width: 220, height: 104 },
  species: { width: 230, height: 108 },
  kingdom: { width: 260, height: 120 },
  magicSystem: { width: 240, height: 110 },
};

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
      <aside className="w-80 border-l bg-white p-4 text-sm text-slate-500">
        <h3 className="mb-2 text-base font-medium text-slate-800">Inspector</h3>
        Select a node or connection to edit properties.
      </aside>
    );
  }

  if (node) {
    const size = nodeSizes[node.type] ?? { width: 220, height: 104 };
    const linked = worldEdges.filter((e) => e.source === node.id || e.target === node.id);
    return (
      <aside className="w-80 space-y-4 overflow-y-auto border-l bg-white p-4">
        <div>
          <h3 className="text-base font-semibold">{node.name || "Untitled node"}</h3>
          <p className="text-xs uppercase tracking-wide text-slate-400">{node.type}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="rounded border p-2">X: {Math.round(node.position.x)}</label>
          <label className="rounded border p-2">Y: {Math.round(node.position.y)}</label>
          <label className="rounded border p-2">W: {size.width}</label>
          <label className="rounded border p-2">H: {size.height}</label>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">Name</label>
          <input className="w-full rounded border p-2" value={node.name} onChange={(e) => onNodeChange({ ...node, name: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">Type</label>
          <select className="w-full rounded border p-2" value={node.type} onChange={(e) => onNodeChange({ ...node, type: e.target.value as WorldNode["type"] })}>
            <option value="character">Character</option><option value="territory">Territory</option><option value="faction">Faction</option><option value="lore">Lore</option><option value="event">Event</option><option value="species">Species</option><option value="kingdom">Kingdom</option><option value="magicSystem">Magic System</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">Description</label>
          <textarea className="h-20 w-full rounded border p-2" value={node.description} onChange={(e) => onNodeChange({ ...node, description: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">Lore</label>
          <textarea className="h-24 w-full rounded border p-2" value={node.lore ?? ""} onChange={(e) => onNodeChange({ ...node, lore: e.target.value })} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500">Parent</label>
          <select className="w-full rounded border p-2" value={node.parentId ?? ""} onChange={(e) => onNodeChange({ ...node, parentId: e.target.value || null })}>
            <option value="">None</option>
            {worldNodes.filter((n) => n.id !== node.id).map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
          </select>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-medium text-slate-500">Linked relationships ({linked.length})</h4>
          <div className="space-y-2">
            {linked.map((rel) => (
              <div key={rel.id} className="rounded border p-2 text-xs">
                <div className="font-medium">{rel.relationshipType}</div>
                <div className="text-slate-500">{rel.source} → {rel.target}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  const source = worldNodes.find((n) => n.id === edge!.source)?.name ?? edge!.source;
  const target = worldNodes.find((n) => n.id === edge!.target)?.name ?? edge!.target;

  return (
    <aside className="w-80 space-y-3 border-l bg-white p-4">
      <h3 className="text-base font-semibold">Connection</h3>
      <div className="rounded border p-2 text-sm">{source} → {target}</div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-500">Relationship type</label>
        <input className="w-full rounded border p-2" value={edge!.relationshipType} onChange={(e) => onEdgeChange({ ...edge!, relationshipType: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-500">Lore</label>
        <textarea className="h-28 w-full rounded border p-2" value={edge!.lore} onChange={(e) => onEdgeChange({ ...edge!, lore: e.target.value })} />
      </div>
    </aside>
  );
}

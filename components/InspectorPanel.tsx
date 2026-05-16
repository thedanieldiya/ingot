"use client";
import { WorldEdge, WorldNode } from "@/types/world";

export function InspectorPanel({ node, edge, onNodeChange, onEdgeChange }: { node?: WorldNode; edge?: WorldEdge; onNodeChange: (n: WorldNode) => void; onEdgeChange: (e: WorldEdge) => void }) {
  if (!node && !edge) return null;
  return <aside className="w-80 border-l bg-white p-4">{node && <div className="space-y-2"><h3 className="font-medium">Node</h3>
    <input className="w-full rounded border p-2" value={node.name} onChange={(e) => onNodeChange({ ...node, name: e.target.value })} />
    <textarea className="w-full rounded border p-2" placeholder="Description" value={node.description} onChange={(e) => onNodeChange({ ...node, description: e.target.value })} />
    <textarea className="w-full rounded border p-2" placeholder="Lore" value={node.lore ?? ""} onChange={(e) => onNodeChange({ ...node, lore: e.target.value })} /></div>}
    {edge && <div className="space-y-2"><h3 className="font-medium">Connection</h3><input className="w-full rounded border p-2" value={edge.relationshipType} onChange={(e) => onEdgeChange({ ...edge, relationshipType: e.target.value })} />
    <textarea className="w-full rounded border p-2" value={edge.lore} onChange={(e) => onEdgeChange({ ...edge, lore: e.target.value })} /></div>}</aside>;
}

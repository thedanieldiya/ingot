"use client";
import { NodeKind } from "@/types/world";
const items: { label: string; type: NodeKind }[] = [
  { label: "Character", type: "character" }, { label: "Territory", type: "territory" }, { label: "Faction", type: "faction" }, { label: "Lore", type: "lore" }, { label: "Event", type: "event" }, { label: "Species", type: "species" }, { label: "Kingdom", type: "kingdom" }, { label: "Magic System", type: "magicSystem" }
];
export function BottomToolbar({ onAdd }: { onAdd: (t: NodeKind) => void }) { return <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-2xl border bg-white/95 p-2 shadow-soft"><div className="flex flex-wrap gap-2">{items.map((i) => <button key={i.label} className="rounded-lg border px-3 py-1.5 text-sm" onClick={() => onAdd(i.type)}>Add {i.label}</button>)}</div></div>; }

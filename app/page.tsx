"use client";

import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { WorldCanvas } from "@/components/WorldCanvas";
import { InspectorPanel } from "@/components/InspectorPanel";
import { useWorldStore } from "@/store/worldStore";

export default function Page() {
  const { worlds, activeWorldId, createWorld, upsertNode, upsertEdge } = useWorldStore();
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const world = useMemo(() => worlds.find((w) => w.id === activeWorldId), [worlds, activeWorldId]);
  const [selection, setSelection] = useState<{ nodeId?: string; edgeId?: string }>({});
  useEffect(() => { const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); const q = prompt("Search"); if (q !== null) setSearch(q); }
      if (e.key === "Escape") setShowCreate(false);
      const map: Record<string, string> = { c: "character", f: "faction", t: "territory", l: "lore", e: "event" };
      if (map[e.key.toLowerCase()]) { /* intentionally delegated to toolbar in MVP */ }
    }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);

  if (!worlds.length) return <main className="grid min-h-screen place-items-center bg-slate-50"><div className="rounded-2xl border bg-white p-8 shadow-soft text-center"><h1 className="text-3xl font-semibold">Nexus</h1><p className="mt-2 text-slate-500">A calm canvas for worldbuilding.</p><button className="mt-6 rounded-xl bg-accent px-4 py-2 text-white" onClick={() => setShowCreate(true)}>Create world</button></div>{showCreate && <div className="fixed inset-0 grid place-items-center bg-black/20"><div className="w-96 rounded-xl border bg-white p-5"><h3 className="mb-3 font-medium">Create world</h3><input className="w-full rounded border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Beyonders" /><div className="mt-3 flex justify-end gap-2"><button className="rounded border px-3 py-2" onClick={() => setShowCreate(false)}>Cancel</button><button className="rounded bg-accent px-3 py-2 text-white" onClick={() => { if (name.trim()) { createWorld(name.trim()); setShowCreate(false); setName(""); } }}>Create</button></div></div></div>}</main>;

  return <main className="h-screen"><TopBar onSearch={() => { const q = prompt("Search"); if (q !== null) setSearch(q); }} />
    <div className="flex h-[calc(100vh-56px)]"><WorldCanvas query={search} /><InspectorPanel onNodeChange={upsertNode} onEdgeChange={upsertEdge} node={world?.nodes.find((n) => n.id === selection.nodeId)} edge={world?.edges.find((e) => e.id === selection.edgeId)} /></div></main>;
}

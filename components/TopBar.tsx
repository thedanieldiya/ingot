"use client";
import { useState } from "react";
import { SharePopover } from "@/components/SharePopover";
import { useWorldStore } from "@/store/worldStore";

export function TopBar({ onSearch }: { onSearch: () => void }) {
  const { worlds, activeWorldId, switchWorld, createWorld } = useWorldStore();
  const [showShare, setShowShare] = useState(false);
  const active = worlds.find((w) => w.id === activeWorldId);
  return <header className="flex h-14 items-center justify-between border-b bg-white px-4">
    <div className="flex items-center gap-3"><div className="font-semibold">Nexus</div>
      <select className="rounded border px-2 py-1 text-sm" value={activeWorldId} onChange={(e) => switchWorld(e.target.value)}>
        {worlds.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
      </select>
      <button className="text-xs text-accent" onClick={() => { const name = prompt("World name"); if (name) createWorld(name); }}>+ New world</button>
    </div>
    <button onClick={onSearch} className="rounded-lg border px-3 py-1 text-sm text-slate-500">⌘K Search</button>
    <div className="relative flex items-center gap-2"><button className="rounded border px-3 py-1" onClick={() => setShowShare((s) => !s)}>Share</button><button className="rounded border px-2">◴</button><div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100">A</div>{showShare && <SharePopover />}</div>
  </header>;
}

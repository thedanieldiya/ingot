"use client";
import { useState } from "react";

const options = ["belongs to", "controls", "allied with", "enemy of", "located in", "caused by", "related to", "custom"];

export function RelationshipModal({ onSave, onClose, initial }: { onSave: (type: string, lore: string) => void; onClose: () => void; initial?: { type: string; lore: string } }) {
  const [type, setType] = useState(initial?.type ?? "related to");
  const [lore, setLore] = useState(initial?.lore ?? "");
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/20">
    <div className="w-full max-w-md rounded-xl border bg-white p-5 shadow-soft">
      <h3 className="mb-4 text-lg font-medium">Describe this connection</h3>
      <select className="mb-3 w-full rounded-lg border p-2" value={type} onChange={(e) => setType(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select>
      <textarea className="h-28 w-full rounded-lg border p-2" placeholder="Lore details" value={lore} onChange={(e) => setLore(e.target.value)} />
      <div className="mt-4 flex justify-end gap-2"><button className="rounded-lg border px-3 py-2" onClick={onClose}>Cancel</button><button className="rounded-lg bg-accent px-3 py-2 text-white" onClick={() => onSave(type, lore)}>Save</button></div>
    </div>
  </div>;
}

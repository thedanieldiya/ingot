"use client";

import { useState } from "react";
import { GitBranchPlus, Save } from "lucide-react";

const options = ["belongs to", "controls", "allied with", "enemy of", "located in", "caused by", "related to", "custom"];

export function RelationshipModal({ onSave, onClose, initial }: { onSave: (type: string, lore: string) => void; onClose: () => void; initial?: { type: string; lore: string } }) {
  const [type, setType] = useState(initial?.type ?? "related to");
  const [lore, setLore] = useState(initial?.lore ?? "");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950/25">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-soft dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-gray-950 dark:text-gray-50">
          <GitBranchPlus className="h-5 w-5 text-purple-500" aria-hidden="true" />
          Describe this connection
        </h3>
        <select className="mb-3 w-full rounded-lg border border-gray-200 bg-white p-2 text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100" value={type} onChange={(e) => setType(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <textarea
          className="h-28 w-full rounded-lg border border-gray-200 bg-white p-2 text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100"
          placeholder="Lore details"
          value={lore}
          onChange={(e) => setLore(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 dark:border-neutral-700 dark:text-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-lg bg-accent px-3 py-2 text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200" onClick={() => onSave(type, lore)}>
            <span className="inline-flex items-center gap-2">
              <Save className="h-4 w-4" aria-hidden="true" />
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChevronUp, FilePlus2, Plus } from "lucide-react";
import { useState } from "react";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";
import { nodeTypeList } from "@/data/nodeTypes";
import type { SampleWorldId } from "@/store/worldStore";
import type { NodeKind } from "@/types/world";

export function FloatingCreateDock({
  canCreateNode,
  onCreateNode,
  onCreateWorld,
  onLoadSample,
}: {
  canCreateNode: boolean;
  onCreateNode: (type: NodeKind) => void;
  onCreateWorld: (name: string) => void;
  onLoadSample: (sample: SampleWorldId) => void;
}) {
  const [open, setOpen] = useState(false);
  const [worldName, setWorldName] = useState("");

  const submitWorld = () => {
    const nextName = worldName.trim();
    if (!nextName) return;
    onCreateWorld(nextName);
    setWorldName("");
    setOpen(false);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center px-4">
      <div className="pointer-events-auto rounded-xl border border-gray-200 bg-white/95 p-2 shadow-soft backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
        {open && (
          <div className="mb-2 grid w-[min(760px,calc(100vw-32px))] gap-2 border-b border-gray-200 pb-2 dark:border-neutral-800 sm:grid-cols-[260px_1fr]">
            <div className="space-y-2">
              <form
                className="rounded-lg bg-gray-50 p-2 dark:bg-neutral-900"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitWorld();
                }}
              >
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">New world</label>
                <div className="mt-1 flex gap-2">
                  <input
                    className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-950 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100 dark:focus:border-purple-300 dark:focus:ring-purple-400/20"
                    value={worldName}
                    onChange={(event) => setWorldName(event.target.value)}
                    placeholder="World name"
                  />
                  <button type="submit" className="rounded-lg bg-accent px-2.5 text-white dark:bg-purple-300 dark:text-neutral-950">
                    <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-left text-xs font-semibold text-purple-700 transition hover:bg-purple-100 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-200"
                  onClick={() => {
                    onLoadSample("game-of-thrones");
                    setOpen(false);
                  }}
                >
                  Game of Thrones
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-semibold text-gray-700 transition hover:border-purple-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200"
                  onClick={() => {
                    onLoadSample("beyonders");
                    setOpen(false);
                  }}
                >
                  Beyonders
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {nodeTypeList.map((nodeType) => (
                <button
                  key={nodeType.type}
                  type="button"
                  disabled={!canCreateNode}
                  className="grid place-items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-xs font-medium text-gray-700 transition hover:border-purple-300 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200 dark:hover:border-purple-300/50 dark:hover:bg-purple-400/10"
                  onClick={() => onCreateNode(nodeType.type)}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg text-white ${nodeType.swatchClass}`}>
                    <NodeTypeIcon type={nodeType.type} />
                  </span>
                  <span className="truncate">{nodeType.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white shadow-sm shadow-purple-500/25 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          Create
        </button>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight, FileText, Folder, LayoutDashboard, Search, Share2 } from "lucide-react";
import Link from "next/link";
import { SharePopover } from "@/components/SharePopover";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { useWorldStore } from "@/store/worldStore";

export function TopBar({ onSearch }: { onSearch: () => void }) {
  const { worlds, activeWorldId, switchWorld } = useWorldStore();
  const [showShare, setShowShare] = useState(false);
  const active = worlds.find((world) => world.id === activeWorldId);

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex min-w-0 items-center gap-2">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap font-semibold text-gray-950 dark:text-gray-50">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-sm shadow-purple-500/40 dark:bg-purple-300" />
          Ingot
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-700" aria-hidden="true" />
        <button className="inline-flex h-8 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200">
          <LayoutDashboard className="h-4 w-4 text-purple-500" aria-hidden="true" />
          Personal workspace
        </button>
        <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-700" aria-hidden="true" />
        <button className="inline-flex h-8 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200">
          <Folder className="h-4 w-4 text-amber-500" aria-hidden="true" />
          Worlds
        </button>
        <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-700" aria-hidden="true" />
        <label className="inline-flex h-8 min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200">
          <FileText className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
          <select
            className="max-w-48 bg-transparent text-sm outline-none disabled:text-gray-400 dark:disabled:text-gray-600"
            disabled={!worlds.length}
            value={active?.id ?? ""}
            onChange={(event) => switchWorld(event.target.value)}
          >
            {worlds.length === 0 && <option value="">No file open</option>}
            {worlds.map((world) => (
              <option key={world.id} value={world.id}>
                {world.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="button"
        onClick={onSearch}
        className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-700 transition hover:border-purple-300 hover:bg-purple-100 dark:border-purple-400/30 dark:bg-purple-400/10 dark:text-purple-200 dark:hover:border-purple-300/60 dark:hover:bg-purple-400/15"
      >
        <span className="inline-flex items-center gap-2">
          <Search className="h-4 w-4" aria-hidden="true" />
          Ctrl K Search
        </span>
      </button>
      <div className="relative flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200"
          onClick={() => setShowShare((state) => !state)}
        >
          <span className="inline-flex items-center gap-2">
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Share
          </span>
        </button>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-200">A</div>
        {showShare && <SharePopover />}
      </div>
    </header>
  );
}

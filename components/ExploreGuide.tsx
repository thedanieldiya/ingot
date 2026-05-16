"use client";

import { GitBranchPlus, Keyboard, NotebookPen, Sparkles, UserRound } from "lucide-react";
import type { SampleWorldId } from "@/store/worldStore";

const steps = [
  {
    icon: Sparkles,
    title: "Start with Westeros",
    copy: "Load the Game of Thrones sample to see houses, places, characters, magic, and events already mapped.",
    shortcut: "Shift G",
  },
  {
    icon: UserRound,
    title: "Create a character",
    copy: "Press C to drop a new character, then rename it and add an image in the inspector.",
    shortcut: "C",
  },
  {
    icon: GitBranchPlus,
    title: "Map relationships",
    copy: "Drag from a node handle to another card, then describe the relationship in the connection modal.",
    shortcut: "Drag handle",
  },
  {
    icon: NotebookPen,
    title: "Add lore",
    copy: "Select any node and press L to create a linked lore note beside it.",
    shortcut: "L",
  },
];

export function ExploreGuide({
  onLoadSample,
}: {
  onLoadSample: (sample: SampleWorldId) => void;
}) {
  return (
    <section className="absolute left-[304px] top-20 z-20 w-80 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-soft backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-300/15 dark:text-purple-200">
            <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
            Guided tour
          </div>
          <h2 className="mt-3 text-lg font-semibold text-gray-950 dark:text-gray-50">Explore with Game of Thrones</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Use a familiar fictional world to learn Ingot's core workflow.</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200"
        onClick={() => onLoadSample("game-of-thrones")}
      >
        Load Game of Thrones sample
      </button>
      <div className="mt-4 space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="grid grid-cols-[28px_1fr_auto] gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gray-100 text-purple-700 dark:bg-neutral-900 dark:text-purple-200">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-semibold text-gray-950 dark:text-gray-50">{step.title}</div>
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">{step.copy}</p>
              </div>
              <kbd className="h-fit rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300">
                {step.shortcut}
              </kbd>
            </div>
          );
        })}
      </div>
    </section>
  );
}

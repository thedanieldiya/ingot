"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export function SearchPopover({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-x-0 top-16 z-50 mx-auto w-full max-w-lg px-4">
      <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-soft dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <Search className="ml-2 h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" />
          <input
            ref={inputRef}
            className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-950 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100 dark:focus:border-purple-300 dark:focus:ring-purple-400/20"
            placeholder="Search nodes, lore, relationships..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
            }}
          />
          {value && (
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 dark:border-neutral-700 dark:text-gray-300"
              onClick={() => onChange("")}
            >
              <span className="inline-flex items-center gap-1.5">
                <X className="h-4 w-4" aria-hidden="true" />
                Clear
              </span>
            </button>
          )}
          <button
            type="button"
            className="rounded-lg bg-accent px-3 py-2 text-sm text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

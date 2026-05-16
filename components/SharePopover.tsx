"use client";

import { Copy, Lock, Mail, Share2 } from "lucide-react";

export function SharePopover() {
  return (
    <div className="absolute right-0 top-11 z-40 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-soft dark:border-neutral-800 dark:bg-neutral-900">
      <h4 className="mb-3 inline-flex items-center gap-2 font-semibold text-gray-950 dark:text-gray-50">
        <Share2 className="h-4 w-4 text-purple-500" aria-hidden="true" />
        Share
      </h4>
      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Workspace access
      </label>
      <select className="mb-3 mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100">
        <option>Private</option>
        <option>Anyone with link</option>
      </select>
      <div className="relative mb-3">
        <Mail className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        <input className="w-full rounded-lg border border-gray-200 bg-white p-2 pl-8 text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100" placeholder="Invite by email" />
      </div>
      <select className="mb-3 w-full rounded-lg border border-gray-200 bg-white p-2 text-gray-950 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-100">
        <option>View</option>
        <option>Comment</option>
        <option>Edit</option>
      </select>
      <button className="w-full rounded-lg bg-accent px-3 py-2 text-white shadow-sm shadow-purple-500/20 transition hover:bg-purple-700 dark:bg-purple-300 dark:text-neutral-950 dark:hover:bg-purple-200">
        <span className="inline-flex items-center gap-2">
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy link
        </span>
      </button>
    </div>
  );
}

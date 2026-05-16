"use client";

import { Handle, Position } from "reactflow";
import { ImageIcon } from "lucide-react";
import { NodeTypeIcon } from "@/components/NodeTypeIcon";
import { nodeTypeMeta } from "@/data/nodeTypes";
import { WorldNode } from "@/types/world";
import type { NodeProps } from "reactflow";

export function NodeCard({ data, selected }: NodeProps<WorldNode>) {
  const meta = nodeTypeMeta[data.type];

  return (
    <div
      className={`min-w-52 rounded-lg border p-3 shadow-sm transition ${meta.nodeClass} ${
        selected ? "ring-2 ring-accent ring-offset-2 ring-offset-white dark:ring-purple-300 dark:ring-offset-neutral-950" : "hover:shadow-md"
      }`}
    >
      <Handle type="target" position={Position.Left} className={`!h-2.5 !w-2.5 !border-2 !border-white dark:!border-neutral-950 ${meta.handleClass}`} />
      {data.imageUrl && (
        <div className="mb-3 overflow-hidden rounded-md border border-black/10 bg-white/70 dark:border-white/10 dark:bg-neutral-950/40">
          <img src={data.imageUrl} alt={`${data.name} image`} className="h-28 w-full object-cover" />
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase ${meta.badgeClass}`}>
          <NodeTypeIcon type={data.type} className="h-3 w-3" />
          {meta.label}
        </span>
        {selected && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase text-white dark:bg-purple-300 dark:text-neutral-950">Selected</span>}
      </div>
      <div className="mt-2 font-semibold">{data.name}</div>
      <div className="mt-1 flex items-start gap-1.5 text-xs opacity-75">
        {!data.imageUrl && <ImageIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />}
        <span className="line-clamp-2">{data.description || "No description"}</span>
      </div>
      <Handle type="source" position={Position.Right} className={`!h-2.5 !w-2.5 !border-2 !border-white dark:!border-neutral-950 ${meta.handleClass}`} />
    </div>
  );
}

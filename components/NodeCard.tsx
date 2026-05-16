"use client";
import { Handle, Position } from "reactflow";
import { WorldNode } from "@/types/world";
export function NodeCard({ data }: { data: WorldNode }) {
  const styles: Record<string, string> = { character: "rounded-xl", faction: "rounded-xl min-w-52", territory: "rounded-2xl border-2", lore: "rounded-lg", event: "rounded-lg", species: "rounded-xl", kingdom: "rounded-2xl", magicSystem: "rounded-lg" };
  return <div className={`border bg-white p-3 shadow-sm ${styles[data.type] ?? "rounded-xl"}`}><Handle type="target" position={Position.Left} className="!h-2 !w-2 !bg-accent" />
  <div className="text-xs uppercase text-slate-400">{data.type}</div><div className="font-medium">{data.name}</div><div className="text-xs text-slate-500">{data.description || "No description"}</div>
  <Handle type="source" position={Position.Right} className="!h-2 !w-2 !bg-accent" /></div>;
}

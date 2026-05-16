import type { NodeKind } from "@/types/world";

export const nodeTypeMeta: Record<
  NodeKind,
  {
    label: string;
    description: string;
    nodeClass: string;
    badgeClass: string;
    swatchClass: string;
    handleClass: string;
  }
> = {
  character: {
    label: "Character",
    description: "People, leads, rivals",
    nodeClass: "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-amber-100",
    badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200",
    swatchClass: "bg-amber-400",
    handleClass: "!bg-amber-500",
  },
  territory: {
    label: "Territory",
    description: "Places, realms, regions",
    nodeClass: "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-100",
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
    swatchClass: "bg-emerald-500",
    handleClass: "!bg-emerald-500",
  },
  faction: {
    label: "Faction",
    description: "Orders, houses, teams",
    nodeClass: "border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-500/60 dark:bg-blue-500/10 dark:text-blue-100",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200",
    swatchClass: "bg-blue-500",
    handleClass: "!bg-blue-500",
  },
  lore: {
    label: "Lore",
    description: "Rules, myths, facts",
    nodeClass: "border-violet-300 bg-violet-50 text-violet-950 dark:border-violet-500/60 dark:bg-violet-500/10 dark:text-violet-100",
    badgeClass: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200",
    swatchClass: "bg-violet-500",
    handleClass: "!bg-violet-500",
  },
  event: {
    label: "Event",
    description: "Moments, arcs, eras",
    nodeClass: "border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-500/60 dark:bg-rose-500/10 dark:text-rose-100",
    badgeClass: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200",
    swatchClass: "bg-rose-500",
    handleClass: "!bg-rose-500",
  },
  species: {
    label: "Species",
    description: "Races, creatures, clans",
    nodeClass: "border-teal-300 bg-teal-50 text-teal-950 dark:border-teal-500/60 dark:bg-teal-500/10 dark:text-teal-100",
    badgeClass: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-200",
    swatchClass: "bg-teal-500",
    handleClass: "!bg-teal-500",
  },
  kingdom: {
    label: "Kingdom",
    description: "States, courts, empires",
    nodeClass: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-950 dark:border-fuchsia-500/60 dark:bg-fuchsia-500/10 dark:text-fuchsia-100",
    badgeClass: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-200",
    swatchClass: "bg-fuchsia-500",
    handleClass: "!bg-fuchsia-500",
  },
  magicSystem: {
    label: "Magic System",
    description: "Powers, rituals, limits",
    nodeClass: "border-cyan-300 bg-cyan-50 text-cyan-950 dark:border-cyan-500/60 dark:bg-cyan-500/10 dark:text-cyan-100",
    badgeClass: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-200",
    swatchClass: "bg-cyan-500",
    handleClass: "!bg-cyan-500",
  },
};

export const nodeTypeList = Object.entries(nodeTypeMeta).map(([type, meta]) => ({
  type: type as NodeKind,
  ...meta,
}));

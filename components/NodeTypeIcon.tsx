"use client";

import { BookOpen, CalendarDays, Crown, Dna, Map, Shield, Sparkles, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NodeKind } from "@/types/world";

const iconMap: Record<NodeKind, LucideIcon> = {
  character: UserRound,
  territory: Map,
  faction: Shield,
  lore: BookOpen,
  event: CalendarDays,
  species: Dna,
  kingdom: Crown,
  magicSystem: Sparkles,
};

export function NodeTypeIcon({ type, className = "h-4 w-4" }: { type: NodeKind; className?: string }) {
  const Icon = iconMap[type];
  return <Icon className={className} strokeWidth={2} aria-hidden="true" />;
}

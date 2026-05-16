"use client";

import { create } from "zustand";
import { sampleBeyonders } from "@/data/sampleBeyonders";
import { NodeKind, World, WorldEdge, WorldNode } from "@/types/world";

interface Store {
  worlds: World[];
  activeWorldId?: string;
  createWorld: (name: string) => void;
  switchWorld: (id: string) => void;
  upsertNode: (node: WorldNode) => void;
  removeNode: (id: string) => void;
  upsertEdge: (edge: WorldEdge) => void;
  removeEdge: (id: string) => void;
  addNodeAtCenter: (type: NodeKind, id?: string) => void;
  loadSample: () => void;
}

const persist = (worlds: World[], activeWorldId?: string) => {
  localStorage.setItem("nexus-worlds", JSON.stringify({ worlds, activeWorldId }));
};

const read = (): { worlds: World[]; activeWorldId?: string } => {
  if (typeof window === "undefined") return { worlds: [] };
  try {
    const raw = localStorage.getItem("nexus-worlds");
    if (!raw) return { worlds: [] };
    return JSON.parse(raw);
  } catch {
    return { worlds: [] };
  }
};

export const useWorldStore = create<Store>((set, get) => ({
  ...read(),
  createWorld: (name) =>
    set((s) => {
      const world: World = { id: crypto.randomUUID(), name, nodes: [], edges: [] };
      const worlds = [...s.worlds, world];
      persist(worlds, world.id);
      return { worlds, activeWorldId: world.id };
    }),
  switchWorld: (id) =>
    set((s) => {
      persist(s.worlds, id);
      return { activeWorldId: id };
    }),
  upsertNode: (node) =>
    set((s) => {
      const worlds = s.worlds.map((w) => (w.id !== s.activeWorldId ? w : { ...w, nodes: [...w.nodes.filter((n) => n.id !== node.id), node] }));
      persist(worlds, s.activeWorldId);
      return { worlds };
    }),
  removeNode: (id) =>
    set((s) => {
      const worlds = s.worlds.map((w) =>
        w.id !== s.activeWorldId
          ? w
          : { ...w, nodes: w.nodes.filter((n) => n.id !== id), edges: w.edges.filter((e) => e.source !== id && e.target !== id) },
      );
      persist(worlds, s.activeWorldId);
      return { worlds };
    }),
  upsertEdge: (edge) =>
    set((s) => {
      const worlds = s.worlds.map((w) => (w.id !== s.activeWorldId ? w : { ...w, edges: [...w.edges.filter((e) => e.id !== edge.id), edge] }));
      persist(worlds, s.activeWorldId);
      return { worlds };
    }),
  removeEdge: (id) =>
    set((s) => {
      const worlds = s.worlds.map((w) => (w.id !== s.activeWorldId ? w : { ...w, edges: w.edges.filter((e) => e.id !== id) }));
      persist(worlds, s.activeWorldId);
      return { worlds };
    }),
  addNodeAtCenter: (type, id) => {
    const node: WorldNode = {
      id: id ?? crypto.randomUUID(),
      type,
      name: `New ${type}`,
      description: "",
      lore: "",
      parentId: null,
      position: { x: 120, y: 120 },
    };
    get().upsertNode(node);
  },
  loadSample: () =>
    set((s) => {
      const world = sampleBeyonders();
      const worlds = [...s.worlds, world];
      persist(worlds, world.id);
      return { worlds, activeWorldId: world.id };
    }),
}));

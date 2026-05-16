export type NodeKind =
  | "character"
  | "territory"
  | "faction"
  | "lore"
  | "event"
  | "species"
  | "kingdom"
  | "magicSystem";

export interface WorldNode {
  id: string;
  name: string;
  type: NodeKind;
  description: string;
  lore?: string;
  imageUrl?: string;
  parentId?: string | null;
  position: { x: number; y: number };
}

export interface WorldEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: string;
  lore: string;
}

export interface World {
  id: string;
  name: string;
  nodes: WorldNode[];
  edges: WorldEdge[];
}

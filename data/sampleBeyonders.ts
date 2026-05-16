import { World } from "@/types/world";

export const sampleBeyonders = (id = crypto.randomUUID()): World => ({
  id,
  name: "Beyonders",
  nodes: [
    { id: "jason", name: "Jason Walker", type: "character", description: "Teen protagonist", position: { x: 0, y: 0 } },
    { id: "rachel", name: "Rachel Woodruff", type: "character", description: "Resourceful ally", position: { x: 280, y: 20 } },
    { id: "lyrian", name: "Lyrian", type: "territory", description: "Parallel world", position: { x: 160, y: 230 } },
    { id: "maldor", name: "Maldor", type: "character", description: "Villain", position: { x: 520, y: 220 } },
    { id: "displacers", name: "Displacers", type: "species", description: "Mystic species", position: { x: -200, y: 280 } },
    { id: "seed", name: "Seed People", type: "species", description: "Ancient race", position: { x: -120, y: 460 } },
    { id: "vales", name: "The Seven Vales", type: "territory", description: "Region", position: { x: 180, y: 470 } },
    { id: "resistance", name: "The Resistance", type: "faction", description: "Opposition faction", position: { x: 560, y: 420 } },
    { id: "felrook", name: "Felrook", type: "territory", description: "Fortress", position: { x: 790, y: 300 } },
    { id: "word", name: "The Word", type: "magicSystem", description: "Lore magic system", position: { x: 790, y: 520 } }
  ],
  edges: [
    { id: "e1", source: "jason", target: "lyrian", relationshipType: "transported to", lore: "Unexpectedly displaced." },
    { id: "e2", source: "rachel", target: "lyrian", relationshipType: "transported to", lore: "Arrives with Jason." },
    { id: "e3", source: "maldor", target: "lyrian", relationshipType: "rules over", lore: "Authoritarian control." },
    { id: "e4", source: "resistance", target: "maldor", relationshipType: "opposes", lore: "Leads uprising." },
    { id: "e5", source: "displacers", target: "lyrian", relationshipType: "inhabit", lore: "Native species." },
    { id: "e6", source: "seed", target: "lyrian", relationshipType: "inhabit", lore: "Deeply rooted presence." },
    { id: "e7", source: "felrook", target: "maldor", relationshipType: "controlled by", lore: "Key stronghold." },
    { id: "e8", source: "word", target: "maldor", relationshipType: "threatens", lore: "Power he cannot fully command." }
  ]
});

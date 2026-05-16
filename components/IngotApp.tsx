"use client";

import { useEffect, useMemo, useState } from "react";
import { FloatingCreateDock } from "@/components/FloatingCreateDock";
import { ExploreGuide } from "@/components/ExploreGuide";
import { InspectorPanel } from "@/components/InspectorPanel";
import { NodeLayersSidebar } from "@/components/NodeLayersSidebar";
import { SearchPopover } from "@/components/SearchPopover";
import { TopBar } from "@/components/TopBar";
import { WorldCanvas } from "@/components/WorldCanvas";
import { useWorldStore } from "@/store/worldStore";
import type { NodeKind } from "@/types/world";

export function IngotApp() {
  const { worlds, activeWorldId, createWorld, upsertNode, upsertEdge, removeEdge, removeNode, addNodeAtCenter, loadSample } = useWorldStore();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selection, setSelection] = useState<{ nodeId?: string; edgeId?: string }>({});
  const world = useMemo(() => worlds.find((item) => item.id === activeWorldId), [worlds, activeWorldId]);

  function createNode(type: NodeKind) {
    if (!world) return;
    const id = crypto.randomUUID();
    addNodeAtCenter(type, id);
    setSelection({ nodeId: id });
  }

  function createLoreForSelection() {
    if (!world) return;
    const selectedNode = world.nodes.find((node) => node.id === selection.nodeId);
    if (!selectedNode) {
      createNode("lore");
      return;
    }
    const id = crypto.randomUUID();
    const loreNode = {
      id,
      type: "lore" as const,
      name: `${selectedNode.name} lore`,
      description: "Write the key history, rule, secret, or context for this node.",
      lore: "",
      parentId: selectedNode.id,
      position: {
        x: selectedNode.position.x + 280,
        y: selectedNode.position.y + 80,
      },
    };
    upsertNode(loreNode);
    upsertEdge({
      id: crypto.randomUUID(),
      source: selectedNode.id,
      target: id,
      relationshipType: "has lore",
      lore: "A linked lore note for this part of the world.",
    });
    setSelection({ nodeId: id });
  }

  function moveNode(nodeId: string, parentId: string | null) {
    const node = world?.nodes.find((item) => item.id === nodeId);
    if (!node) return;
    upsertNode({ ...node, parentId });
    setSelection({ nodeId });
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowSearch(true);
      }
      if (!isTyping && event.shiftKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        loadSample("game-of-thrones");
        setSelection({});
      }
      if (!isTyping && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        createNode("character");
      }
      if (!isTyping && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        createLoreForSelection();
      }
      if (event.key === "Escape") {
        setShowSearch(false);
        setSelection({});
      }
      if (!isTyping && event.key === "Delete") {
        if (selection.nodeId) removeNode(selection.nodeId);
        if (selection.edgeId) removeEdge(selection.edgeId);
        setSelection({});
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selection, removeEdge, removeNode, loadSample]);

  return (
    <main className="relative h-screen overflow-hidden bg-gray-50 text-gray-950 dark:bg-neutral-950 dark:text-gray-100">
      <TopBar onSearch={() => setShowSearch(true)} />
      {showSearch && <SearchPopover value={search} onChange={setSearch} onClose={() => setShowSearch(false)} />}
      <div className="flex h-[calc(100vh-56px)]">
        <NodeLayersSidebar nodes={world?.nodes ?? []} selectedNodeId={selection.nodeId} onSelect={(nodeId) => setSelection({ nodeId })} onMove={moveNode} />
        <WorldCanvas query={search} selectedNodeId={selection.nodeId} selectedEdgeId={selection.edgeId} onSelectionChange={setSelection} />
        <InspectorPanel
          onNodeChange={upsertNode}
          onEdgeChange={upsertEdge}
          node={world?.nodes.find((node) => node.id === selection.nodeId)}
          edge={world?.edges.find((edge) => edge.id === selection.edgeId)}
          worldNodes={world?.nodes ?? []}
          worldEdges={world?.edges ?? []}
        />
      </div>
      {(!world || world.name === "Game of Thrones") && <ExploreGuide onLoadSample={loadSample} />}
      <FloatingCreateDock canCreateNode={Boolean(world)} onCreateNode={createNode} onCreateWorld={createWorld} onLoadSample={loadSample} />
    </main>
  );
}

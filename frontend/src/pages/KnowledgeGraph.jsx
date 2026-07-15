import { useEffect, useState } from "react";

import ReactFlow, {
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

import { getKnowledgeGraph } from "../services/knowledgeService";

export default function KnowledgeGraph() {

  const [nodes, setNodes] = useState([]);

  const [edges, setEdges] = useState([]);

  useEffect(() => {

    loadGraph();

  }, []);

  async function loadGraph() {

    const graph =
      await getKnowledgeGraph();

    setNodes(graph.nodes);

    setEdges(graph.edges);

  }

  return (
    <div className="h-screen">

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <Background />

        <Controls />

      </ReactFlow>

    </div>
  );

}
import React, { useState, useCallback, useEffect } from "react";
import CustomEdge from "@/components/CustomEdge";
import { ActionNode, EndNode, NodeData, StartNode } from "@/components/NodeType";
import { Button } from "@/components/ui/button";
import {
  ReactFlow,
  Background,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Node,
  useNodesState,
  Edge,
  MarkerType,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X } from "lucide-react";

// Import refactored components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeaderPanel } from "@/components/flowPanels/HeaderPanel";
import { UndoRedoPanel } from "@/components/flowPanels/UndoRedoPanel";
import { ZoomPanel } from "@/components/flowPanels/ZoomPanel";
import { ApiForm } from "@/components/nodeForms/ApiForm";
import { EmailForm } from "@/components/nodeForms/EmailForm";
import { TextForm } from "@/components/nodeForms/TextForm";

// Define custom node type
type CustomNode = Node<NodeData, "startNode" | "endNode" | "api" | "email" | "text">;

const getInitialNodes = (): CustomNode[] => [
  {
    id: "start",
    type: "startNode",
    data: { label: "Start" },
    position: { x: 250, y: 50 },
    draggable: false,
  },
  {
    id: "end",
    type: "endNode",
    data: { label: "End" },
    position: { x: 250, y: 250 },
    draggable: false,
  },
];

const EditorPageContent = () => {
  const [zoom, setZoom] = useState(1);
  const [isDirty, setIsDirty] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [nodes, setNodes] = useNodesState<CustomNode>(getInitialNodes());
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const [editingNode, setEditingNode] = useState<{ id: string; type: string } | null>(null);

  const reactFlowInstance = useReactFlow();

  const handleEditNode = useCallback((nodeId: string, nodeType: string) => {
    setEditingNode({ id: nodeId, type: nodeType });
  }, []);

  const addNewNode = useCallback(
    (edgeId: string, nodeType: string) => {
      const currentNodes = reactFlowInstance.getNodes();
      const currentEdges = reactFlowInstance.getEdges();
      const edgeToSplit = currentEdges.find((e) => e.id === edgeId);
      if (!edgeToSplit) return;

      const sourceNode = currentNodes.find((n) => n.id === edgeToSplit.source);
      const targetNode = currentNodes.find((n) => n.id === edgeToSplit.target);
      if (!sourceNode || !targetNode) return;

      const spacing = 150;
      const newNodeX = 125;
      const newNodeY = sourceNode.position.y + spacing;
      const newNodeId = `node-${Date.now()}`;
      const newNode: CustomNode = {
        id: newNodeId,
        type: nodeType as CustomNode["type"],
        data: {
          label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
          onDelete: () => handleDeleteNode(newNodeId),
          onEdit: () => handleEditNode(newNodeId, nodeType),
        },
        position: { x: newNodeX, y: newNodeY },
        draggable: true,
      };

      const requiredTargetY = newNodeY + spacing;
      const shiftDelta = requiredTargetY - targetNode.position.y;

      const newEdges: Edge[] = [
        {
          id: `${edgeToSplit.source}-${newNodeId}`,
          source: edgeToSplit.source,
          target: newNodeId,
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: { strokeWidth: 2, stroke: "#828282" },
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: "#828282" },
          data: { addNewNode },
        },
        {
          id: `${newNodeId}-${edgeToSplit.target}`,
          source: newNodeId,
          target: edgeToSplit.target,
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: { strokeWidth: 2, stroke: "#828282" },
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: "#828282" },
          data: { addNewNode },
        },
      ];

      setNodes((nds) =>
        nds
          .map((node) => {
            if (node.position.y >= targetNode.position.y) {
              return { ...node, position: { ...node.position, y: node.position.y + shiftDelta } };
            }
            return node;
          })
          .concat(newNode)
      );

      setEdges((eds) => eds.filter((e) => e.id !== edgeId).concat(newEdges));
      setIsDirty(true);
    },
    [reactFlowInstance, setNodes, setEdges]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setEdges((eds) => {
        const incomingEdges = eds.filter((e) => e.target === nodeId);
        const outgoingEdges = eds.filter((e) => e.source === nodeId);
        if (incomingEdges.length === 1 && outgoingEdges.length === 1) {
          const newEdge = {
            id: `${incomingEdges[0].source}-${outgoingEdges[0].target}`,
            source: incomingEdges[0].source,
            target: outgoingEdges[0].target,
            sourceHandle: "a",
            targetHandle: "a",
            type: "custom",
            style: { strokeWidth: 2, stroke: "#828282" },
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: "#828282" },
            data: { addNewNode },
          };
          return [...eds.filter((e) => e.source !== nodeId && e.target !== nodeId), newEdge];
        }
        return eds.filter((e) => e.source !== nodeId && e.target !== nodeId);
      });

      setNodes((nds) => {
        const deletedNode = nds.find((n) => n.id === nodeId);
        if (!deletedNode) return nds.filter((n) => n.id !== nodeId);
        const deletedY = deletedNode.position.y;
        const spacing = 150;
        return nds
          .filter((n) => n.id !== nodeId)
          .map((node) => {
            if (node.position.y > deletedY) {
              return { ...node, position: { ...node.position, y: node.position.y - spacing } };
            }
            return node;
          });
      });

      setIsDirty(true);
    },
    [setNodes, setEdges, addNewNode]
  );

  const initialEdges = React.useMemo(
    () => [
      {
        id: "start-end",
        source: "start",
        target: "end",
        sourceHandle: "a",
        targetHandle: "a",
        type: "custom",
        style: { strokeWidth: 2, stroke: "#828282" },
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: "#828282" },
        data: { addNewNode },
      },
    ],
    [addNewNode]
  );

  useEffect(() => {
    setEdges(initialEdges);
  }, [setEdges, initialEdges]);

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    reactFlowInstance.setViewport({ ...reactFlowInstance.getViewport(), zoom: newZoom });
  };

  return (
    <div className="min-h-screen h-screen bg-[#FBF7F1] relative">
      <ReactFlow
        nodes={nodes}
        nodeTypes={{ startNode: StartNode, endNode: EndNode, api: ActionNode, email: ActionNode, text: ActionNode }}
        edges={edges}
        edgeTypes={{ custom: CustomEdge }}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#F2E3C3" gap={20} size={2} />
        <Panel position="top-left">
          <HeaderPanel onSave={() => setSaveModal(true)} isDirty={isDirty} />
        </Panel>
        <Panel position="bottom-left">
          <UndoRedoPanel />
        </Panel>
        <Panel position="bottom-right">
          <ZoomPanel zoom={zoom} onZoomChange={handleZoomChange} />
        </Panel>
      </ReactFlow>

      {editingNode && (
        <div className="absolute left-0 top-0 h-full w-full bg-black/10">
          <div className="flex justify-end h-full w-full items-center">
            <div className="bg-white rounded-lg w-full max-w-[596px] mr-10">
              <div className="relative">
                <div className="p-4">
                  <div className="flex justify-end items-center py-2">
                    <button className="text-black cursor-pointer" onClick={() => setEditingNode(null)}>
                      <X size={18} />
                    </button>
                  </div>
                  <div className="pt-4">
                    {editingNode.type === "api" && <ApiForm />}
                    {editingNode.type === "email" && <EmailForm />}
                    {editingNode.type === "text" && <TextForm />}
                  </div>
                </div>
                <div className="p-4 flex justify-end items-center gap-4 dialog-shadow">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white hover:text-white cursor-pointer font-medium text-sm py-1.5 px-3 rounded-sm bg-[#EE3425] hover:bg-[#EE3425]"
                  >
                    Save
                  </Button>
                </div>
                <div className="absolute -left-21 top-13">
                  <div className="shadow-badge -rotate-90 bg-white px-3 py-1 text-[#EE3425] text-sm rounded-md font-semibold">
                    Configuration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {saveModal && (
        <div className="absolute left-0 top-0 h-full w-full bg-black/30">
          <div className="flex justify-center h-full w-full items-center">
            <div className="bg-white rounded-lg w-full max-w-[596px]">
              <div className="p-4">
                <div className="flex justify-between items-center py-2">
                  <h2 className="text-[#333333] text-lg font-semibold">Save your workflow</h2>
                  <button className="text-black cursor-pointer" onClick={() => setSaveModal(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="pt-6 pb-16">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="text" className="text-[#4F4F4F] font-normal text-xs">
                        Name
                      </Label>
                      <Input
                        id="text"
                        type="text"
                        placeholder="Type here..."
                        required
                        className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-[#4F4F4F] font-normal text-xs">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Type here..."
                        required
                        className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="p-4 flex justify-end items-center gap-4 dialog-shadow">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white hover:text-white cursor-pointer font-medium text-sm py-1.5 px-3 rounded-sm bg-[#EE3425] hover:bg-[#EE3425]"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EditorPage = () => (
  <ReactFlowProvider>
    <EditorPageContent />
  </ReactFlowProvider>
);
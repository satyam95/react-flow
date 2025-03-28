import React, { useState, useCallback, useEffect } from "react";
import CustomEdge from "@/components/CustomEdge";
import {
  ActionNode,
  EndNode,
  NodeData,
  StartNode,
} from "@/components/NodeType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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
} from "@xyflow/react"; // Position,
import "@xyflow/react/dist/style.css";
import { Minus, Plus, Redo, Undo, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define custom node type without "generic"
type CustomNode = Node<
  NodeData,
  "startNode" | "endNode" | "api" | "email" | "text"
>;

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

  const reactFlowInstance = useReactFlow();
  const navigate = useNavigate();

  // Stable addNewNode function using reactFlowInstance
  const addNewNode = useCallback(
    (edgeId: string, nodeType: string) => {
      console.log("add triggered", nodeType);
      const currentNodes = reactFlowInstance.getNodes();
      const currentEdges = reactFlowInstance.getEdges();

      console.log("current nodes", currentNodes);
      console.log("current edges", currentEdges);

      const edgeToSplit = currentEdges.find((e) => e.id === edgeId);
      if (!edgeToSplit) return;

      const sourceNode = currentNodes.find((n) => n.id === edgeToSplit.source);
      const targetNode = currentNodes.find((n) => n.id === edgeToSplit.target);
      if (!sourceNode || !targetNode) return;

      // Define fixed vertical spacing
      const spacing = 150;

      // Set the new node position: exactly spacing units below source node.
      const newNodeX = 125; // assuming vertical alignment
      const newNodeY = sourceNode.position.y + spacing;
      const newNodeId = `node-${Date.now()}`;
      const newNode: CustomNode = {
        id: newNodeId,
        type: nodeType as CustomNode["type"],
        data: {
          label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
          onDelete: () => handleDeleteNode(newNodeId),
        },
        position: { x: newNodeX, y: newNodeY },
        draggable: true,
      };

      // The target node should now be positioned spacing units below the new node.
      const requiredTargetY = newNodeY + spacing;
      // Calculate how much we need to shift the target node (and any nodes below it)
      const shiftDelta = requiredTargetY - targetNode.position.y;

      // Create new edges: source -> new node and new node -> target
      const newEdges: Edge[] = [
        {
          id: `${edgeToSplit.source}-${newNodeId}`,
          source: edgeToSplit.source,
          target: newNodeId,
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: { strokeWidth: 2, stroke: "#828282" },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#828282",
          },
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
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#828282",
          },
          data: { addNewNode },
        },
      ];

      console.log("new node", newNode);
      console.log("new edges", newEdges);

      // Update nodes:
      // - Add the new node.
      // - For the target node and any nodes that are lower in the vertical chain,
      //   shift their y position by shiftDelta to maintain the spacing.
      setNodes((nds) => {
        const updatedNodes = nds
          .map((node) => {
            // Shift nodes that are at or below the current target node
            if (node.position.y >= targetNode.position.y) {
              return {
                ...node,
                position: { ...node.position, y: node.position.y + shiftDelta },
              };
            }
            return node;
          })
          .concat(newNode);

        console.log("updated nodes", updatedNodes);
        return updatedNodes;
      });

      // Update edges: remove the original edge and add the new edges.
      setEdges((eds) => {
        const updatedEdges = eds
          .filter((e) => e.id !== edgeId)
          .concat(newEdges);
        console.log("updated edges", updatedEdges);
        return updatedEdges;
      });

      setIsDirty(true);
    },
    [reactFlowInstance, setNodes, setEdges]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      console.log("delete", nodeId);
  
      // Update edges
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
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#828282",
            },
            data: { addNewNode },
          };
          return [...eds.filter((e) => e.source !== nodeId && e.target !== nodeId), newEdge];
        } else {
          return eds.filter((e) => e.source !== nodeId && e.target !== nodeId);
        }
      });
  
      // Update nodes by removing the deleted node and adjusting positions
      setNodes((nds) => {
        const deletedNode = nds.find((n) => n.id === nodeId);
        if (!deletedNode) return nds.filter((n) => n.id !== nodeId);
  
        const deletedY = deletedNode.position.y;
        const spacing = 150; // Adjust this value based on your desired spacing
  
        // Shift all nodes below the deleted node upwards
        const updatedNodes = nds
          .filter((n) => n.id !== nodeId)
          .map((node) => {
            if (node.position.y > deletedY) {
              return {
                ...node,
                position: { ...node.position, y: node.position.y - spacing },
              };
            }
            return node;
          });
  
        return updatedNodes;
      });
  
      setIsDirty(true);
    },
    [setNodes, setEdges, addNewNode]
  );

  // Define initial edges with stable addNewNode
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
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#828282",
        },
        data: { addNewNode },
      },
    ],
    [addNewNode]
  );

  // Set edges only on mount
  useEffect(() => {
    setEdges(initialEdges);
  }, [setEdges, initialEdges]);

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    reactFlowInstance.setViewport({
      ...reactFlowInstance.getViewport(),
      zoom: newZoom,
    });
  };

  const handleCancel = () => {
    if (
      isDirty &&
      !window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
    ) {
      return;
    }
    navigate("/workflows");
  };

  return (
    <div className="min-h-screen h-screen bg-[#FBF7F1] relative">
      <ReactFlow
        nodes={nodes}
        nodeTypes={{
          startNode: StartNode,
          endNode: EndNode,
          api: ActionNode,
          email: ActionNode,
          text: ActionNode,
        }}
        edges={edges}
        edgeTypes={{ custom: CustomEdge }}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#F2E3C3" gap={20} size={2} />
        <Panel position="top-left">
          <div className="bg-white h-12 rounded-md shadow-blu py-3 px-6 flex justify-between gap-6 items-center">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-[#221F20] font-semibold text-base p-0 hover:bg-white cursor-pointer underline"
            >
              {"<- Go Back"}
            </Button>
            <div className="text-[#221F20] font-semibold text-base">
              Untitled
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSaveModal(!saveModal)}
            >
              <img src="/save.png" alt="save icon" height={32} width={32} />
            </Button>
          </div>
        </Panel>
        <Panel position="bottom-left">
          <div className="bg-white h-10 border-2 border-[#E0E0E0] rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-10 h-full border-r-2 border-[#E0E0E0]"
            >
              <Undo size={20} className="text-black" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-10 h-full"
            >
              <Redo size={20} className="text-black" />
            </Button>
          </div>
        </Panel>
        <Panel position="bottom-right">
          <div className="flex items-center bg-white h-10 border-2 border-[#E0E0E0] rounded-lg">
            <div className="h-full w-10 border-r-2 border-[#E0E0E0] flex justify-center items-center">
              <div className="h-5 w-5 rounded-full border-2 border-[#ABCD62] flex justify-center items-center">
                <div className="bg-[#ABCD62] rounded-full h-3 w-3" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-10 h-full border-r-2 border-[#E0E0E0]"
              onClick={() => handleZoomChange([Math.max(0.1, zoom - 0.1)])}
            >
              <Minus size={20} className="text-black" />
            </Button>
            <div className="w-50 px-4">
              <Slider
                value={[zoom]}
                min={0.1}
                max={2}
                step={0.01}
                className="custom-slider"
                onValueChange={handleZoomChange}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none w-10 h-full border-l-2 border-[#E0E0E0]"
              onClick={() => handleZoomChange([Math.min(2, zoom + 0.1)])}
            >
              <Plus size={20} className="text-black" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>

      {saveModal && (
        <div className="absolute left-0 top-0 h-full w-full bg-black/30">
          <div className="flex justify-center h-full w-full items-center">
            <div className="bg-white rounded-lg w-full max-w-[596px]">
              <div className="p-4">
                <div className="flex justify-between items-center py-2">
                  <h2 className="text-[#333333] text-lg font-semibold">
                    Save your workflow
                  </h2>
                  <button
                    className="text-black cursor-pointer"
                    onClick={() => setSaveModal(!saveModal)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="pt-6 pb-16">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="text"
                        className="text-[#4F4F4F] font-normal text-xs"
                      >
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
                      <Label
                        htmlFor="description"
                        className="text-[#4F4F4F] font-normal text-xs"
                      >
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

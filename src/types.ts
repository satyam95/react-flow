import { Node, Edge } from "@xyflow/react";

export interface SerializableNodeData {
  label: string;
  [key: string]: unknown;
}

export type SerializableNode = Node<
  SerializableNodeData,
  "startNode" | "endNode" | "api" | "email" | "text"
>;

export interface SerializableEdgeData {
    [key: string]: unknown;
}

export type SerializableEdge = Edge<SerializableEdgeData>;
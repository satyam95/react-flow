// data.ts

import { Workflow } from "./storage";

export const seedWorkflows: Workflow[] = [
  {
    id: "as4hor4hqv",
    name: "Workflow 1",
    description: "Some description here regarding the flow..",
    createdAt: 1743254769616,
    updatedAt: 1743254769616,
    flowData: {
      nodes: [
        {
          id: "start",
          type: "startNode",
          data: {
            label: "Start",
          },
          position: {
            x: 250,
            y: 50,
          },
          draggable: false,
        },
        {
          id: "end",
          type: "endNode",
          data: {
            label: "End",
          },
          position: {
            x: 250,
            y: 350,
          },
          draggable: false,
        },
        {
          id: "node-1743254733190",
          type: "api",
          data: {
            label: "Api",
          },
          position: {
            x: 125,
            y: 200,
          },
          draggable: true,
        },
      ],
      edges: [
        {
          id: "start-node-1743254733190",
          source: "start",
          target: "node-1743254733190",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254733190-end",
          source: "node-1743254733190",
          target: "end",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
      ],
    },
  },
  {
    id: "u533lv3iq5",
    name: "Workflow 2",
    description: "Some description here regarding the flow..",
    createdAt: 1743254808353,
    updatedAt: 1743254808353,
    flowData: {
      nodes: [
        {
          id: "start",
          type: "startNode",
          data: {
            label: "Start",
          },
          position: {
            x: 250,
            y: 50,
          },
          draggable: false,
        },
        {
          id: "end",
          type: "endNode",
          data: {
            label: "End",
          },
          position: {
            x: 250,
            y: 500,
          },
          draggable: false,
        },
        {
          id: "node-1743254790825",
          type: "api",
          data: {
            label: "Api",
          },
          position: {
            x: 125,
            y: 200,
          },
          draggable: true,
        },
        {
          id: "node-1743254793890",
          type: "email",
          data: {
            label: "Email",
          },
          position: {
            x: 125,
            y: 350,
          },
          draggable: true,
        },
      ],
      edges: [
        {
          id: "start-node-1743254790825",
          source: "start",
          target: "node-1743254790825",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254790825-node-1743254793890",
          source: "node-1743254790825",
          target: "node-1743254793890",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254793890-end",
          source: "node-1743254793890",
          target: "end",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
      ],
    },
  },
  {
    id: "muxuo7brmi",
    name: "Workflow 3",
    description: "Some description here regarding the flow..",
    createdAt: 1743254883678,
    updatedAt: 1743254883678,
    flowData: {
      nodes: [
        {
          id: "start",
          type: "startNode",
          data: {
            label: "Start",
          },
          position: {
            x: 250,
            y: 50,
          },
          draggable: false,
        },
        {
          id: "end",
          type: "endNode",
          data: {
            label: "End",
          },
          position: {
            x: 250,
            y: 650,
          },
          draggable: false,
        },
        {
          id: "node-1743254845512",
          type: "api",
          data: {
            label: "Api",
          },
          position: {
            x: 125,
            y: 200,
          },
          draggable: true,
        },
        {
          id: "node-1743254848887",
          type: "email",
          data: {
            label: "Email",
          },
          position: {
            x: 125,
            y: 350,
          },
          draggable: true,
        },
        {
          id: "node-1743254852019",
          type: "text",
          data: {
            label: "Text",
          },
          position: {
            x: 125,
            y: 500,
          },
          draggable: true,
        },
      ],
      edges: [
        {
          id: "start-node-1743254845512",
          source: "start",
          target: "node-1743254845512",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254845512-node-1743254848887",
          source: "node-1743254845512",
          target: "node-1743254848887",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254848887-node-1743254852019",
          source: "node-1743254848887",
          target: "node-1743254852019",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254852019-end",
          source: "node-1743254852019",
          target: "end",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
      ],
    },
  },
  {
    id: "bolpr9oeqo",
    name: "Workflow 4",
    description: "Some description here regarding the flow..",
    createdAt: 1743254929236,
    updatedAt: 1743254929236,
    flowData: {
      nodes: [
        {
          id: "start",
          type: "startNode",
          data: {
            label: "Start",
          },
          position: {
            x: 250,
            y: 50,
          },
          draggable: false,
        },
        {
          id: "end",
          type: "endNode",
          data: {
            label: "End",
          },
          position: {
            x: 250,
            y: 650,
          },
          draggable: false,
        },
        {
          id: "node-1743254896814",
          type: "api",
          data: {
            label: "Api",
          },
          position: {
            x: 125,
            y: 200,
          },
          draggable: true,
        },
        {
          id: "node-1743254899990",
          type: "email",
          data: {
            label: "Email",
          },
          position: {
            x: 125,
            y: 500,
          },
          draggable: true,
        },
        {
          id: "node-1743254903559",
          type: "text",
          data: {
            label: "Text",
          },
          position: {
            x: 125,
            y: 350,
          },
          draggable: true,
        },
      ],
      edges: [
        {
          id: "start-node-1743254896814",
          source: "start",
          target: "node-1743254896814",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254899990-end",
          source: "node-1743254899990",
          target: "end",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254896814-node-1743254903559",
          source: "node-1743254896814",
          target: "node-1743254903559",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
        {
          id: "node-1743254903559-node-1743254899990",
          source: "node-1743254903559",
          target: "node-1743254899990",
          sourceHandle: "a",
          targetHandle: "a",
          type: "custom",
          style: {
            strokeWidth: 2,
            stroke: "#828282",
          },
          markerEnd: {
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#828282",
          },
        },
      ],
    },
  },
];

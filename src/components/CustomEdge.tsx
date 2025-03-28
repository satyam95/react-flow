import { EdgeProps, getBezierPath } from "@xyflow/react";
import NodeSelector from "@/components/NodeSelector";
import { useState } from "react";

interface CustomEdgeProps extends EdgeProps {
  data?: {
    addNewNode?: (edgeId: string, nodeType: string) => void;
  };
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: CustomEdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);

  const handleNodeSelect = (nodeType: string) => {
    if (data?.addNewNode) {
      data.addNewNode(id, nodeType); // Call the function with edge ID and node type
    }
    setIsNodeSelectorOpen(false);
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{ ...style, stroke: "#828282", strokeWidth: 2 }}
        markerEnd={markerEnd}
      />
      <g>
        <circle
          cx={labelX}
          cy={labelY}
          r={10}
          fill="white"
          stroke="#000"
          strokeWidth={1}
          style={{ cursor: "pointer" }}
        />
        <text
          x={labelX}
          y={labelY}
          dy=".3em"
          textAnchor="middle"
          fill="#000"
          fontSize="14"
          fontWeight="bold"
          style={{ cursor: "pointer" }}
        >
          +
        </text>
      </g>
      <foreignObject
        x={labelX - 10}
        y={labelY - 10}
        width={20}
        height={20}
        style={{ overflow: "visible" }}
      >
        <NodeSelector
          isOpen={isNodeSelectorOpen}
          onClose={() => setIsNodeSelectorOpen(false)}
          onSelect={handleNodeSelect}
          triggerElement={
            <div
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onClick={(event) => {
                event.stopPropagation();
                setIsNodeSelectorOpen(true);
              }}
            />
          }
        />
      </foreignObject>
    </>
  );
};

export default CustomEdge;

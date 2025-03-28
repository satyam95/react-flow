import { Handle, Position } from "@xyflow/react";
import {
  CircleAlert,
  CircleCheck,
  CirclePlus,
  Settings,
  Trash2,
} from "lucide-react";

export interface NodeData {
  label: string;
  type?: string;
  status?: "success" | "error" | "pending";
  [key: string]: any;
}

// Start Node Component
export const StartNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="flex items-center justify-center rounded-full border-6 border-[#849E4C] w-20 h-20">
      <div className="w-14 h-14 rounded-full bg-[#849E4C] flex items-center justify-center text-white text-base font-medium">
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={{ background: "#849E4C" }}
        />
        {data.label}
      </div>
    </div>
  );
};

export const EndNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="flex items-center justify-center rounded-full border-6 border-[#EE3425] w-20 h-20">
      <div className="w-14 h-14 rounded-full bg-[#EE3425] flex items-center justify-center text-white text-base font-medium">
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          style={{ background: "#EE3425" }}
        />
        {data.label}
      </div>
    </div>
  );
};

export const AddNodeButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white border border-gray-200 w-[30px] h-[30px] cursor-pointer shadow-sm absolute -translate-y-1/2 left-1/2 -translate-x-1/2 hover:bg-gray-50 z-10"
      onClick={onClick}
    >
      <CirclePlus size={20} className="text-gray-500" />
    </div>
  );
};

// Action Node Component (API Call, Email, Text Box)

export const ActionNode: React.FC<{
  data: NodeData;
  type: string;
  id?: string;
  selected?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}> = ({ data, type, selected, onDelete, onEdit }) => { // id
  const getTypeIcon = () => {
    switch (type) {
      case "api":
        return (
          <div className="p-1 rounded-full bg-blue-100">
            <Settings size={14} className="text-blue-600" />
          </div>
        );
      case "email":
        return (
          <div className="p-1 rounded-full bg-green-100">
            <Settings size={14} className="text-green-600" />
          </div>
        );
      case "text":
        return (
          <div className="p-1 rounded-full bg-purple-100">
            <Settings size={14} className="text-purple-600" />
          </div>
        );
      default:
        return (
          <div className="p-1 rounded-full bg-gray-100">
            <Settings size={14} className="text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg bg-white border ${
        selected ? "border-[#9AE19D]" : "border-[#E5E7EB]"
      } min-w-[330px] shadow-sm`}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: "-5px", background: "#555" }}
      />
      {getTypeIcon()}
      <span className="text-gray-800 flex-1">{data.label}</span>
      <div className="flex items-center space-x-1">
        {data.status === "success" && (
          <CircleCheck size={20} className="text-[#9AE19D]" />
        )}
        {data.status === "error" && (
          <CircleAlert size={20} className="text-[#FF6B6B]" />
        )}
        {!data.status && onEdit && (
          <button
            onClick={onEdit}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Settings size={18} className="text-[#9AE19D]" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Trash2 size={18} className="text-[#FF6B6B]" />
          </button>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: "-5px", background: "#555" }}
      />
    </div>
  );
};

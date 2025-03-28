import React from "react";
import { Globe, Mail, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NodeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (nodeType: string) => void;
  triggerElement?: React.ReactNode; // Optional trigger element for the dropdown
}

interface NodeTypeOption {
  type: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const nodeTypes: NodeTypeOption[] = [
  {
    type: "api",
    label: "API Call",
    icon: <Globe className="h-5 w-5 text-blue-500" />,
    description: "Make an HTTP request to an external API",
  },
  {
    type: "email",
    label: "Email",
    icon: <Mail className="h-5 w-5 text-green-500" />,
    description: "Send an email notification",
  },
  {
    type: "text",
    label: "Text Box",
    icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
    description: "Add a text content or message",
  },
];

const NodeSelector: React.FC<NodeSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  triggerElement,
}) => {
  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose(); // Only call onClose when the dropdown is closing
      }}
    >
      <DropdownMenuTrigger asChild>
        {triggerElement || <span />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 bg-white shadow-lg rounded-md p-1">
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
          Select Node Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        {nodeTypes.map((nodeType) => (
          <DropdownMenuItem
            key={nodeType.type}
            onClick={() => {
              onSelect(nodeType.type);
              onClose();
            }}
            className="flex flex-col items-start p-3 rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <div className="flex items-center gap-2">
              {nodeType.icon}
              <span className="text-sm font-medium text-gray-800">
                {nodeType.label} {/* Fixed typo: nodegradlenodeType.label -> nodeType.label */}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{nodeType.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeSelector;
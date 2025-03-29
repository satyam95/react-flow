import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderPanelProps {
  onSave: () => void;
  isDirty: boolean;
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({ onSave, isDirty }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (
      isDirty &&
      !window.confirm("You have unsaved changes. Are you sure you want to leave?")
    ) {
      return;
    }
    navigate("/workflows");
  };

  return (
    <div className="bg-white h-12 rounded-md shadow-blu py-3 px-6 flex justify-between gap-6 items-center">
      <Button
        variant="ghost"
        onClick={handleCancel}
        className="text-[#221F20] font-semibold text-base p-0 hover:bg-white cursor-pointer underline"
      >
        {"<- Go Back"}
      </Button>
      <div className="text-[#221F20] font-semibold text-base">Untitled</div>
      <Button variant="ghost" size="icon" onClick={onSave}>
        <img src="/save.png" alt="save icon" height={32} width={32} />
      </Button>
    </div>
  );
};
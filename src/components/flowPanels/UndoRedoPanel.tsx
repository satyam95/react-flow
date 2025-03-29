import { Button } from "@/components/ui/button";
import { Undo, Redo } from "lucide-react";

export const UndoRedoPanel = () => {
  return (
    <div className="bg-white h-10 border-2 border-[#E0E0E0] rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-none w-10 h-full border-r-2 border-[#E0E0E0]"
      >
        <Undo size={20} className="text-black" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-none w-10 h-full">
        <Redo size={20} className="text-black" />
      </Button>
    </div>
  );
};

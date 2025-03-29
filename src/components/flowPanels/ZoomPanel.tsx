import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from "lucide-react";

interface ZoomPanelProps {
  zoom: number;
  onZoomChange: (value: number[]) => void;
}

export const ZoomPanel: React.FC<ZoomPanelProps> = ({ zoom, onZoomChange }) => {
  return (
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
        onClick={() => onZoomChange([Math.max(0.1, zoom - 0.1)])}
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
          onValueChange={onZoomChange}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-none w-10 h-full border-l-2 border-[#E0E0E0]"
        onClick={() => onZoomChange([Math.min(2, zoom + 0.1)])}
      >
        <Plus size={20} className="text-black" />
      </Button>
    </div>
  );
};

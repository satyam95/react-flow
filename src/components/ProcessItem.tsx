import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";

interface ProcessItemProps {
  text: string;
  status: string;
}

const ProcessItem = ({ text, status }: ProcessItemProps) => {
  return (
    <div className="timeline-item px-3 relative z-30">
      <div className="vertical-line bg-[#FFE1D2] w-0.5 h-[58px] absolute left-[19px] top-[11px] -z-10" />
      <div className="flex items-center gap-4">
        <div className="h-4 w-4 rounded-full bg-[#FFE1D2] flex justify-center items-center">
          <div className="h-2 w-2 rounded-full bg-[#FF5200]" />
        </div>
        <p className="text-sm text-black">{text}</p>
        <div className="flex items-center space-x-4">
          <Badge
            className={`min-w-[54px] text-center rounded-md text-[#221F20] text-xs px-1 py-0.5 ${
              status === "Passed" ? "bg-[#DDEBC0]" : "bg-[#F8AEA8]"
            }`}
          >
            {status}
          </Badge>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default ProcessItem;

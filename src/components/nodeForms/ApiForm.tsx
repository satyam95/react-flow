import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const ApiForm = () => {
  return (
    <div className="pb-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-[#4F4F4F] font-normal text-xs">
            Method
          </Label>
          <Select>
            <SelectTrigger className="w-full select-custom">
              <SelectValue
                placeholder="Select a Method"
                className="text-[#BDBDBD]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="url" className="text-[#4F4F4F] font-normal text-xs">
            URL
          </Label>
          <Input
            id="url"
            type="text"
            placeholder="Type here..."
            required
            className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="header"
            className="text-[#4F4F4F] font-normal text-xs"
          >
            Headers
          </Label>
          <Input
            id="header"
            type="text"
            placeholder="Type here..."
            required
            className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body" className="text-[#4F4F4F] font-normal text-xs">
            Body
          </Label>
          <Textarea
            id="body"
            rows={6}
            placeholder="Enter Descriptions..."
            required
            className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>
      </form>
    </div>
  );
};

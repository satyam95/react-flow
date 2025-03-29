import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EmailForm = () => {
  return (
    <div className="pb-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4F4F4F] font-normal text-xs">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Type here..."
            required
            className="h-[42px] border-[#E0E0E0] text-base placeholder:text-[#BDBDBD] bg-white placeholder:text-base shadow-none ring-0 focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>
      </form>
    </div>
  );
};

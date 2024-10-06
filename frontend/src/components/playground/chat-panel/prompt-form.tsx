import { Button, Textarea } from "@lemonsqueezy/wedges";
import { CornerDownLeft } from "lucide-react";

export const PromptForm = () => {
  return (
    <div className="flex w-full grow flex-col p-1 bg-white">
      <div className="flex gap-1 w-full items-center">
        <div className="relative w-full">
          <Textarea
            className="resize-none pr-10 min-h-10"
            placeholder="Ask me anything..."
          />
          <Button
            className="absolute right-2 top-4 "
            before={<CornerDownLeft />}
          />
        </div>
      </div>
    </div>
  );
};

import { Button } from "@lemonsqueezy/wedges";
import { PauseIcon, PlayCircleIcon } from "lucide-react";
import { useTimer } from "../hooks/use-timer";
import { TooltipWrapper } from "./shared/tooltip-wrapper";

export const CountDownTimerButton = () => {
  const { time, isRunning, toggleTimer, formatTime } = useTimer(2700);
  return (
    <>
      <TooltipWrapper
        button={
          <Button
            onClick={toggleTimer}
            variant="outline"
            className="font-semibold w-[130px] bg-background flex flex-col items-center gap-2"
          >
            {isRunning ? (
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <PauseIcon className="w-4 h-4" />
                </span>
                {formatTime(time)}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PlayCircleIcon className="w-4 h-4" />
                {formatTime(time)}
              </span>
            )}
          </Button>
        }
        text={!isRunning ? "Start the timer" : "Pause the timer"}
      />
    </>
  );
};

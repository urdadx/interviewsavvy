import { Button } from "@lemonsqueezy/wedges";
import { PauseIcon, PlayCircleIcon, RefreshCcwIcon } from "lucide-react";
import { useTimer } from "../hooks/use-timer";

export const CountDownTimerButton = () => {
	const { time, isRunning, toggleTimer, resetTimer, formatTime } =
		useTimer(2700);
	return (
		<>
			<Button
				variant="outline"
				className="font-semibold w-[130px] bg-background flex flex-col items-center gap-2"
			>
				{isRunning ? (
					<span className="flex items-center gap-4">
						<span className="flex items-center gap-2">
							<PauseIcon onClick={toggleTimer} className="w-4 h-4" />
							{/* <RefreshCcwIcon onClick={resetTimer} className="w-4 h-4" /> */}
						</span>
						{formatTime(time)}
					</span>
				) : (
					<span className="flex items-center gap-2">
						<PlayCircleIcon
							onClick={toggleTimer}
							className="w-[18px] h-[18px]"
						/>
						{formatTime(time)}
					</span>
				)}
			</Button>
		</>
	);
};

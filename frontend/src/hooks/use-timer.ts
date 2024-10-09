import { useEffect, useState } from "react";

export const useTimer = (initialTime = 2700) => {
	const [time, setTime] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | null = null;

		if (isRunning && time > 0) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
		} else if (time === 0) {
			setIsRunning(false);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, time]);

	const toggleTimer = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsRunning((prevState) => !prevState);
	};

	const resetTimer = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsRunning(false);
		setTime(initialTime); // Reset to initial time
	};

	const formatTime = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	return { time, isRunning, toggleTimer, resetTimer, formatTime };
};

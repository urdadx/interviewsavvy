import { ScrollArea } from "../../ui/scroll-area";
import { AIMessage } from "./ai-message";
import { HumanMessage } from "./human-message";
export const ChatList = () => {
	return (
		<>
			<ScrollArea className="flex-grow px-1 w-full">
				<HumanMessage />
				<AIMessage />
				<HumanMessage />
			</ScrollArea>
		</>
	);
};

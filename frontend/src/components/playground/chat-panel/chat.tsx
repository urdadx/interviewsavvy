import { ScrollArea } from "../../ui/scroll-area";
import { ChatList } from "./chat-list";
import { PromptForm } from "./prompt-form";

export const Chat = () => {
	return (
		<>
			<ScrollArea className="flex-grow px-1 py-2">
				<ChatList />
			</ScrollArea>
			<div className="">
				<PromptForm />
			</div>
		</>
	);
};

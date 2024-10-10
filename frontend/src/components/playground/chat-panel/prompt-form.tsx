import { ArrowUpIcon, MicrophoneIcon } from "@iconicicons/react";
import { Button, Textarea } from "@lemonsqueezy/wedges";
import { useState } from "react";

export const PromptForm = () => {
	const [isTyping, setIsTyping] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setIsTyping(event.target.value.length > 0);
	};

	return (
		<div className="flex flex-col gap-1">
			<form className="flex w-full grow flex-col p-1">
				<div className="flex gap-1 w-full items-center">
					<div className="relative w-full">
						<Textarea
							className="resize-none pr-10 min-h-10"
							placeholder="Ask me anything..."
							onChange={(event) =>
								handleInputChange(
									event as React.ChangeEvent<HTMLTextAreaElement>,
								)
							}
						/>
						<Button
							shape="pill"
							className="absolute right-2 top-4 "
							before={isTyping ? <ArrowUpIcon /> : <MicrophoneIcon />}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

import { Textarea } from "@lemonsqueezy/wedges";

export const PromptForm = () => {
	return (
		<div className="relative flex w-full grow flex-col p-2 bg-white">
			<Textarea
				className="min-h-14 w-full resize-none"
				placeholder="Ask me anything..."
			/>
		</div>
	);
};

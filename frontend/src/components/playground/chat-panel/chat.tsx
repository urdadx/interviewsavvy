import { PromptForm } from "./prompt-form";

export const Chat = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow">
				{" "}
				{/* Content area above the textarea */}
				{/* Other content components can go here */}
			</div>
			<div className="sticky bottom-0 w-full">
				{" "}
				{/* Keep PromptForm at the bottom */}
				<PromptForm />
			</div>
		</div>
	);
};

import { Avatar } from "@lemonsqueezy/wedges";

export const HumanMessage = () => {
	return (
		<>
			<div className="w-full flex items-start space-x-3 mb-4">
				<Avatar size="sm" className=" border-2 border-primary">
					<Avatar.Image
						src="/placeholder.svg?height=40&width=40"
						alt="user message"
					/>
					<Avatar.Fallback>US</Avatar.Fallback>
				</Avatar>
				<div className="bg-primary text-white rounded-xl p-3 max-w-[90%]">
					<small className="text-sm xl:text-md break-words">
						Please help me debug this very gruesome code please
					</small>
				</div>
			</div>
		</>
	);
};

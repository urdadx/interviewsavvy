import { Avatar } from "@lemonsqueezy/wedges";
import useAuth from "../../../hooks/use-auth";

export const HumanMessage = () => {
	const { user } = useAuth();
	return (
		<>
			<div className="w-full flex items-start space-x-3 mb-4">
				<Avatar
					src={user?.avatarUrl}
					alt="user message avatar"
					size="sm"
					className="border border-primary mt-2"
				/>

				<div className="bg-primary text-white rounded-xl p-3 max-w-full">
					<small className="text-sm xl:text-md break-words">
						Please help me debug this very gruesome code please
					</small>
				</div>
			</div>
		</>
	);
};

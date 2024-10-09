import { createContext } from "react";
import useMe from "../hooks/use-me";

type Props = {
	children: React.ReactNode;
};

export type User = {
	id: string;
	name: string;
	email: string;
	avatarUrl: string;
	createdAt: string;
	updatedAt: string;
};

type UserContext = {
	user: User | null;
	userLoading: boolean;
};

export const userContext = createContext<UserContext>({
	user: {} as User,
	userLoading: false,
});

const UserProvider = ({ children }: Props) => {
	const { data: user, isPending: userLoading } = useMe();

	// if (userLoading || !user) {
	// 	return <div>The hell is going on?</div>;
	// }

	return (
		<userContext.Provider value={{ user, userLoading }}>
			{children}
		</userContext.Provider>
	);
};

export default UserProvider;

import {
	MenuIcon,
	SettingsIcon,
	UserIcon,
	WarningTriangleIcon,
} from "@iconicicons/react";
import { Avatar, Button, DropdownMenu } from "@lemonsqueezy/wedges";
import { Link } from "@tanstack/react-router";
import { BugPlayIcon, LogOutIcon } from "lucide-react";

import useAuth from "../../hooks/use-auth";
import { CountDownTimerButton } from "../countdown-timer-button";
import { VaulDrawer } from "./drawer";

export const Navbar = () => {
	const { user } = useAuth();
	return (
		<>
			<header className="sticky top-0 flex justify-between h-14 items-center gap-4 bg-surface-50 px-4 md:px-6">
				<nav className=" flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<span className="sr-only">
						Opens up the drawer with question list
					</span>
					<Link
						href="#"
						className="hidden text-primary text-lg lg:flex transition-colors hover:text-foreground"
					>
						IS
					</Link>
					<VaulDrawer
						button={
							<Button
								before={<MenuIcon className="w-4 h-4" />}
								variant="outline"
								className="text-muted-foreground bg-white transition-colors hover:text-foreground"
							>
								Problem List
							</Button>
						}
						content={<div>Hello World</div>}
					/>
				</nav>
				<div className="flex h-9 justify-end items-center gap-2">
					<Button
						before={<BugPlayIcon className="w-4 h-4" />}
						className="h-9 bg-white"
						variant="outline"
					>
						Run
					</Button>
					<Button className="h-9" variant="primary">
						Submit
					</Button>
				</div>
				<div className="flex items-center gap-3">
					<CountDownTimerButton />
					<Button variant="primary">Upgrade</Button>
					<DropdownMenu>
						<DropdownMenu.Trigger>
							<Avatar
								alt="user profile pic"
								className="cursor-pointer border-2 border-primary"
								src={user?.avatarUrl}
							/>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<UserIcon />
									<span>My Account</span>
								</DropdownMenu.Item>

								<DropdownMenu.Item>
									<SettingsIcon />
									<span>Preferences</span>
									<DropdownMenu.Shortcut keys={["command"]}>
										P
									</DropdownMenu.Shortcut>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<WarningTriangleIcon />
									<span>Report</span>
								</DropdownMenu.Item>
							</DropdownMenu.Group>

							<DropdownMenu.Separator />

							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<LogOutIcon color="red" size={18} />
									<span className="text-wg-red">Logout</span>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu>
				</div>
			</header>
		</>
	);
};

import { Link } from "@tanstack/react-router";
import {
	LayoutGrid,
	LogOut,
	PlusIcon,
	RotateCcwIcon,
	SettingsIcon,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "../components/ui/sidebar";

// This is sample data.
const data = {
	navItems: [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: LayoutGrid,
		},
		{
			name: "Analytics & Reports",
			url: "/analyics",
			icon: PlusIcon,
		},
		{
			name: "Sessions",
			url: "/sessions",
			icon: PlusIcon,
		},
		{
			name: "Problems",
			url: "/problems",
			icon: RotateCcwIcon,
		},
		{
			name: "Account Settings",
			url: "/account Settings",
			icon: SettingsIcon,
		},
		{
			name: "Logout",
			url: "#",
			icon: LogOut,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h2 className="font-semibold text-lg text-primary px-2">
					Interview Savvy
				</h2>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navItems.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

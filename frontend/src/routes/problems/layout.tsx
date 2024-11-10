import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "../../components/app-sidebar";

import { Button } from "@lemonsqueezy/wedges";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";

export const Route = createFileRoute("/problems")({
	component: Layout,
});

function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-40">
					<div />
					<div className="flex gap-2">
						<Link to="/login" className="">
							<Button variant="primary">Login</Button>
						</Link>
						<Link to="/register" className="">
							<Button variant="secondary">Register</Button>
						</Link>
					</div>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}

import { Drawer } from "vaul";

interface VaulDrawerProps {
	button: React.ReactNode;
	content: React.ReactNode;
}

export const VaulDrawer: React.FC<VaulDrawerProps> = ({ button, content }) => {
	return (
		<Drawer.Root direction="left">
			<Drawer.Trigger>{button}</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/20" />
				<Drawer.Content className="top-0 bottom-0 fixed flex border shadow-wg-md bg-white">
					<div className="w-[420px] grow mt-2 mb-2 p-5 flex flex-col">
						<div className="max-w-md ">
							<Drawer.Title className="font-medium mb-2 text-surface-900 text-xl">
								Problem List
							</Drawer.Title>
							<Drawer.Description className="text-zinc-600 mb-2">
								{content}
							</Drawer.Description>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

import { Tooltip } from "@lemonsqueezy/wedges";

import type { ReactNode } from "react";

interface TooltipWrapperProps {
	button: ReactNode;
	text: string;
}

export function TooltipWrapper({ button, text }: TooltipWrapperProps) {
	return (
		<>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content color="soft" content={text}>
							{text}
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</>
	);
}

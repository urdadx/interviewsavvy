import { ChevronDownIcon, ChevronUpIcon } from "@iconicicons/react";
import { Button } from "@lemonsqueezy/wedges";
import { Tabs } from "@lemonsqueezy/wedges";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CodeOutput } from "./code-output";
import { TestCases } from "./test-cases";

export const CodeTerminal = ({
	toggle,
	isCollapsed,
}: { toggle: () => void; isCollapsed: boolean }) => {
	return (
		<>
			<div className="flex w-full bg-white justify-between items-center">
				<div className="w-full h-9">
					<Tabs defaultValue="output">
						<Tabs.List>
							<Tabs.Trigger className="h-9" value="output">
								Output
							</Tabs.Trigger>
							<Tabs.Trigger className="h-9" value="testcases">
								Test cases
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content
							className={`${isCollapsed ? "hidden" : "flex"}`}
							value="output"
						>
							<ScrollArea className="w-full">
								<CodeOutput />
							</ScrollArea>
						</Tabs.Content>
						<Tabs.Content
							className={`${isCollapsed ? "hidden" : "flex"} w-full`}
							value="testcases"
						>
							<div className="w-full h-72 mx-4">
								<TestCases />
							</div>
						</Tabs.Content>
					</Tabs>
				</div>
				<div className="h-9">
					<Button
						after={isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
						variant="transparent"
						onClick={toggle}
						className="h-9"
					/>
				</div>
			</div>
		</>
	);
};

import { Tabs } from "@lemonsqueezy/wedges";

export const TestCases = () => {
	return (
		<div className="w-full">
			<Tabs variant="fill" defaultValue="test-case-one">
				<Tabs.List>
					<Tabs.Trigger value="test-case-one">Case 1</Tabs.Trigger>
					<Tabs.Trigger value="test-case-two">Case 2</Tabs.Trigger>
					<Tabs.Trigger value="test-case-three">Case 3</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content className="w-full" value="test-case-one">
					This is test case one
				</Tabs.Content>
				<Tabs.Content className="w-full" value="test-case-two">
					This is test case two
				</Tabs.Content>
				<Tabs.Content className="w-full" value="test-case-three">
					This is test case three
				</Tabs.Content>
			</Tabs>
		</div>
	);
};

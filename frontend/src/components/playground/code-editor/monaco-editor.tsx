import {
	Button,
	Select,
	SelectContent,
	SelectGroup,
	SelectIcon,
	SelectItem,
	SelectPortal,
	SelectTrigger,
	SelectValue,
} from "@lemonsqueezy/wedges";
import Editor from "@monaco-editor/react";
import { ExpandIcon, RotateCcw, SettingsIcon } from "lucide-react";
import { useRef, useState } from "react";

export const MonacoEditor = () => {
	const wrapper = useRef<HTMLDivElement>(null);
	const [language, setLanguage] = useState("java");

	const code = `
class Solution {
  public:
    vector<int> twoSum(vector<int>& nums, int target) {
    }
  };
class Solution {
  public:
    vector<int> twoSum(vector<int>& nums, int target) {
  }
};
  `;

	return (
		<>
			<div className="w-full h-full rounded-md overflow-hidden">
				<div className="p-2 border-b overflow-auto flex justify-between items-center">
					<div ref={wrapper} className="inline-flex max-w-[150px] flex-col ">
						<Select onValueChange={setLanguage}>
							<SelectTrigger className="min-w-[130px] h-9">
								<SelectValue placeholder="Java" />
								<SelectIcon />
							</SelectTrigger>
							<SelectPortal container={wrapper.current}>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="python">Python</SelectItem>
										<SelectItem value="typescript">TypeScript</SelectItem>
										<SelectItem value="java">Java</SelectItem>
										<SelectItem value="cpp">C++</SelectItem>
									</SelectGroup>
								</SelectContent>
							</SelectPortal>
						</Select>
					</div>
					<div className="flex items-center">
						<Button variant="transparent">
							<RotateCcw className="text-surface-500 " size={18} />
						</Button>
						<Button variant="transparent">
							<SettingsIcon className="text-surface-500" size={18} />
						</Button>
						<Button variant="transparent">
							<ExpandIcon className="text-surface-500" size={18} />
						</Button>
					</div>
				</div>
				<Editor
					options={{
						minimap: {
							enabled: false,
						},
						fontSize: 13,
						scrollBeyondLastLine: false,
						fixedOverflowWidgets: true,
					}}
					language={language}
					value={code}
					theme="vs-light"
				/>
			</div>
		</>
	);
};

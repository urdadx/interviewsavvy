import { Tabs } from "@lemonsqueezy/wedges";
import { Label } from "@lemonsqueezy/wedges";
import { Textarea } from "@lemonsqueezy/wedges";
import { Button } from "@lemonsqueezy/wedges";
import { Input } from "@lemonsqueezy/wedges";
import {
  BookText,
  Lightbulb,
  MessageCircle,
  Send,
  SparklesIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";
import { PromptForm } from "./chat-panel/prompt-form";
import { MonacoEditor } from "./code-editor/monaco-editor";
import { ProblemDescriptionTab } from "./problem-description-tab";
import { SolutionTab } from "./solution-tab";
import { CodeTerminal } from "./terminal.tsx/code-terminal";

export default function Component() {
  const panelRef = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    if (panelRef.current) {
      if (isCollapsed) {
        panelRef.current.expand(40);
      } else {
        panelRef.current.collapse();
      }
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-grow px-2 pb-2"
      >
        {/* First Pane */}
        <ResizablePanel className="mr-1 " defaultSize={33} minSize={20}>
          <div className="h-full flex flex-col w-full px-3 py-2 bg-background border rounded-md">
            <Tabs
              variant="underlined"
              defaultValue="description"
              className="h-full flex flex-col"
            >
              <Tabs.List>
                <Tabs.Trigger
                  className="text-sm"
                  before={<BookText size={17} />}
                  value="description"
                >
                  Description
                </Tabs.Trigger>

                <Tabs.Trigger
                  className="text-sm"
                  before={<SparklesIcon size={17} className="text-green-500" />}
                  value="chatbot"
                >
                  AI assistant
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="text-sm"
                  before={
                    <Lightbulb size={18} className="text-wg-yellow-500" />
                  }
                  value="solution"
                >
                  Solution
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content
                value="description"
                className="flex-grow overflow-auto"
              >
                <ProblemDescriptionTab />
              </Tabs.Content>
              <Tabs.Content
                value="chatbot"
                className="flex-grow flex flex-col overflow-hidden"
              >
                <ScrollArea className="flex-grow px-4 py-2" />
                <div className="">
                  <PromptForm />
                </div>
              </Tabs.Content>
              <Tabs.Content
                value="solution"
                className="flex-grow overflow-auto"
              >
                <SolutionTab />
              </Tabs.Content>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle />

        {/* Second Pane (split into two) */}
        <ResizablePanel defaultSize={67} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* Upper Half of Second Pane */}
            <ResizablePanel defaultSize={60} minSize={20}>
              <div className="h-full bg-white border rounded-md ">
                <MonacoEditor />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Lower Half of Second Pane */}
            <ResizablePanel
              ref={panelRef}
              collapsible
              collapsedSize={10}
              minSize={10}
              className="mt-1"
              defaultSize={40}
            >
              <div className="h-full p-3 border  bg-white rounded-md">
                <CodeTerminal toggle={togglePanel} isCollapsed={isCollapsed} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

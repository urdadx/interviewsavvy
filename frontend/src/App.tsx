import "./App.css";
import { Link } from "@tanstack/react-router";
import { ChevronDownIcon } from "@iconicicons/react";
import { Button, CheckboxGroup, Popover } from "@lemonsqueezy/wedges";


function App() {
  return (
    <div className="space-x-4 space-y-3 mt-12 max-w-lg mx-auto">
      <Link to="/login" className="">
        <Button variant="primary">Login</Button>
      </Link>
      <Link to="/register" className="">
        <Button variant="secondary">Register</Button>
      </Link>
      <Link to="/register" className="">
        <Button variant="outline">Dashboard</Button>
      </Link>
      <div className="mx-auto flex max-w-xs flex-col items-center rounded border border-surface-100 bg-surface p-20 leading-6">
        <span className="text-surface-500">Easy Peasy</span>
        <span className="font-medium text-surface-900">Lemon Squeezy</span>
      </div>
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="tertiary" size="sm" after={<ChevronDownIcon />} shape="pill">
            Show Popover
          </Button>
        </Popover.Trigger>

        <Popover.Content className="min-w-[140px]">
          <CheckboxGroup label="Group Label">
            <CheckboxGroup.Item label="Option 1" />
            <CheckboxGroup.Item label="Option 2" />
            <CheckboxGroup.Item label="Option 3" />
            <CheckboxGroup.Item label="Option 4" />
          </CheckboxGroup>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default App;

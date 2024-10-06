import { createFileRoute } from "@tanstack/react-router";
import Panes from "../../components/playground/panes";
import { Navbar } from "../../components/shared/navbar";

export const Route = createFileRoute("/problems/$problem-slug")({
  component: Problem,
});

function Problem() {
  return (
    <div className="h-screen w-screen flex flex-col bg-surface-50">
      <Navbar />
      <Panes />
    </div>
  );
}

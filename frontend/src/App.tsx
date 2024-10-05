import "./App.css";
import { Button } from "@lemonsqueezy/wedges";
import { Link } from "@tanstack/react-router";

function App() {
	return (
		<div className="space-x-4 space-y-3 mt-12 max-w-lg mx-auto">
			<Link to="/login" className="">
				<Button variant="primary">Login</Button>
			</Link>
			<Link to="/register" className="">
				<Button variant="secondary">Register</Button>
			</Link>
			<Link to="/problems" className="">
				<Button variant="outline">Playground</Button>
			</Link>
			<div className="mx-auto flex max-w-xs flex-col items-center rounded border border-surface-100 bg-surface p-20 leading-6">
				<span className="text-surface-500">Easy Peasy</span>
				<span className="font-medium text-surface-900">Lemon Squeezy</span>
			</div>
		</div>
	);
}

export default App;

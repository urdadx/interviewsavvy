import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/waitlist")({
	component: WaitList,
});

function WaitList() {
	const [email, setEmail] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center p-4">
				<div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
					{!submitted ? (
						<>
							<h1 className="text-3xl font-bold text-gray-800 mb-6">
								Join Our Waiting List
							</h1>
							<p className="text-gray-600 mb-6">
								Be the first to know when we launch. Sign up for exclusive
								updates and early access.
							</p>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 focus-within:border-purple-500">
									<Mail className="text-gray-400 mr-2" size={20} />
									<input
										type="email"
										placeholder="Enter your email"
										className="flex-grow outline-none text-gray-700 placeholder-gray-400"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<button
									type="submit"
									className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-purple-700 flex items-center justify-center"
								>
									Join Waiting List
									<ArrowRight className="ml-2" size={20} />
								</button>
							</form>
						</>
					) : (
						<div className="text-center">
							<h2 className="text-2xl font-semibold text-purple-600 mb-4">
								Thank You!
							</h2>
							<p className="text-gray-600">
								You've been added to our waitlist. We'll notify you when we
								launch!
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

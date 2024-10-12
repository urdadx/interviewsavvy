import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { api } from "../api";
import { QUERY_KEYS } from "../constants/query-keys";

export const Route = createFileRoute("/waitlist")({
	component: WaitList,
});

function WaitList() {
	const [email, setEmail] = useState<string>("");
	const queryClient = useQueryClient();

	const submitEmail = useMutation({
		mutationFn: async ({ email }: { email: string }) => {
			try {
				await api.post("/waitlist/submit", { email });
			} catch (error) {
				throw new Error((error as Error).message);
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WAITLIST });
		},
		onError: (error) => {
			console.error(error);
		},
	});

	// email submitted goes to email octopus dashboard
	const handleSubmit = () => {
		submitEmail.mutate({ email });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
			<div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
				<h1 className="text-3xl font-bold text-center mb-6">
					{submitEmail.isSuccess ? "Thank You!" : "Join Our Waitlist"}
				</h1>
				{submitEmail.isSuccess ? (
					<div className="text-center">
						<p className="mb-4">Thank you for joining our waitlist!🎉</p>
						<p className="">We'll keep you updated on our launch.</p>
					</div>
				) : (
					<>
						<p className="text-gray-600 text-center mb-6">
							Be the first to know when we launch. Sign up for exclusive updates
							and early access.
						</p>
						<div className="space-y-4">
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={handleSubmit}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
								disabled={submitEmail.isPending}
							>
								{submitEmail.isPending ? (
									<Loader2 className="animate-spin mr-2" />
								) : (
									<span className="flex items-center gap-2">
										<p>Join WaitList</p> <ArrowRight className="w-4 h-4" />
									</span>
								)}
							</button>
						</div>
						{submitEmail.isError && (
							<p className="text-red-500 text-center mt-4">
								An error occurred. Try again.
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
}

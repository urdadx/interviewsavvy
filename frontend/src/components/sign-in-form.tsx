import { Button, Input } from "@lemonsqueezy/wedges";
import { Link } from "@tanstack/react-router";
import { GoogleSVG } from "./google-svg";

export const LoginForm = () => {
	return (
		<>
			<div className="w-screen lg:grid lg:h-screen lg:grid-cols-2">
				<div className="flex items-center justify-center lg:py-12 py-32">
					<form className="mx-auto grid lg:w-[400px] w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-2xl w-full font-medium text-surface-900">
								Sign in to Interview Savvy
							</h1>
							<div className="lg:flex lg:w-[400px] lg:items-center my-4 gap-3">
								<Button
									className="w-full"
									variant="outline"
									before={<GoogleSVG />}
								>
									Continue with Google
								</Button>
							</div>
							<div className="relative flex items-center justify-center h-5 mb-2">
								<div className="absolute top-[50%] w-full border-t border-light-95" />
								<p className="relative z-10 text-sm text-wg-gray-400 bg-white px-2">
									OR CONTINUE WITH
								</p>
							</div>
						</div>
						<div className="grid gap-4 w-full">
							<div className="grid gap-2">
								<Input type="email" required placeholder="Email address" />
							</div>
							<div className="grid gap-2">
								<Input required placeholder="Password" />
							</div>
							<Button type="submit" className="w-full">
								Sign In
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link
								to="/register"
								className="underline font-semibold text-primary"
							>
								Sign up
							</Link>
						</div>
					</form>
				</div>
				<div className="hidden bg-primary lg:block" />
			</div>
		</>
	);
};

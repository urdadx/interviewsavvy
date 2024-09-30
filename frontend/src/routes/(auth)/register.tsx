import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "../../components/sign-up-form";

export const Route = createFileRoute("/(auth)/register")({
	component: Register,
});

function Register() {
	return (
		<>
			<RegisterForm />
		</>
	);
}

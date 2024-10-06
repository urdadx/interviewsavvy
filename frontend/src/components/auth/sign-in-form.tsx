import { Button, Input } from "@lemonsqueezy/wedges";
import { Link, useNavigate } from "@tanstack/react-router";
import { GoogleSVG } from "../svgs/google-svg";
import { type ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleLogin } from "../../lib/auth";
import { api } from "../../api";
import { QUERY_KEYS } from "../../constants/query-keys";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate({ from: "/login" });
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        await api.post("/auth/login", { email, password });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME });
      navigate({
        to: "/problems/$problem-slug",
        params: { "problem-slug": "1" },
      });
    },

    onError: (error) => {
      console.error(error);
    },
  });

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
                  onClick={(e) => {
                    e.preventDefault();
                    googleLogin();
                  }}
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
                <Input
                  onChange={(e) =>
                    setEmail((e as ChangeEvent<HTMLInputElement>).target.value)
                  }
                  value={email}
                  type="email"
                  required
                  placeholder="Email address"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  onChange={(e) =>
                    setPassword(
                      (e as ChangeEvent<HTMLInputElement>).target.value
                    )
                  }
                  value={password}
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  loginMutation.mutate({ email, password });
                }}
                className="w-full"
                disabled={loginMutation.isPending}
              >
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

"use client";

import {
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconLoader,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.push(redirectTo);
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            // Email not verified - verification email was resent automatically
            toast.error(
              "Please verify your email. We've sent a new verification link."
            );
            router.push("/verify-email");
          } else {
            toast.error(ctx.error.message || "Invalid email or password");
          }
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Card className="border-0 bg-white shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="font-bold text-2xl text-[#221E68]">
          Welcome back
        </CardTitle>
        <CardDescription className="text-[#221E68]/70">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium text-[#221E68]" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="email"
              className="h-11 border-gray-200 bg-gray-50 text-[#221E68] focus:border-[#F16529] focus:ring-[#F16529]/20"
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              type="email"
              value={email}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium text-[#221E68]" htmlFor="password">
                Password
              </Label>
              <Link
                className="text-[#221E68]/70 text-sm underline-offset-4 hover:text-[#221E68] hover:underline"
                href="/forgot-password"
                tabIndex={-1}
              >
                Forgot password?
              </Link>
            </div>
            <InputGroup className="h-11 border-gray-200 bg-gray-50 focus-within:border-[#F16529] focus-within:ring-[#F16529]/20">
              <InputGroupInput
                autoComplete="current-password"
                className="text-[#221E68]"
                disabled={isLoading}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  className="text-[#221E68]/60 hover:text-[#221E68]"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon-xs"
                  type="button"
                >
                  {showPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Button
            className="h-11 w-full rounded-lg bg-[#221E68] font-bold text-base text-white shadow-[#221E68]/20 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#221E68]/90 active:scale-[0.98]"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <IconArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-[#221E68]/70 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-[#F16529] underline underline-offset-4 hover:opacity-80"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

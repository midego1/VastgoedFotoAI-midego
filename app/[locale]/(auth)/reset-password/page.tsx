"use client";

import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLoader,
  IconLock,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle invalid or expired token
  if (error === "invalid_token" || !token) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Invalid or expired link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground text-sm">
            Password reset links expire after 1 hour for security reasons.
            Please request a new one.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild className="w-full">
            <Link href="/forgot-password">Request new reset link</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <IconCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Password reset successful</CardTitle>
          <CardDescription>
            Your password has been changed. You can now sign in with your new
            password.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild className="w-full">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter a new password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await authClient.resetPassword({
        token,
        newPassword: password,
      });
      setIsSuccess(true);
    } catch {
      toast.error("Failed to reset password. The link may have expired.");
      router.push("/forgot-password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 bg-white shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F16529]/10">
          <IconLock className="h-7 w-7 text-[#F16529]" />
        </div>
        <CardTitle className="font-bold text-2xl text-[#221E68]">Reset your password</CardTitle>
        <CardDescription className="text-[#221E68]/70">Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium text-[#221E68]" htmlFor="password">New password</Label>
            <InputGroup className="h-11 border-gray-200 bg-gray-50 focus-within:border-[#F16529] focus-within:ring-[#F16529]/20">
              <InputGroupInput
                autoComplete="new-password"
                className="text-[#221E68]"
                disabled={isLoading}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
          <div className="space-y-2">
            <Label className="font-medium text-[#221E68]" htmlFor="confirmPassword">Confirm password</Label>
            <InputGroup className="h-11 border-gray-200 bg-gray-50 focus-within:border-[#F16529] focus-within:ring-[#F16529]/20">
              <InputGroupInput
                autoComplete="new-password"
                className="text-[#221E68]"
                disabled={isLoading}
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  className="text-[#221E68]/60 hover:text-[#221E68]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  size="icon-xs"
                  type="button"
                >
                  {showConfirmPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Button className="h-11 w-full rounded-lg bg-[#221E68] font-bold text-base text-white shadow-[#221E68]/20 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#221E68]/90 active:scale-[0.98]" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
          <Link
            className="font-medium text-[#F16529] underline underline-offset-4 hover:opacity-80"
            href="/sign-in"
          >
            Back to sign in
          </Link>
      </CardFooter>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

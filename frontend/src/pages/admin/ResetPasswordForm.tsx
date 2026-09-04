import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  Loader2Icon,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useResetPassword } from "@/hooks/useAdminAuth";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/validations/admin.schema";
import { getErrorMessage } from "@/utils/error";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordMutation = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    resetPasswordMutation.mutate(
      {
        token,
        newPassword: data.password,
      },
      {
        onSuccess: (response) => {
          setSuccess(true);

          toast.success(response?.message ?? "Password reset successfully.");
        },

        onError: (error: any) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur">
      <CardHeader className="border-b border-slate-100 px-6 pb-5 pt-6 sm:px-7">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-950">
              {success ? "Password updated" : "Create new password"}
            </CardTitle>

            <CardDescription className="mt-1.5">
              {success
                ? "Your administrator password has been changed."
                : "Choose a new password for your admin account."}
            </CardDescription>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            {success ? (
              <CheckCircle2Icon className="size-5" />
            ) : (
              <KeyRoundIcon className="size-5" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
        {!token ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <KeyRoundIcon className="size-5" />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-950">
              Invalid reset link
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This password reset link is missing a valid token. Please request
              a new reset link.
            </p>

            <Button asChild className="mt-5 rounded-xl bg-ieit-blue">
              <Link to="/admin/forgot-password">Request new link</Link>
            </Button>
          </div>
        ) : success ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2Icon className="size-5" />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-950">
              Password reset successful
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your password has been updated. You can now sign in using your new
              password.
            </p>

            <Button asChild className="mt-5 rounded-xl bg-ieit-blue">
              <Link to="/admin/login">
                Go to login
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700"
              >
                New password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  disabled={resetPasswordMutation.isPending}
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 pr-11 transition-colors focus-visible:bg-white focus-visible:ring-ieit-blue/20"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-slate-700"
              >
                Confirm password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  disabled={resetPasswordMutation.isPending}
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 pr-11 transition-colors focus-visible:bg-white focus-visible:ring-ieit-blue/20"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs font-medium text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password hint */}
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Use at least 8 characters for your new password
            </p>

            {/* Submit */}
            <Button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="group h-11 w-full rounded-xl bg-ieit-blue font-semibold shadow-sm shadow-ieit-blue/20 transition-all hover:bg-ieit-blue/90 hover:shadow-md hover:shadow-ieit-blue/20"
            >
              {resetPasswordMutation.isPending ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                <>
                  Reset password
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>
        )}

        {!success && (
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-ieit-blue"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back to login
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;

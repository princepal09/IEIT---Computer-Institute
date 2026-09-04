import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader2Icon,
  MailIcon,
  ShieldCheckIcon,
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

import { useForgotPassword } from "@/hooks/useAdminAuth";
import { getErrorMessage } from "@/utils/error";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const AdminForgotPasswordPage = () => {
  const forgotPasswordMutation = useForgotPassword();

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        setSubmitted(true);

        toast.success(
          response?.message ?? "Password reset instructions have been sent."
        );
      },

      onError: (error: any) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-ieit-blue/5 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 size-80 rounded-full bg-ieit-blue/5 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-ieit-blue text-white shadow-lg shadow-ieit-blue/20">
            <ShieldCheckIcon className="size-7" />
          </div>

          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ieit-blue">
            Institute of Excellence
          </p>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
            IEIT Admin Portal
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Securely recover access to your administrator account.
          </p>
        </div>

        {/* Card */}
        <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur">
          <CardHeader className="border-b border-slate-100 px-6 pb-5 pt-6 sm:px-7">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-950">
                  Forgot password?
                </CardTitle>

                <CardDescription className="mt-1.5">
                  Enter your admin email to receive a reset link.
                </CardDescription>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                <MailIcon className="size-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Email address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="email"
                    disabled={forgotPasswordMutation.isPending}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 transition-colors focus-visible:bg-white focus-visible:ring-ieit-blue/20"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={forgotPasswordMutation.isPending}
                  className="group h-11 w-full rounded-xl bg-ieit-blue font-semibold shadow-sm shadow-ieit-blue/20 transition-all hover:bg-ieit-blue/90 hover:shadow-md hover:shadow-ieit-blue/20"
                >
                  {forgotPasswordMutation.isPending ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              /* Success state */
              <div className="py-4 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <MailIcon className="size-5" />
                </div>

                <h2 className="mt-4 text-base font-bold text-slate-950">
                  Check your email
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  If an administrator account exists for that email, you'll
                  receive instructions to reset your password.
                </p>
              </div>
            )}

            {/* Back to login */}
            <div className="mt-6 border-t border-slate-100 pt-5 text-center">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-ieit-blue"
              >
                <ArrowLeftIcon className="size-3.5" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
          IEIT · Information Technology & Education
        </p>
      </div>
    </main>
  );
};

export default AdminForgotPasswordPage;

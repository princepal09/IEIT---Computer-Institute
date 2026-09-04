import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRightIcon, Loader2Icon, ShieldCheckIcon } from "lucide-react";

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

import { useAdminLogin } from "@/hooks/useAdminAuth";
import { getErrorMessage } from "@/utils/error";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();

  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Login successful");
          navigate("/admin/dashboard");
        },

        onError: (error: any) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  /* Page loading */
  if (isPageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-ieit-blue text-white shadow-lg shadow-ieit-blue/20">
            <Loader2Icon className="size-6 animate-spin" />
          </div>

          <div className="text-center">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ieit-blue">
              IEIT Admin
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Loading secure portal...
            </p>
          </div>
        </div>
      </main>
    );
  }

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
            Secure access to manage courses, branches, enquiries and institute
            content.
          </p>
        </div>

        {/* Login Card */}
        <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur">
          <CardHeader className="border-b border-slate-100 px-6 pb-5 pt-6 sm:px-7">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-950">
                  Welcome back
                </CardTitle>

                <CardDescription className="mt-1.5">
                  Sign in to continue to your dashboard.
                </CardDescription>
              </div>

              <div className="rounded-lg bg-ieit-blue/5 px-2.5 py-1.5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ieit-blue">
                  Admin
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loginMutation.isPending}
                  required
                  autoComplete="email"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 transition-colors focus-visible:bg-white focus-visible:ring-ieit-blue/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-ieit-blue transition-colors hover:text-ieit-blue/80"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loginMutation.isPending}
                  required
                  autoComplete="current-password"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 transition-colors focus-visible:bg-white focus-visible:ring-ieit-blue/20"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="group h-11 w-full rounded-xl bg-ieit-blue font-semibold shadow-sm shadow-ieit-blue/20 transition-all hover:bg-ieit-blue/90 hover:shadow-md hover:shadow-ieit-blue/20"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5">
              <ShieldCheckIcon className="size-3.5 text-slate-400" />

              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Authorized personnel only
              </p>
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

export default AdminLoginPage;

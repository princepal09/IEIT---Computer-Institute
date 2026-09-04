import { ShieldCheckIcon } from "lucide-react";
import ResetPasswordForm from "./ResetPasswordForm";


const AdminResetPasswordPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Background */}
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
            Securely update your administrator password.
          </p>
        </div>

        <ResetPasswordForm/>

        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
          IEIT · Information Technology & Education
        </p>
      </div>
    </main>
  );
};

export default AdminResetPasswordPage;
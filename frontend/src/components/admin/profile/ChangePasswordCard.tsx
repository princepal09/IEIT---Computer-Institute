import { useState } from "react";

import { EyeIcon, EyeOffIcon, KeyRoundIcon, Loader2Icon } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useUpdateAdminPassword } from "@/hooks/useAdminProfile";

import { updatePasswordSchema } from "@/validations/profile.schema";
import { useNavigate } from "react-router-dom";

const ChangePasswordCard = () => {
  const updateMutation = useUpdateAdminPassword();

  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const result = updatePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message || "Invalid password information."
      );

      return;
    }

    try {
      await updateMutation.mutateAsync({
        currentPassword: result.data.currentPassword,

        newPassword: result.data.newPassword,
      });

      toast.success("Password changed successfully, Please Login Again");
      navigate("/admin/login");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      toast.error("Failed to change password.");
    }
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            <KeyRoundIcon className="size-5" />
          </div>

          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue">
            Security
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-950">
            Change Password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your account password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current password */}
          <div className="space-y-2">
            <label
              htmlFor="current-password"
              className="text-sm font-medium text-slate-900"
            >
              Current Password
            </label>

            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                disabled={updateMutation.isPending}
                className="rounded-xl pr-10"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* New password */}
          <div className="space-y-2">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-slate-900"
            >
              New Password
            </label>

            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                disabled={updateMutation.isPending}
                className="rounded-xl pr-10"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-slate-900"
            >
              Confirm New Password
            </label>

            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={updateMutation.isPending}
                className="rounded-xl pr-10"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
          >
            {updateMutation.isPending && (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            )}

            {updateMutation.isPending ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;

import { useEffect, useRef, useState } from "react";

import { CameraIcon, Loader2Icon, UserCircleIcon } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useUpdateAdminProfile } from "@/hooks/useAdminProfile";

import { AdminProfile } from "@/types/adminProfile";
import { updateProfileSchema } from "@/validations/profile.schema";

interface ProfileInfoCardProps {
  profile: AdminProfile;
}

const ProfileInfoCard = ({ profile }: ProfileInfoCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useUpdateAdminProfile();

  const [name, setName] = useState(profile.name);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [preview, setPreview] = useState(profile.profileImageUrl || "");

  const [error, setError] = useState("");

  useEffect(() => {
    setName(profile.name);
    setPreview(profile.profileImageUrl || "");
  }, [profile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const result = updateProfileSchema.safeParse({
      name,
    });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message || "Invalid profile information."
      );

      return;
    }

    try {
      await updateMutation.mutateAsync({
        name: result.data.name,
        profileImage: imageFile || undefined,
      });

      toast.success("Profile updated successfully.");

      setImageFile(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile.");
    }
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue">
            Account
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-950">
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your name and profile photo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile image */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                {preview ? (
                  <img
                    src={preview}
                    alt={profile.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="size-12 text-slate-300" />
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 flex size-9 items-center justify-center rounded-xl border border-white bg-ieit-blue text-white shadow-sm transition hover:bg-ieit-blue/90"
              >
                <CameraIcon className="size-4" />
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Profile Photo
              </p>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG or WEBP. Maximum 5MB.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="text-sm font-medium text-slate-900"
            >
              Name
            </label>

            <Input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              disabled={updateMutation.isPending}
              className="rounded-xl"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="profile-email"
              className="text-sm font-medium text-slate-900"
            >
              Email
            </label>

            <Input
              id="profile-email"
              value={profile.email}
              disabled
              className="rounded-xl bg-slate-50"
            />

            <p className="text-xs text-slate-400">
              Email address cannot be changed here.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
            >
              {updateMutation.isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}

              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;

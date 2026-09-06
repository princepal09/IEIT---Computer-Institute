import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlusIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateAdminBranch,
  useUpdateAdminBranch,
} from "@/hooks/useAdminBranches";

import type { AdminBranch } from "@/types/branchDashboard";

import {
  createBranchSchema,
  type CreateBranchFormValues,
} from "@/validations/adminBranch.schema";

import { getErrorMessage } from "@/utils/error";

interface BranchFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branch?: AdminBranch | null;
}

const emptyFormValues: CreateBranchFormValues = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  whatsapp: "",
  mapUrl: "",
  openingTime: "",
  closingTime: "",
};

const BranchForm = ({ open, onOpenChange, branch }: BranchFormProps) => {
  const createMutation = useCreateAdminBranch();

  const updateMutation = useUpdateAdminBranch();

  const isEditMode = Boolean(branch);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

const {
  register,
  handleSubmit,
  setValue,
  reset,
  formState: { errors },
} = useForm<CreateBranchFormValues>({
  resolver: zodResolver(createBranchSchema),
  defaultValues: emptyFormValues,
});


  /*
   * Populate form
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    if (branch) {
      reset({
        name: branch.name ?? "",

        description: branch.description ?? "",

        address: branch.address ?? "",

        phone: branch.phone ?? "",

        email: branch.email ?? "",

        whatsapp: branch.whatsapp ?? "",

        mapUrl: branch.mapUrl ?? "",

        openingTime: branch.openingTime ?? "",

        closingTime: branch.closingTime ?? "",
      });

      setImageFile(null);

      setImagePreview(branch.imageUrl ?? null);

      return;
    }

    reset(emptyFormValues);

    setImageFile(null);
    setImagePreview(null);
  }, [branch, open, reset]);

  /*
   * Select image
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    /*
     * Validate image type
     */
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");

      return;
    }

    /*
     * Validate image size
     */
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");

      return;
    }

    /*
     * Revoke old preview
     */
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(preview);
  };

  /*
   * Remove image
   */
  const handleRemoveImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /*
   * Submit
   */
  const onSubmit: SubmitHandler<CreateBranchFormValues> = (values) => {
    const payload = {
      name: values.name.trim(),

      address: values.address.trim(),

      description: values.description?.trim() || undefined,

      phone: values.phone?.trim() || undefined,

      email: values.email?.trim() || undefined,

      whatsapp: values.whatsapp?.trim() || undefined,

      mapUrl: values.mapUrl?.trim() || undefined,

      openingTime: values.openingTime?.trim() || undefined,

      closingTime: values.closingTime?.trim() || undefined,

      /*
       * THIS IS THE IMPORTANT PART
       */
      image: imageFile ?? undefined,
    };

    /*
     * UPDATE
     */
    if (branch) {
      updateMutation.mutate(
        {
          branchId: branch.id,

          data: {
            ...payload,
          },
        },
        {
          onSuccess: () => {
            toast.success("Branch updated successfully");

            reset(emptyFormValues);

            setImageFile(null);
            setImagePreview(null);

            onOpenChange(false);
          },

          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        }
      );

      return;
    }

    /*
     * CREATE
     */
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Branch created successfully");

        reset(emptyFormValues);

        setImageFile(null);
        setImagePreview(null);

        onOpenChange(false);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /*
   * Dialog close
   */
  const handleOpenChange = (value: boolean) => {
    if (!value && isPending) {
      return;
    }

    onOpenChange(value);

    if (!value) {
      reset(emptyFormValues);

      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setImageFile(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-slate-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-950">
            {isEditMode ? "Edit Branch" : "Add Branch"}
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500">
            {isEditMode
              ? "Update the branch information."
              : "Add a new institute branch."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* BRANCH NAME */}

          <div className="space-y-2">
            <label
              htmlFor="branch-name"
              className="text-sm font-medium text-slate-700"
            >
              Branch Name
            </label>

            <Input
              id="branch-name"
              placeholder="e.g. IEIT Kathmandu"
              className="rounded-xl"
              disabled={isPending}
              {...register("name")}
            />

            {errors.name && (
              <p className="text-xs font-medium text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* BRANCH IMAGE */}

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Branch Image
              </label>

              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG, JPEG or WEBP. Maximum 5MB.
              </p>
            </div>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={imagePreview}
                  alt="Branch preview"
                  className="h-56 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isPending}
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100 disabled:opacity-50"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 transition hover:border-ieit-blue hover:bg-ieit-blue/5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                  <ImagePlusIcon className="size-6" />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Upload branch image
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Click to choose an image
                </p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleImageChange}
              disabled={isPending}
            />

            {imagePreview && (
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                disabled={isPending}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlusIcon className="mr-2 size-4" />
                Change Image
              </Button>
            )}

            {imageFile && (
              <p className="text-xs text-slate-500">
                Selected:{" "}
                <span className="font-medium text-slate-700">
                  {imageFile.name}
                </span>
              </p>
            )}
          </div>

          {/* ADDRESS */}

          <div className="space-y-2">
            <label
              htmlFor="branch-address"
              className="text-sm font-medium text-slate-700"
            >
              Address
            </label>

            <Textarea
              id="branch-address"
              placeholder="Branch full address..."
              className="min-h-20 resize-none rounded-xl"
              disabled={isPending}
              {...register("address")}
            />

            {errors.address && (
              <p className="text-xs font-medium text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* PHONE + WHATSAPP */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="branch-phone"
                className="text-sm font-medium text-slate-700"
              >
                Phone
              </label>

              <Input
                id="branch-phone"
                placeholder="+977 98XXXXXXXX"
                className="rounded-xl"
                disabled={isPending}
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-xs font-medium text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="branch-whatsapp"
                className="text-sm font-medium text-slate-700"
              >
                WhatsApp
              </label>

              <Input
                id="branch-whatsapp"
                placeholder="+977 98XXXXXXXX"
                className="rounded-xl"
                disabled={isPending}
                {...register("whatsapp")}
              />

              {errors.whatsapp && (
                <p className="text-xs font-medium text-red-600">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>
          </div>

          {/* EMAIL + MAP */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="branch-email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <Input
                id="branch-email"
                type="email"
                placeholder="branch@example.com"
                className="rounded-xl"
                disabled={isPending}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="branch-map"
                className="text-sm font-medium text-slate-700"
              >
                Map URL
              </label>

              <Input
                id="branch-map"
                type="url"
                placeholder="https://maps.google.com/..."
                className="rounded-xl"
                disabled={isPending}
                {...register("mapUrl")}
              />

              {errors.mapUrl && (
                <p className="text-xs font-medium text-red-600">
                  {errors.mapUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* TIMINGS */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="opening-time"
                className="text-sm font-medium text-slate-700"
              >
                Opening Time
              </label>

              <Input
                id="opening-time"
                type="time"
                className="rounded-xl"
                disabled={isPending}
                {...register("openingTime")}
              />

              {errors.openingTime && (
                <p className="text-xs font-medium text-red-600">
                  {errors.openingTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="closing-time"
                className="text-sm font-medium text-slate-700"
              >
                Closing Time
              </label>

              <Input
                id="closing-time"
                type="time"
                className="rounded-xl"
                disabled={isPending}
                {...register("closingTime")}
              />

              {errors.closingTime && (
                <p className="text-xs font-medium text-red-600">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <label
              htmlFor="branch-description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <Textarea
              id="branch-description"
              placeholder="Describe this branch..."
              className="min-h-28 resize-y rounded-xl"
              disabled={isPending}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-xs font-medium text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
 

          {/* ACTIONS */}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
            >
              {isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}

              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Branch"
                  : "Create Branch"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BranchForm;

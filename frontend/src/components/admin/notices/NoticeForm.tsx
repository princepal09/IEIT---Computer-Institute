import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import {
  useCreateAdminNotice,
  useUpdateAdminNotice,
} from "@/hooks/useAdminNotice";

import type { AdminNotice } from "@/types/notice";
import {
  createNoticeSchema,
  NoticeFormValues,
} from "@/validations/notice.schema";

interface NoticeFormProps {
  notice?: AdminNotice | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const formatDateTimeLocal = (date?: string | null) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  // Convert to local datetime for datetime-local input
  const offset = parsed.getTimezoneOffset();
  const localDate = new Date(parsed.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};

const NoticeForm = ({ notice, onSuccess, onCancel }: NoticeFormProps) => {
  const isEdit = Boolean(notice);

  const createMutation = useCreateAdminNotice();
  const updateMutation = useUpdateAdminNotice();

  const mutation = isEdit ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm<NoticeFormValues>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      title: "",
      description: "",
      publishedAt: "",
      expiresAt: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (notice) {
      reset({
        title: notice.title,
        description: notice.description,
        publishedAt: formatDateTimeLocal(notice.publishedAt),
        expiresAt: formatDateTimeLocal(notice.expiresAt),
        isPublished: notice.isPublished,
      });
    } else {
      reset({
        title: "",
        description: "",
        publishedAt: "",
        expiresAt: "",
        isPublished: false,
      });
    }
  }, [notice, reset]);

  const isPublished = watch("isPublished");

  const onSubmit = async (values: NoticeFormValues) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        publishedAt: values.publishedAt
          ? new Date(values.publishedAt).toISOString()
          : undefined,
        expiresAt: values.expiresAt
          ? new Date(values.expiresAt).toISOString()
          : undefined,
        isPublished: values.isPublished,
      };

      if (notice) {
        await updateMutation.mutateAsync({
          noticeId: notice.id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      onSuccess?.();
    } catch {
      // Error can be handled through mutation.error/toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-900">
          Notice Title
        </label>

        <Input
          id="title"
          placeholder="Enter notice title"
          {...register("title")}
          disabled={mutation.isPending}
          className="rounded-xl"
        />

        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-slate-900"
        >
          Description
        </label>

        <Textarea
          id="description"
          placeholder="Write your notice description..."
          rows={7}
          {...register("description")}
          disabled={mutation.isPending}
          className="resize-none rounded-xl"
        />

        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Published At */}
      <div className="space-y-2">
        <label
          htmlFor="publishedAt"
          className="text-sm font-medium text-slate-900"
        >
          Published Date
        </label>

        <Input
          id="publishedAt"
          type="datetime-local"
          {...register("publishedAt")}
          disabled={mutation.isPending}
          className="rounded-xl"
        />

        {errors.publishedAt && (
          <p className="text-sm text-red-600">{errors.publishedAt.message}</p>
        )}
      </div>

      {/* Expires At */}
      <div className="space-y-2">
        <label
          htmlFor="expiresAt"
          className="text-sm font-medium text-slate-900"
        >
          Expiry Date
        </label>

        <Input
          id="expiresAt"
          type="datetime-local"
          {...register("expiresAt")}
          disabled={mutation.isPending}
          className="rounded-xl"
        />

        {errors.expiresAt && (
          <p className="text-sm text-red-600">{errors.expiresAt.message}</p>
        )}
      </div>

      {/* Published Switch */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="text-sm font-medium text-slate-900">Publish Notice</p>

          <p className="mt-1 text-xs text-slate-500">
            Make this notice visible on the public website.
          </p>
        </div>

        <Switch
          checked={isPublished}
          onCheckedChange={(checked) =>
            setValue("isPublished", checked, {
              shouldDirty: true,
            })
          }
          disabled={mutation.isPending}
        />
      </div>

      {errors.isPublished && (
        <p className="text-sm text-red-600">{errors.isPublished.message}</p>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={mutation.isPending}
            className="rounded-xl"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
        >
          {mutation.isPending && (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          )}

          {mutation.isPending
            ? "Please wait..."
            : isEdit
              ? "Update Notice"
              : "Create Notice"}
        </Button>
      </div>
    </form>
  );
};

export default NoticeForm;

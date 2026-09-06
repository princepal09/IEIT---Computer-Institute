import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Check, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useCreateAdminCourse,
  useUpdateAdminCourse,
} from "@/hooks/useAdminCourses";

import { useAdminBranches } from "@/hooks/useAdminBranches";

import { toast } from "sonner";

import {
  courseSchema,
  type CourseFormValues,
} from "@/validations/adminCourse.schema";

import { getErrorMessage } from "@/utils/error";

import type { AdminCourse } from "@/types/coursesDashboard";

interface CourseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: AdminCourse | null;
}

const emptyFormValues: CourseFormValues = {
  name: "",
  shortDescription: "",
  description: "",
  duration: "",
  eligibility: "",
  fee: 0,
  category: "",
  branchIds: [],
};

const CourseForm = ({ open, onOpenChange, course }: CourseFormProps) => {
  const createMutation = useCreateAdminCourse();
  const updateMutation = useUpdateAdminCourse();

  const isEditMode = Boolean(course);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),

    defaultValues: emptyFormValues,
  });

  const category = watch("category");
  const branchIds = watch("branchIds");

  const {
    data: branches = [],
    isLoading: branchesLoading,
    isError: branchesError,
  } = useAdminBranches();

  /*
   * Populate form when opening.
   * Handles both create and edit mode.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    if (course) {
      reset({
        name: course.name ?? "",
        shortDescription: course.shortDescription ?? "",
        description: course.description ?? "",
        duration: course.duration ?? "",
        eligibility: course.eligibility ?? "",
        fee: Number(course.fee) || 0,
        category: course.category ?? "",

        branchIds:
          course.branchIds ?? course.branches?.map((branch) => branch.id) ?? [],
      });

      return;
    }

    reset(emptyFormValues);
  }, [course, open, reset]);

  /*
   * Toggle branch selection.
   */
  const toggleBranch = (branchId: string) => {
    const selected = branchIds.includes(branchId);

    const nextBranchIds = selected
      ? branchIds.filter((id) => id !== branchId)
      : [...branchIds, branchId];

    setValue("branchIds", nextBranchIds, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /*
   * Submit form.
   */
  const onSubmit: SubmitHandler<CourseFormValues> = (values) => {
    if (course) {
      updateMutation.mutate(
        {
          courseId: course.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success("Course updated successfully");

            reset(emptyFormValues);
            onOpenChange(false);
          },

          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        }
      );

      return;
    }

    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Course created successfully");

        reset(emptyFormValues);
        onOpenChange(false);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /*
   * Dialog open / close.
   */
  const handleOpenChange = (value: boolean) => {
    if (!value && isPending) {
      return;
    }

    onOpenChange(value);

    if (!value) {
      reset(emptyFormValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-slate-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-950">
            {isEditMode ? "Edit Course" : "Add Course"}
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500">
            {isEditMode
              ? "Update the course information."
              : "Add a new course to the institute."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* COURSE NAME */}

          <div className="space-y-2">
            <label
              htmlFor="course-name"
              className="text-sm font-medium text-slate-700"
            >
              Course Name
            </label>

            <Input
              id="course-name"
              placeholder="e.g. Full Stack Web Development"
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

          {/* CATEGORY + DURATION */}

          <div className="grid gap-5 sm:grid-cols-2">
            {/* CATEGORY */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>

              <Select
                value={category}
                onValueChange={(value) => {
                  setValue("category", value ?? "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={isPending}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Programming Courses">
                    Programming Courses
                  </SelectItem>

                  <SelectItem value="1-Year Diploma - DCAP">
                    1-Year Diploma - DCAP
                  </SelectItem>

                  <SelectItem value="1-Year Diploma - DCAM">
                    1-Year Diploma - DCAM
                  </SelectItem>

                  <SelectItem value="6-Month Certificate">
                    6-Month Certificate
                  </SelectItem>

                  <SelectItem value="3-Month Certificate">
                    3-Month Certificate
                  </SelectItem>

                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              {errors.category && (
                <p className="text-xs font-medium text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* DURATION */}

            <div className="space-y-2">
              <label
                htmlFor="course-duration"
                className="text-sm font-medium text-slate-700"
              >
                Duration
              </label>

              <Input
                id="course-duration"
                placeholder="e.g. 6 Months"
                className="rounded-xl"
                disabled={isPending}
                {...register("duration")}
              />

              {errors.duration && (
                <p className="text-xs font-medium text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          {/* BRANCHES */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Branches
            </label>

            <div className="rounded-xl border border-slate-200 p-3">
              {branchesLoading ? (
                <div className="flex items-center gap-2 py-2 text-sm text-slate-500">
                  <Loader2Icon className="size-4 animate-spin" />
                  Loading branches...
                </div>
              ) : branchesError ? (
                <p className="py-2 text-sm text-red-600">
                  Failed to load branches.
                </p>
              ) : branches.length === 0 ? (
                <p className="py-2 text-sm text-slate-500">
                  No branches available.
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {branches.map((branch) => {
                    const selected = branchIds.includes(branch.id);

                    return (
                      <button
                        key={branch.id}
                        type="button"
                        disabled={isPending}
                        onClick={() => toggleBranch(branch.id)}
                        className={[
                          "flex items-center justify-between",
                          "rounded-lg border px-3 py-2.5",
                          "text-left text-sm transition",
                          selected
                            ? "border-ieit-blue bg-ieit-blue/5 text-ieit-blue"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <span>{branch.name}</span>

                        {selected && <Check className="size-4" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {branchIds.length > 0 && (
              <p className="text-xs text-slate-500">
                {branchIds.length} branch
                {branchIds.length !== 1 ? "es" : ""} selected
              </p>
            )}

            {errors.branchIds && (
              <p className="text-xs font-medium text-red-600">
                {errors.branchIds.message}
              </p>
            )}
          </div>

          {/* FEE + ELIGIBILITY */}

          <div className="grid gap-5 sm:grid-cols-2">
            {/* FEE */}

            <div className="space-y-2">
              <label
                htmlFor="course-fee"
                className="text-sm font-medium text-slate-700"
              >
                Course Fee
              </label>

              <Input
                id="course-fee"
                type="number"
                min="0"
                placeholder="25000"
                className="rounded-xl"
                disabled={isPending}
                {...register("fee", {
                  valueAsNumber: true,
                })}
              />

              {errors.fee && (
                <p className="text-xs font-medium text-red-600">
                  {errors.fee.message}
                </p>
              )}
            </div>

            {/* ELIGIBILITY */}

            <div className="space-y-2">
              <label
                htmlFor="course-eligibility"
                className="text-sm font-medium text-slate-700"
              >
                Eligibility
              </label>

              <Input
                id="course-eligibility"
                placeholder="10+2 or equivalent"
                className="rounded-xl"
                disabled={isPending}
                {...register("eligibility")}
              />

              {errors.eligibility && (
                <p className="text-xs font-medium text-red-600">
                  {errors.eligibility.message}
                </p>
              )}
            </div>
          </div>

          {/* SHORT DESCRIPTION */}

          <div className="space-y-2">
            <label
              htmlFor="short-description"
              className="text-sm font-medium text-slate-700"
            >
              Short Description
            </label>

            <Textarea
              id="short-description"
              placeholder="Brief description of the course..."
              className="min-h-20 resize-none rounded-xl"
              disabled={isPending}
              {...register("shortDescription")}
            />

            {errors.shortDescription && (
              <p className="text-xs font-medium text-red-600">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <Textarea
              id="description"
              placeholder="Detailed course description..."
              className="min-h-32 resize-y rounded-xl"
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
                  ? "Update Course"
                  : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseForm;

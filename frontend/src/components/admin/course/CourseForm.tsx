import { zodResolver } from "@hookform/resolvers/zod";
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

import { useCreateAdminCourse } from "@/hooks/useAdminCourses";
import { useBranches } from "@/hooks/useBranches";

import { toast } from "sonner";

import {
  courseSchema,
  type CourseFormValues,
} from "@/validations/adminCourse.schema";

import { getErrorMessage } from "@/utils/error";

interface CourseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseForm = ({ open, onOpenChange }: CourseFormProps) => {
  const createMutation = useCreateAdminCourse();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),

    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      duration: "",
      eligibility: "",
      fee: 0,
      category: "",
      branchIds: [],
    },
  });

  const category = watch("category");
  const branchIds = watch("branchIds");

  const { data: branches = [], isLoading: branchesLoading } = useBranches();

  const onSubmit: SubmitHandler<CourseFormValues> = (values) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Course created successfully");

        reset();

        onOpenChange(false);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value && createMutation.isPending) {
      return;
    }

    onOpenChange(value);

    if (!value) {
      reset();
    }
  };

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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-slate-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-950">
            Add Course
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500">
            Add a new course to the institute.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Course Name */}
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
              {...register("name")}
            />

            {errors.name && (
              <p className="text-xs font-medium text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Category + Duration */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>

              <Select
                value={category}
                onValueChange={(value) => {
                  if (value) {
                    setValue("category", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                }}
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

            {/* Duration */}
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
                {...register("duration")}
              />

              {errors.duration && (
                <p className="text-xs font-medium text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          {/* Fee + Eligibility */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Fee */}
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

            {/* Eligibility */}
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
                {...register("eligibility")}
              />

              {errors.eligibility && (
                <p className="text-xs font-medium text-red-600">
                  {errors.eligibility.message}
                </p>
              )}
            </div>
          </div>

          {/* Branches */}
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
                        disabled={createMutation.isPending}
                        onClick={() => toggleBranch(branch.id)}
                        className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                          selected
                            ? "border-ieit-blue bg-ieit-blue/5 text-ieit-blue"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
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

          {/* Short Description */}
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
              {...register("shortDescription")}
            />

            {errors.shortDescription && (
              <p className="text-xs font-medium text-red-600">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* Description */}
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
              {...register("description")}
            />

            {errors.description && (
              <p className="text-xs font-medium text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled={createMutation.isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
            >
              {createMutation.isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}

              {createMutation.isPending ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseForm;

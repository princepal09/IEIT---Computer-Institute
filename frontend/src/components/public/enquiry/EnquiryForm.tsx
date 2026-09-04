import { Loader2Icon, SendIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEnquiry } from "@/hooks/useEnquiry";
import { useBranches } from "@/hooks/useBranches";
import { EnquiryFormValues, enquirySchema } from "@/validations/enquiry.schema";
import { getErrorMessage } from "@/utils/error";

interface Branch {
  id: string;
  name: string;
}

interface EnquiryFormProps {
  course: {
    id: string;
    name: string;
  };
}

const EnquiryForm = ({ course }: EnquiryFormProps) => {
  const enquiryMutation = useEnquiry();

  const {
    data: branchesResponse,
    isLoading: branchesLoading,
    isError: branchesError,
  } = useBranches();

  const branches: Branch[] = branchesResponse ?? [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      branchId: "",
      courseId: course.id,
      message: "",
    },
  });

  const selectedBranch = watch("branchId");

  // Find the branch name from the selected ID
  const selectedBranchName = branches.find(
    (branch) => branch.id === selectedBranch
  )?.name;

  const onSubmit = (data: EnquiryFormValues) => {
    enquiryMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(
          response?.message || "Your enquiry has been submitted successfully."
        );

        reset({
          name: "",
          phone: "",
          email: "",
          branchId: "",
          courseId: course.id,
          message: "",
        });
      },

      onError: (error) => {
       toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 px-6 py-6 sm:px-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
          Course Enquiry
        </p>

        <CardTitle className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-slate-950">
          Interested in {course.name}?
        </CardTitle>

        <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Fill in your details and our team will contact you with more
          information about the course.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          {/* Name + Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-slate-700"
              >
                Full Name
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
                className={
                  errors.name ? "border-red-400 focus-visible:ring-red-400" : ""
                }
              />

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold text-slate-700"
              >
                Phone Number
              </Label>

              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
                className={
                  errors.phone
                    ? "border-red-400 focus-visible:ring-red-400"
                    : ""
                }
              />

              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email + Branch */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700"
              >
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
                className={
                  errors.email
                    ? "border-red-400 focus-visible:ring-red-400"
                    : ""
                }
              />

              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label
                htmlFor="branch"
                className="text-xs font-semibold text-slate-700"
              >
                Select Branch
              </Label>

              <Select
                value={selectedBranch}
                onValueChange={(value) => {
                  setValue("branchId", value ?? "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={branchesLoading || enquiryMutation.isPending}
              >
                <SelectTrigger
                  id="branch"
                  className={
                    errors.branchId ? "border-red-400 focus:ring-red-400" : ""
                  }
                >
                  {/* IMPORTANT: Display name, not ID */}
                  <SelectValue placeholder="Select a branch">
                    {selectedBranchName || "Select a branch"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {branchesError && (
                <p className="text-xs text-red-500">Unable to load branches.</p>
              )}

              {errors.branchId && (
                <p className="text-xs text-red-500">
                  {errors.branchId.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-xs font-semibold text-slate-700"
            >
              Message
            </Label>

            <Textarea
              id="message"
              placeholder="Tell us what you would like to know..."
              rows={5}
              aria-invalid={Boolean(errors.message)}
              {...register("message")}
              className={
                errors.message
                  ? "resize-none border-red-400 focus-visible:ring-red-400"
                  : "resize-none"
              }
            />

            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Hidden Course ID */}
          <input type="hidden" {...register("courseId")} />

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                enquiryMutation.isPending || branchesLoading || branchesError
              }
              className="h-10 rounded-lg bg-ieit-blue px-5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ieit-blue/90 hover:shadow-md"
            >
              {enquiryMutation.isPending ? (
                <>
                  <Loader2Icon className="mr-2 size-3.5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Enquiry
                  <SendIcon className="ml-2 size-3.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnquiryForm;

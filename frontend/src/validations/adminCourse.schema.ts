import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),

  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(250, "Short description must be under 250 characters"),

  description: z.string().min(1, "Description is required"),

  duration: z.string().min(1, "Duration is required"),

  eligibility: z.string().min(1, "Eligibility is required"),

  fee: z.number().positive("Course fee must be greater than 0"),

  category: z.string().min(1, "Category is required"),

  branchIds: z.array(z.string()).min(1, "Please select at least one branch"),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

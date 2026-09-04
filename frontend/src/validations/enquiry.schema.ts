import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),

  email: z
    .string()
    .email("Enter a valid email address"),

  branchId: z
    .string()
    .min(1, "Please select a branch"),

  courseId: z
    .string()
    .min(1, "Please select a course"),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(500, "Message is too long"),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
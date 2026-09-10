import { z } from "zod";

export const createNoticeSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Notice title must be at least 2 characters")
      .max(200, "Notice title must not exceed 200 characters"),

    description: z
      .string()
      .trim()
      .min(2, "Notice description is required")
      .max(5000, "Description must not exceed 5000 characters"),

    publishedAt: z.string().optional(),

    expiresAt: z.string().optional(),

    isPublished: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.publishedAt || !data.expiresAt) {
        return true;
      }

      return new Date(data.expiresAt) > new Date(data.publishedAt);
    },
    {
      message: "Expiry date must be after published date",
      path: ["expiresAt"],
    }
  );

export type NoticeFormValues = z.infer<typeof createNoticeSchema>;

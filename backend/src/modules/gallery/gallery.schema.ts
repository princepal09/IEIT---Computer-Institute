// import { z } from 'zod';

// export const updateGallerySchema = z.object({
//   displayOrder: z.coerce
//     .number()
//     .int()
//     .min(0, 'Display order cannot be negative')
//     .optional(),

//   isPublished: z.preprocess(
//     (value) => {
//       if (value === 'true') return true;
//       if (value === 'false') return false;

//       return value;
//     },
//     z.boolean().optional(),
//   ),
// });

// export type updateGallerySchemaDTO = z.infer<
//   typeof updateGallerySchema
// >;
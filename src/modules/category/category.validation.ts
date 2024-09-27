import { z } from 'zod';

const GetByparentID = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
export const categoryValidation = {
  GetByparentID,
};

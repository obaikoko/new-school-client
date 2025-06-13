import { z } from 'zod';

export const generateResultSchema = z.object({
  session: z.string().min(3, 'session must have at least 3 characters'),
  term: z.string().min(3, 'term must have at least minimum of 3 characters'),
  level: z.string().min(3, 'level must have at least 3 characters'),
});

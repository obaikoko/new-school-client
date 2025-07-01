import { z } from 'zod';
import { staffSchema } from '@/validators/staffValidator';

export type StaffFormData = z.infer<typeof staffSchema>
export type StaffSchema = z.infer<typeof staffSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

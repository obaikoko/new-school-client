import { z } from 'zod';
export const staffSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  otherName: z.string().optional(),
  dateOfBirth: z.date(),
  phone: z.string(),
  email: z.string().email(),
  role: z.string(),
  qualification: z.string(),
  yearAdmitted: z.date(),
  gender: z.string(),
  maritalStatus: z.string(),
  category: z.string(),
  stateOfOrigin: z.string(),
  localGvt: z.string(),
  homeTown: z.string(),
  residence: z.string(),
  imageUrl: z.string().optional(),
});

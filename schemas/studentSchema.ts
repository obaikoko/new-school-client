import { z } from 'zod';
import {
  studentSchema,
  authStudentSchema,
  registerStudentSchema,
  searchSchema,
  forgetPasswordSchema,
  editStudentSchema,
  studentIdSchema,
} from '@/validators/studentValidation';

export type AuthStudentForm = z.infer<typeof authStudentSchema>;
export type RegisterStudentForm = z.infer<typeof registerStudentSchema>;
export type EditStudentForm = z.infer<typeof editStudentSchema> & {
  studentId: string;
};
export type Student = z.infer<typeof studentSchema>;
export type SearchForm = z.infer<typeof searchSchema>;
export type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type StudentId = z.infer<typeof studentIdSchema>;

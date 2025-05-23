import { z } from 'zod';
import {
  sendSingleMailSchema,
  sendBulkMailSchema,
  authResponseSchema,
  authUserSchema,
  registerUserSchema,
  updateUserSchema,
} from '../validators/userValidators';
import { registerStudentSchema } from '@/validators/studentValidation';

export type User = z.infer<typeof authResponseSchema> & {
  id: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type AuthUserForm = z.infer<typeof authUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type RegisterUserForm = z.infer<typeof registerUserSchema>;

export type Student = z.infer<typeof registerStudentSchema> & {
  studentId: string;
  password: string;
  isStudent: boolean;
  isPaid: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type SendSingleMailProps = z.infer<typeof sendSingleMailSchema>;
export type SendBulkMailProps = z.infer<typeof sendBulkMailSchema>;

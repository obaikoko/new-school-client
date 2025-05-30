import { z } from 'zod';
export const registerUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  level: z.string().optional().nullable(),
  subLevel: z.string().optional().nullable(),
  password: z.string().min(6, 'password must be at least 6 characters'),
});
export const registerUserResponse = z.object({
  id: z.string(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  level: z.string().optional().nullable(),
  subLevel: z.string().optional().nullable(),
  isAdmin: z.boolean(),
  role: z.string(),
  status: z.string(),
});

export const authUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

export const authResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  level: z.string().nullable(),
  subLevel: z.string().nullable(),
  isAdmin: z.boolean(),
  role: z.string(),
  status: z.string(),
});
export const updateUserSchema = z.object({
  userId: z.string().min(3, 'User ID is required'),
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 letters')
    .optional(),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 letters')
    .optional(),
  email: z.string().email('Enter a valid email address').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  level: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  subLevel: z.string().optional(),
  isAdmin: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
});
export const sendSingleMailSchema = z.object({
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  text: z.string().min(1, 'Email body text is required'),
});

// export const singleMailSchema = z.object({
//   email: z.string().email('Invali email address'),
//   subject: z.string().min(1, 'Subject is required'),
//   text: z.string().min(1, 'Email body text is required'),
// });

export const sendBulkMailSchema = z.object({
  emails: z.array(z.string()),
  subject: z.string().min(1, 'Subject is required'),
  text: z.string().min(1, 'Email body text is required'),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email('Add a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[a-z]/, 'Must include a lowercase letter')
      .regex(/[0-9]/, 'Must include a number')
      .regex(/[\W_]/, 'Must include a special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });



// schemas/userFormSchema.ts
export const userFormSchema = z.object({
  userId: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Role is required'),
  status: z.string().optional(),
  level: z.string().min(1, 'Level is required'),
  subLevel: z.string().min(1, 'Sub-level is required'),
});




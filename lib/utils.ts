import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils.ts or similar
import { ZodError } from 'zod';

export function showZodErrors(error: unknown) {
  if (error instanceof ZodError) {
    error.errors.forEach((e) => toast.error(e.message));
  } else if (typeof error === 'object' && error !== null && 'data' in error) {
    // Handle RTK Query-style error
    const err = error as { data?: { message?: string } };
    toast.error(err.data?.message || 'Something went wrong');
  } else {
    toast.error('An unknown error occurred');
  }
}

export type ApiError = {
  message: string;
  stack?: string | null;
  errors?: Record<string, string>; // Present only for validation errors
};

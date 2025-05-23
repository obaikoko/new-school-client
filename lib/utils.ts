import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



type APIClientError = {
  data?: {
    message?: string;
    errors?: Record<string, string>;
  };
};
export const  showZodErrors = (error: APIClientError) => {
  if (error?.data?.errors && typeof error.data.errors === 'object') {
    Object.entries(error.data.errors).forEach(([field, message]) => {
      toast.error(`${field}: ${message}`);
    });
  } else {
    toast.error(error?.data?.message || 'An Error occured');
  }
}
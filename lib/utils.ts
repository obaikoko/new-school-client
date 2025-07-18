import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { ZodError } from 'zod';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};



export function showZodErrors(error: unknown) {
  if (error instanceof ZodError) {
    error.errors.forEach((e) => toast.error(e.message));
  } else if (typeof error === 'object' && error !== null && 'data' in error) {
    const err = error as {
      data?: { message?: string; errors?: Record<string, string> };
    };

    if (err.data?.errors) {
      // show each field-specific message
      Object.values(err.data.errors).forEach((msg) => toast.error(msg));
    } else if (err.data?.message) {
      toast.error(err.data.message);
    } else {
      toast.error('Something went wrong');
    }
  } else {
    toast.error('An unknown error occurred');
    console.log(error)
  }
}

export const levels: string[] = [
  'All',
  'Creche',
  'Lower Reception',
  'Upper Reception',
  'Nursery 1',
  'Nursery 2',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SSS 1',
  'SSS 2',
  'SSS 3',
  'GRADUATED',
];

export const subLevels: string[] = ['A', 'B', 'C', 'D', 'E'];
export const grade: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
export const categories: string[] = [
  'Attendance',
  'Carefulness',
  'Honesty',
  'Neatness',
  'Obedience',
  'Politeness',
  'Punctuality',
  'Responsibility',
];
export const psychomotorCategories = [
  'Handwriting',
  'Drawing',
  'Sport',
  'Speaking',
  'Music',
  'Craft',
  'ComputerPractice',
];

export const sessions: string[] = [
  '2024/2025',
  '2025/2026',
  '2026/2027',
  '2027/2028',
  '2028/2029',
  '2029/2030',
];
export const terms: string[] = ['First', 'Second', 'Third'];
export const subjects: string[] = [
  'Agricultural Science',
  'Basic Science',
  'Basic Technology',
  'Biology',
  'Civic Education',
  'Christian Religious Studies',
  'Commerce',
  'Computer Studies',
  'Cultural and Creative Arts',
  'Economics',
  'English Language',
  'Financial Accounting',
  'Further Mathematics',
  'Geography',
  'Government',
  'Home Economics',
  'Integrated Science',
  'Islamic Religious Studies',
  'Literature in English',
  'Mathematics',
  'Music',
  'Physical and Health Education',
  'Physics',
  'Pre-Vocational Studies',
  'Quantitative Reasoning',
  'Social Studies',
  'Verbal Reasoning',
  'Vocational Aptitude',
  'Yoruba Language',
];

export const roles: string[] = [
  'Admin',
  'Principal',
  'HM',
  'Head Of Department',
  'Teacher',
];

export const statuses: string[] = ['active', 'suspended'];
export const relationships: string[] = [
  'Father',
  'Mother',
  'Uncle',
  'Aunty',
  'Guardian',
];
export const genders: string[] = ['Male', 'Female'];

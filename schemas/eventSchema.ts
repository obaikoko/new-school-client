import { eventForm } from '@/validators/eventValidator';
import { z } from 'zod';

export type EventFormSchema = z.infer<typeof eventForm>
export type EventSchema = z.infer<typeof eventForm> & {
  id: string;
  createdAt: Date;
  updateAt: Date;
};

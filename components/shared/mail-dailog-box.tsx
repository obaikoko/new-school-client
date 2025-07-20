'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useSendAdmissionMailMutation } from '@/src/features/admission/admissionApiSlice';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';

const mailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
});

type MailFormValues = z.infer<typeof mailSchema>;

export default function MailDialog({
  email,
  admissionId,
}: {
  email: string;
  admissionId: string;
}) {
  const [open, setOpen] = useState(false);
  const [sendMail, { isLoading,  }] = useSendAdmissionMailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MailFormValues>({
    resolver: zodResolver(mailSchema),
  });
  const onSubmit = async (values: MailFormValues) => {
    try {
      const res = await sendMail({
        admissionId,
        subject: values.subject,
        text: values.body, // assuming 'text' refers to the body
      }).unwrap();
      toast.success(res);
    } catch (error) {
      showZodErrors(error);
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isLoading && setOpen(val)}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>Send Mail</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Send Mail</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Input
              value={email}
              disabled
              placeholder="Recipient's email"
              type='email'
              readOnly
            />
          
          </div>
          <div>
            <Input {...register('subject')} placeholder='Subject' />
            {errors.subject && (
              <p className='text-sm text-red-500'>{errors.subject.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register('body')}
              placeholder='Type your message...'
              rows={5}
            />
            {errors.body && (
              <p className='text-sm text-red-500'>{errors.body.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

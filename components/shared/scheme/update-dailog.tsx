'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useUpdateSchemeOfWorkMutation } from '@/src/features/schemeOfWork/schemeOfWorkApiSlice';
import { showZodErrors } from '@/lib/utils';
import { toast } from 'sonner';

type Topic = {
  week: number;
  topic: string[];
};

type FormData = {
  id: string;
  subject: string;
  level: string;
  term: string;
  topics: Topic[];
};

interface Props {
  scheme: FormData;
}

export default function UpdateSchemeDialog({ scheme }: Props) {
  const [open, setOpen] = useState(false);
  const [updateScheme, { isLoading }] = useUpdateSchemeOfWorkMutation();

  const form = useForm<FormData>({
    defaultValues: scheme,
  });

  const { register, control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });

  useEffect(() => {
    reset(scheme);
  }, [scheme, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateScheme({
        ...data,
        schemeofworkId: data.id,
      }).unwrap();
      toast(res.message);
      setOpen(false);
    } catch (error) {
      showZodErrors(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Update Scheme</Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Update Scheme of Work</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='h-[60vh] pr-4'>
            <div className='space-y-4'>
              {/* Hidden ID field */}
              <input type='hidden' {...register('id')} />

              <div>
                <label className='block text-sm font-medium'>Subject</label>
                <Input {...register('subject')} readOnly />
              </div>

              <div>
                <label className='block text-sm font-medium'>Level</label>
                <Input {...register('level')} readOnly />
              </div>

              <div>
                <label className='block text-sm font-medium'>Term</label>
                <Input {...register('term')} readOnly />
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className='border p-3 rounded-md'>
                  <div className='flex justify-between items-center'>
                    <p className='font-medium'>Week {index + 1}</p>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <Input
                    type='number'
                    placeholder='Week number'
                    {...register(`topics.${index}.week`, {
                      valueAsNumber: true,
                    })}
                    className='mt-2'
                  />

                  {field.topic.map((_, topicIndex) => (
                    <Input
                      key={topicIndex}
                      className='mt-2'
                      placeholder={`Topic ${topicIndex + 1}`}
                      {...register(`topics.${index}.topic.${topicIndex}`)}
                    />
                  ))}

                  <Button
                    type='button'
                    size='sm'
                    className='mt-2'
                    onClick={() =>
                      form.setValue(`topics.${index}.topic`, [
                        ...form.getValues(`topics.${index}.topic`),
                        '',
                      ])
                    }
                  >
                    Add Topic
                  </Button>
                </div>
              ))}

              <Button
                type='button'
                variant='secondary'
                onClick={() => append({ week: fields.length + 1, topic: [''] })}
              >
                Add New Week
              </Button>
            </div>
            <div className='text-right'>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Submit Updates'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

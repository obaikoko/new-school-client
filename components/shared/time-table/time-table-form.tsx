'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateTimeTableMutation } from '@/src/features/timeTable/timeTableApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const levels = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
const subLevels = ['A', 'B', 'C'];

const periodSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

const timeTableSchema = z.object({
  level: z.string().min(1, 'Level is required'),
  subLevel: z.string().min(1, 'Sub-Level is required'),
  day: z.string().min(1, 'Day is required'),
  periods: z.array(periodSchema).min(1, 'At least one period is required'),
});

type TimeTableFormValues = z.infer<typeof timeTableSchema>;

export default function TimeTableForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [createTimeTable, { isLoading }] = useCreateTimeTableMutation();

  const form = useForm<TimeTableFormValues>({
    resolver: zodResolver(timeTableSchema),
    defaultValues: {
      level: '',
      subLevel: '',
      day: '',
      periods: [{ subject: '', startTime: '', endTime: '' }],
    },
  });

  const { register, handleSubmit, control, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'periods',
  });

  const onSubmit = async (values: TimeTableFormValues) => {
    try {
      await createTimeTable([values]).unwrap();
      toast.success('Time table created successfully');
      reset();
      onSuccess();
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block mb-1 font-medium'>Level</label>
          <select
            {...register('level')}
            className='w-full border px-3 py-2 rounded'
          >
            <option value=''>Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium'>Sub-Level</label>
          <select
            {...register('subLevel')}
            className='w-full border px-3 py-2 rounded'
          >
            <option value=''>Select Sub-Level</option>
            {subLevels.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block mb-1 font-medium'>Day</label>
          <select
            {...register('day')}
            className='w-full border px-3 py-2 rounded'
          >
            <option value=''>Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='font-semibold'>Periods</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'
          >
            <div>
              <label className='block mb-1 font-medium'>Subject</label>
              <Input
                {...register(`periods.${index}.subject`)}
                placeholder='e.g. Basic Science'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Start Time</label>
              <Input type='time' {...register(`periods.${index}.startTime`)} />
            </div>
            <div>
              <label className='block mb-1 font-medium'>End Time</label>
              <Input type='time' {...register(`periods.${index}.endTime`)} />
            </div>
            <Button
              type='button'
              variant='destructive'
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type='button'
          variant='outline'
          onClick={() => append({ subject: '', startTime: '', endTime: '' })}
        >
          Add Period
        </Button>
      </div>

      <Button disabled={isLoading} type='submit' className='w-full'>
        {isLoading ? 'Uploading...' : 'Submit Time Table'}
      </Button>
    </form>
  );
}

'use client';

import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Spinner from '../spinner';
import {
  useUpdateResultMutation,
  useGetResultQuery,
} from '@/src/features/results/resultApiSlice';
import { showZodErrors } from '@/lib/utils';

const grades = ['A', 'B', 'C', 'D', 'F'] as const;
const categories = [
  'Attendance',
  'Carefulness',
  'Honesty',
  'Neatness',
  'Obedience',
  'Politeness',
  'Punctuality',
  'Responsibility',
] as const;

const schema = z.object(
  Object.fromEntries(categories.map((key) => [key, z.enum(grades).optional()]))
);

type FormData = z.infer<typeof schema>;

const UpdateAffectiveAssessment = ({ resultId }: { resultId: string }) => {
  
  const [open, setOpen] = useState(false);

  const [updateResult, { isLoading }] = useUpdateResultMutation();
  const { refetch } = useGetResultQuery(resultId);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

 
  const onSubmit = async (data: FormData) => {
    const affectiveAssessments = Object.entries(data)
      .filter(([ grade]) => grade)
      .map(([aCategory, grade]) => ({
        aCategory,
        grade,
      }));

    try {
      const res = await updateResult({
        resultId,
        affectiveAssessments,
      }).unwrap();

      if (res) {
        toast.success('Affective assessment updated successfully');
        refetch();
        setOpen(false);
        form.reset();
      }
    } catch (err) {
    showZodErrors(err)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-blue-950 text-white'>Affective Assessment</Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Affective Assessment</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {categories.map((category) => (
              <div key={category}>
                <p className='font-medium'>{category}</p>
                <div className='flex flex-wrap gap-3 mt-2'>
                  {grades.map((grade) => (
                    <label key={grade} className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        value={grade}
                        {...form.register(category)}
                        checked={form.watch(category) === grade}
                      />
                      <span>{grade}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-4'>
            {isLoading ? (
              <Spinner/>
            ) : (
              <>
                <Button type='submit'>Upload</Button>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAffectiveAssessment;

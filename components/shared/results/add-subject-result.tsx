'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSubjectSchema } from '@/validators/resultValidator';
import { AddSubjectForm } from '@/schemas/resultSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { levels, sessions, showZodErrors, subjects, terms } from '@/lib/utils';
import { useAddSubjectMutation } from '@/src/features/results/resultApiSlice';

const AddSubjectToResult = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSubjectForm>({
    resolver: zodResolver(addSubjectSchema),
  });

  const [addSubject, { isLoading }] = useAddSubjectMutation();

  const onSubmit = async (data: AddSubjectForm) => {
    try {
      await addSubject({
        session: data.session,
        level: data.level,
        term: data.term,
        subjectName: data.subjectName,
      }).unwrap();
      toast.success(`${data.subjectName} added successfully`);
      reset(); // Clear the form after success
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='session'>Session</Label>
          <select {...register('session')} defaultValue=''>
            {sessions.map((session, index) => (
              <option key={index} value={session}>
                {session}
              </option>
            ))}
          </select>

          {errors.session && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.session.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='term'>Term</Label>
          <select {...register('term')}>
            {terms.map((term, index) => (
              <option key={index} value={term}>
                {term}
              </option>
            ))}
          </select>
          {errors.term && (
            <p className='text-red-500 text-sm mt-1'>{errors.term.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='level'>Level</Label>
          <select {...register('level')}>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className='text-red-500 text-sm mt-1'>{errors.level.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='subjectName'>Subject Name</Label>

          <select {...register('subjectName')}>
            {subjects.map((subjectName, index) => (
              <option key={index} value={subjectName}>
                {subjectName}
              </option>
            ))}
          </select>
          {errors.subjectName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.subjectName.message}
            </p>
          )}
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Add Subject to Results'}
      </Button>
    </form>
  );
};

export default AddSubjectToResult;

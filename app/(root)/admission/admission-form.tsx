'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdmissionFormData} from '@/schemas/admissionSchema';
import { admissionForm } from '@/validators/admissionValidators';

import { useCreateAdmissionMutation } from '@/src/features/admission/admissionApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdmissionForm = () => {
  const [createAdmission, { isLoading }] = useCreateAdmissionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionForm),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    try {
      await createAdmission(data).unwrap();
      toast.success('Registered successfully');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <div className='mr-10 md:mt-40'>
      <h1 className='text-3xl font-bold text-center mb-8'>Admission Form</h1>
      <div className='p-8 rounded-lg shadow-lg max-w-xl mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Label htmlFor='firstName'>First Name</Label>
              <Input id='firstName' {...register('firstName')} />
              {errors.firstName && (
                <p className='text-sm text-red-500'>
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input id='lastName' {...register('lastName')} />
              {errors.lastName && (
                <p className='text-sm text-red-500'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' {...register('email')} />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input id='phone' {...register('phone')} />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='childName'>Child&apos;s Name</Label>
            <Input id='childName' {...register('childName')} />
            {errors.childName && (
              <p className='text-sm text-red-500'>{errors.childName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='gender'>Child&apos;s Gender</Label>
            <select
              id='gender'
              {...register('gender')}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2'
            >
              <option value=''>Select gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            {errors.gender && (
              <p className='text-sm text-red-500'>{errors.gender.message}</p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Label htmlFor='dateOfBirth'>Date Of Birth</Label>
              <Input
                type='date'
                id='dateOfBirth'
                {...register('dateOfBirth')}
              />
              {errors.dateOfBirth && (
                <p className='text-sm text-red-500'>
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='level'>Class Applying For</Label>
              <select
                id='level'
                {...register('level')}
                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-background text-forground '
              >
                <option value=''>Select Class</option>
                <option value='creche'>Creche/Nursery</option>
                <option value='Grade 1'>Grade 1</option>
                <option value='Grade 2'>Grade 2</option>
                <option value='Grade 3'>Grade 3</option>
                <option value='Grade 4'>Grade 4</option>
                <option value='Grade 5'>Grade 5</option>
                <option value='JSS 1'>JSS 1</option>
                <option value='JSS 2'>JSS 2</option>
                <option value='SSS 1'>SSS 1</option>
              </select>
              {errors.level && (
                <p className='text-sm text-red-500'>{errors.level.message}</p>
              )}
            </div>
          </div>

          <Button type='submit' className='w-full py-3'>
            {isLoading ? 'Processing...' : 'Submit Form'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;

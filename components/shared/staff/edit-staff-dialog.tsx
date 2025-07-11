'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUpdateStaffMutation } from '@/src/features/staff/staffApiSlice';
import { showZodErrors } from '@/lib/utils';
import NaijaStates from 'naija-state-local-government';
import { staffFormSchema } from '@/validators/staffValidator';
import { StaffFormData, StaffSchema } from '@/schemas/staffSchema';

const GENDERS = ['Male', 'Female'];
const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const CATEGORIES = ['Academic', 'Non-academic'];
const QUALIFICATIONS = [
  'Professor',
  'Phd',
  'Masters',
  'Bachelors Degree',
  'HND',
  'OND',
  'NCE',
  'SSCE',
];

export default function EditStaffDialog({
  open,
  onOpenChange,
  staff,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffSchema;
}) {
  const [updateStaff, { isLoading }] = useUpdateStaffMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: staff.firstName,
      lastName: staff.lastName,
      phone: staff.phone,
      email: staff.email,
      role: staff.role,
      qualification: staff.qualification,
      gender: staff.gender,
      maritalStatus: staff.maritalStatus,
      category: staff.category,
      stateOfOrigin: staff.stateOfOrigin,
      localGvt: staff.localGvt,
      homeTown: staff.homeTown,
      residence: staff.residence,
    },
  });

  const selectedState = watch('stateOfOrigin');
  const lgas = selectedState ? NaijaStates.lgas(selectedState).lgas : [];

  const onSubmit = async (data: StaffFormData) => {
    console.log('logging', data);
    try {
      await updateStaff({ staffId: staff.id, ...data }).unwrap();
      toast.success('Staff updated successfully');
      onOpenChange(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>Update staff details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <Input placeholder='First Name' {...register('firstName')} />
          <p className='text-red-500 text-sm'>{errors.firstName?.message}</p>

          <Input placeholder='Last Name' {...register('lastName')} />
          <p className='text-red-500 text-sm'>{errors.lastName?.message}</p>

          <Input placeholder='Phone' {...register('phone')} />
          <p className='text-red-500 text-sm'>{errors.phone?.message}</p>

          <Input placeholder='Email' {...register('email')} />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>

          <Input placeholder='Role' {...register('role')} />
          <p className='text-red-500 text-sm'>{errors.role?.message}</p>

          <Label>Qualification</Label>
          <Select
            value={watch('qualification')}
            onValueChange={(value) => setValue('qualification', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select qualification' />
            </SelectTrigger>
            <SelectContent>
              {QUALIFICATIONS.map((q) => (
                <SelectItem key={q} value={q}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>
            {errors.qualification?.message}
          </p>

          <Label>Gender</Label>
          <Select
            value={watch('gender')}
            onValueChange={(value) => setValue('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Gender' />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>{errors.gender?.message}</p>

          <Label>Marital Status</Label>
          <Select
            value={watch('maritalStatus')}
            onValueChange={(value) => setValue('maritalStatus', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Marital Status' />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUSES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>
            {errors.maritalStatus?.message}
          </p>

          <Label>Category</Label>
          <Select
            value={watch('category')}
            onValueChange={(value) => setValue('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>{errors.category?.message}</p>

          <Label>State of Origin</Label>
          <Select
            value={watch('stateOfOrigin')}
            onValueChange={(value) => {
              setValue('stateOfOrigin', value);
              setValue('localGvt', '');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select State' />
            </SelectTrigger>
            <SelectContent>
              {NaijaStates.states().map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>
            {errors.stateOfOrigin?.message}
          </p>

          <Label>Local Government</Label>
          <Select
            value={watch('localGvt')}
            onValueChange={(value) => setValue('localGvt', value)}
            disabled={!selectedState}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Local Government' />
            </SelectTrigger>
            <SelectContent>
              {lgas.map((lga) => (
                <SelectItem key={lga} value={lga}>
                  {lga}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='text-red-500 text-sm'>{errors.localGvt?.message}</p>

          <Input placeholder='Home Town' {...register('homeTown')} />
          <p className='text-red-500 text-sm'>{errors.homeTown?.message}</p>

          <Input placeholder='Residence' {...register('residence')} />
          <p className='text-red-500 text-sm'>{errors.residence?.message}</p>

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? 'Processing...' : 'Update'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

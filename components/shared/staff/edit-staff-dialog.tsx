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
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUpdateStaffMutation } from '@/src/features/staff/staffApiSlice';
import { showZodErrors } from '@/lib/utils';
import NaijaStates from 'naija-state-local-government';
import { staffSchema } from '@/validators/staffValidator';
import {StaffFormData} from '@/schemas/staffSchema'
import { StaffSchema } from '@/schemas/staffSchema';

const GENDERS = ['Male', 'Female'];
const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const CATEGORIES = ['Academic', 'Non-academic'];

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
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: staff.firstName || '',
      lastName: staff.lastName || '',
      phone: staff.phone || '',
      email: staff.email || '',
      role: staff.role || '',
      qualification: staff.qualification || '',
      gender: staff.gender || '',
      maritalStatus: staff.maritalStatus || '',
      category: staff.category || '',
      stateOfOrigin: staff.stateOfOrigin || '',
      localGvt: staff.localGvt || '',
    },
  });

  const selectedState = watch('stateOfOrigin');
  const lgas = selectedState ? NaijaStates.lgas(selectedState).lgas : [];

  const onSubmit = async (data: StaffFormData) => {
    try {
      await updateStaff({ staffId: staff.id, ...data }).unwrap();
      toast.success('Staff updated');
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

          <Input placeholder='Email' {...register('email')} />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>

          <Input placeholder='Role' {...register('role')} />

          <Input placeholder='Qualification' {...register('qualification')} />

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
              {MARITAL_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
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
            value={selectedState}
            onValueChange={(value) => {
              setValue('stateOfOrigin', value);
              setValue('localGvt', ''); // reset LGA when state changes
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

          <Input placeholder='homeTown' {...register('homeTown')} />
          <Input placeholder='residence' {...register('residence')} />

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                Updating...
              </>
            ) : (
              'Update Staff'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useStudentLoginMutation } from '@/src/features/auth/studentsApiSlice';
import { setCredentials } from '@/src/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { authStudentSchema } from '@/validators/studentValidation';
import { useAppDispatch } from '@/src/app/hooks';
import { showZodErrors } from '@/lib/utils';
import { AuthStudentForm } from '@/schemas/studentSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
const StudentCredentialsSignInForm = () => {
  const [login, { isLoading }] = useStudentLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthStudentForm>({
    resolver: zodResolver(authStudentSchema),
  });

  const onSubmit = async (data: AuthStudentForm) => {
    try {
      const res = await login({
        studentId: data.studentId,
        password: data.password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success(`Welcome ${res.firstName} ${res.lastName}`);
      router.push('/student/dashboard');
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='studentId' className='my-2'>
            StudentId
          </Label>
          <Input
            id='studentId'
            type='studentId'
            autoComplete='studentId'
            placeholder='BDIS/2025/J1/001'
            {...register('studentId')}
          />
          {errors.studentId && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.studentId.message}
            </p>
          )}

          <div className='mb-6 w-full relative mt-4'>
            <Label htmlFor='password' className='my-3'>
              Password
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              placeholder='*********'
              {...register('password')}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-10 cursor-pointer text-gray-600'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          disabled={isLoading}
          className='w-full cursor-pointer'
          variant='default'
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className='text-center text-sm text-muted-foreground'>
          Not a student?{' '}
          <Link href='/sign-in' className='link text-blue-400'>
            Signin to your account
          </Link>
        </div>
        <div className='text-center text-sm text-muted-foreground'>
          <Link href='/students/forget-password' className='link'>
            Forgot Password?{' '}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default StudentCredentialsSignInForm;

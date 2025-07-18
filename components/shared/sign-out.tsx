import { useLogoutMutation } from '@/src/features/auth/usersApiSlice';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/src/features/auth/authSlice';
import { showZodErrors } from '@/lib/utils';

const SignOutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi(undefined).unwrap();
      dispatch(logout());
      router.push('/sign-in');
      sessionStorage.removeItem('User');
    } catch (error) {
      showZodErrors(error);
    }

  };
  return (
    <div className='mt-auto'>
      <Button
        onClick={handleLogout}
        variant='ghost'
        disabled={isLoading}
        className={`w-full justify-start gap-3 ${
          !isLoading ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <LogOut className='h-5 w-5' />
        {isLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
};

export default SignOutButton;

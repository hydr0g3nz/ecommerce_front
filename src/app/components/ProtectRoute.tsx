import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  loading?: React.ReactNode;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [ 'admin'],
  loading = <div>Loading...</div>
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { role, loading: authLoading } = useSelector(selectAuth);

  useEffect(() => {
    // If authentication check is complete and user is not logged in
    if (!authLoading && !role) {
      router.replace('/login');
      return;
    }

    // If user is logged in but doesn't have the required role
    if (!authLoading && role && !allowedRoles.includes(role)) {
      router.replace('/unauthorized');
    }
  }, [role, authLoading, allowedRoles, router]);

  // Show loading state while checking authentication
  if (authLoading) {
    return loading;
  }

  // If user is authenticated and authorized, render the protected content
  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};
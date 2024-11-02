import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface JWTPayload {
  user_id: string;
  role: string;
  exp: number;
}

export const useAuth = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [authloading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.log('No token found');
        throw new Error('No token found');
      }

      // Decode the JWT token
      const payload = JSON.parse(atob(token.split('.')[1])) as JWTPayload;
      
      // Check if token is expired
      if (payload.exp * 1000 < Date.now()) {
        console.log('Token expired');
        throw new Error('Token expired');
      }
      console.log("payload", payload);
      setRole(payload.role);
      setLoading(false);
    } catch (error) {
      console.error('Error checking authentication:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      router.push('/login');
      setLoading(false);
    }
  };

  return { role, authloading };
};
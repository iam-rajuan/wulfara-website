'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { fetchMe } from '@/store/slices/authSlice';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        router.push(`/login`);
        return;
      }

      if (!user) {
        try {
          await dispatch(fetchMe()).unwrap();
          setIsChecking(false);
        } catch (error) {
          router.push('/login');
        }
      } else {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [token, user, dispatch, router, pathname]);
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 z-50 fixed inset-0">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#dca12f]" />
          <p className="text-sm font-medium text-slate-500 tracking-wide">Securing connection...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

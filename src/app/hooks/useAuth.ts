import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, selectAuth } from "@/features/auth/authSlice";
import { AppDispatch } from "../../store/cartStore";

export const useAuth = (isNeedAuth = false) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await dispatch(checkAuth(isNeedAuth)).unwrap();
      } catch (error) {
        if (isNeedAuth) {
          router.push("/login");
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthentication();
  }, [isNeedAuth, dispatch, router]);

  return {
    ...auth,
    loading: isChecking || auth.loading
  };
};
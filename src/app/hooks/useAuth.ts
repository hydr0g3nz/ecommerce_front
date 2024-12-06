import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, selectAuth } from "@/features/auth/authSlice";
import { AppDispatch } from "../../store/cartStore";

export const useAuth = (isNeedAuth = false) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    dispatch(checkAuth(isNeedAuth)).unwrap()
      .catch(() => {
        if (isNeedAuth) {
          router.push("/login");
        }
      });
  }, [dispatch, isNeedAuth]);

  return auth;
};
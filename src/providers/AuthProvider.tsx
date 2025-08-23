import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setLoading, setUser } from "../store/authSlice";
import { authApi } from "../api/auth.api";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        dispatch(setLoading(true));
        const user = await authApi.getUser();
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Session check failed:", error);
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuthSession();
  }, [dispatch]);

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
};

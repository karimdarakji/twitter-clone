import { setAccessToken } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const useAuth = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return {
    accessToken,
    setAccessToken: (value: string) => dispatch(setAccessToken(value)),
  };
};

export default useAuth;

import { setAccessToken } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type useAuthResult = () => {
  accessToken: string;
  setAccessToken: (value: string) => {
    payload: any;
    type: "auth/setAccessToken";
  };
};

const useAuth: useAuthResult = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return {
    accessToken,
    setAccessToken: (value: string) => dispatch(setAccessToken(value)),
  };
};

export default useAuth;

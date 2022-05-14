import { useRefreshTokenMutation } from "../redux/auth";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const [refreshToken] = useRefreshTokenMutation();

  const refresh = async () => {
    await refreshToken()
      .unwrap()
      .then((payload) => {
        setAuth({ accessToken: payload?.accessToken });
        return payload.accessToken;
      });
  };
  return refresh;
};

export default useRefreshToken;

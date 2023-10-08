import { useRefreshTokenMutation } from "../redux/auth/authApi";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAccessToken } = useAuth();

  const [refreshToken] = useRefreshTokenMutation();

  const refresh = async () => {
    await refreshToken()
      .unwrap()
      .then((payload) => {
        setAccessToken(payload?.accessToken);
        return payload.accessToken;
      });
  };
  return refresh;
};

export default useRefreshToken;

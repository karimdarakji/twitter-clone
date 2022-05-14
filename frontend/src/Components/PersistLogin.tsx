import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth }: any = useAuth();

  useEffect((): any => {
    let isMounted = true;

    const verfifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verfifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;

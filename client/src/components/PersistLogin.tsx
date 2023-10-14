import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();

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
    !accessToken ? verfifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  if(isLoading) {
    return <Box>Loading...</Box>
  }

  return <Outlet />
};

export default PersistLogin;

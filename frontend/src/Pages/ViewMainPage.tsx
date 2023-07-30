import React from 'react'
import useAuth from '../hooks/useAuth';
import { Home, Welcome } from '.';

const MainPage = () => {
  const { auth }: any = useAuth();
  if(auth?.accessToken) {
    return <Home />
  }
  return <Welcome />
}

export default MainPage

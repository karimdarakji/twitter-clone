import React from 'react'
import { Container } from '@mui/material';
import { Sidebar } from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <Container sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Container>
  )
}

export default SidebarLayout
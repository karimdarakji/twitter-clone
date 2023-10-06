import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const SidebarSkeleton = () => {
  return (
    <Stack spacing={1}>
        <br/>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Outlet />
    </Stack>
  )
}

export default SidebarSkeleton

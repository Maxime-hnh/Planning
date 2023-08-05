import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { Outlet } from 'react-router'
import Form from '../Components/Form/Form'

export default function AdminPage() {

    return (
        <>
            <NavBar />
            <Outlet />
      
            </>
            )
}
import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { Outlet } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminPage() {

    return (
        <>
            <NavBar />
            <Outlet />
            <ToastContainer />
        </>
    )
}
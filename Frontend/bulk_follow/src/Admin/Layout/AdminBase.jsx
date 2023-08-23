import React, { useEffect } from 'react'
import Sidebar from '../partials/Sidebar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function AdminBase() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('authToken') || !JSON.parse(localStorage.getItem('userData')).userRole === 'admin') {
            navigate('/admin/login')
        }
    }, [])


    return (
        <div className='bg-gray-100 lg:h-screen '>
            <div className='flex  '>
                <Sidebar />
                <main className='sm:px-6 md:pl-60 pt-8 w-full  '>
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

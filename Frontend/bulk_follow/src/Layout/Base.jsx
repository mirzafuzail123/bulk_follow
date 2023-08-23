import React from 'react'
import { useContext, useEffect } from 'react'
import Navbar from '../partials/Navbar'
import { Outlet } from 'react-router'


export default function Base() {
    return (
        <div className='max-w-screen-2xl mx-auto'  >
            <Navbar />
            <Outlet />
        </div>
    )
}

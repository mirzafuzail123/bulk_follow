import React from 'react'
import { createBrowserRouter, redirect, RouterProvider, } from "react-router-dom";
import AccountPage from '../Account/AccountPage';
import AdminLogin from '../Admin/Authentication/AdminLogin';
import AdminBase from '../Admin/Layout/AdminBase';
import AdminRouter from '../Admin/Router/AdminRouter';
import DepositePage from '../Deposit/components/DepositePage';
import Base from '../Layout/Base';
import NewOrderPage from '../NewOrder/Components/NewOrderPage';
import OrderHistoryPage from '../Order History/Components/OrderHistoryPage';
import SupportPage from '../Support/SupportPage';


export default function Router() {


    const customRouter = createBrowserRouter([

        // Client Side
        {
            path: '',
            element: <Base />,

            children: [
                {
                    path: '/',
                    element: <NewOrderPage />
                },
                {
                    path: '/orderHistory',
                    element: <OrderHistoryPage />
                },
                {
                    path: '/deposit',
                    element: <DepositePage />
                },
                {
                    path: '/support',
                    element: <SupportPage />
                },
                {
                    path: '/account',
                    element: <AccountPage />

                },
            ],
        },


        // Admin Dashobard
        {
            path: '/admin',
            element: <AdminBase />,
            loader: () => {

                if (!localStorage.getItem('authToken') || JSON.parse(localStorage.getItem('userData')).userRole !== 'admin') {
                    console.log('1')
                    throw redirect('/admin/login')
                }
                else {
                    console.log('2')

                    return null
                }
            },
            children: AdminRouter()
        },

        // Admin Login
        {
            path: '/admin/login',
            element: <AdminLogin />
        }


    ])
    return (
        <RouterProvider router={customRouter} />
    )
}

import React from 'react'
import AdminAccountPage from '../AdminAccount/AdminAccountPage'
import SupportPage from '../Customer Support/SupportPage'
import AdminDashboard from '../Dashboard/AdminDashboard'
import TransactionPage from '../Transactions/TransactionPage'
import TwitchOrderPage from '../TwitchOrders/TwitchOrderPage'


export default function AdminRouter() {
    return (
        [
            {
                path: '/admin',
                element: <AdminDashboard />
            },

            {
                path: '/admin/orders',
                element: <TwitchOrderPage />
            },
            {
                path: '/admin/transactions',
                element: <TransactionPage />
            },

            {
                path: '/admin/support',
                element: <SupportPage />
            },
            {
                path: '/admin/account',
                element: <AdminAccountPage />
            },
        ]
    )
}

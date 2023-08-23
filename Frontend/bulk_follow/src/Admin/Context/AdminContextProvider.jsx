import React from 'react'
import AdminContext from '../Context/AdminContext'
import AdminInstance from '../AxiosInstance/AdminInstance'

export default function AdminContextProvider(props) {


    // Saving Auth Response
    const SavingAuthResponse = (data) => {
        localStorage.setItem('authToken', JSON.stringify({ 'access_token': data.access_token, 'refresh_token': data.refresh_token }))
        localStorage.setItem('userData', JSON.stringify({ "user_id": data.user_id, "email": data.email, "username": data.username, 'userRole': data.userRole }))
    }


    // Login Admin
    const LoginAdminFunc = async (data) => {
        const response = await AdminInstance.post('/loginAdmin/', { data })
        SavingAuthResponse(response.data)
    }

    // Twitch Orders
    const TwitchOrderListFunc = async () => {
        const response = await AdminInstance.get('/twitchOrders')
        return response.data
    }


    // Updating Order
    const TwitchUpdateOrderFunc = async (id, data) => {
        const response = await AdminInstance.patch(`/twitchUpdateOrder/${id}/`, { 'apiOrderId': data.apiOrderId })
    }


    // Transaction List
    const TransactionListFunc = async () => {
        const response = await AdminInstance.get('/transactionList/')
        return response.data
    }

    // UserSupportList
    const UserSupportListFunc = async () => {
        const response = await AdminInstance.get('/userSupportList/')
        return response.data
    }

    return (
        <AdminContext.Provider value={{ LoginAdminFunc, TwitchOrderListFunc, TwitchUpdateOrderFunc, TransactionListFunc, UserSupportListFunc }}>
            {props.children}
        </AdminContext.Provider>
    )
}

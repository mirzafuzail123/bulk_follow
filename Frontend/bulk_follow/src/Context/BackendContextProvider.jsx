import React from 'react'
import BackendContext from './BackendContext'
import BackendInstance from '../utils/BackendInstance'

export default function BackendContextProvider(props) {


    // Saving Auth Response
    const SavingAuthResponse = (data) => {
        localStorage.setItem('authToken', JSON.stringify({ 'access_token': data.access_token, 'refresh_token': data.refresh_token }))
        localStorage.setItem('userData', JSON.stringify({ "user_id": data.user_id, "email": data.email, "username": data.username }))
    }

    // Register User
    const RegisterUserFunc = async (data) => {
        const response = await BackendInstance.post('/register/', { data })
        if (response.status === 201) {
            SavingAuthResponse(response.data)
        }

    }


    // Login User
    const LoginUserFunc = async (data) => {
        const response = await BackendInstance.post('/login/', { data })
        if (response.status === 200) {
            SavingAuthResponse(response.data)
        }
    }


    // Account
    const UserAccountFunc = async () => {
        const response = await BackendInstance.get('/userAccount/')
        return response.data
    }


    // Edit Profile
    const EditProfileFunc = async (data) => {
        const response = await BackendInstance.post('/editProfile/', { data })
        return response.data
    }


    // Change Password
    const ChangePasswordFunc = async (data) => {
        const response = await BackendInstance.post('/changePassword/', { data })
        console.log(response)
    }


    // Fetching User Balance
    const UserBalanceFunc = async (data) => {
        const response = await BackendInstance.get('/userBalance/')
        return response.data
    }


    // Checking User Auth
    const CheckingUserAuthFunc = async (email) => {
        const response = await BackendInstance.post('/checkUserAuth/', { email })
        if (response.status === 201) {
            SavingAuthResponse(response.data)
        }
        return response
    }


    // Placing Order
    const PlaceOrderFunc = async (data) => {
        const response = await BackendInstance.post('/placeOrder/', { data })
        return response
    }


    // createPaymentIntent 
    const CreatePaymentIntentFunc = async (data) => {
        const response = await BackendInstance.post('/createPaymentIntent/', { data })
        return response.data
    }


    // Deposit Money
    const DepositPaymentFunc = async (data) => {
        const response = await BackendInstance.post('./depositPayment/', { data })
    }



    // Fetching Payment Details
    const PaymentDetailFunc = async () => {
        const response = await BackendInstance.get('/paymentDetail/')
        return response.data
    }


    // Fetching Order History
    const OrderHistoryFunc = async () => {
        const response = await BackendInstance.get('/orderHistory/')
        return response.data
    }


    // User Support 
    const UserSupportFunc = async (data) => {
        const response = await BackendInstance.post('/userSupport/', { data })
        console.log(response)
    }

    return (
        <BackendContext.Provider value={{
            RegisterUserFunc, LoginUserFunc, UserAccountFunc, UserBalanceFunc, EditProfileFunc, ChangePasswordFunc,
            CheckingUserAuthFunc, PlaceOrderFunc, CreatePaymentIntentFunc, DepositPaymentFunc, PaymentDetailFunc,
            OrderHistoryFunc, UserSupportFunc,
        }}>
            {props.children}
        </BackendContext.Provider>
    )
}

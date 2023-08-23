import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackendContext from '../../Context/BackendContext'
import GlobalStateContext from '../../Context/GlobalStateContext'
import Lottie from 'lottie-react'
import Wallet from '../../assets/Wallet.json'
import DepositForm from './DepositForm'
import CheckoutModal from '../components/CheckoutModal'
import PaymentDetails from './PaymentDetails'
import Loader from '../../partials/Loader'


export default function DepositePage() {

    const [userBalance, setuserBalance] = useState(null)
    const [PaymentDetailList, setPaymentDetailList] = useState([])

    const [showCheckOut, setshowCheckOut] = useState(false)
    const [clientSecret, setclientSecret] = useState(null)
    const [loading, setloading] = useState(true)


    const { dummyState, setshowLogin } = useContext(GlobalStateContext)
    const { UserBalanceFunc, PaymentDetailFunc } = useContext(BackendContext)
    const navigate = useNavigate()

    const email = localStorage.getItem('authToken') && JSON.parse(localStorage.getItem('userData')).email


    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            setshowLogin(true)
            navigate('/');
        }
    }, [])


    useEffect(() => {
        // user balance
        UserBalanceFunc().then((response) => {
            setuserBalance(response.balance)
            // PaymentDetails
            PaymentDetailFunc().then((data) => {
                setPaymentDetailList(data)
                setTimeout(() => {
                    setloading(false)
                }, 1000);

            })
        })
    }, [dummyState, clientSecret])

    return (
        loading ? <Loader /> : localStorage.getItem('authToken') && <>
            <CheckoutModal Modal={showCheckOut} setModal={setshowCheckOut} clientSecret={clientSecret} />


            <div className=' md:w-[90%] mx-auto bump'>

                <div className='md:flex md:space-x-20 md:justify-between'>

                    {/* Column 1 */}
                    <div className='flex flex-col md:w-[45%] '>

                        <div className='flex justify-center space-x-3 border-b-2 border-gray-200   '>
                            <Lottie animationData={Wallet} className='w-52 h-52'></Lottie>
                            <h1 className='text-[#354168] text-xl tracking-wide py-16'>Your current balance is: <br /> <span className='font-semibold text-2xl font-mono text-primary'>${userBalance}</span> </h1>
                        </div>

                        <div className=' mt-10 mb-10 bump px-7 pt-7 rounded-sm border-2 border-gray-200 '>
                            <DepositForm email={email} setshowCheckOut={setshowCheckOut} setclientSecret={setclientSecret} />
                        </div>

                    </div>

                    {/* Column 2 */}
                    <div className='md:w-[50%] max-h-[75vh] mt-10 mb-10 bump overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar px-5 pt-7 rounded-sm border-2 border-gray-200 '>
                        <PaymentDetails
                            PaymentDetailList={PaymentDetailList}
                        />
                    </div>

                </div>


            </div>
        </>
    )
}

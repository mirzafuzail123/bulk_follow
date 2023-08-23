import React, { useRef, useEffect, useState, useContext } from 'react'
import GlobalStateContext from '../Context/GlobalStateContext'
import BackendContext from '../Context/BackendContext'
import CustomAlert from '../partials/CustomAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons'

export default function PasswordModal({ Modal, setModal, setshowPaymentModal }) {

    const ModalRef = useRef()
    const { LoginUserFunc, PlaceOrderFunc } = useContext(BackendContext)
    const { OrderData, setOrderData, dummyState, setdummyState, setRequiredAmont, ResetForm } = useContext(GlobalStateContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [LoginError, setLoginError] = useState(false)


    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
                setLoginError(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const password = Object.fromEntries(formdata)
        const data = {
            'email': OrderData['email'],
            'password': password['password'],
        }
        // Authenticating User
        LoginUserFunc(data).then(() => {
            setdummyState(!dummyState)
            // Placing Order
            PlaceOrderFunc(OrderData).then((response) => {         // If user has sufficient balance
                setSubmitLoader(false)
                ResetForm.reset()
                setModal(false)
                setdummyState(!dummyState)
                CustomAlert('Order placed successfully!', 'success')

            })
                .catch((error) => {
                    setRequiredAmont(error.response.data.required_amount)                  // If user has insufficient balance
                    setshowPaymentModal(true)
                    setSubmitLoader(false)
                    setModal(false)
                    CustomAlert('Insufficient balance! ', 'error')
                })

        }).catch(() => {
            setLoginError(true)
            setSubmitLoader(false)
        })
    }




    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0  md:h-full" >
                <div className="relative w-80  max-w-md md:h-auto mx-auto mt-20  " ref={ModalRef}>
                    <div className="relative bg-white rounded-sm shadow-2xl backdrop:blur-sm ">

                        {/* Close */}
                        <div className='flex justify-end p-2'>
                            <span className='border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false); setLoginError(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        {/* Body */}
                        <div className="h-72 flex flex-col pt-1">
                            {/* Avatar */}
                            <div className='h-20 w-20 mx-auto text-center rounded-full bg-gray-300'>
                                <FontAwesomeIcon icon={faUser} className='text-white text-[3rem] py-3 ' />
                            </div>

                            {/* Email */}
                            <div className='my-3'>
                                <h1 className='text-center text-xs tracking-wide font-medium'>{OrderData['email']}</h1>
                            </div>

                            <div className='my-2'>
                                <h1 className='text-xs text-gray-500 text-center'>Please enter your password to continue</h1>
                            </div>

                            {/* Password */}
                            <form onSubmit={handleOnSubmit}>
                                <div className={`flex w-[70%] mx-auto text-sm items-center border-2 ${LoginError && 'border-red-400'} py-2 px-2 rounded-sm`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                    <input required className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" />
                                </div>
                                {LoginError && <p className="text-xs mt-2 mx-12 font-normal text-red-600 mb-4 tracking-wide">Invalid credentials</p>
                                }

                                {/* Button */}
                                <button
                                    disabled={SubmitLoader}
                                    type="submit"
                                    className={`block w-[70%] text-sm mx-auto ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'}  mt-4 py-2 rounded-sm text-white font-semibold mb-2`}>
                                    {SubmitLoader ?
                                        <span><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span> :
                                        <span>Continue</span>
                                    }
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40   bg-black "></div>
        </div>
    )
}

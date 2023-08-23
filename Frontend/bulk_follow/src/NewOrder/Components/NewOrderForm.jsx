import React from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import BackendContext from '../../Context/BackendContext';
import CustomAlert from '../../partials/CustomAlert'
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faShoppingBag, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function NewOrderForm({ setshowPasswordModal, setshowPaymentModal }) {

    const { SelectedCategoryState, setdummyState, dummyState, OrderData, setOrderData, setRequiredAmont, ResetForm, setResetForm } = useContext(GlobalStateContext)
    const { CheckingUserAuthFunc, PlaceOrderFunc } = useContext(BackendContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [TotalCharge, setTotalCharge] = useState(0)


    const handleChargeChange = (e) => {
        const charge = (e.target.value / 1000) * 6
        setTotalCharge(charge.toFixed(2))
    }


    useEffect(() => {
    }, [dummyState])


    const userData = localStorage.getItem('authToken') && JSON.parse(localStorage.getItem('userData'))


    // Logged in User Function
    const handleAuthenticatedUser = (data, type) => {
        PlaceOrderFunc(data).then((response) => {                               // If user has sufficient balance
            setSubmitLoader(false)
            ResetForm.reset()
            setdummyState(!dummyState)
            CustomAlert('Order placed successfully!', 'success')

        }).catch((error) => {
            if (error.response.status === 500) {
                setSubmitLoader(false)
                CustomAlert('Something went wrong! Please try again.', 'error')

            }
            else {
                setRequiredAmont(error.response.data.required_amount)                  // If user has insufficient balance
                setSubmitLoader(false)
                setshowPaymentModal(true)
                // If user is created so instead of showing insufficient balance we are showing registraion succesfull
                if (type === 'register') {
                    CustomAlert('Your password has been sent to your email.', 'success')
                }
                else {
                    CustomAlert('Insufficient balance! ', 'error')
                }
            }

        })
    }

    // Not Logged In user
    const handleUnauthenticatedUser = (data) => {
        CheckingUserAuthFunc(data['email']).then((response) => {
            setSubmitLoader(false)
            // if user already exist
            if (response.status === 200) {
                setshowPasswordModal(true)
                window.scroll(0, 0)
            }
            // if user is created
            else {
                handleAuthenticatedUser(data, 'register')
            }
        })
    }

    const handleOnSumit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        setResetForm(e.target)
        // Views Validaation
        if (data.no_of_views % 100 !== 0) {
            setSubmitLoader(false)
            CustomAlert('No of views must be multiple of 100', 'error')
        }

        // Join Delay Validation
        else if (data.joinDelay % 5 !== 0) {
            setSubmitLoader(false)
            CustomAlert('Join delay must be multiple of 5', 'error')
        }

        else {
            data['totalCharge'] = TotalCharge
            data['category'] = SelectedCategoryState
            setOrderData(data)

            // If user Logged in
            if (localStorage.getItem('authToken')) {
                handleAuthenticatedUser(data,)
            }

            // if user is not logged in 
            else {
                handleUnauthenticatedUser(data)
            }
        }

    }

    return (
        <>
            <div className='md:w-[50%]   mb-10 bump px-9 pt-5 rounded-sm border-2 border-gray-200'>

                <div className='border-b border-gray-200 px-2 pb-4'>
                    <h1 className='text-xl font-bold  text-secondary ' ><FontAwesomeIcon icon={faCartArrowDown} className='pr-1 text-primary' /> Place your order </h1>
                </div>

                <form onSubmit={handleOnSumit} className='flex flex-col space-y-7 mt-8 mb-5' >

                    {/* Category */}
                    <div className={`flex items-center border-2  py-2 px-2 rounded-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9h12" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15h12" />
                        </svg>

                        <select required className="pl-2  outline-none w-full border-none default:text-gray-400 " type="text" name="category" placeholder="Email Address" >
                            <option value={SelectedCategoryState}>{SelectedCategoryState}</option>

                        </select>
                    </div>


                    {/* Channel Name */}
                    {SelectedCategoryState === 'twitch' &&
                        <div className={`flex items-center border-2  py-2 px-2 rounded-sm `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 5.5v13h13v-13h-13zM5.5 5.5h6.364M5.5 11h4.293M5.5 16.5h6.364" />
                            </svg>
                            <input required className="pl-2 outline-none  w-full  border-none" type="text" name="channelName" placeholder="Channel Name" />
                        </div>
                    }

                    {/* No. of Views */}
                    {SelectedCategoryState === 'twitch' &&
                        <div className={`flex items-center border-2  py-2 px-2 rounded-sm `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20s8-4.5 8-10c0-5.5-8-10-8-10S4 4.5 4 10c0 5.5 8 10 8 10z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4" />
                            </svg>
                            <input
                                onChange={handleChargeChange}
                                required
                                min={1000}
                                max={300000}
                                className="pl-2 outline-none  w-full  border-none"
                                type="number"
                                name="no_of_views"
                                placeholder="No. of views  (e.g.  1000 , 1100 , 1200 )" />
                        </div>
                    }

                    {/* Desired Viewers Count */}
                    {SelectedCategoryState === 'twitch' &&
                        <div className={`flex items-center border-2  py-2 px-2 rounded-sm `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.828 7.172a4 4 0 015.656 5.656M16.828 7.172l-1.414 1.414M16.828 7.172l-4.243 4.243M16.828 7.172l-4.95 4.95M16.828 7.172l-2.122 2.122M7.172 16.828a4 4 0 01-5.656-5.656M7.172 16.828l1.414-1.414M7.172 16.828l4.243-4.243M7.172 16.828l4.95-4.95M7.172 16.828l2.122-2.122" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 12a3.536 3.536 0 11-7.072 0 3.536 3.536 0 017.072 0zM16 16v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1" />
                            </svg>

                            <input
                                min={5}
                                max={200000}
                                required
                                className="pl-2 outline-none  w-full  border-none"
                                type="number" name="desiredViewersCount"
                                placeholder="Desired Viewers Count" />
                        </div>
                    }

                    {/* Join Delay */}
                    {SelectedCategoryState === 'twitch' &&
                        <div className={`flex items-center border-2  py-2 px-2 rounded-sm `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 11a5 5 0 01-5 5M12 6v5l3-3m-3-3h6" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6" />
                            </svg>
                            <input
                                min={0}
                                max={240}
                                required
                                className="pl-2 outline-none  w-full  border-none"
                                type="number"
                                name="joinDelay"
                                placeholder="Join Delay  (e.g.  5 , 10 , 15) " />
                        </div>
                    }


                    {/* Email*/}
                    {!userData &&
                        <div className={`flex items-center border-2  py-2 px-2 rounded-sm `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input required className="pl-2 outline-none  w-full  border-none" type="email" name="email" placeholder="Email Address" />
                        </div>
                    }

                    {/* Total Charge */}
                    <div className='bg-gray-100'>
                        <input
                            name='totalCharge'
                            value={`$${TotalCharge}`}
                            disabled
                            className=' font-mono py-2 px-2 rounded-sm w-full'
                        />
                    </div>

                    <button
                        disabled={SubmitLoader}
                        type='submit'
                        className={`w-24 h-10 text-[1rem] tracking-wide  rounded-sm ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'} text-white `}>
                        {SubmitLoader ?
                            <FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /> :
                            <span>
                                <FontAwesomeIcon icon={faShoppingBag} className='pr-1' /> Order
                            </span>
                        }

                    </button>

                </form>
            </div >
        </>
    )
}

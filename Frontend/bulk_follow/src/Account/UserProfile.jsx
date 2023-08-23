import React from 'react'
import { useContext, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import UserLogo from '../assets/UserLogo.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faEnvelope, faDollar } from '@fortawesome/free-solid-svg-icons'
import BackendContext from '../Context/BackendContext'
import GlobalStateContext from '../Context/GlobalStateContext'

export default function UserProfile({ setshowEditProfile, setCurrentValue, userData }) {


    return (
        userData && <div className='flex flex-col space-y-7' >

            {/* Header */}
            <div className=' border-b pb-3 mx-3'>
                <div className='flex space-x-2'>
                    {/* <Lottie animationData={PasswordLogo} className='w-8 h-8' /> */}
                    <h1 className='text-secondary font-bold text-xl tracking-wide pt-1 px-4'>Account details</h1>
                </div>
            </div>


            {/* Body */}
            <div className='lg:flex xs:px-5 lg:px-0'>
                <div className='w-[45%] mb-10'>
                    <Lottie animationData={UserLogo} className='w-60 h-60' />

                </div>

                <div className='flex flex-col space-y-8 w-[48%] mt-5 whitespace-nowrap mr-5'>

                    {/* Username */}
                    <div className='flex flex-col space-y-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-secondary font-bold text-lg'><FontAwesomeIcon icon={faUser} className='pr-1 text-primary' /> Username</h1>
                            <FontAwesomeIcon
                                onClick={() => { setshowEditProfile(true); setCurrentValue({ 'type': 'username', 'value': userData.username }) }}
                                icon={faPenToSquare}
                                className='pt-2 text-dark-primary cursor-pointer' />                        </div>
                        <p className='text-sm font-semibold pl-6 tracking-wide'>{userData.username}</p>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col space-y-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-secondary font-bold text-lg'><FontAwesomeIcon icon={faEnvelope} className='pr-1 text-primary' /> Email</h1>
                            <FontAwesomeIcon
                                onClick={() => { setshowEditProfile(true); setCurrentValue({ 'type': 'email', 'value': userData.email }) }}
                                icon={faPenToSquare}
                                className='pt-2 text-dark-primary cursor-pointer' />
                        </div>
                        <p className='text-sm font-semibold pl-6 tracking-wide'>{userData.email}</p>
                    </div>

                    {/* Balance */}
                    <div className='flex flex-col space-y-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-secondary font-bold text-lg'><FontAwesomeIcon icon={faDollar} className='pr-1 text-primary' /> Balance</h1>
                        </div>
                        <p className='text-sm font-semibold pl-6 tracking-wide font-mono'><span className='font-bold text-lg'>$</span>{userData.balance}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

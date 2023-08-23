import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Lottie from 'lottie-react'
import SupportLogo from '../assets/SupportLogo.json'
import Loader from '../partials/Loader'
import ContactForm from './ContactForm'

export default function SupportPage() {

    const [loading, setloading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (
        loading ? <Loader /> :

            <div className='md:w-[90%] mt-10  mx-auto xs:space-y-5 lg:space-y-0 lg:flex lg:justify-between'>
                <div className='relative bottom-8'>
                    <Lottie animationData={SupportLogo} className='h-[28rem]' />
                </div>

                <div className='lg:w-[35%]  px-8 xs:mx-auto lg:mx-0 py-5 lg:mr-40 h-[27rem]  rounded-sm border-2 border-gray-200 '>
                    <ContactForm />
                </div>

            </div>
    )
}

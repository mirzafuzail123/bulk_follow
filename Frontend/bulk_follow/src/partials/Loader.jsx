import React from 'react'
import Lottie from 'lottie-react'
import LoaderLogo from '../assets/LoaderLogo.json'
export default function Loader() {
    return (
        <div className='flex items-center justify-center h-[70vh]'>

            <Lottie animationData={LoaderLogo} className='mx-auto w-48 h-48  ' />
        </div>
    )
}

import React from 'react'
import Lottie from 'lottie-react'
import NotFoundLogo from '../assets/NotFound.json'

export default function NotFound() {
    return (
        <div className='mt-8'>
            <Lottie animationData={NotFoundLogo} className='h-48' />
        </div>
    )
}

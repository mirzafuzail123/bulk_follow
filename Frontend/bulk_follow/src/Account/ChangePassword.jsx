import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleNotch, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import PasswordLogo from '../assets/PasswordLogo.json'
import BackendContext from '../Context/BackendContext'
import CustomAlert from '../partials/CustomAlert'

export default function ChangePassword() {

    const { ChangePasswordFunc } = useContext(BackendContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        ChangePasswordFunc(data).then(() => {
            e.target.reset()
            setSubmitLoader(false)
            CustomAlert('You password has been changed successfully!', 'success')
        })
            .catch((error) => {
                setSubmitLoader(false)
                CustomAlert('Incorrect password!', 'error')
            })
    }

    return (
        <div className='flex flex-col px-3'>

            {/* Header */}
            <div className=' border-b pb-3'>
                <div className='flex space-x-2'>
                    <Lottie animationData={PasswordLogo} className='w-8 h-8' />
                    <h1 className='text-secondary font-bold text-xl tracking-wide pt-1'>Change password</h1>
                </div>
            </div>

            {/* Body */}
            <div className=" flex flex-col p-5 my-3">
                <form onSubmit={handleOnSubmit} className='space-y-6'>

                    {/* Current Password */}
                    <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                        <FontAwesomeIcon icon={faLock} className='text-gray-400' />
                        <input
                            required
                            className="pl-2 outline-none  w-full  border-none"
                            type="password"
                            name='password'
                            placeholder='Current password' />
                    </div>

                    {/* New Password */}
                    <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                        <FontAwesomeIcon icon={faLock} className='text-gray-400' />
                        <input
                            required
                            className="pl-2 outline-none  w-full  border-none"
                            type="password"
                            name='newPassword'
                            placeholder='New password' />
                    </div>

                    <div className='flex justify-end '>
                        <button
                            disabled={SubmitLoader}
                            type='submit'
                            className={`w-20 h-9 text-sm tracking-wide  rounded-sm ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'} text-white `}>
                            {SubmitLoader ?
                                <FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /> :
                                <span>
                                    Save
                                </span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

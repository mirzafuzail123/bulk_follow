import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faUser, faLock, faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons'
import BackendContext from '../Context/BackendContext'
import CustomAlert from '../partials/CustomAlert'

export default function ContactForm() {

    const { UserSupportFunc } = useContext(BackendContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)

    const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        UserSupportFunc(data).then(() => {
            e.target.reset()
            setSubmitLoader(false)
            CustomAlert('Your query has been submitted', 'success')
        })
            .catch(() => {
                setSubmitLoader(false)
                CustomAlert('Something went wrong! Please try again.', 'error')
            })
    }


    return (
        <div>
            {/* Header */}
            <div className='border-b h-[20%] pb-3'>
                <h1 className='text-secondary font-bold text-xl'>How can we help you?</h1>
            </div>

            {/* Body */}
            <form onSubmit={handleOnSubmit} className='space-y-7 mt-7'>

                {/* Username */}
                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                    <FontAwesomeIcon icon={faUser} className='text-gray-400' />
                    <input
                        defaultValue={userData && userData.username}
                        required
                        className="pl-2 outline-none  w-full  border-none"
                        type="text"
                        name='username'
                        placeholder='Username' />
                </div>

                {/* Email */}
                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                    <FontAwesomeIcon icon={faEnvelope} className='text-gray-400' />
                    <input
                        required
                        defaultValue={userData && userData.email}
                        className="pl-2 outline-none  w-full  border-none"
                        type="email"
                        name='email'
                        placeholder='Email' />
                </div>

                {/* Message */}
                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                    <FontAwesomeIcon icon={faMessage} className='text-gray-400 relative bottom-[2.40rem]' />
                    <textarea
                        rows={5}
                        required
                        className="pl-2 outline-none  w-full  border-none resize-none scrollbar-thin scrollbar-y-none scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar"
                        name='message'
                        placeholder='Message' />
                </div>

                <div className='flex justify-end '>
                    <button
                        disabled={SubmitLoader}
                        type='submit'
                        className={`w-20 h-9 text-sm tracking-wide  rounded-sm ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'} text-white `}>
                        {SubmitLoader ?
                            <FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /> :
                            <span>
                                Send
                            </span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

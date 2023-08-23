import React from 'react'
import { useContext, useState } from 'react'
import BackendContext from '../Context/BackendContext'
import GlobalStateContext from '../Context/GlobalStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import CustomAlert from '../partials/CustomAlert'

export default function Register({ setshowRegister, setModal }) {

    const { RegisterUserFunc } = useContext(BackendContext)
    const { dummyState, setdummyState } = useContext(GlobalStateContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [RegisterError, setRegisterError] = useState(false)


    const handleOnSubmit = (e) => {
        setSubmitLoader(true)
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        RegisterUserFunc(data).then(() => {
            setSubmitLoader(false)
            setdummyState(!dummyState)
            setModal(false)
            CustomAlert('Registration successful', 'success')

        }).catch(() => {
            setSubmitLoader(false)
            setRegisterError(true)
        })
    }

    return (
        <div className="flex md:w-[30%] bump justify-center py-10 items-center bg-white transition-transform duration-500 ease-in-out">
            <form onSubmit={handleOnSubmit} className="bg-white text-sm">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome</h1>
                <p className="text-sm font-normal text-gray-600 mb-7">Please register your account</p>


                {/* Username */}
                <div className="flex items-center border-2 py-2 px-2 rounded-sm mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="text" name="username" placeholder="Username" />
                </div>

                {/* Email */}
                <div className={`flex items-center border-2 ${RegisterError && 'border-red-400'} py-2 px-2 rounded-sm mb-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input required className="pl-2 outline-none border-none" type="text" name="email" placeholder="Email Address" />
                </div>
                {RegisterError && <p className="text-xs font-normal text-red-600 mb-4 tracking-wide">Email already exists</p>}

                {/* Password */}
                <div className="flex items-center border-2 py-2 px-2 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd" />
                    </svg>
                    <input required className="pl-2 outline-none border-none" type="password" name="password" placeholder="Password" />
                </div>


                {/* Login Button */}
                <button
                    disabled={SubmitLoader}
                    type="submit"
                    className={`block w-full ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'}  mt-4 py-2 rounded-sm text-white font-semibold mb-2`}>
                    {SubmitLoader ?
                        <span><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span> :
                        <span>Register</span>
                    }
                </button>

                <div className='flex flex-col space-y-2 pt-2 '>
                    <span className="text-xs ml-2">Already have an account ? <span className='underline text-primary  hover:text-dark-primary cursor-pointer ' onClick={() => setshowRegister(false)}>Login</span></span>
                </div>
            </form>
        </div>

    )
}

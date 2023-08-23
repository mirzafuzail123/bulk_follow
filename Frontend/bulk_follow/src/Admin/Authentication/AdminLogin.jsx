import React from 'react'
import AgencyLogo from '../../assets/AgencyLogo.png'
import AdminContext from '../Context/AdminContext'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {

    const navigate = useNavigate()
    const { LoginAdminFunc } = useContext(AdminContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [LoginError, setLoginError] = useState(false)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setLoginError(false)
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        LoginAdminFunc(data).then(() => {
            setSubmitLoader(false)
            navigate('/admin')
        })
            .catch(() => {
                setLoginError(true)
                setSubmitLoader(false)
            })
    }

    return (
        <>
            <div className="md:flex  ">

                <div
                    className="relative h-screen overflow-hidden md:flex w-[50%] bg-gradient-to-tr from-rose-300 to-dark-primary justify-around items-center hidden">
                    <div>
                        <img src={AgencyLogo} className={`w-26 h-20 drop`} alt="" />
                    </div>
                    <div className="absolute  -bottom-20 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>

                <div className='w-[50%] mx-auto bump '>
                    <div className='flex justify-center pt-28'>
                        <form onSubmit={handleOnSubmit} className="bg-white text-sm space-y-5 border-2 p-16 rounded-3xl">
                            <div>

                                <h1 className="text-gray-800 font-bold text-3xl mb-1">Admin Panel</h1>
                                <p className="text-sm font-normal text-gray-600 mb-7">Please login to continue</p>
                            </div>
                            {LoginError && <p className="text-sm font-normal text-red-600 mb-4 tracking-wide">Invalid credentials</p>
                            }

                            {/* Email */}
                            <div className={`flex w-60 items-center border-2 ${LoginError && 'border-red-400'} py-2 px-2 rounded-sm mb-4`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input required className="pl-2 w-full outline-none border-none" type="text" name="email" placeholder="Email Address" />
                            </div>

                            {/* Password */}
                            <div className={`flex w-60 items-center border-2 ${LoginError && 'border-red-400'} py-2 px-2 rounded-sm`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd" />
                                </svg>
                                <input required className="pl-2 w-full outline-none border-none" type="password" name="password" placeholder="Password" />
                            </div>

                            {/* Login Button */}
                            <button
                                disabled={SubmitLoader}
                                type="submit"
                                className={`block w-60 ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'}  mt-4 py-2 rounded-sm text-white font-semibold mb-2`}>
                                {SubmitLoader ?
                                    <span><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span> :
                                    <span>Login</span>
                                }
                            </button>

                        </form>
                    </div>

                </div>


            </div>

        </>
    )
}

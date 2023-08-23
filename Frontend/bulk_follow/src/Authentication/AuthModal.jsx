import React from 'react'
import { useRef, useEffect, useState } from 'react'
import AgencyLogo from '../assets/AgencyLogo.png'
import Register from './Register'
import Login from './Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Transition } from "@headlessui/react";

export default function AuthModal({ Modal, setModal }) {

    const ModalRef = useRef()
    const [showRegister, setshowRegister] = useState(false)
    const [animateModal, setanimateModal] = useState(false)

    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    useEffect(() => {
        setanimateModal(true)

        const timer = setTimeout(() => {
            setanimateModal(false)
        }, 1000);

        return () => {
            clearTimeout(timer)
        }

    }, [showRegister])


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal " >
                <div className="relative  mx-auto " ref={ModalRef}>
                    <div className="flex flex-col ">
                        <div className="md:flex justify-center relative top-8">
                            <div
                                className="relative h-[30rem] overflow-hidden md:flex w-[30%] bg-gradient-to-tr from-rose-300 to-primary justify-around items-center hidden">
                                <div>
                                    <img src={AgencyLogo} className={`w-26 h-20 ${animateModal && 'drop'}`} alt="" />
                                </div>
                                <div className="absolute  -bottom-32 -left-40 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                                <div className="absolute -bottom-40 -left-20 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                                <div className="absolute -top-40 -right-0 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                                <div className="absolute -top-20 -right-20 w-60 h-60 border-4 rounded-full border-opacity-30 border-t-8"></div>
                            </div>

                            {showRegister ?

                                // Register Form
                                <Register setshowRegister={setshowRegister} setModal={setModal} /> :

                                // Login Form
                                <Login setshowRegister={setshowRegister} setModal={setModal} />
                            }
                            <span
                                onClick={() => setModal(false)}
                                className='md:justify-end relative right-7 top-2 '>
                                <FontAwesomeIcon icon={faClose} className='text-gray-500 cursor-pointer' />
                            </span>
                        </div>


                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </div>

    )
}


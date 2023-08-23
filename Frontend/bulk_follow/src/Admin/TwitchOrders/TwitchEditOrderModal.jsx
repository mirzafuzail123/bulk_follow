import React, { useRef, useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import AdminContext from '../Context/AdminContext'

export default function TwitchEditOrderModal({ Modal, setModal, SelectedOrder, dummyState, setdummyState }) {
    const ModalRef = useRef()
    const { TwitchUpdateOrderFunc } = useContext(AdminContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)


    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        TwitchUpdateOrderFunc(SelectedOrder.id, data).then(() => {
            setdummyState(!dummyState)
            setSubmitLoader(false)
            setModal(false)
        })
    }

    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[25%] h-full  md:h-auto mx-auto left-20 mt-28 bump" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow ">

                        {/* Close */}
                        <div className='flex justify-end  p-2'>
                            <span className='border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        {/* Body */}

                        <div className="px-5 pb-5 flex flex-col space-y-6 ">

                            {/* Order Id */}
                            <div className='flex space-x-3 '>
                                <h1 className='font-semibold text-sm '>
                                    Order Id:</h1>
                                <p className='text-xs pt-[0.15rem] '>{SelectedOrder.orderId} </p>
                            </div>

                            <form action="" onSubmit={handleOnSubmit} className='space-y-5'>

                                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 5.5v13h13v-13h-13zM5.5 5.5h6.364M5.5 11h4.293M5.5 16.5h6.364" />
                                    </svg>
                                    <input
                                        required
                                        className="pl-2 outline-none  w-full  border-none"
                                        type="number"
                                        name="apiOrderId"
                                        placeholder="API Order ID" />
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
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}

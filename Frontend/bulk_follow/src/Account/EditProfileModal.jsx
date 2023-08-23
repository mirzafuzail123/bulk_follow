import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleNotch, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import BackendContext from '../Context/BackendContext'
import CustomAlert from '../partials/CustomAlert'
import GlobalStateContext from '../Context/GlobalStateContext'

export default function EditProfileModal({ Modal, setModal, currentValue }) {      // This currentValue contains object which defines either it is for updating email or username

    const { EditProfileFunc } = useContext(BackendContext)
    const { dummyState, setdummyState } = useContext(GlobalStateContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState(null)


    // Updating Value in local Storage
    const UpdatelocalStorage = (newVal) => {
        const localData = JSON.parse(localStorage.getItem('userData'))
        localData[currentValue.type] = newVal                                  // currentValue.type === 'email' or 'username
        localStorage.setItem('userData', JSON.stringify(localData))

    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        EditProfileFunc(data).then((response) => {
            const newValue = response[currentValue.type]
            UpdatelocalStorage(newValue)
            setdummyState(!dummyState)
            setSubmitLoader(false)
            CustomAlert(`Your ${currentValue.type} has been changed successfully!`, 'success')
            setModal(false)
        })
            .catch((error) => {
                if (error.response.status === 401) {
                    CustomAlert('Incorrect password!', 'error')
                }
                else if (error.response.status === 409) {
                    CustomAlert(`${currentValue.type} already exists!`, 'error')
                }
                setSubmitLoader(false)

            })
    }


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-80 h-full  md:h-auto mx-auto mt-28">
                    <div className="relative bg-white rounded-lg shadow px-3">

                        {/* Header */}
                        <div className='flex justify-between h-[20%] border-b'>

                            {/* Heading */}
                            <div className='p-5'>
                                <h1 className='text-secondary text-xl tracking-wide font-bold'>Edit username</h1>
                            </div>

                            {/* Close */}
                            <span className='my-2 border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>


                        {/* Body */}
                        <div className=" flex flex-col p-5 my-3">
                            <form onSubmit={handleOnSubmit} className='space-y-5'>

                                {/* Current Username/Email  */}
                                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                                    <FontAwesomeIcon icon={currentValue.type === 'username' ? faUser : faEnvelope} className='text-gray-400' />
                                    <input
                                        required
                                        className="pl-2 outline-none  w-full  border-none"
                                        type="text"
                                        readOnly={true}
                                        value={currentValue.value} />
                                </div>


                                {/* New  Username */}
                                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                                    <FontAwesomeIcon icon={currentValue.type === 'username' ? faUser : faEnvelope} className='text-gray-400' />
                                    <input
                                        required
                                        className="pl-2 outline-none  w-full  border-none"
                                        type={currentValue.type === 'username' ? 'text' : 'email'}
                                        name={currentValue.type}
                                        placeholder={`New ${currentValue.type} `} />
                                </div>

                                {/* Password */}
                                <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                                    <FontAwesomeIcon icon={faLock} className='text-gray-400' />
                                    <input
                                        required
                                        className="pl-2 outline-none  w-full  border-none"
                                        type="password"
                                        name='password'
                                        placeholder='Current password' />
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

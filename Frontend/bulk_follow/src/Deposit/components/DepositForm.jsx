import React from 'react'
import BackendContext from '../../Context/BackendContext';
import GlobalStateContext from '../../Context/GlobalStateContext';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faDollar, faCircleNotch } from '@fortawesome/free-solid-svg-icons'


export default function DepositForm({ setshowCheckOut, setclientSecret, totalAmount }) {

    const { CreatePaymentIntentFunc } = useContext(BackendContext)
    const { setDepositFormData } = useContext(GlobalStateContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)





    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        setDepositFormData(data)

        CreatePaymentIntentFunc(data).then((response) => {
            setclientSecret(response.clientSecret)
            setshowCheckOut(true)
            setSubmitLoader(false)
        })
            .catch(() => {
                setSubmitLoader(false)
            })
    }

    return (
        <div className=''>
            <div className='border-b border-gray-200 px-2 pb-4'>
                <h1 className='text-xl font-bold  text-secondary ' ><span className='font-bold text-2xl font-mono '>$</span> Deposit your funds</h1>
            </div>

            <form onSubmit={handleOnSubmit} className='space-y-6 mt-8 mb-5'>


                {/* Total Amount*/}
                <div className={`flex items-center border-2 py-2 px-2 rounded-sm `}>
                    <FontAwesomeIcon icon={faDollar} className='text-gray-400' />
                    <input required defaultValue={totalAmount} className="pl-2 outline-none border-none w-full" min={totalAmount ? totalAmount : 0} type="number" step=".01" name="totalAmount" placeholder="Total Amount " />
                </div>

                {/* Checkout */}
                <button
                    disabled={SubmitLoader}
                    type='submit'
                    className={`w-24 h-10 text-[1rem] tracking-wide  rounded-sm ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'} text-white `}>
                    {SubmitLoader ?
                        <FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /> :
                        <span>
                            Checkout
                        </span>
                    }
                </button>
            </form>
        </div>
    )
}

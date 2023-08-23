import React from 'react'
import { useContext, useState, useEffect } from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import Welcome from '../../partials/Welcome'
import Categories from '../../partials/Categories'
import NewOrderForm from './NewOrderForm'
import PasswordModal from '../../Authentication/PasswordModal'
import PaymentModal from './PaymentModal'
import ServiceInformation from './ServiceInformation'
import Loader from '../../partials/Loader'

export default function NewOrderPage() {

    const { SelectedCategoryState, setSelectedCategoryState, } = useContext(GlobalStateContext)
    const [showPasswordModal, setshowPasswordModal] = useState(false)
    const [showPaymentModal, setshowPaymentModal] = useState(false)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1500);
    }, [])



    return (
        loading ? <Loader /> : <>
            <PasswordModal Modal={showPasswordModal} setModal={setshowPasswordModal} setshowPaymentModal={setshowPaymentModal} />
            <PaymentModal Modal={showPaymentModal} setModal={setshowPaymentModal} />
            <div className='bump '>
                <Welcome />
                {/* <Categories /> */}

                {SelectedCategoryState === 'twitch' ?
                    <div className=' md:w-[90%]  mt-14  mx-auto lg:flex lg:justify-between'>
                        <NewOrderForm setshowPasswordModal={setshowPasswordModal} setshowPaymentModal={setshowPaymentModal} />
                        <ServiceInformation />
                    </div>
                    : <h1 className='text-sm  text-center mt-28'>Service will be available soon !</h1>
                }



            </div>
        </>
    )
}

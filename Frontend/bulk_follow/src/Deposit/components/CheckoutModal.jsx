import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import StripeIntegration from '../../partials/StripeIntegration'

export default function StripeModal({ Modal, setModal, clientSecret }) {

    // Stripe Config
    const stripePromise = loadStripe("pk_test_51MmEdOChtRtIoEmrnzlCPwLhyW4h0J9xnmJBFWSMfp0oUkTBJri9tj0c63LZ6UKfvlj987kprtTN7lZKTP1ecDBL00BH1AGiXC")
    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#6bc9a8',
            colorBackground: '#ffffff',
            colorText: '#000000',
        },

    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[40%] h-full  md:h-auto mx-auto" >
                    <div className="relative bg-white rounded-lg shadow">

                        {/* Close */}
                        <div className='flex justify-end p-2'>
                            <span className='border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        {/* body */}
                        <div className=" flex flex-col ">
                            {
                                clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <StripeIntegration setModal={setModal} />
                                    </Elements>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}

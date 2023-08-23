import React, { useRef, useEffect, useContext, useState } from 'react'
import BackendContext from '../Context/BackendContext';
import GlobalStateContext from '../Context/GlobalStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { PaymentElement, useStripe, useElements, } from "@stripe/react-stripe-js"
import CustomAlert from './CustomAlert'


export default function FilterModal({ setModal, setshowCheckOut, placeOrder }) {
    // const Email = localStorage.getItem('authToken') && JSON.parse(localStorage.getItem('userData')).email

    const { DepositFormData, dummyState, setdummyState, OrderData, ResetForm } = useContext(GlobalStateContext)
    const { DepositPaymentFunc, PlaceOrderFunc } = useContext(BackendContext)
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [showButton, setshowButton] = useState(false)


    const paymentElementOptions = {
        layout: "tabs"
    }



    // Place Order
    const handlePlaceOrderFunc = () => {
        PlaceOrderFunc(OrderData).then((response) => {
            setshowCheckOut(false)
            ResetForm.reset()
            setdummyState(!dummyState)
            CustomAlert('Order placed successfully!', 'success')
        })
    }




    // Checkout Submit
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setSubmitLoader(true)



        if (!stripe || !elements) {
            setSubmitLoader(false)
            return;
        }
        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                return_url: "http://localhost:3000",
            },
        })

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            const data = {
                'amount': DepositFormData['totalAmount'],
                'gateway': 'stripe',
                'depositId': paymentIntent.id
            }

            // Saving Deposit Info in Database
            DepositPaymentFunc(data).then(() => {
                // If User is depositing moeny while placing Order
                if (placeOrder) {
                    handlePlaceOrderFunc()
                }
                // If user is just depositing moeney
                else {
                    CustomAlert('Payment succeeded!', 'success')
                }

                setdummyState(!dummyState)
                setSubmitLoader(false)
                setModal(false)


            })

        }

        else if (error === undefined) {
            CustomAlert('Something went wrong !', 'error')
            setSubmitLoader(false)
        }

        else if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            CustomAlert(error.message, 'error')
        }
        else {
            setMessage("Something went wrong ! Please try again");
            CustomAlert('Something went wrong ! Please try again', 'error')

        }
        setSubmitLoader(false)
    }


    useEffect(() => {

        // Showing Pay now button
        const element = elements && elements.getElement('payment')
        element && element.on('ready', () => {
            setshowButton(true)
        })

        if (!stripe) {
            return;
        }
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    // CustomAlert(message, 'success')

                    break;
                case "processing":
                    setMessage("Your payment is processing.");

                    CustomAlert(message, 'success')

                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");

                    CustomAlert('Your payment was not successful, please try again', 'error')

                    break;
                default:
                    setMessage("Something went wrong.");

                    CustomAlert('Something went wrong.', 'error')
                    break;
            }
        });
    }, [stripe])


    return (
        <div>

            {/* Body */}
            <form onSubmit={handleOnSubmit} className="p-10 space-y-5 flex flex-col ">

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {/* Checkout */}
                {showButton && <button
                    disabled={SubmitLoader}
                    type='submit'
                    className={`w-24 h-10 text-[1rem] tracking-wide  rounded-sm ${SubmitLoader ? 'bg-rose-300' : 'bg-primary hover:bg-dark-primary'} text-white`}>
                    {SubmitLoader ?
                        <FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /> :
                        <span className='tracking-wide'>
                            Pay now
                        </span>
                    }
                </button>}
            </form>

        </div>
    )
}

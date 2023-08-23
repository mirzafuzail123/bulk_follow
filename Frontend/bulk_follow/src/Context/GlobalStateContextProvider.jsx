import React, { useState } from 'react'
import GlobalStateContext from './GlobalStateContext'
import { loadStripe } from "@stripe/stripe-js";

export default function GlobalStateContextProvider(props) {

    const [showLogin, setshowLogin] = useState(false)
    const [SelectedCategoryState, setSelectedCategoryState] = useState('twitch')
    const [dummyState, setdummyState] = useState(false)
    const [OrderData, setOrderData] = useState(null)
    const [DepositFormData, setDepositFormData] = useState(null)
    const [RequiredAmont, setRequiredAmont] = useState(null)
    const [ResetForm, setResetForm] = useState(null)


    // TO convert Date Format
    const ConvertDateFormat = (date) => {
        if (date) {
            const newDate = new Date(date);

            // Date
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = newDate.toLocaleDateString('en-US', options);

            // time
            const timeString = newDate.toLocaleTimeString('en-US', { timeZone: 'PST' });

            return [formattedDate, timeString]

        }

    }


    return (
        <GlobalStateContext.Provider value={{
            ConvertDateFormat, showLogin, setshowLogin, SelectedCategoryState, setSelectedCategoryState, dummyState, setdummyState,
            OrderData, setOrderData, DepositFormData, setDepositFormData, RequiredAmont, setRequiredAmont, ResetForm, setResetForm
        }} >
            {props.children}
        </GlobalStateContext.Provider>
    )
}

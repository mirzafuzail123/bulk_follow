import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserProfile from './UserProfile'
import EditProfileModal from './EditProfileModal'
import ChangePassword from './ChangePassword'
import GlobalStateContext from '../Context/GlobalStateContext'
import BackendContext from '../Context/BackendContext'
import Loader from '../partials/Loader'

export default function AccountPage() {

    const { setshowLogin, dummyState } = useContext(GlobalStateContext)
    const { UserAccountFunc } = useContext(BackendContext)
    const navigate = useNavigate()

    const [userData, setuserData] = useState(null)
    const [showEditProfile, setshowEditProfile] = useState(false)
    const [CurrentValue, setCurrentValue] = useState(null)
    const [loading, setloading] = useState(true)

    // Checking Auth
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            setshowLogin(true)
            navigate('/');
        }
    }, [])

    // Fetching User Profile
    useEffect(() => {
        UserAccountFunc().then((data) => {
            setuserData(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })
    }, [dummyState])

    return (
        loading ? <Loader /> : <>
            {/* Updating Username /Email */}
            <EditProfileModal Modal={showEditProfile} setModal={setshowEditProfile} currentValue={CurrentValue} />


            <div className='md:w-[90%]  mx-auto xs:space-y-5 lg:space-y-0 lg:flex lg:justify-between my-16 '>

                {/* USer Profile */}
                <div className='lg:w-[50%] xs:mx-auto lg:mx-0 py-5 rounded-sm border-2 border-gray-200 '>
                    <UserProfile
                        userData={userData}
                        showEditProfile={showEditProfile}
                        setshowEditProfile={setshowEditProfile}
                        setCurrentValue={setCurrentValue}
                    />
                </div>

                {/* ChangePassword*/}
                <div className='lg:w-[40%] xs:mx-auto lg:mx-0 py-5 lg:mr-10 h-[18rem] rounded-sm border-2 border-gray-200 '>
                    <ChangePassword />
                </div>

            </div>
        </>
    )
}

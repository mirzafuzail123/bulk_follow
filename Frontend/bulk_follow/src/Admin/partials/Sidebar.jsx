import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import AgencyLogo from '../../assets/AgencyLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


export default function Sidebar() {

    const SidebarRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()
    const [showSidebar, setshowSidebar] = useState(false)

    const activePath = (pathname) => {
        return location.pathname === pathname
    }

    useEffect(() => {
        const handler = (e) => {
            if (SidebarRef.current && !SidebarRef.current.contains(e.target)) {
                setshowSidebar(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])





    return (
        <>
            {/* Mobile Only */}
            <button
                onClick={() => setshowSidebar(!showSidebar)}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center fixed top-0 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
            </button>

            {/* SideBar */}
            <div className={`h-screen  fixed  top-0 left-0 z-40 shadow-lg w-56 pl-3 py-4 overflow-y-auto bg-gray-50 ${!showSidebar && 'hidden'} md:block`} ref={SidebarRef}>
                <Link to="/admin" className="flex items-center pl-2.5 mb-6">
                    <img src={AgencyLogo} className="h-12 mr-3 " alt="Flowbite Logo" />
                </Link>
                <ul className="space-y-1 pt-5 border-t-2">

                    {/* Dashboard */}
                    <li>
                        <Link to="/admin" className={`flex items-center p-2 text-base font-normal ${activePath('/admin') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <svg aria-hidden="true" className={`w-6 h-6 ${activePath('/admin') ? 'text-primary' : 'text-gray-400'} transition duration-75 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>

                    {/* Orders */}
                    <li>
                        <Link to="/admin/orders" className={`flex items-center p-2 text-base font-normal ${activePath('/admin/orders') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <svg aria-hidden="true" className={`w-6 h-6 ${activePath('/admin/orders') ? 'text-primary' : 'text-gray-400'} transition duration-75 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                        </Link>
                    </li>

                    {/* Payment Details */}
                    <li>
                        <Link to="/admin/transactions" className={`flex items-center p-2 text-base font-normal ${activePath('/admin/transactions') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <FontAwesomeIcon icon={faDollar} className={`${activePath('/admin/transactions') ? 'text-primary' : 'text-gray-400'} text-xl`} />
                            <span className="flex-1 ml-3 whitespace-nowrap ">Transactions</span>
                        </Link>
                    </li>

                    {/* User Support */}
                    <li>
                        <Link to="/admin/support" className={`flex items-center p-2 text-base font-normal ${activePath('/admin/support') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <FontAwesomeIcon icon={faPhone} className={`${activePath('/admin/support') ? 'text-primary' : 'text-gray-400'} text-lg`} />
                            <span className="flex-1 ml-3 whitespace-nowrap ">Customer Support</span>
                        </Link>
                    </li>

                    {/* Account */}
                    {/* <li>
                        <Link to="/admin/account" className={`flex items-center p-2 text-base font-normal ${activePath('/admin/account') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <svg aria-hidden="true" className={`w-6 h-6 ${activePath('/admin/account') ? 'text-primary' : 'text-gray-400'} transition duration-75 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Account</span>
                        </Link>
                    </li> */}

                    {/* Logout */}
                    <li>
                        <button onClick={() => { localStorage.clear(); navigate('/admin/login') }} to="#" className={`flex items-center p-2 text-base font-normal ${activePath('/admin/#') ? 'border-r-4 border-dark-primary' : ' text-gray-400'} hover:text-dark-primary `}>
                            <svg aria-hidden="true" className={`w-6 h-6 ${activePath('/admin/#') ? 'text-primary' : 'text-gray-400'} transition duration-75 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>



        </>
    )
}






{/* <li>
    <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 ">
        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
        <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
    </Link>
</li> */}
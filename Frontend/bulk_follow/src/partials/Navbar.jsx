import React, { useState, useContext, useEffect } from 'react'
import GlobalStateContext from '../Context/GlobalStateContext'
import BackendContext from '../Context/BackendContext'
import AgencyLogo from '../assets/AgencyLogo.png'
import ToolTip from '../UI Elemets/ToolTip'
import AuthModal from '../Authentication/AuthModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faClockRotateLeft, faDollar, faQuestion, faRightToBracket, faCoins, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import CustomAlert from './CustomAlert'


export default function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()
    const { UserBalanceFunc } = useContext(BackendContext)
    const { dummyState, setdummyState, showLogin, setshowLogin } = useContext(GlobalStateContext)

    const [userBalance, setuserBalance] = useState(0)
    const [isNavOpen, setisNavOpen] = useState(false)
    const [LoginToolTip, setLoginToolTip] = useState(false)
    const [LogoutToolTip, setLogoutToolTip] = useState(false)
    const [BalanceToolTip, setBalanceToolTip] = useState(false)
    const [AccountToolTip, setAccountToolTip] = useState(false)

    const authToken = JSON.parse(localStorage.getItem('authToken'))


    useEffect(() => {
        UserBalanceFunc().then((response) => {
            setuserBalance(response.balance)
        }).catch(() => {
            setuserBalance(0)
        })
    }, [dummyState])


    // Handle logout
    const handleLogOut = () => {
        setdummyState(!dummyState); localStorage.clear();
        CustomAlert('Logout successful', 'success')
        navigate('/')

    }

    return (
        <>
            <AuthModal Modal={showLogin} setModal={setshowLogin} />

            <nav className="bg-white  h-24 sticky top-0 left-0 shadow-lg px-2 sm:px-4 py-2.5 w-full z-20 border-b border-gray-200">
                <div className="px-7 flex  items-center justify-between ">
                    {/* Left Side */}
                    <Link to="/">
                        <img src={AgencyLogo} className="h-6 mr-3 sm:h-9 md:h-12 drop" alt="Inbound Logo" />
                    </Link>

                    {/* Right Side */}
                    <div className="flex space-x-3 md:order-2">

                        {/* Notification */}
                        <Link
                            to={'/deposit'}
                            onMouseEnter={() => setBalanceToolTip(true)}
                            onMouseLeave={() => setBalanceToolTip(false)}
                            className="text-lg relative flex space-x-2 p-2 text-center  rounded-full bg-gray-50 text-primary hover:bg-dark-primary hover:text-white ">
                            <FontAwesomeIcon icon={faCoins} />
                            <span className='font-mono text-sm'>${userBalance}</span>
                        </Link>
                        {BalanceToolTip && <span className='absolute right-32 top-14 z-10'><ToolTip message={'Balance'} /> </span>}


                        {/* Account*/}
                        <Link
                            to={'/account'}
                            onMouseEnter={() => setAccountToolTip(true)}
                            onMouseLeave={() => setAccountToolTip(false)}
                            className="text-lg relative text-center h-8 w-8 rounded-full bg-gray-50 text-primary hover:bg-dark-primary hover:text-white ">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>

                        {/* Auth */}
                        {AccountToolTip && <span className='absolute right-16 top-14 z-10 '><ToolTip message={'Account'} /> </span>}
                        {!authToken ?
                            // Login
                            <>
                                <button
                                    onMouseEnter={() => setLoginToolTip(true)}
                                    onMouseLeave={() => setLoginToolTip(false)}
                                    onClick={() => setshowLogin(true)}
                                    className="text-lg relative text-center h-8 w-8 rounded-full bg-gray-50 hover:bg-dark-primary hover:text-white ">
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                </button>
                                {LoginToolTip && <span className='absolute right-7 top-14 z-10 '><ToolTip message={'Login'} /> </span>}
                            </>
                            :
                            // Logout
                            <>
                                <button
                                    onMouseEnter={() => setLogoutToolTip(true)}
                                    onMouseLeave={() => setLogoutToolTip(false)}
                                    onClick={handleLogOut}
                                    className="text-lg relative text-center h-8 w-8 rounded-full bg-gray-50 text-primary hover:bg-dark-primary hover:text-white ">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </button>
                                {LogoutToolTip && <span className='absolute right-7 top-14 z-10 '><ToolTip message={'Logout'} /> </span>}
                            </>
                        }

                        {/* Only Mobile */}
                        <button
                            onClick={() => setisNavOpen(!isNavOpen)}
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>

                    </div>
                </div>


                <div className={`items-center justify-between   ${!isNavOpen && 'hidden'} relative md:bottom-5   w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col xs:space-y-3 sm:space-y-3 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 text-[1rem] mx-auto p-2 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:h-10">
                        <li className='' >
                            <Link to={'/'} className={`${location.pathname === '/' ? 'bg-primary hover:bg-dark-primary text-white' : 'text-black hover:text-dark-primary'}  font-light w-24 h-10 rounded-sm text-center p-2  `} ><FontAwesomeIcon icon={faCirclePlus} className={`${location.pathname === '/' ? ' text-white' : 'text-primary'}`} /> New Order</Link>
                        </li>

                        <li className='' >
                            <Link to={'/orderHistory'} className={`${location.pathname === '/orderHistory' ? 'bg-primary hover:bg-dark-primary text-white ' : 'text-black hover:text-dark-primary '} font-light w-24 h-10 rounded-sm text-center p-2 relative  `} ><FontAwesomeIcon icon={faClockRotateLeft} className={`${location.pathname === '/orderHistory' ? ' text-white' : 'text-primary'}`} /> Order History</Link>
                        </li>

                        <li className='' >
                            <Link to={'/deposit'} className={`${location.pathname === '/deposit' ? 'bg-primary hover:bg-dark-primary text-white' : 'text-black hover:text-dark-primary'} font-light w-24 h-10 rounded-sm text-center p-2 relative  `} ><FontAwesomeIcon icon={faDollar} className={`${location.pathname === '/deposit' ? ' text-white' : 'text-primary'}`} />  Deposit</Link>
                        </li>

                        <li className='' >
                            <Link to={'/support'} className={`${location.pathname === '/support' ? 'bg-primary hover:bg-dark-primary text-white' : 'text-black hover:text-dark-primary'} font-light w-24 h-10 rounded-sm text-center p-2 relative   `} ><FontAwesomeIcon icon={faQuestion} className={`${location.pathname === '/support' ? ' text-white' : 'text-primary'}`} /> Support</Link>
                        </li>

                    </ul>
                </div>


            </nav>

        </>
    )
}

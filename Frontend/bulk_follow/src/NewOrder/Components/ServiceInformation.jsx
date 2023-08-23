import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faFileLines } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import SocailMeida from '../../assets/SocialMedia.json'

export default function ServiceInformation() {
    return (
        <div className='md:w-[45%] mb-10  bump px-9 pt-5 rounded-sm border-2 border-gray-200'>

            <div className='border-b border-gray-200 pb-4'>
                <h1 className='text-xl font-bold  text-secondary tracking-wide' ><FontAwesomeIcon icon={faFileLines} className='pr-1 text-primary' /> Details </h1>
            </div>
            <div className='flex flex-col space-y-8 py-6'>

                {/* No. of Views */}
                <div className='flex flex-col space-y-2 bg-dark-gray p-3 '>

                    <div className='flex space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20s8-4.5 8-10c0-5.5-8-10-8-10S4 4.5 4 10c0 5.5 8 10 8 10z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4" />
                        </svg>
                        <h1 className=' text-gray-600 relative bottom-1'>No. of views</h1>
                    </div>

                    <div className='flex flex-col space-y-2 relative bottom-[0.3rem]'>
                        <h1 className='text-xs'>Choose the quantity of <span className='font-bold text-secondary'>views</span>  to buy. The more you buy , the longer you order will last</h1>
                        <l className='text-xs space-y-1'>
                            <li>Minimum: <span className='font-semibold text-secondary' >1000</span>  views</li>
                            <li>Maximum: <span className='font-semibold text-secondary' >300000</span>  views</li>
                        </l>
                    </div>
                </div>

                {/* Desired Viewers Count */}
                <div className='flex flex-col space-y-2 bg-dark-gray p-3 '>

                    <div className='flex space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.828 7.172a4 4 0 015.656 5.656M16.828 7.172l-1.414 1.414M16.828 7.172l-4.243 4.243M16.828 7.172l-4.95 4.95M16.828 7.172l-2.122 2.122M7.172 16.828a4 4 0 01-5.656-5.656M7.172 16.828l1.414-1.414M7.172 16.828l4.243-4.243M7.172 16.828l4.95-4.95M7.172 16.828l2.122-2.122" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 12a3.536 3.536 0 11-7.072 0 3.536 3.536 0 017.072 0zM16 16v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1" />
                        </svg>
                        <h1 className=' text-gray-600  '>Desired Viewers Count</h1>
                    </div>

                    <div className='flex flex-col space-y-2 '>
                        <h1 className='text-xs'>Choose the amount of <span className='font-bold text-secondary'>real viewers</span> you want to reach.</h1>
                        <l className='text-xs space-y-1'>
                            <li>Minimum: <span className='font-semibold text-secondary' >5</span> real views</li>
                            <li>Maximum: <span className='font-semibold text-secondary' >200000</span> real views</li>
                        </l>
                    </div>

                </div>

                {/* Join Delay */}
                <div className='flex flex-col space-y-2 bg-dark-gray p-3 '>

                    <div className='flex space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative top-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 11a5 5 0 01-5 5M12 6v5l3-3m-3-3h6" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6" />
                        </svg>
                        <h1 className=' text-gray-600  '>Join Delay</h1>
                    </div>

                    <div className='flex flex-col space-y-2 '>
                        <h1 className='text-xs'>Choose in how many minutes your <span className='font-bold text-secondary'>Desired Viewers Count</span> should be reached.</h1>
                        <l className='text-xs space-y-1'>
                            <li>Minimum: <span className='font-semibold text-secondary' >0</span> minutes (deactivated)</li>
                            <li>Maximum: <span className='font-semibold text-secondary' >240</span> minutes</li>
                        </l>
                    </div>
                </div>

            </div>

        </div>
    )
}

import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function TwitchOrderDetailModal({ Modal, setModal, SelectedOrder }) {
    const ModalRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed bump  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[55%]  h-full md:h-auto mx-auto  md:mt-28" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">

                        {/* Close */}
                        <div className='flex justify-end p-2'>
                            <span className='border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        {/* Body */}
                        <div className=" flex  justify-between px-7 p-7">

                            {/* Column 1 */}
                            <div className='flex flex-col space-y-7'>

                                {/* Order Id */}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>
                                        Order Id:</h1>
                                    <p className='text-xs'>{SelectedOrder.orderId} </p>
                                </div>

                                {/* APi Order Id */}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>API Order Id:</h1>
                                    <p className='text-xs'>{SelectedOrder.apiOrderId} </p>
                                </div>


                                {/* ChannelName:*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '>Channel Name:</h1>
                                    <p className='text-xs'>{SelectedOrder.channelName} </p>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className='flex flex-col space-y-7'>

                                {/* ViewsDone*/}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>
                                        Views Done:</h1>
                                    <p className='text-xs'>{SelectedOrder.viewsDone ? SelectedOrder.viewsDone : 0} </p>
                                </div>

                                {/* No of views: */}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>No of views:</h1>
                                    <p className='text-xs'>{SelectedOrder.no_of_views} </p>
                                </div>

                                {/*Service*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '>Service:</h1>
                                    <p className='text-xs'>{SelectedOrder.service} </p>
                                </div>

                                {/* DesiredViewersCount:*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '>Desired Viewers Count:</h1>
                                    <p className='text-xs'>{SelectedOrder.desiredViewersCount} </p>
                                </div>
                            </div>


                            {/* Column 3 */}
                            <div className='flex flex-col space-y-7'>

                                {/* IsJoinDelay */}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>
                                        Is Join Delay:</h1>
                                    <p className='text-xs'>{SelectedOrder.isJoinDelay ? '1' : '0'} </p>
                                </div>

                                {/* JoinDelay*/}
                                <div className='flex flex-col'>
                                    <h1 className='font-semibold text-sm '>Join Delay:</h1>
                                    <p className='text-xs'>{SelectedOrder.joinDelay} </p>
                                </div>

                                {/*TotalCharge*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '> Total Charge:</h1>
                                    <p className='text-xs font-mono'><span className='text-sm' >$</span>{SelectedOrder.totalCharge} </p>
                                </div>

                                {/* FormalCharge:*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '>Formal Charge:</h1>
                                    <p className='text-xs font-mono'><span className='text-sm' >$</span>{SelectedOrder.formalCharge} </p>
                                </div>
                            </div>


                            {/* Column 4 */}
                            <div className='flex flex-col space-y-7'>

                                {/*Profit*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '> Profit:</h1>
                                    <p className='text-xs font-mono'><span className='text-sm' >$</span>{SelectedOrder.profit} </p>
                                </div>

                                {/* Status:*/}
                                <div className='flex flex-col space-y-1'>
                                    <h1 className='font-semibold text-sm '>Status:</h1>

                                    <div className='flex'>
                                        <div className={`flex ${SelectedOrder.status === 'completed' ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}  h-5   rounded-full `}>
                                            <span
                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">
                                                {SelectedOrder.status}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}

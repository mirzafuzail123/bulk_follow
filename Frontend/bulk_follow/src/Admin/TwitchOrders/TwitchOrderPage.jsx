import React from 'react'
import { useState, useContext, useEffect } from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import TwitchOrderTable from './TwitchOrderTable'
import TwitchOrderDetailModal from './TwitchOrderDetailModal'
import TwitchEditOrderModal from './TwitchEditOrderModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function OrderPage() {

    const { dummyState, setdummyState } = useContext(GlobalStateContext)
    const [OrderList, setOrderList] = useState([])
    const [SearchedField, setSearchedField] = useState(null)
    const [showOrderDetail, setshowOrderDetail] = useState(false)
    const [showEditOrder, setshowEditOrder] = useState(false)
    const [SelectedOrder, setSelectedOrder] = useState(null)


    const handleSearch = (e) => {
        setSearchedField(
            OrderList.filter((order) => order.orderId.toLowerCase().includes(e.target.value.toLowerCase()) || order.channelName.toLowerCase().includes(e.target.value.toLowerCase()))
        )
    }





    return (

        <>
            <TwitchOrderDetailModal Modal={showOrderDetail} setModal={setshowOrderDetail} SelectedOrder={SelectedOrder} />
            <TwitchEditOrderModal Modal={showEditOrder} setModal={setshowEditOrder} SelectedOrder={SelectedOrder} dummyState={dummyState} setdummyState={setdummyState} />
            <div className='mx-3 bump'>

                <div className='flex justify-between'>

                    <div className='border-b-2 border-gray-200 ml-3'>
                        <h1 className='text-2xl font-bold tracking-wide text-secondary  '>Orders</h1>
                    </div>

                    <div className={`flex w-[25%] items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                        <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                        <input
                            required
                            onChange={handleSearch}
                            className="pl-2 outline-none w-full border-none bg-gray-100"
                            type="text"
                            name="Search"
                            placeholder="Search" />
                    </div>
                </div>


                <TwitchOrderTable
                    dummyState={dummyState}
                    OrderList={SearchedField ? SearchedField : OrderList}
                    setOrderList={setOrderList}
                    setshowOrderDetail={setshowOrderDetail}
                    setSelectedOrder={setSelectedOrder}
                    setshowEditOrder={setshowEditOrder}
                />

            </div>
        </>
    )
}

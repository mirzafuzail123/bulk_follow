import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useContext } from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import OrderHistoryTable from './OrderHistoryTable'
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router'
import Loader from '../../partials/Loader'
import BackendContext from '../../Context/BackendContext'

export default function OrderHistoryPage() {

    const { setshowLogin, dummyState } = useContext(GlobalStateContext)
    const { OrderHistoryFunc } = useContext(BackendContext)
    const navigate = useNavigate()

    const [loading, setloading] = useState(true)
    const [OrderList, setOrderList] = useState([])
    const [SearchedField, setSearchedField] = useState(null)
    const [currentPage, setCurrentPage] = useState(0);

    // Pagination
    const pageSize = 10;
    const pageCount = Math.ceil(OrderList.length / pageSize);
    const offset = currentPage * pageSize;
    const currentData = OrderList.slice(offset, offset + pageSize);

    // Handle Page click
    const handlePageClick = ({ selected }) => {
        setSearchedField(null)
        setCurrentPage(selected);
    };

    // Handle Search
    const handleSearch = (e) => {
        setSearchedField(
            currentData.filter((order) => order.orderId.toLowerCase().includes(e.target.value.toLowerCase()) || order.channelName.toLowerCase().includes(e.target.value.toLowerCase()))
        )
    }

    //Fetching Order History
    useEffect(() => {
        OrderHistoryFunc().then((data) => {
            setOrderList(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })
    }, [dummyState])

    // Checking AUth
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            setshowLogin(true)
            navigate('/');
        }
    }, [])

    return (
        loading ? <Loader /> : localStorage.getItem('authToken') &&
            <div className='md:w-[90%]  mx-auto bump my-10   '>

                <div className='flex justify-between'>

                    {/* Pagination */}
                    <ReactPaginate
                        className='flex space-x-4 font-semibold text-secondary text-sm pt-4'
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        activeClassName={"text-dark-primary border-b-2 border-primary"}
                    />

                    {/* Search */}
                    <div className={`flex w-[20%] items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                        <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                        <input
                            required
                            onChange={handleSearch}
                            className="pl-2 outline-none w-full border-none"
                            type="text"
                            name="Search"
                            placeholder="Search" />
                    </div>


                </div>

                {/* Order History Table */}
                <div className='mt-10 flex justify-center  max-h-screen overflowx-x-auto overflow-y-hidden scrollbar-thin scrollbar-y-none scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar'>
                    <div className='w-[90%]'>
                        <OrderHistoryTable
                            OrderData={SearchedField ? SearchedField : currentData}
                        />
                    </div>
                </div>

            </div>
    )
}

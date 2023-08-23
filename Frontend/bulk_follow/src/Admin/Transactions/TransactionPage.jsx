import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TransactionTable from './TransactionTable'

export default function TransactionPage() {
    const [TransactionList, setTransactionList] = useState([])
    const [SearchedField, setSearchedField] = useState(null)


    const handleSearch = (e) => {
        setSearchedField(
            TransactionList.filter((transaction) => transaction.depositId.toLowerCase().includes(e.target.value.toLowerCase()) || transaction.user.toLowerCase().includes(e.target.value.toLowerCase()))
        )
    }

    return (
        <div className='bump'>

            <div className='flex justify-between'>

                <div className='border-b-2 border-gray-200 ml-3 '>
                    <h1 className='text-2xl font-bold tracking-wide text-secondary '>Transactions</h1>
                </div>

                <div className={`flex w-[25%] items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                    <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                    <input
                        required
                        onChange={handleSearch}
                        className="pl-2 outline-none w-full border-none  bg-gray-100"
                        type="text"
                        name="Search"
                        placeholder="Search" />
                </div>
            </div>

            <TransactionTable
                TransactionList={SearchedField ? SearchedField : TransactionList}
                setTransactionList={setTransactionList}
            />

        </div>
    )
}

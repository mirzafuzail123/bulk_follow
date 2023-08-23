import React from 'react'
import { useContext } from 'react'
import GlobalStateContext from '../Context/GlobalStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTelegram, faTwitch, faTwitter, faTiktok, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Categories() {

    const { SelectedCategoryState, setSelectedCategoryState } = useContext(GlobalStateContext)

    const CategoryList = [
        { 'icon': faTwitch, 'name': 'Twitch', 'value': 'twitch' },
        { 'icon': faFacebook, 'name': 'Facebook', 'value': 'facebook' },
        { 'icon': faInstagram, 'name': 'Instagram', 'value': 'instagram' },
        { 'icon': faTelegram, 'name': 'Telegram', 'value': 'telegram' },
        { 'icon': faTiktok, 'name': 'Tiktok', 'value': 'tiktok' },
        { 'icon': faYoutube, 'name': 'Youtube', 'value': 'youtube' },
        { 'icon': faTwitter, 'name': 'Twitter', 'value': 'twitter' },
        { 'icon': faGlobe, 'name': 'Other', 'value': 'other' },
    ]

    return (
        <div className=' [&>*]:w-60 [&>*]:h-10 [&>*]:mx-auto [&>*]:text-start [&>*]:px-4 [&>*]:rounded-sm md:w-[85%] mx-auto  gap-5 grid md:grid-cols-4 items-center drop'>

            {CategoryList.map((category, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setSelectedCategoryState(category.value)}
                        className={`${SelectedCategoryState === category.value ? 'bg-primary text-white' : 'bg-gray-50'}  hover:bg-dark-primary hover:text-white `}><FontAwesomeIcon icon={category.icon} className='pr-1 ' />{category.name}</button>
                )
            })}


        </div>
    )
}

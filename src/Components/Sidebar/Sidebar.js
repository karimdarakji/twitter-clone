import React from 'react'

import '../../App.css'

import logo from '../../public/twitterlogo.png'
import home from '../../public/home.png'
import explore from '../../public/hashtag.svg'
import user from '../../public/user.svg'
import feather from '../../public/feather.svg'

export default function Sidebar() {
    return (
        <div className="slide">
            <img className="slideimage slidepng" src={logo} alt="home"/>
            <img className="slideimage slidepng" src={home} alt="home"/>
            <img className="slideimage slidesvg" src={explore} alt="explore"/>
            <img className="slideimage slidesvg" src={user} alt="profile"/>
            <div className="tweet-icon slideimage">
            <img src={feather} alt="tweet"/>
            </div>
            <div className="profile-icon slideimage">
            <img src={user} alt="account"/>
            </div>
            
        </div>
    )
}

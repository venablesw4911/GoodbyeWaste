import React from "react";
import pfp from "../assets/pfp.png"
import ProfileInput from "./ProfileInput.js";

export default function Profile() {
    const value = localStorage.getItem('user')
    let email = JSON.stringify(JSON.parse(value)).replace('"{\\"email\\":\\"', '').replace('\\"}"', '')
    let favorites = ['Pasta', 'Hamburger', 'Pizza']

    function display () {
        let output = favorites.join('\n')
        return alert(output)
    }

    return (
        <div className='bg-primary d-flex w-100 m-auto justify-content-evenly'>
            <div style={{backgroundColor: "#fff6e8"}} className='border border-black w-25 d-flex flex-column justify-content-between vh-100'>

                <div className='d-flex flex-column align-items-center'>
                    <img src={pfp} alt="Default" className='w-25'/>
                    <h2 className='mt-4'>John Doe</h2>
                    <h2 className='mt-4'>{email}</h2>
                    <a href='/Profile'>
                        <button className='text-center button-profile' onClick={display}>Favorites</button>
                    </a>
                </div>
                <div>
                    <a href='/Profile'>
                        <h4 className='text-center'>Delete</h4>
                    </a>
                </div>
            </div>

            <div style={{backgroundColor: "#fff6e8"}} className='border border-black w-50 d-flex '>
                <div className='border border-black w-50'>
                    <ProfileInput type='text' labelName='First Name' placeholder='John' />
                    <ProfileInput type='text' labelName='Email' placeholder={email} />
                    <ProfileInput type='text' labelName='Password' placeholder='**********' />
                </div>
                <div style={{backgroundColor: "#fff6e8"}} className='border border-black w-50'>
                    <ProfileInput type='text' labelName='Last Name' placeholder='John' />
                    <ProfileInput type='text' labelName='Gender' placeholder={email} />
                    <button className='button-profile'>Edit</button>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import pfp from "../../assets/pfp.png"
import ProfileInput from "./ProfileInput.js";
import { useNavigate } from "react-router-dom"
import { dexieDB } from "../../dexieDB.js"

export default function Profile(props) {
    //const value = localStorage.getItem('user')
    //let email = JSON.stringify(JSON.parse(value)).replace('"{\\"email\\":\\"', '').replace('\\"}"', '')
    
    let favorites = ['Pasta', 'Hamburger', 'Pizza']
    let firstName
    let lastName
    let dietaryPreferences
    const [error, setError] = useState("")

    // FIX THIS
    //Change this when our userID is collected by the router?
    let userId = 1;

    const navigate = useNavigate()

    function display () {
        let output = favorites.join('\n')
        return alert(output)
    }

    const handleSubmit = async (event, userId) => {
        event.preventDefault();
        let firstNameBox = event.target.firstName.value;
        let lastNameBox = event.target.lastName.value;
        let dietaryPreferencesBox = event.target.dietaryPreferences.value;
    
        if (userId) {
            if (firstNameBox) {
                setFirstName(userId, firstNameBox)
            } 
            if (lastNameBox) {
                setLastName(userId, lastNameBox)
            }
            if (dietaryPreferencesBox) {
                setDietaryPreferences(userId, dietaryPreferencesBox)
            } else {
                setError("No changes to update.");
            }
        } else {
            setError("User ID not provided.");
        }
    }
    

    // setFirstName
    const setFirstName = async (userId, firstName) => {
        const response = await fetch('http://localhost:3081/set-first', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, firstName }),
        });

        const result = await response.json();
        if (response.status === 200) {
            // Update user data in local database or perform other actions if needed
            //navigate('/');
        } else {
            window.alert('Error setting first name');
        }
    }

    // setLastName
    const setLastName = async (userId, lastName) => {
        const response = await fetch('http://localhost:3081/set-last', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, lastName }),
        });

        const result = await response.json();
        if (response.status === 200) {
            // Update user data in local database or perform other actions if needed
            //navigate('/');
        } else {
        window.alert('Error setting last name');
        }
    }

    // setDietaryPreferences
    const setDietaryPreferences = async (userId, dietaryPreferences) => {
        const response = await fetch('http://localhost:3081/set-pref', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, dietaryPreferences }),
        });

        const result = await response.json();
        if (response.status === 200) {
            // Update user data in local database or perform other actions if needed
            //navigate('/');
        } else {
            window.alert('Error setting dietary preferences');
        }
    }

    return (
        <><div className='bgColor d-flex w-100 m-auto justify-content-evenly'>
            <div style={{ backgroundColor: "#fff6e8" }} className='border border-black w-25 d-flex flex-column justify-content-between vh-100'>

                <div className='d-flex flex-column align-items-center'>
                    <img src={pfp} alt="Default" className='w-25' />
                    <h2 className='mt-4'>John Doe</h2>
                    <h2 className='mt-4'>HI</h2>
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

            <div style={{ backgroundColor: "#fff6e8" }} className='border border-black w-50 d-flex '>
                <div className='border border-black w-50'>
                    <ProfileInput type='text' labelName='First Name' placeholder='John' />
                    <ProfileInput type='text' labelName='Email' placeholder='hi' />
                    <ProfileInput type='text' labelName='Password' placeholder='**********' />
                </div>
                <div style={{ backgroundColor: "#fff6e8" }} className='border border-black w-50'>
                    <ProfileInput type='text' labelName='Last Name' placeholder='John' />
                    <ProfileInput type='text' labelName='Gender' placeholder='hi' />
                    <button className='button-profile'>Edit</button>
                </div>
            </div>

            <h2 className='mt-4'>Enter your change(s)</h2>
            
            <form className="container" onSubmit={(event) => handleSubmit(event, userId)}>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name" />
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName" 
                    placeholder="Last Name" />
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    id="dietaryPreferences"
                    name="dietaryPreferences" 
                    placeholder="Dietary Preferences" />
            </div>
                <div className="height-row mb-2 w-75 mx-auto">
                    <button
                        className="button-action bg-action text-white form-control"
                        type="submit">Submit Changes</button>
                </div>
                <br />
            </form>
        </div>
</>
    )
}
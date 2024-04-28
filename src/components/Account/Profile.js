import React, { useState, useEffect } from "react"
import pfp from "../../assets/pfp.png"
import ProfileInput from "./ProfileInput.js"
import { useNavigate, useLocation } from "react-router-dom"

export default function Profile(props) {
    console.log("props" + props)
    const { user } = props
    const navigate = useNavigate()
    const location = useLocation()

    console.log("user" + user)
    //console.log("userID" + user.userId)
    //let userId = user.userId

    // Delete this line after hardcoding complete
    let userId = 1;

    const [buttons, setButtons] = useState([])
    const [selectedButtons, setSelectedButtons] = useState([])
    const [firstName, updateFirstName] = useState("") // State for first name
    const [lastName, updateLastName] = useState("")   // State for last name

    const [error, setError] = useState("")

    const allergies = ['Celery-Free', 'Crustacean-Free', 'Dairy-Free', 'Egg-Free', 'Fish-Free', 'Gluten-Free', 'Lupine-Free', 'Mustard-Free', 'Peanut-Free', 'Sesame-Free', 'Shellfish-Free', 'Soy-Free', 'Tree-Nut-Free', 'Wheat-Free']
    const health = ['Vegetarian', 'Vegan', 'Pork-Free', 'Red-Meat-Free', 'Keto', 'Kosher', 'Low-Sugar', 'Paleo', 'Pescatarian']
    const diets = ['High-Fiber', 'Balanced', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Low-Sodium']

    // Fetch data from the database when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3081/get-user-dietary-preferences?findUserId=${userId}`)
                const dietaryPreferences = await response.json()
                const selectedLabels = dietaryPreferences.map(pref => pref.dietLabel)
                setSelectedButtons(selectedLabels)
            } catch (err) {
                console.error('Failed to retrieve user dietary preferences')
                console.error(err)
            }
        }

        fetchData()
    }, [userId])

    // Fetch first and last names from the database when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const responseFirstName = await fetch(`http://localhost:3081/get-firstName?userId=${userId}`)
                const responseLastName = await fetch(`http://localhost:3081/get-lastName?userId=${userId}`)
                
                const firstNameData = await responseFirstName.json()
                const lastNameData = await responseLastName.json()

                updateFirstName(firstNameData)
                updateLastName(lastNameData)  
            } catch (err) {
                console.error('Failed to retrieve user first and last names')
                console.error(err)
            }
        }

        fetchData()
    }, [userId])

    const handleCheckboxChange = (e) => {
        const { name, checked, value } = e.target

        if (checked) {
            setSelectedButtons(prevState => [...prevState, value])
        } else {
            setSelectedButtons(prevState => prevState.filter(item => item !== value))
        }
    }

    const handleSubmit = async (event, userId) => {
        event.preventDefault()
        let firstNameBox = event.target.firstName.value
        let lastNameBox = event.target.lastName.value

        if (userId) {
            let hasChanges = false
            if (firstNameBox) {
                setFirstName(userId, firstNameBox)
                hasChanges = true
            } 
            if (lastNameBox) {
                setLastName(userId, lastNameBox)
                hasChanges = true
            }

            if (hasChanges) {
                alert("Name changes submitted successfully! Please refresh the page")
            } else {
                setError("No changes to update.")
            }
        } else {
            setError("User ID not provided.")
        }
    }

    const handleButtonSubmit = async (event) => {
        event.preventDefault();

        // Fetch diet IDs for selected checkboxes
        const dietIDs = await findDietIDs(selectedButtons);

        // Example: Call a function to update dietary preferences
        await setDietaryPreferences(userId, dietIDs);

        // Reset selectedButtons state
        setSelectedButtons([]);

        alert("Dietary preferences submitted successfully! Please refresh the page");
    }

    const findDietIDs = async (selectedButtons) => {
        try {
            const dietIDs = [];
            // Iterate over each element in selectedButtons array
            for (const button of selectedButtons) {
                // Fetch dietID for each button using /get-diet-id endpoint
                const response = await fetch(`http://localhost:3081/get-diet-id?name=${button}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const result = await response.json();
                // Push the retrieved dietID to the dietIDs array
                dietIDs.push(result.dietID);
            }
            return dietIDs;
        } catch (error) {
            console.error('Error fetching diet IDs:', error);
            return [];
        }
    };      

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
            //navigate('/profile');
        } else {
        
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
            //navigate('/profile');
        } else {
          
        }
    }

    // setDietaryPreferences
    const setDietaryPreferences = async (userId, dietIDs) => {
        try {
            const response = await fetch('http://localhost:3081/set-pref', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, dietIDs }),
            });

            if (response.status === 200) {
                // Update user data in local database or perform other actions if needed
                //navigate('/profile');
                const result = await response.json();
                console.log(result.message);
            } else {
                window.alert('Error setting dietary preferences');
            }
        } catch (error) {
            console.error('Error setting dietary preferences:', error);
            window.alert('Error setting dietary preferences');
        }
    }

    return (
        <>
            <div className='bgColor d-flex w-100 m-auto justify-content-evenly'>
            <div style={{ backgroundColor: "#fff6e8" }} className='border border-black w-25 d-flex flex-column justify-content-between vh-200'>
                    <div className='mt-4 d-flex flex-column align-items-center'>
                        <img src={pfp} alt="Default" className='w-25' />
                        <h2 className='mt-4'>{firstName} {lastName}</h2> {/* Display fetched names */}
                    </div>
                </div>

                <div className=" d-flex justify-content-between">
                    {/* Allergies Box */}
                    <div className="border border-black card card-body rounded-0" style={{ backgroundColor: "#fff6e8", width: '100% !important' }}>
                        <h5>Allergies</h5>
                        <ul className="p-0" style={{ listStyleType: "none" }}>
                            {allergies.map((item, index) => (
                                <li key={0 + index} className="my-1">
                                    <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        value={item}
                                        id={'allergy-' + index}
                                        onChange={handleCheckboxChange}
                                        checked={selectedButtons.includes(item)} // Check if item is in selectedButtons
                                    />
                                    <label className="form-check-label small" htmlFor={'allergy-' + index}>
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Diets Box */}
                    <div className="border border-black card card-body rounded-0" style={{backgroundColor: "#fff6e8", width: '100% !important' }}>
                        <h5>Diets</h5>
                        <ul className="p-0" style={{ listStyleType: "none" }}>
                            {health.map((item, index) => (
                                <li key={1 + index} className="my-1">
                                    <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        value={item}
                                        id={'diet-' + index}
                                        onChange={handleCheckboxChange}
                                        checked={selectedButtons.includes(item)} // Check if item is in selectedButtons
                                    />
                                    <label className="form-check-label small" htmlFor={'diet-' + index}>
                                        {item}
                                    </label>
                                </li>
                            ))}
                            {diets.map((item, index) => (
                                <li key={2 + index} className="my-1">
                                    <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        value={item}
                                        id={'diet-' + (index + health.length)}
                                        onChange={handleCheckboxChange}
                                        checked={selectedButtons.includes(item)} // Check if item is in selectedButtons
                                    />
                                    <label className="form-check-label small" htmlFor={'diet-' + (index + health.length)}>
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="mt-4 height-row mb-2 w-75 mx-auto">
                            <form className="container " onSubmit={(event) => handleButtonSubmit(event, userId)}>
                                <p> Submit your diet and allergies changes </p>
                                <button
                                    className="button-action bg-action text-white form-control"
                                    type="submit"
                                >
                                    Submit Changes
                                </button>
                            </form>
                        </div>

                        <form className="container " onSubmit={(event) => handleSubmit(event, userId)}>
                            <h2 className='mt-4'>Enter a new first or last name below</h2>
                            <div className="height-row mb-3 w-75 mx-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="height-row mb-3 w-75 mx-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                            </div>

                            <div className="height-row mb-2 w-75 mx-auto">
                                <button
                                    className="button-action bg-action text-white form-control"
                                    type="submit"
                                >
                                    Submit Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

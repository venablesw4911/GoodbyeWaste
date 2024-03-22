import '../App.css';
import Header from "./Header.js";
import Footer from "./Footer.js";
import AnimatedRoutes from "./AnimatedRoutes.js";
import React, {useState, useEffect} from "react"
import { useLocalStorage } from "@uidotdev/usehooks";

// const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&cuisine=italian&excludeCuisine=greek&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&titleMatch=Crock%20Pot&maxReadyTime=20&ignorePantry=true&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100&minAlcohol=0&maxAlcohol=100&minCaffeine=0&maxCaffeine=100&minCopper=0&maxCopper=100&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&maxVitaminB5=100&minVitaminB3=0&maxVitaminB3=100&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&maxVitaminB12=100&minFiber=0&maxFiber=100&minFolate=0&maxFolate=100&minFolicAcid=0&maxFolicAcid=100&minIodine=0&maxIodine=100&minIron=0&maxIron=100&minMagnesium=0&maxMagnesium=100&minManganese=0&maxManganese=100&minPhosphorus=0&maxPhosphorus=100&minPotassium=0&maxPotassium=100&minSelenium=0&maxSelenium=100&minSodium=0&maxSodium=100&minSugar=0&maxSugar=100&minZinc=0&maxZinc=100&offset=0&number=10&limitLicense=false&ranking=2';
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'd519a0d49cmsh2edd932754b8417p105ea1jsn52a2eaa3ab22',
//         'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//     }
// };
// try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
// } catch (error) {
//     console.error(error);
// }



// fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
//     .then(res => res.json())
//     .then(data => displayFoods(data))
// const displayFoods = foods => {
//     console.log("********TheMealDB***************");
//     foods.meals.forEach(meal => {
//         console.log(`${meal.strMeal}`);
//
//     });
// }
//
//
// fetch('https://api.edamam.com/search?q=chicken&app_id=ed3e6094&app_key=065fd89494e23e47cceae33090cf274d')
//     .then(res => res.json())
//     .then(data => displayFoods2(data))
// const displayFoods2 = foods => {
//     console.log("********EDAMA***************");
//     console.log(foods);
//     foods.hits.forEach(recipe => {
//         console.log(`${recipe.recipe.label}`);
//
//     });
// }

export default function App(props) {

    // Fetch the user email and token from local storage
    const [user, setUser] = useLocalStorage('user', null)
    const [checked, setChecked] = useLocalStorage('isChecked', null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [email, setEmail] = useState('')

    console.log(user)
    console.log(checked)
    useEffect(() => {
        async function checkUser() {
            // If the token/email does not exist, mark the user as logged out
            if (!user || !user.token) {
                setLoggedIn(false)
                return
            }
            console.log(checked.isChecked)
            if (!checked || !checked.isChecked) {
                setIsChecked(false)
                return
            } else {
                setIsChecked(true)
            }
            // If the token exists, verify it with the auth server to see if it is valid
            const result = await fetch('http://localhost:3081/verify', {
                method: 'POST',
                headers: {
                    'jwt-token': user.token,
                },
            })

            if(result) {
                setLoggedIn(result.status === 200)
                setEmail(user.email || '')
            }
        }
        checkUser()
    }, [])

    return (
        <div className="overflow-x-hidden min-vh-100 bg-primary">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <AnimatedRoutes setUser={setUser} setChecked={setChecked} isChecked={isChecked} email={email} setEmail={setEmail} setLoggedIn={setLoggedIn}/>
            <Footer/>
        </div>
    );
}
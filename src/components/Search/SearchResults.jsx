import React, { useState, useEffect  } from "react"
import { useLocation } from "react-router-dom";
import RecipeCard from './RecipeCard.jsx';
import RecipeModal from "./RecipeModal.jsx";
import PantrySideBar from "../Pantry/PantrySideBar.jsx"

export default function SearchResults(props) {
    const { user } = props

    const location = useLocation();

    const [search, setSearch] = useState("");
    const [searchFilters, setSearchFilters] = useState(new Array());
    const [searchResult, setSearchResult] = useState(null); // State to store the fetched data

    const [pantryItems, setPantryItems] = useState([])
    const [favorites, setFavorites] = useState([])

    // Create state for the modal visibility & recipe details
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [recipeDetails, setRecipeDetails] = useState({})

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showFailureMessage, setShowFailureMessage] = useState(false)

    useEffect(() => {
        // Fetch allergy diets when component mounts
        async function fetchFavorites() {
            const response = await fetch(`http://localhost:3081/favorite/${user.userId}/`, {
                method: 'GET'
            })
            const favorites = await response.json()
            setFavorites(favorites)
        }
        if (user?.loggedIn) {
            fetchFavorites()
        }
    }, [user]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pantryString = pantryItems.join(' ')
        const searchQuery = params.get("search").concat(' ').concat(pantryString);
        const dietFilter = params.get("diet");
        const healthFilters = params.get("health");
        let searchFilters = '';
        let filters = [];
        if (dietFilter) {
            searchFilters += '&diet='+dietFilter;
            filters.push(dietFilter);
        }
        if (healthFilters) {
            healthFilters.split(',').forEach(function(healthFilter) {
                searchFilters += `&health=${healthFilter}`;
                filters.push(healthFilter);
            });
        }
        fetchSearchResults(searchQuery, searchFilters);
        setSearchFilters(filters);
        setSearch(searchQuery);
    }, [location.search, pantryItems]);

    const fetchSearchResults = async (query, filters) => {
        try {
            const response = await fetch(`http://localhost:3081/edamamSearch/`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({query, filters}),
            })
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                setSearchResult(data)
            }
        } catch (error) {
            console.error('Error fetching search results:', error)
        }
    }

    function showRecipeInformation (recipe){
        setRecipeDetails(recipe.recipe)
        setDetailsOpen(true)
    }

    function plannerSuccessMessage (success) {
        if (success) {
            setShowSuccessMessage(true)
        } else {
            setShowFailureMessage(true)
        }
        setTimeout(() => {
            setShowSuccessMessage(false)
            setShowFailureMessage(false)
        }, 5000); // 5 seconds

    }

    return (
        <div className="bg-color row">
            <div className="col-auto">
                <PantrySideBar setPantryItems={setPantryItems}/>
            </div>
            <div className="col-10 col-md-9 col-lg-8 col-xl-7 my-4">
                {showSuccessMessage ?
                    <div className="alert alert-success alert-dismissible" role="alert">
                        Updated <a href="/planner">planner</a> successfully!
                        <button type="button" className="btn-close" onClick={() => setShowSuccessMessage(false)}/>
                    </div>
                    :
                    null
                }
                {showFailureMessage ?
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        Failure to update planner!
                        <button type="button" className="btn-close" onClick={() => setShowFailureMessage(false)}/>
                    </div>
                    :
                    null
                }
                <div className="mt-3 mb-2 d-flex justify-content-center flex-wrap">
                    {searchFilters.map((filter, index) => (
                        <>
                            <span
                                className="badge rounded-pill text-secondary border border-secondary my-1 mx-2">{filter}</span>
                            <span key={index}
                                  className="badge rounded-pill text-secondary border border-secondary my-1 mx-2">{filter}</span>
                        </>
                    ))}
                </div>
                {searchResult ? (
                    <div className="row m-auto">
                        {searchResult.hits.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe.recipe}
                                favorites={favorites.filter(fav => fav.favoriteRecipeURI == recipe.recipe.uri)}
                                user={user}
                                onClick={() => showRecipeInformation(recipe)}/>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <RecipeModal
                user={user}
                recipe={recipeDetails}
                isOpen={detailsOpen}
                onClose={() => {
                    setDetailsOpen(false)
                }}
                plannerUpdateSuccess={(success) => {
                    plannerSuccessMessage(success)
                }}
            />
        </div>
    );
}
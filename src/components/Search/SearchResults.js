import React, { useState, useEffect  } from "react"
import { useLocation } from "react-router-dom";
import RecipeCard from './RecipeCard.js';
import RecipeModal from "./RecipeModal.js";
import PantrySideBar from "../Pantry/PantrySideBar.js"

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
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=59a04cb8&app_key=6e5b27f255727ba299ffd61e2ca5f5ed${filters}`);
            const data = await response.json();
            setSearchResult(data); // Store the fetched data in state
            //console.log(data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    function showRecipeInformation (recipe){
        setRecipeDetails(recipe.recipe)
        setDetailsOpen(true)
    }

    return (
        <div className="bgColor row">
            <div className="col-auto">
                <PantrySideBar setPantryItems={setPantryItems}/>
            </div>
            <div className="col-10 col-md-9 col-lg-8 col-xl-7 mx-auto my-4">
                <div className="mt-3 mb-2 d-flex justify-content-center flex-wrap">
                    {searchFilters.map((filter, index) => (
                        <span key={index} className="badge rounded-pill text-secondary border border-secondary my-1 mx-2">{filter}</span>
                    ))}
                </div>
                {searchResult ? (
                    <div className="list-group">
                        {searchResult.hits.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe.recipe}
                                favorites={favorites.filter(fav => fav.favoriteRecipeURI == recipe.recipe.uri)}
                                user={user}
                                onClick={() => showRecipeInformation(recipe)} />
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
            />
        </div>
    );
}
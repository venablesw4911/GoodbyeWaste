import React, { useState, useEffect  } from "react"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import RecipeCard from './RecipeCard.js';
import RecipeModal from "./RecipeModal.js";

export default function SearchResults() {
    const location = useLocation();

    const [search, setSearch] = useState("");
    const [searchFilters, setSearchFilters] = useState(new Array());
    const [searchResult, setSearchResult] = useState(null); // State to store the fetched data

    const [modalShow, setModalShow] = useState(false)
    const [modalContent, setModalContent] = useState({})

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search");
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
    }, [location.search]);

    const fetchSearchResults = async (query, filters) => {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=ed3e6094&app_key=065fd89494e23e47cceae33090cf274d${filters}`);
            const data = await response.json();
            setSearchResult(data); // Store the fetched data in state
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    function showRecipeInformation (recipe){
        setModalContent(recipe.recipe)
        setModalShow(true)
    }

    /*function  closeModal {

    }*/


    return (
        <div className="col-10 col-md-9 col-lg-8 col-xl-7 mx-auto my-4">
            <div className="mt-3 mb-2 d-flex justify-content-center flex-wrap">
                {searchFilters.map((filter, index) => (
                    <span key={index}
                          className="badge rounded-pill text-secondary border border-secondary my-1 mx-2">{filter}</span>
                ))}
            </div>
            {searchResult ? (
                <div className="list-group">
                    {searchResult.hits.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} onClick={() => showRecipeInformation(recipe)} />
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <RecipeModal recipe={modalContent} showModal={modalShow} />
        </div>
    );
}
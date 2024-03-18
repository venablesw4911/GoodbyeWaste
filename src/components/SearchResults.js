import React, { useState, useEffect  } from "react"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import {forEach} from "react-bootstrap/ElementChildren";

export default function SearchResults(props) {
    const location = useLocation();
    const [search, setSearch] = useState("");

    const [searchResult, setSearchResult] = useState(null); // State to store the fetched data

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search");
        const dietFilter = params.get("diet");
        const healthFilters = params.get("health");
        let searchFilters = '';

        if (dietFilter) {
            searchFilters += '&diet='+dietFilter;
        }
        if (healthFilters) {
            healthFilters.split(',').forEach(function(healthFilter) {
                searchFilters += `&health=${healthFilter}`;
            });
        }

        fetchSearchResults(searchQuery, searchFilters);

        setSearch(searchQuery);
        // Call your API with searchQuery
    }, [location.search]);

    const fetchSearchResults = async (query, filters) => {
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=ed3e6094&app_key=065fd89494e23e47cceae33090cf274d${filters}`);
            const data = await response.json();
            setSearchResult(data); // Store the fetched data in state
            console.log(data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    function extractString(url) {
        const match = url.match(/\/\/(.*?)\.com/);
        return match ? match[1] : '';
    }

    return (
        <div className="col-10 col-md-9 col-lg-8 col-xl-7 mx-auto my-5">
            {searchResult ? (
                <div className="list-group">
                    {searchResult.hits.map((recipe, index) => (
                        <div href="#" className="card list-group-item list-group-item-action p-3 mb-2" key={index}>
                            <div className="row">
                                <div className="col-auto">
                                    <img src={recipe.recipe.image} alt="recipe image"
                                         style={{ height: "200px" }}/>
                                </div>
                                <div className="col d-flex align-items-start flex-column">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">{recipe.recipe.label}</h4>
                                        <small><FontAwesomeIcon icon={false ? solidHeart : regularHeart} size="lg"/></small>
                                    </div>
                                    <small><a href={recipe.recipe.url} target="_blank">{extractString(recipe.recipe.url) + '.com'}</a></small>
                                    <p className="mt-auto mb-1">You have all {recipe.recipe.ingredients.length} ingredients</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
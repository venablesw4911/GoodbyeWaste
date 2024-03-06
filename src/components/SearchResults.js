import React, { useState, useEffect  } from "react"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchResults(props) {
    const { search } = props;
    const [searchText, setSearchText] = useState(search)
    const [searchResult, setSearchResult] = useState(null); // State to store the fetched data

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`https://api.edamam.com/search?q=${search}&app_id=ed3e6094&app_key=065fd89494e23e47cceae33090cf274d`);
                const data = await response.json();
                setSearchResult(data); // Store the fetched data in state
                console.log(data)
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, []); // Fetch data whenever the 'search' prop changes

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
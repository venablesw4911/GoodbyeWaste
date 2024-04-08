import React, { useState, useEffect  } from "react"
import { useLocation } from "react-router-dom";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecipeCard(props) {
    const { recipe, onClick } = props;
    const location = useLocation();

    useEffect(() => {
        async function getDiets () {
            try {
                const diets = await fetch('http://localhost:3081/get-diets')
                console.log(diets)
            } catch (err) {
                console.error('Failed to retrieve diets')
                console.error(err)
            }
        }

        getDiets()
    }, [])

    function extractString(url) {
        const match = url.match(/\/\/(.*?)\.com/);
        return match ? match[1] : '';
    }

    return (
        <div href="#" className="card list-group-item list-group-item-action p-3 mb-2" onClick={onClick}>
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
    )

}
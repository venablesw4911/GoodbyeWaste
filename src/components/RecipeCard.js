import React, { useState, useEffect  } from "react"
import { useLocation } from "react-router-dom";
import { faHeart as solidHeart, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecipeCard(props) {
    const { recipe, favorites, user, onClick } = props;
    const location = useLocation();
    const [favorited, setFavorited] = useState(false)

    // favorites.some(fav => fav.favoriteRecipeURI == recipe.uri);

    useEffect(() => {
        //setFavorited(favorites.some(fav => fav.favoriteRecipeURI == recipe.uri))
        setFavorited(favorites.length > 0)
    }, [favorites])

    async function handleFavorite(favorite) {
        const userId = user.userId
        const favoriteRecipeURI = recipe.uri
        try {
            const response = await fetch('http://localhost:3081/favorite', {
                method: favorite? 'POST' : 'DELETE',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ userId, favoriteRecipeURI }),
            })

            if (response.status === 200) {
                setFavorited(favorite)
            }
        } catch (error) {
            console.error('Error favorite action failed:', error)
        }
    }

    function extractString(url) {
        const match = url.match(/\/\/(.*?)\.com/);
        return match ? match[1] : '';
    }

    return (
        <div href="#"
             className="card list-group-item list-group-item-action p-3 mb-2"
             onClick={(event) => {
                 // Check if the target element is the solidHeart icon or one of its parents
                 if (
                     event.target.classList.contains("fa-heart") ||
                     event.target.parentElement.classList.contains("fa-heart")
                 ) {
                     handleFavorite(!favorited)
                 } else if (
                     event.target.classList.contains("fa-arrow-up-right-from-square") ||
                     event.target.parentElement.classList.contains("fa-arrow-up-right-from-square")
                 ) {

                 } else {
                     onClick()
                 }
             }}
        >
            <div className="row">
                <div className="col-auto">
                    <img src={recipe.image} alt="recipe image"
                         style={{ height: "200px" }}/>
                </div>
                <div className="col d-flex align-items-start flex-column">
                    <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">{recipe.label}</h4>
                        <span >
                            <a href={recipe.url} target="_blank"><FontAwesomeIcon icon={faArrowUpRightFromSquare} className="me-3" /></a>
                            <FontAwesomeIcon icon={favorited ? solidHeart : regularHeart} size="lg" className="text-danger"/>
                        </span>
                    </div>
                    <small><a href={recipe.url} target="_blank">{extractString(recipe.url) + '.com'}</a></small>
                    <p className="mt-auto mb-1">You have all {recipe.ingredients.length} ingredients</p>

                </div>
            </div>
        </div>
    )

}
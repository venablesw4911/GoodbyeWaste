import React, {useState, useEffect} from "react"
import {
  faHeart as solidHeart,
  faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as regularHeart
} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

export default function RecipeCard(props) {
  const {recipe, favorites, user, onClick} = props;
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(favorites.length > 0)
  }, [favorites])

  async function handleFavorite(favorite) {
    const userId = user.userId
    const favoriteRecipeURI = recipe.uri
    try {
      const response = await fetch('http://localhost:3081/favorite', {
        method: favorite ? 'POST' : 'DELETE',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({userId, favoriteRecipeURI}),
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
         className="cardDiv text-center recipe-card m-3"
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
         }}>
      <div className="topDiv">
        <div className="imgContainer">
          <img className="border rounded"
               src={recipe.image} alt="recipe image"
               style={{height: "250px"}}
          />
          <div className="icon-container">
            <span>
             <FontAwesomeIcon
               style={{cursor: "pointer"}}
               icon={favorited ? solidHeart : regularHeart}
               size="lg" className="text-danger"/>
            </span>
          </div>
        </div>
      </div>
      <div className="bottomDiv m-auto">
        <div className="cardInfo-container">
          <h4
            className="d-inline fs-3 text-center text-color">{recipe.label}</h4>
        </div>
        <div className="my-3">
          <p className="info-tag">#lorem</p>
          <p className="info-tag">#ipsum</p>
          <p className="info-tag">#lorem</p>
        </div>
        <span>{recipe.ingredients.length} Ingredients</span>
      </div>
    </div>

  )
}

// <span>
//     //           <a href={recipe.url}
//                     target="_blank"><FontAwesomeIcon
//   icon={faArrowUpRightFromSquare} className="me-3"/></a>
//     //                         <FontAwesomeIcon
//   icon={favorited ? solidHeart : regularHeart} size="lg"
//   className="text-danger"/>
//     //                     </span>
// </div>
//      <small><a href={recipe.url} target="_blank">{extractString(recipe.url) + '.com'}</a></small>
import React from "react"
import PantryButton from "./PantryButton.jsx"

export default function PantryCategories(props) {
    const ingredients = props.ingredients
    const buttons = []

    ingredients.forEach((ingredient, index) => {
        if (ingredient.category === props.category) {
            buttons.push(<PantryButton key={index} ingredient={ingredient} selected={props.selected} setSelected={props.setSelected}/>)
        }
    })

    return (
        <div className="col-auto p-2">
            <label className="">{props.category}</label>
            <div className="btn-group d-flex flex-column" role="group">
                {buttons}
            </div>
        </div>
    )
}
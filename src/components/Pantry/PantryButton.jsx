import React from "react"

export default function PantryButton(props) {
    const ingredient = props.ingredient.ingredient
    const selectedButtons = props.selected
    // const [isSelected, setIsSelected] = useState(props.selected)
    function handleClick() {
        // isSelected ? setIsSelected(false) : setIsSelected(true)
        if (selectedButtons.indexOf(ingredient) === -1) {
            props.setSelected(
                [
                ...selectedButtons,
                ingredient
                ]
            )
        } else {
            props.setSelected(
                selectedButtons.filter(i =>
                  i !== ingredient
                )
              )
        }

    }
    return (
        <div className="py-1">
            <input onClick={handleClick} type="checkbox" className="btn-check" id={ingredient} autoComplete="off"/>
            <label className="btn btn-outline-primary" htmlFor={ingredient}> {ingredient}</label>
        </div>
    )
}

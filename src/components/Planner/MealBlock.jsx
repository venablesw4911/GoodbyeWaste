import React from "react";

const mealBlockStyle = {
  width: '200px',
  height: '75px',
  marginBottom: '10px',
  border: '1px solid black',
  borderRadius:'10px',
  fontSize: '.5rem',
}

export default function MealBlock ( props ) {
  const { name } = props
  return (
    <div style={mealBlockStyle}>
      <h3 className={'fs-5 w-75 m-auto my-1'}>{name}</h3>
    </div>
  )
}

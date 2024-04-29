import React, {useEffect} from 'react'
import MealBlock from "./MealBlock.jsx";

const timeRowContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto .75rem',
}
const mealTimeBlockStyle = {
  fontWeight: '900',
  width: '200px',
  color: 'white',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  textAlign: 'center',
  background: 'red'
}

export default function MealRow(props) {
  const {mealTime, mealsArray} = props;
  return (
    <div style={timeRowContainerStyle}>
      <h2 style={mealTimeBlockStyle}>{mealTime}</h2>
      {mealsArray?
        mealsArray.map((meal, index) => (
            <MealBlock key={index} name={meal.mealName}/>
          ))
      :
       null
      }

    </div>
  )
}
import React, {useEffect} from 'react'
import MealBlock from "./MealBlock.js";

const timeRowContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto 1rem',
}
const mealTimeBlockStyle = {
  fontWeight: '900',
  width: '200px',
  color: 'white',
  textAlign: 'center',
  background: 'red'
}

export default function MealRow(props) {
  const {mealTime, mealsArray} = props;
  //const meals = []

  /*useEffect(() => {
    console.log(mealsArray)
    if(mealsArray) {
      mealsArray.forEach((meal, index) => {
        meals.push(
          <MealBlock key={index} name={meal.mealName}/>
        )
      })
    }
  }, [meals, mealsArray])*/
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
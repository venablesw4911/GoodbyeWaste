import React, { useState, useEffect } from "react";

import ShoppingList from "./ShoppingList.js";
import PlannerHeader from "./PlannerHeader.js";
import MealRow from "./MealRow.js";

const dayOfTheWeek = {
  paddingLeft: '15px',
  borderLeft: '6px solid red'
};

const plannerContainerStyle = {
  width: '70%',
  margin: 'auto',
  paddingTop: '30px',
}

const mealContainerStyle = {
  width: '100%',
}

const mealTimeContainerStyle = {
  display: 'flex',
  width: '85%',
  margin: 'auto',
  marginTop: '1rem',
  justifyContent: 'space-between',
}

const dateContainerStyle = {
  marginTop: '35px',
  marginLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
}

const shoppingListContainer = {
  width: '30%',
  margin: 'auto',
}

const plannerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

export default function Planner (props) {
  const { user } = props

  const [planner, setPlanner] = useState({})
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])

  useEffect(() => {
    async function fetchPlanner() {
      try {
        const response = await fetch(`http://localhost:3081/planner/${user.userId}/`, {
          method: 'GET'
        })
        if (response.status === 200) {
          const resultPlanner = await response.json()
          const breakfastArray = planner.breakfast
          const lunchArray = planner.lunch
          const dinnerArray = planner.dinner
          setBreakfast(breakfastArray)
          setLunch(lunchArray)
          setDinner(dinnerArray)
          setPlanner(resultPlanner)
        } else {
          console.log('Error fetching planner:', response.status)
        }
        } catch (e) {
        console.log('Error fetching planner:', e)
        }
      }
      if (user.userId !== 0) {
        fetchPlanner()
      }
    }, [user.userId])

  return (
    <div className={'planner-bg'}>
      <div style={plannerContainerStyle}>
       <PlannerHeader />
        <div style={plannerStyle}>
          <div style={dateContainerStyle}>
            <h3 style={dayOfTheWeek}>Sun</h3>
            <h3 style={dayOfTheWeek}>Mon</h3>
            <h3 style={dayOfTheWeek}>Tue</h3>
            <h3 style={dayOfTheWeek}>Wed</h3>
            <h3 style={dayOfTheWeek}>Thu</h3>
            <h3 style={dayOfTheWeek}>Fri</h3>
            <h3 style={dayOfTheWeek}>Sat</h3>
          </div>
          <div style={mealContainerStyle}>
            <div style={mealTimeContainerStyle}>
              <MealRow mealTime={'Breakfast'} mealsArray={planner.breakfast}/>
              <MealRow mealTime={'Lunch'} mealsArray={planner.lunch}/>
              <MealRow mealTime={'Dinner'} mealsArray={planner.dinner}/>
            </div>
          </div>
          <div>
          </div>
          <div style={shoppingListContainer}>
            <ShoppingList/>
          </div>
        </div>
      </div>
    </div>
  )
}
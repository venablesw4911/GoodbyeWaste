import React from "react";
//import { useState } from "react";
import PlannerHeader from "../components/PlannerHeader";
import MealBlock from "../components/MealBlock";
import GeneratePlannerButton from "../components/GeneratePlannerButton";
import DateDisplayButton from "../components/DateDisplayButton";

export default function Planner () {
  /*const [meal, setMeal] = useState([
    {
      id: 1,
      time: 'Breakfast',
      name: 'Avocado Toast with Poached Egg'
    },
    {
      id: 2,
      time: 'Breakfast',
      name: 'Greek Yogurt Parfait'
    },
    {
      id: 3,
      time: 'Breakfast',
      name: 'Pasta Primavera'
    },
    {
      id: 4,
      time: 'Lunch',
      name: 'Chicken Caesar Salad'
    },
    {
      id: 5,
      time: 'Lunch',
      name: 'Caresse Sandwich'
    },
    {
      id: 6,
      time: 'Lunch',
      name: 'Quinoa Salad'
    },
    {
      id: 7,
      time: 'Dinner',
      name: 'Grilled Salmon with Roasted Vegetables'
    },
    {
      id: 8,
      time: 'Dinner',
      name: 'Pasta Primavera'
    },
    {
      id: 9,
      time: 'Dinner',
      name: 'Stir-Fried Tofu with Vegetables'
    },

  ])*/
  //const [display, setDisplay] = useState('daily')
  const changeDisplay = (value) => {
    console.log(`${value.value} has been changed`)
  }
  return (
    <div>
      <PlannerHeader />
      <div className='container'>
        <div className='row justify-content-center'>
          <MealBlock
            date='Monday'
            breakfast='Avocado Toast with Poached Egg'
            lunch='Chicken Caesar Salad'
            dinner='Grilled Salmon with Roasted Vegetables'
          />
          <MealBlock
            date='Tuesday'
            breakfast='Greek Yogurt Parfait'
            lunch='Caprese Sandwich'
            dinner='Pasta Primavera'
          />
          <MealBlock
            date='Wednesday'
            breakfast='Pasta Primavera'
            lunch='Quinoa Salad'
            dinner='Stir-Fried Tofu with Vegetables'
          />
        </div>
      </div>
      <div className='w-25 mt-4 m-auto text-center d-flex justify-content-evenly'>
        <DateDisplayButton value='daily' text='Daily'
                           displayMealBlock={changeDisplay} checked={false}/>
        <DateDisplayButton value='threeDays' text='3 Days'
                           displayMealBlock={changeDisplay} checked={true}/>
        <DateDisplayButton value='week' text='Week'
                           displayMealBlock={changeDisplay} checked={false}/>
      </div>
      <div className='text-center mt-3'>
        <GeneratePlannerButton/>
      </div>
    </div>
  )
}






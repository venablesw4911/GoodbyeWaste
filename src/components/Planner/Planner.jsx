import React from "react";
import { useState } from "react";
import PlannerHeader from "./PlannerHeader.jsx";
import MealBlock from "./MealBlock.jsx";
import GeneratePlannerButton from "./GeneratePlannerButton.jsx";
import DateDisplayButton from "./DateDisplayButton.jsx";

export default function Planner () {
  const [display, setDisplay] = useState('daily')
  const changeDisplay = (event) => {
    setDisplay(event.target.value);
  }

  const meals = [
    {
      date: 'Monday',
      breakfast: 'Avocado Toast with Poached Egg',
      lunch: 'Chicken Caesar Salad',
      dinner: 'Grilled Salmon with Roasted Vegetables'
    },
    {
      date: 'Tuesday',
      breakfast: 'Greek Yogurt Parfait',
      lunch: 'Caprese Sandwich',
      dinner: 'Pasta Primavera'
    },
    {
      date: 'Wednesday',
      breakfast: 'Egg Muffins',
      lunch: 'Turkey and Avocado Wrap',
      dinner: 'Stir-Fried Tofu with Vegetables'
    },
    {
      date: 'Thursday',
      breakfast: 'Breakfast Burritos',
      lunch: 'Quinoa Salad',
      dinner: 'Shrimp Scampi Pasta'
    },
    {
      date: 'Friday',
      breakfast: 'Banana Pancakes',
      lunch: 'Vegetable Minestrone Soup',
      dinner: 'Teriyaki Chicken Stir-Fry'
    },
  ];

  const displayCount = display === 'daily' ? 1 : (display === 'threeDays' ? 3 : 5);

  return (
    <div>
      <PlannerHeader />
      <div className='container'>
        <div className='row justify-content-center'>
          {meals.slice(0, displayCount).map(meal => (
            <MealBlock
              date={meal.date}
              breakfast={meal.breakfast}
              lunch={meal.lunch}
              dinner={meal.dinner}
            />
          ))}
        </div>
      </div>
      <div className='w-25 mt-4 m-auto text-center d-flex justify-content-evenly'>
        <DateDisplayButton value='daily' text='Daily'
                           displayMealBlock={changeDisplay} checked={display === 'daily'}/>
        <DateDisplayButton value='threeDays' text='3 Days'
                           displayMealBlock={changeDisplay} checked={display === 'threeDays'}/>
        <DateDisplayButton value='week' text='5 Days'
                           displayMealBlock={changeDisplay} checked={display === 'week'}/>
      </div>
      <div className='text-center mt-3'>
        <GeneratePlannerButton/>
      </div>
    </div>
  )
}
import React from "react";
import Meal from "./Meal.js";
import { FaPencilAlt } from "react-icons/fa";

export default function MealBlock ( {date, breakfast, lunch, dinner} ) {
  return (
    <div className='col-lg-4 col-sm-2 text-center'>
      <div>
        <div className='mt-3 mb-3 border-bottom w-50 m-auto'>
          <h3 className='text-center fw-bold'>{date}</h3>
          <FaPencilAlt style={{color: 'grey', cursor:'pointer'}} />
        </div>
        <div className='border border-primary pb-2 pt-2 rounded'>
        <div className='d-flex justify-content-end m-1'>

        </div>
          <div className='mb-4'>
            <h4 className='fw-bolder'>Breakfast</h4>
            <h5>{breakfast}</h5>
          </div>
          <div className='mb-4'>
            <h4 className='fw-bolder'>Lunch</h4>
            <h5>{lunch}</h5>
          </div>
          <div className='mb-4'>
            <h4 className='fw-bolder'>Dinner</h4>
            <h5>{dinner}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

MealBlock.defaultProps = {
  breakfast: 'Cinnamon Rolls Pancakes',
  lunch: 'Margarita Flatbread Melt',
  dinner: 'Spicy Shrimp Tacos'
}
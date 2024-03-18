import React from "react";

export default function Meal ({timeOfDay, meal} ) {
  return (
    <>
      <h4 className='fw-bolder'>{timeOfDay}</h4>
      <h5>{meal}</h5>
    </>
  )
}
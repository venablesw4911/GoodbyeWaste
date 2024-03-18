import React from "react";

export default function PlannerHeader () {

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();

  return (
    <div className='border-bottom border-5 border-primary w-25 m-auto mt-5 pb-2'>
      <h1 className='text-center'>Week of {month}/{day}/{year}</h1>
    </div>
  )
}
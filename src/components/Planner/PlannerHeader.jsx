import React from 'react'
import PlannerDate from "./PlannerDate.jsx";

export default function PlannerHeader(props) {
  return (
    <div
      className={'text-center d-flex justify-content-between'}>
      <h1 style={{
        fontWeight: '900',
        color: 'black',
        margin: 'auto 10rem 2rem auto'
      }}>
        Weekly Meal Planner
      </h1>
      <PlannerDate/>
    </div>
  )
}
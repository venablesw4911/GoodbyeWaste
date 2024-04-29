import React from "react";

const plannerHeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'red',
  width: '21%',
  color: 'white',
  margin: 'auto 0',
}

const plannerHeaderTextStyle = {
  fontSize: '1.5rem',
  fontWeight: '900',
  color: 'white'
}

export default function PlannerDate () {

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();

  return (
      <div style={plannerHeaderStyle}>
        <h1 style={plannerHeaderTextStyle} className={'mx-1'}>Week of: </h1>
        <h2  style={plannerHeaderTextStyle}>{month}/{day}/{year}</h2>
      </div>
  )
}
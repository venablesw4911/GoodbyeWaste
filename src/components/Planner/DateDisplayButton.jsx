import React from "react";

export default function DateDisplayButton ({ value, text, displayMealBlock, checked }) {
  return (
    <div>
      <label className='m-3 fs-4'>
        <input className='m-2' name='displayDate' type="radio" value={value} defaultChecked={checked}
        onChange={displayMealBlock}/>
        {text}
      </label>
    </div>
  )
}
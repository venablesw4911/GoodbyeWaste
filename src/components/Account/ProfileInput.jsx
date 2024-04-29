import React from "react";

export default function ProfileInput ({ type, labelName, placeholder }) {
    return (
        <div className='d-flex flex-column ms-4 mt-3'>
            <label className='fs-3'>
                {labelName}
            </label>
            <input type={type} placeholder={placeholder} className='fs-3 w-50 mt-3'/>
        </div>
    )
}
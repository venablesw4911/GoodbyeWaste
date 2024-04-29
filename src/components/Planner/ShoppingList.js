import React from 'react'

const listStyle = {
  textDecoration: 'none',
  listStyleType: 'none',
  width: '100%',
  fontSize: '1.25rem',
  color: 'black'
}

const shoppingListContainer = {
  position: 'relative',
  border: '1px solid black',
  width: 'auto',
  height: '95vh',
  marginTop: '1rem'
}

const exportButton = {
  position: 'absolute',
  width: '100%',
  bottom: '10px',
}

export default function ShoppingList() {
  return (
    <>
      <div style={shoppingListContainer}>
        <h1 className={'text-center fs-3'}
            style={{color: 'red'}}>Shopping List</h1>
        <div className={'row my-3'}>
          <ul>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Chicken</dt>
                </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Milk</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Bread</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Butter</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Eggs</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Cheese</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Bacon</dt>
              </dl>
            </li>
            <li style={listStyle}>
              <dl>
                <dt><input type="checkbox" className={'m-2'}/>Beef</dt>
              </dl>
            </li>
          </ul>
        </div>
        <div className={'w-100'}>
          <button style={exportButton} className={'btn btn-outline-danger mt-3'}>
            Export
          </button>
        </div>
      </div>
    </>
  )
}
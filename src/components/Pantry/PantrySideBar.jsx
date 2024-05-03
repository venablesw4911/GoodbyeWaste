import React, {useState, useEffect} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu
} from 'cdbreact';
import PantryCategories from './PantryCategories.jsx'

export default function PantrySideBar(props) {
    const { setPantryItems } = props
    const ingredientCategories = ["Vegetables", "Protein", "Fruits", "Dairy", "Spices"]
    const ingredientsArray = [
        {ingredient: "Eggs", category: "Protein"},
        {ingredient: "Beef", category: "Protein"},
        {ingredient: "Chicken", category: "Protein"},
        {ingredient: "Fish", category: "Protein"},
        {ingredient: "Apples", category: "Fruits"},
        {ingredient: "Milk", category: "Dairy"}, 
        {ingredient: "Lettuce", category: "Vegetables"},
        {ingredient: "Spinach", category: "Vegetables"},
        {ingredient: "Tomato", category: "Vegetables"},
        {ingredient: "Potato", category: "Vegetables"},
        {ingredient: "Pork", category: "Protein"},
        {ingredient: "Flour", category: "Spices"},
        {ingredient: "Baking Soda", category: "Spices"},
        {ingredient: "Cheese", category: "Dairy"},
        {ingredient: "Yogurt", category: "Dairy"},
        {ingredient: "Cream", category: "Dairy"},
        {ingredient: "Mango", category: "Fruits"},
        {ingredient: "Lemon", category: "Fruits"},
        {ingredient: "Lime", category: "Fruits"},
        {ingredient: "Carrots", category: "Vegetables"}]
    const [selected, setSelected] = useState([])
    const categories = []

    ingredientCategories.forEach((category, index) => {
        categories.push(<PantryCategories key={index} category={category} ingredients={ingredientsArray} selected={selected} setSelected={setSelected}/>)
    })

    useEffect(() => {

        setPantryItems([selected])
     
    }, [setPantryItems, selected])

    return (
        <div className="p-3 h-100 overflow-y-auto">
            <div className="row">
                <h2>Pantry</h2>
            </div>
            <div className="row d-flex justify-content-around">
                {categories}
            </div>
        </div>
    )
}

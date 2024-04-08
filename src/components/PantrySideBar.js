import React, {useState, useEffect} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import PantryButton from './PantryButton.js';
import PantryCategories from './PantryCategories.js'

export default function PantrySideBar(props) {
    const { setPantryItems } = props
    const ingredientCategories = ["Vegetables", "Meats", "Fruits", "Dairy", "Spices"]
    const ingredientsArray = [
        {ingredient: "Eggs", category: "Meats"},
        {ingredient: "Beef", category: "Meats"}, 
        {ingredient: "Chicken", category: "Meats"}, 
        {ingredient: "Apples", category: "Fruits"}, 
        {ingredient: "Milk", category: "Dairy"}, 
        {ingredient: "Lettuce", category: "Vegetables"}, 
        {ingredient: "Bacon", category: "Meats"}, 
        {ingredient: "Flour", category: "Spices"}, 
        {ingredient: "Cheddar", category: "Dairy"}, 
        {ingredient: "Mango", category: "Fruits"}, 
        {ingredient: "Carrots", category: "Vegetables"}]
    const [selected, setSelected] = useState([])
    const categories = []

    ingredientCategories.forEach((category) => {
        categories.push(<PantryCategories category={category} ingredients={ingredientsArray} selected={selected} setSelected={setSelected}/>)
    })

    useEffect(() => {

        setPantryItems([selected])
     
    }, [setPantryItems, selected])

    return (
        <div style={{ display: 'flex', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Pantry
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <div className="row">
                            {categories}
                        </div>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    )
}

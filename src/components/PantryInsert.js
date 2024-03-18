import fetch from 'node-fetch'
import React, { useState } from "react"

// Function to take a JSON pantryInsert and send it to app.js
async function pantryInsert(insertRequest) {
    try {
        const response = await fetch('http://localhost:3081/pantry-insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ insertRequest })
        });

        if (response.status === 200) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error:', error)
        return false // Handle error cases
    }
}

// Export the function for use in other files
export default pantryInsert

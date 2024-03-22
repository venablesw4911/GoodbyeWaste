import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt  from 'jsonwebtoken'
import db from './connect-db.js'
//var low = import('lowdb')
//var adapter = fs('./database.json')

// Initialize Express app
const app = express()

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic home route for the API
// app.get('/', (_req, res) => {
//     res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
//   })

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', async (req, res) => {
  const { email, password } = req.body
  
  // Look up the user entry in the database
  const collection = await db.collection("user")
  const query = {email}
  const account = await collection.findOne(query)
  //console.log(account)
  
  // If found, compare the hashed passwords and generate the JWT token for the user
  if (account) {
    bcrypt.compare(password, account.password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: 'Invalid password' })
      } else {
        const loginData = {
          email,
          signInTime: Date.now(),
        }
        
        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token })
      }
    })
  } else { // If no user is found, returns 404
    console.log("not found in database")
    res.status(404).json({ message: 'user not found' })
  }
})

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token'
  const authToken = req.headers[tokenHeaderKey]
  try {
    const verified = jwt.verify(authToken, jwtSecretKey)
    if (verified) {
      return res.status(200).json({ status: 'logged in', message: 'success' })
    } else {
      // Access Denied
      return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: 'invalid auth', message: 'error' })
  }
})

app.post('/create-account', async (req, res) => {
  const { email, password } = req.body
  
  // Look up the user entry in the database
  const collection = await db.collection("user")
  const query = {email}
  const account = await collection.findOne(query)
  //console.log(account)
  
  if(!account) {
    bcrypt.hash(password, 10, async function (_err, hash) {
      //console.log({ email, password: hash })
      //db.get('users').push({ email, password: hash }).write()
      const result = await collection.insertOne({ email, password: hash });
      
      if(result) {
        const loginData = {
          email,
          signInTime: Date.now(),
        }
        
        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token })
      } else {
        res.status(400).json({ message: 'error' })
      }
      
    })
    
  } else {
    res.status(409).json({ message: 'account already exists' })
  }
  
})

app.post('/pantry-insert', async (req, res) => {
  // Extract data from query parameters
  let { userID, ingredientID, amount } = req.query;
  
  userID = parseInt(userID);
  ingredientID = parseInt(ingredientID);
  amount = parseInt(amount);
  
  try {
    // Check if user exists
    const userExists = await db.collection("user").findOne({ userID });
    if (!userExists) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }
    
    // Check if ingredient exists
    // There is no need to do this yet the ingredients have not been implemented
    /*
    const ingredientExists = await db.collection("ingredient").findOne({ ingredientID });
    if (!ingredientExists) {
      console.log("Ingredient does not exist");
      return res.status(400).json({ error: "Ingredient does not exist" });
    }
    */
    
    // Check if userPantry item already exists with same user, ingredient, and amount
    const existingItem = await db.collection("userPantry").findOne({ userID, ingredientID, amount });
    if (existingItem) {
      console.log("Pantry item already exists with the same user, ingredient, and amount");
      return res.status(400).json({ error: "Pantry item already exists" });
    }
    
    // Check if userPantry item already exists with same user and ingredient but different amount
    const existingItemWithDifferentAmount = await db.collection("userPantry").findOne({ userID, ingredientID, amount: { $ne: amount } });
    if (existingItemWithDifferentAmount) {
      // Update existing item with new amount
      await db.collection("userPantry").updateOne({ userID, ingredientID }, { $set: { amount } });
      console.log("Updated existing pantry item with new amount");
      return res.status(200).json({ message: "Pantry item updated successfully" });
    }
    
    // Add new userPantry item
    await db.collection("userPantry").insertOne({ userID, ingredientID, amount });
    console.log("Added new pantry item");
    return res.status(200).json({ message: "Pantry item submitted successfully" });
  } catch (error) {
    console.error("Error while submitting pantry item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.static('../../build'))

app.listen(3081)
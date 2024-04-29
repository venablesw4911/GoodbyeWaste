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

app.get('/recipeByURI', async (req, res) => {
    const { recipeId } = req.body
    const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${recipeId}&app_id=e4b575beapp_key=8658817f5e5e9cf3ddd6290beb823dc9&field=label&field=image&field=uri`
    try {
        const response = await fetch(url)
        const data = await response.json()
        res.status(200).json(data.hits[0].recipe)
    } catch (error) {
        console.error('Error fetching recipeByURI:', error)
    }
})

app.get('/planner/:userId', async (req, res) => {
    const collection = await db.collection("userMeals")
    const userId = parseInt(req.params.userId)
    try {
        const entry = await collection.findOne({ userId })
        const meals = entry.plannedMeals
        const planner = {
            breakfast: [],
            lunch: [],
            dinner: []
        }
        for (const meal of meals.breakfast) {
            const id = meal.mealURI.split('_')[1]
            const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=e4b575beapp_key=8658817f5e5e9cf3ddd6290beb823dc9&field=label&field=image&field=uri`
            const response = await fetch(url)
            const data = await response.json()
            const recipe = data.hits[0].recipe
            planner.breakfast.push({
                mealName: recipe.label,
                mealURI: recipe.uri,
                mealImage: recipe.image
            })
        }
        for (const meal of meals.lunch) {
            const id = meal.mealURI.split('_')[1]
            const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=e4b575beapp_key=8658817f5e5e9cf3ddd6290beb823dc9&field=label&field=image&field=uri`
            const response = await fetch(url)
            const data = await response.json()
            const recipe = data.hits[0].recipe
            planner.lunch.push({
                mealName: recipe.label,
                mealURI: recipe.uri,
                mealImage: recipe.image
            })
        }
        for (const meal of meals.dinner) {
            const id = meal.mealURI.split('_')[1]
            const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=e4b575beapp_key=8658817f5e5e9cf3ddd6290beb823dc9&field=label&field=image&field=uri`
            const response = await fetch(url)
            const data = await response.json()
            const recipe = data.hits[0].recipe
            planner.dinner.push({
                mealName: recipe.label,
                mealURI: recipe.uri,
                mealImage: recipe.image
            })
        }
        res.status(200).json(planner)
    } catch (error) {
        console.error('Error retrieving planner:', error)
        res.status(500).json({ message: 'Server error' })
    }
})

app.post('/planner/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId)
    let plannedMeals = req.body
    const collection = await db.collection("userMeals")

    function removeField(objects, fieldName) {
        objects.forEach(obj => {
            delete obj[fieldName];
        });
    }

    removeField(plannedMeals.breakfast, 'mealImage')
    removeField(plannedMeals.lunch, 'mealImage')
    removeField(plannedMeals.dinner, 'mealImage')

    // Check JSON validity
    if (typeof plannedMeals !== 'object' || plannedMeals === null || Object.keys(plannedMeals).length === 0) {
        return res.status(400).json({ error: 'Invalid JSON planner data' })
    }

    // Check that user has planner
    const hasPlanner = await collection.findOne({userId})
    if (!hasPlanner) {
        try {
            // Add new userPantry item
            await collection.insertOne({ plannedMeals, userId });
            console.log("Created a new Planner");
            return res.status(200).json({ message: "Planner was created successfully" });
        } catch (error) {
            console.error("Error while creating planner:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    try {
        // Update planner for user
        await db.collection("userMeals").updateOne( { userId },
            {
                $set: {
                    plannedMeals
                }
            }
        )
        console.log("Updated planner");
        return res.status(200).json({ message: "Planner was updated successfully" });
    } catch (error) {
        console.error("Error while updating planner:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/favorite', async (req, res) => {
    const { userId, favoriteRecipeURI } = req.body
    try {
        // Add new userPantry item
        await db.collection("favorites").insertOne({ userId, favoriteRecipeURI });
        console.log("Added new favorite");
        return res.status(200).json({ message: "Favorite was added successfully" });
    } catch (error) {
        console.error("Error while adding favoite:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/favorite/:userId', async (req, res) => {
    const collection = await db.collection("favorites")
    const userId = req.params.userId
    try {
        const entries = await collection.find({}).toArray()
        let favorites = []
        await entries.forEach(entry => {
            if (entry.userId == userId) {
                favorites.push(entry)
            }
        })
        res.status(200).json(favorites)
    } catch (error) {
        console.error('Error retrieving favorites:', error)
        res.status(500).json({ message: 'Server error' })
    }
})

app.post('/favorite', async (req, res) => {
    const { userId, favoriteRecipeURI } = req.body
    try {
        // Add new userPantry item
        await db.collection("favorites").insertOne({ userId, favoriteRecipeURI });
        console.log("Added new favorite");
        return res.status(200).json({ message: "Favorite was added successfully" });
    } catch (error) {
        console.error("Error while adding favoite:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.delete('/favorite', async (req, res) => {
    const { userId, favoriteRecipeURI } = req.body
    try {
        const result = await db.collection("favorites").deleteOne({ userId: userId, favoriteRecipeURI: favoriteRecipeURI });
        if (result.deletedCount === 1) {
            console.log("Favorite entry deleted");
            return res.status(200).json({ message: "Favorite deleted successfully" });
        } else {
            console.log("Favorite entry not found");
            return res.status(404).json({ error: "Favorite not found" });
        }
    } catch (error) {
        console.error("Error while adding favorite:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})


app.get('/get-allergies', async (req, res) => {
    const collection = await db.collection("diets")
    const query = {dietCategory:"allergy"}
    try {
        const allergies = await collection.find(query).toArray()

        res.status(200).json(allergies);
    } catch (error) {
        console.error('Error retrieving allergies:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

app.get('/get-diets', async (req, res) => {
    const collection = await db.collection("diets")
    const query = {dietCategory:"diet"}
    try {
        const diets = await collection.find(query).toArray()
        res.status(200).json(diets);
    } catch (error) {
        console.error('Error retrieving diets:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

app.get('/get-user-dietary-preferences', async (req, res) => {
  let { findUserId } = req.query;
  findUserId = parseInt(findUserId);

  try {
    // Find the user by userId
    const user = await db.collection("user").findOne({ userId: findUserId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Grab the user's dietaryPreferences array
    const userDietArray = user.dietaryPreferences;

    // Find allergies and diets in the diets Database based on user's dietaryPreferencesId's
    const dietaryPreferences = await db.collection("diets")
      .find({
        dietID: { $in: userDietArray },
        $or: [{ dietCategory: "allergy" }, { dietCategory: "diet" }]
      })
      .project({ dietLabel: 1, _id: 0 })
      .toArray();

    res.status(200).json(dietaryPreferences);
  } catch (error) {
    console.error('Error retrieving user dietary preferences', error);
    res.status(500).json({ message: 'Server error' });
  }
})


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
          signInTime: Date.now()
        }
        
        const token = jwt.sign(loginData, jwtSecretKey)
        // console.log(token)
        return res.status(200).json({ message: 'success', token, userId: account.userId })
      }
    })
  } else { // If no user is found, returns 404
    console.log("not found in database")
    return res.status(404).json({ message: 'user not found' })
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
      const result = await collection.insertOne({ email, password: hash, firstName: "", lastName: "", dietaryPreferences: [], plannedMeals: []});
      
      if(result) {
        const loginData = {
          email,
          signInTime: Date.now(),
        }
        
        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token, userId: account.userId })
      } else {
        res.status(400).json({ message: 'error' })
      }
      
    })
    
  } else {
    res.status(409).json({ message: 'account already exists' })
  }
  
})

app.get('/get-firstName', async (req, res) => {
  let { userId } = req.query;
  userId = parseInt(userId);

  try {
    // Find the user by userId
    const user = await db.collection("user").findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'success', firstName: user.firstName});
  } catch (error) {
    console.error('Error retrieving user first name', error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.get('/get-lastName', async (req, res) => {
  let { userId } = req.query;
  userId = parseInt(userId);

  try {
    // Find the user by userId
    const user = await db.collection("user").findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'success', lastName: user.lastName});
  } catch (error) {
    console.error('Error retrieving user last name', error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.post('/pantry-insert', async (req, res) => {
  // Extract data from query parameters
  let { userId, ingredientID, amount } = req.query;
  
  userId = parseInt(userId);
  ingredientID = parseInt(ingredientID);
  amount = parseInt(amount);
  
  try {
    // Check if user exists
    const userExists = await db.collection("user").findOne({ userId });
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
    const existingItem = await db.collection("userPantry").findOne({ userId, ingredientID, amount });
    if (existingItem) {
      console.log("Pantry item already exists with the same user, ingredient, and amount");
      return res.status(400).json({ error: "Pantry item already exists" });
    }
    
    // Check if userPantry item already exists with same user and ingredient but different amount
    const existingItemWithDifferentAmount = await db.collection("userPantry").findOne({ userId, ingredientID, amount: { $ne: amount } });
    if (existingItemWithDifferentAmount) {
      // Update existing item with new amount
      await db.collection("userPantry").updateOne({ userId, ingredientID }, { $set: { amount } });
      console.log("Updated existing pantry item with new amount");
      return res.status(200).json({ message: "Pantry item updated successfully" });
    }
    
    // Add new userPantry item
    await db.collection("userPantry").insertOne({ userId, ingredientID, amount });
    console.log("Added new pantry item");
    return res.status(200).json({ message: "Pantry item submitted successfully" });
  } catch (error) {
    console.error("Error while submitting pantry item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Getter requests
app.get('/get-user', async (req, res) => {
  try {
    // if userId is sent it will find the user
    let { userId } = req.body;
    userId = parseInt(userId);

    const user = await db.collection('user').findOne({ userId });
    if (user) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dietaryPreferences: user.dietaryPreferences
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define endpoint to get dietID based on dietLabel
app.get('/get-diet-id', async (req, res) => {
  try {
    // Extract dietLabel from query parameter
    const { name } = req.query;

    // Find the document with matching dietLabel
    const diet = await db.collection('diets').findOne({ dietLabel: name });

    // If no document found, return 404
    if (!diet) {
      return res.status(404).json({ message: 'Diet not found' });
    }

    // Otherwise, return the dietID
    res.json({ dietID: diet.dietID });
  } catch (error) {
    console.error('Error retrieving dietID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Setter requests for first name
app.post('/set-first', async (req, res) => {
  try {
      const { userId, firstName } = req.body;
      
      const result = await db.collection('user').updateOne(
          { userId },
          { $set: { firstName } },
          { upsert: true }
      );
  
      if (result.modifiedCount === 1 || result.upsertedCount === 1) {
          res.json({ message: 'First name updated/created successfully' });
      } else {
          res.status(500).json({ message: 'Failed to update/create first name' });
      }
  } catch (error) {
      console.error('Error updating/creating first name:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Setter requests for last name
app.post('/set-last', async (req, res) => {
  try {
      const { userId, lastName } = req.body;
      
      const result = await db.collection('user').updateOne(
          { userId },
          { $set: { lastName } },
          { upsert: true }
      );
  
      if (result.modifiedCount === 1 || result.upsertedCount === 1) {
          res.json({ message: 'Last name updated/created successfully' });
      } else {
          res.status(500).json({ message: 'Failed to update/create last name' });
      }
  } catch (error) {
      console.error('Error updating/creating last name:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Setter requests for dietary preferences
app.post('/set-pref', async (req, res) => {
  try {
    let { userId, dietIDs } = req.body;

    // The dietIDs selected in the form have to change to dietaryPreferences to prepare for the database
    let dietaryPreferences = dietIDs

    const result = await db.collection('user').updateOne(
      { userId },
      { $set: { dietaryPreferences } },
      { upsert: true }
    );

    if (result.modifiedCount === 1 || result.upsertedCount === 1) {
      res.json({ message: 'Dietary preferences updated/created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to update/create dietary preferences' });
    }
  } catch (error) {
    console.error('Error updating/creating dietary preferences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.use(express.static('../../build'))

app.listen(3081)
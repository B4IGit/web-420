'use strict';

/*
Author:       Devin Ledesma
Date:         06/18/2025
File Name:    app.js
Description:  This application will serve as a platform for food enthusiasts to explore, create, and manage a variety of recipes.
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const recipes = require("../database/recipes");
const request = require("supertest");

// Creates an Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
// HTML content for the landing page
  const html = `
<html>
<head>
<title>Cookbook App</title>
<style>
body, h1, h2, h3 { margin: 0; padding: 0; border: 0;}
body {
background: #424242;
color: #fff;
margin: 1.25rem;
font-size: 1.25rem;
}
h1, h2, h3 { color: #EF5350; font-family: 'Emblema One', cursive;}
h1, h2 { text-align: center }
h3 { color: #fff; }
.container { width: 50%; margin: 0 auto; font-family: 'Lora', serif; }
.recipe { border: 1px solid #EF5350; padding: 1rem; margin: 1rem 0; }
.recipe h3 { margin-top: 0; }
main a { color: #fff; text-decoration: none; }
main a:hover { color: #EF5350; text-decoration: underline;}
</style>
</head>
<body>
<div class="container">
<header>
<h1>Cookbook App</h1>
34
<h2>Discover and Share Amazing Recipes</h2>
</header>
<br />
<main>
<div class="recipe">
<h3>Classic Beef Tacos</h3>
<p>1. Brown the ground beef in a skillet.<br>2. Warm the taco shells in the oven.<br>3. Fill the taco shells with beef, lettuce, and cheese.</p>
</div>
<div class="recipe">
<h3>Vegetarian Lasagna</h3>
<p>1. Layer lasagna noodles, marinara sauce, and cheese in a baking dish.<br>2. Bake at 375 degrees for 45 minutes.<br>3. Let cool before serving.</p>
</div>
</main>
</div>
</body>
</html>
`; // end HTML content for the landing page
  res.send(html); // Sends the HTML content to the client
});

///// GET ENDPOINTS /////

// GET endpoint for /api/recipes
app.get('/api/recipes', async (req, res, next) => {
  try {
    const allRecipes = await recipes.find();
    console.log("All Recipes:", allRecipes); // Logs all recipes
    res.send(allRecipes); // Sends response with all recipes
  } catch (err) {
    console.error("Error:", err.message); // Logs error message
    next(err); // Passes error to the next middleware
  }
});

// GET endpoint for /api/recipes/:id
app.get('/api/recipes/:id', async (req, res, next) => {
  try {
    // Add validation to the GET endpoint that checks if the req.params.id is a number
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return next(createError(400, "Input must be a number"));
    }
    const recipe = await recipes.findOne({ id: id });
    console.log("Recipe: ", recipe);
    res.send(recipe);
  } catch (err) {
    console.error("Error:", err.message);
    next(err);
  }
});

///// POST ENDPOINTS /////

app.post('/api/recipes', async (req, res, next) => {
  try {
    const newRecipe = req.body;

    const expectedKeys = ["id", "name", "ingredients"];
    const receivedKeys = Object.keys(newRecipe);

    if (!receivedKeys.every(key => expectedKeys.includes(key)) || receivedKeys.length !== expectedKeys.length) {
      console.error('Bad Request: Missing keys or extra keys', receivedKeys);
      return next(createError(400, 'Bad Request'));
    }

    const result = await recipes.insertOne(newRecipe);
    console.log('Result:', result);
    res.status(201).send({id: result.ops[0].id});
  } catch (err) {
    console.error('Error:', err.message);
    next(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

module.exports = app;
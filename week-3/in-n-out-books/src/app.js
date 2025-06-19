'use strict';

/*
Author:       Devin Ledesma
Date:         06/18/2025
File Name:    app.js
Description:  This application will serve as a platform for users to manage their own collection of books. Users will be able to track books that they have read or view a collection of books shared by club organizers.
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// Creates an Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//
//
app.get("/", async (req, res, next) => {
// HTML content for the landing page
  const html = `
<html>
<head>
<title>In-N-Out-Books</title>
<style>
body, h1, h2, h3 { margin: 0; padding: 0; border: 0;}
body {
background: #424242;
color: #FFFFFF;
margin: 1.25rem;
font-size: 1.25rem;
max-width: 1400px;
}
h1, h2 { color: #FFFFFF; font-family: 'Emblema One', cursive;}
h3 { color: #392594; font-family: 'Emblema One', cursive; border-bottom: 2px solid #392594;}
.container { width: 100%; margin: 0 auto; font-family: 'Lora', serif; }
header { display: flex; justify-content: space-between; align-items: center; background-color: #392594; padding: 20px; }
.header-left { flex: 1; width: 50%; }
.header-right { flex: 1; width: 50%; text-align: center;}
main { background-color: #DDD6FF; padding: 20px; }
.top-selling ul { color: #392594; }
.top-selling p { color: #392594 }
footer { display: flex; justify-content: space-between; align-items: center; background-color: #392594; padding: 0 40px; }
</style>
</head>
<body>
<div class="container">
<header>
<div class="header-left">
<h1>Welcome to <br> My Book Collection</h1>
<p>Welcome to our online platform where you can easily manage your personal book collection, track books you've read, and explore curated selections from your book club. Whether you're a casual reader or a dedicated bookworm, our app provides a simple and intuitive way to stay organized and connected to the world of literature.</p>
</div>
<div class="header-right">
<img src="/images/header.png" alt="vector image">
</div>
</header>
<main>
<div class="top-selling">
<h3>Top Selling Books</h3>
<ul>
<li>The Nature of Code</li>
<li>The Self Taught Programmer</li>
<li>Think like a Programmer</li>
<li>Eloquent JavaScript</li>
<li>JavaScript for Kids</li>
</ul>
<p>This is just filler until further instructions are provided :)</p>
</div>
</main>
<footer>
<div>
<h4>Contact Us</h4>
<p>Email: info@in-n-out-books.com <br>
Phone: (555) 123-4567 <br>
Address: 123 Main Street, Anytown, USA 12345</p>
</div>
<div>
<h4>Hours of Operation</h4>
<p>Monday - Friday: 9:00 AM - 5:00 PM <br>
Saturday: 10:00 AM - 2:00 PM <br>
Sunday: Closed</p>
</div>
<div>
<h4>Devin Ledesma</h4>
<p>In-N-Out-Books <br>
WEB-420 <br>
Happy Coding!</p>
</div>
</footer>
</div>
</body>
</html>
`; // end HTML content for the landing page
  res.send(html); // Sends the HTML content to the client
});
//
//

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
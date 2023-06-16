// Importing required libraries
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importing Environment Variables
require('dotenv').config();

// Initiating Connection to the MongoDB
require('./db/db_connect.js');

// Initialsing and using Socket.io for chat functionality
// require('./src/chat/socket_io');

// Importing all routes
const all_listings = require('./routes/all_listings');
const register = require('./routes/register');
const add_item = require('./routes/add_item');
const profile = require('./routes/profile');
// const delete_user = require('./src/routes/delete_user');
const signin = require('./routes/signin');
const logout = require('./routes/logout');
const base_endpoint = require('./routes/base_endpoint');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const server = require('http').createServer(app);

// Setting Routes
app.use('/db', all_listings);
app.use('/add_data', add_item);
app.use('/register', register);
app.use('/signin', signin);
// app.use('/del', delete_user);
app.use('/profilec', profile);
app.use('/logout', logout);
app.use('/', base_endpoint);

// Alloting Port Number
const port = process.env.PORT || 8000;

// Listening on the required Port.
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

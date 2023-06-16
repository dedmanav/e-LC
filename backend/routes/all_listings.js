// Importing required libraries
const express = require('express');
const User = require('../Models/User_Schema');
const jwt_Authenticate = require('../middlewares/jwt_auth');

// Using Express Router Class
const router = express.Router();

// Get the whole data from the database
router.get('/', jwt_Authenticate, async (req, res) => {
  try {
    const user = await User.find({}).select({ list: 1 });

    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'We are experiencing some server problems!!' });
  }
});

module.exports = router;

// Importing required libraries
const express = require('express');
const User = require('../Models/User_Schema');
const jwt_Authenticate = require('../middlewares/jwt_auth');

// Using Express Router Class
const router = express.Router();
// The given function adds a new listed item into the database and update list array.
router.patch('/', jwt_Authenticate, async (req, res) => { 
  try {
    const { targetID } = req.body;
    console.log("own_id", req.userID);
    await User.findOneAndUpdate(
      {
        _id: req.userID,
      },
      {
        $pull: {"list": {"_id": targetID}}
      }
    );
    console.log(User);
    res
      .status(201)
      .json({ message: 'Listing successfully deleted on the website' });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'We are experiencing some server problems!!' });
  }
});

module.exports = router;

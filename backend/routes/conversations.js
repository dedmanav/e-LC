const router = require("express").Router();
const Conversation = require("../Models/Conversation");

//new conv

router.post("/", async (req, res) => {

  const conversationExists1 = await Conversation.find({
    members: [req.body.senderId, req.body.receiverId]
  });

  const conversationExists2 = await Conversation.find({
    members: [req.body.receiverId, req.body.senderId]
  });
  console.log(conversationExists1);
  console.log(conversationExists2);
  if(conversationExists1.length!==0) res.status(200).json(conversationExists1);
  else if(conversationExists2.length!==0) res.status(200).json(conversationExists2);
  else {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
}
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    console.log("hi");
    console.log(req.params.userId);
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).text(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

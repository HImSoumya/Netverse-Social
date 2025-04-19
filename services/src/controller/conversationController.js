const Conversation = require("../model/Conversation");

// new conversation
exports.createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get conversation of user
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
        members:{$in:[req.params.userId]}
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConversationByUserIds = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

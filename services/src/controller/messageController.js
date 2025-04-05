const Message = require("../model/Message");

//add
exports.createMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

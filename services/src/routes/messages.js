const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controller/messageController");

router.post("/", createMessage);
router.get("/:conversationId", getMessages);

module.exports = router;

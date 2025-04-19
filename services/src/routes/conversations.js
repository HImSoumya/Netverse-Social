const express = require("express");
const router = express.Router();
const {createConversation,getConversation,getConversationByUserIds} = require("../controller/conversationController")

router.post('/',createConversation)
router.get('/:userId',getConversation)
router.get('/find/:firstUserId/:secondUserId', getConversationByUserIds);



module.exports = router;
const express = require("express");
const router = express.Router();
const { createPost, updatePost,deletePost } = require("../controller/postController");

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id",deletePost)

module.exports = router;

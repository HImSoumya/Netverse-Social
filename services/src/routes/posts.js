const express = require("express");
const router = express.Router();
const { createPost, updatePost,deletePost,likePost,getPost,getUserFeedPosts } = require("../controller/postController");

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)
router.get("/:id",getPost)
router.get("/timeline/all",getUserFeedPosts)

module.exports = router;

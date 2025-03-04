const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getUserFeedPosts,
  getUserPosts,
} = require("../controller/postController");

const { upload } = require("../middleware/multer");

router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/:userid", getUserFeedPosts);
router.get("/profile/:username", getUserPosts);

module.exports = router;

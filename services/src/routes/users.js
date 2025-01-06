const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getSingleUser,
  followUser,
  unfollowUser
} = require("../controller/userController");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getSingleUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;

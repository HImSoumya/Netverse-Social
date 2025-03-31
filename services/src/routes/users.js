const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getSingleUser,
  getUsersFrineds,
  followUser,
  unfollowUser,
  findUser,
} = require("../controller/userController");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getSingleUser);
router.get("/friends/:userId", getUsersFrineds);
router.patch("/:id/follow", followUser);
router.patch("/:id/unfollow", unfollowUser);
router.get("/", unfollowUser);
router.get("/", findUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controller/userController");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getSingleUser);

module.exports = router;

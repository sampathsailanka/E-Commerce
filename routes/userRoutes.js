const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
//somewhere ---> req.user {x} --> req = {}
// --> req.body ||| req.user = ...information |||
// req = {user: {name, role, userId}} --> req.user
router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

// the route with having params should be placed at last... IDK WHY?
router.route("/:id").get(authenticateUser, getSingleUser);
module.exports = router;

const express = require("express");
const router = express.Router();


const {getUsers, createUser, updateUser, getUser, deleteUser, deleteUsers} = require("../controllers/userController");
const validateToken = require("../middleware/tokenHandler");

router.use(validateToken);
router.route("/").post(createUser).get(getUsers).delete(deleteUsers);
router.route("/:id").put(updateUser).get(getUser).delete(deleteUser);

module.exports = router;

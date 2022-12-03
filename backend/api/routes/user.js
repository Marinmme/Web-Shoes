const express = require("express");
const router = express.Router();
require("dotenv").config();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.get("/", UserController.user_get_all);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/admin/login", UserController.user_admin_login);

router.post("/updateInfo", UserController.user_updateInfo);

router.post("/changePass", UserController.user_changePass);

router.delete("/:userId", UserController.user_delete);



module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SendMailsController = require('../controllers/sendMails');

router.post("/", SendMailsController.sendMail);


module.exports = router;
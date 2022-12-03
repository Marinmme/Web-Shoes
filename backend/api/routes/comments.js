const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CommentsController = require('../controllers/comment');



router.get("/", CommentsController.comments_get_all);

router.post("/", CommentsController.comments_create_comment);

router.get("/:productDetailId", CommentsController.comments_get_comment);

router.delete("/:commentId", CommentsController.comments_delete);

module.exports = router;
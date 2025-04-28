const express = require('express');
const { isAuthorizedUser } = require('../middlewares/authorization');
const { comment, getAllCommentsByRecipeId, deleteCommentByCommentId } = require('../controllers/commentController');

const router = express.Router();

// protected routes
router.post('/', isAuthorizedUser, comment);
router.get('/:id', isAuthorizedUser, getAllCommentsByRecipeId);
router.delete('/:id', isAuthorizedUser, deleteCommentByCommentId);

module.exports = router;
const commentsModel = require('../models/comments');
const { getLoggedInUserId, mapCommentsDAOToComments, mapCommentsListDAOToCommentsList } = require('../utils/utils');

// Handlers to handle internal fns
const getCommentByIdHandler = async (commentId, loggedInUserId) => {
    const comment = await commentsModel.getComment(commentId, loggedInUserId);
    if (comment?.length === 0) {
        throw { status: 404, message: `Comment with id: ${commentId} not found` };
    }
    return mapCommentsDAOToComments(comment[0]);
}

const deleteAllCommentsForRecipeHandler = async (recipeId) => {
    const deleted = await commentsModel.deleteAllComments(recipeId);
    if (!deleted) {
        throw { message: `Unable to delete all the comments for the recipe id ${recipeId}`, status: 500};
    }
};

// Functions to handle API
const comment = async (req) => {
    const commented = await commentsModel.comment(req.body.comment, req.body.recipeId, getLoggedInUserId(req));
    if (!commented) {
        throw { message: `Unable to comment for the recipe with id ${req.body.recipeId}`, status: 500 };
    }
    return await getCommentByIdHandler(commented.insertId, getLoggedInUserId(req));
};

const getAllCommentsByRecipeId = async (req) => {
    const comments = await commentsModel.getAllCommentsByRecipeId(req.params.id);
    return mapCommentsListDAOToCommentsList(comments);
};

const deleteCommentByCommentId = async (req) => {
    await getCommentByIdHandler(req.params.id, getLoggedInUserId(req));
    const deleted = await commentsModel.deleteCommentByCommentId(req.params.id, getLoggedInUserId(req));
    if (!deleted) {
        throw { message: `Unable to delete the comment with id ${req.params.id}`, status: 500 };
    }
};

module.exports = {
    deleteAllCommentsForRecipeHandler,
    comment,
    getAllCommentsByRecipeId,
    deleteCommentByCommentId
}
const commentService = require('../services/commentService');
const recipeService = require('../services/recipeService');
const { getLoggedInUserId } = require('../utils/utils');

const comment = async (req, res) => {
    await recipeService.fetchRecipeByIdHandler(req.body.recipeId, getLoggedInUserId(req));
    const commented = await commentService.comment(req);
    return res.status(201).send(commented);
};

const getAllCommentsByRecipeId = async (req, res) => {
    await recipeService.fetchRecipeById(req);
    const comments = await commentService.getAllCommentsByRecipeId(req);
    return res.status(200).send(comments);
};

const deleteCommentByCommentId = async (req, res) => {
    await commentService.deleteCommentByCommentId(req);
    return res.status(200).send(1);
};

module.exports = {
    comment,
    getAllCommentsByRecipeId,
    deleteCommentByCommentId
}
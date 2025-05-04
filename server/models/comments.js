const db = require('../config/db_connect');

const getComment = async (commentId, loggedInUserId) => {
    const sql = `SELECT * FROM COMMENT WHERE CommentId=? AND UserId=?`;
    return await db.query(sql, [commentId, loggedInUserId]);
};

const getAllCommentsByRecipeId = async (recipeId) => {
    const sql = `SELECT * FROM COMMENT WHERE RecipeId=? ORDER BY CommentId DESC`;
    return await db.query(sql, [recipeId]);
}

const comment = async (comments, recipeId, loggedInUserId) => {
    const sql = `INSERT INTO COMMENT (Comments, RecipeId, UserId) VALUES (?, ?, ?)`;
    return await db.query(sql, [comments, recipeId, loggedInUserId]);
};

const deleteCommentByCommentId = async (commentId, loggedInUserId) => {
    const sql = `DELETE FROM COMMENT WHERE CommentId=? AND UserId=?`;
    return await db.query(sql, [commentId, loggedInUserId]);
};

const deleteAllComments = async (recipeId) => {
    const sql = `DELETE FROM COMMENT WHERE RecipeId=?`;
    return await db.query(sql, [recipeId]);
};

module.exports = {
    getComment,
    getAllCommentsByRecipeId,
    comment,
    deleteCommentByCommentId,
    deleteAllComments,
}
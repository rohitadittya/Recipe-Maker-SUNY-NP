const getLoggedInUserId = (req) => req?.loggedInUserId;
const setLoggedInUserId = (req, userId) => {
    req.loggedInUserId = userId;
}
const mapUserDAOToUser = (user) => ({
    userId: user.UserId,
    username: user.UserName,
    firstname: user.FirstName,
    lastname: user.LastName,
    email: user.Email
});

const mapRecipeDAOToRecipe = (recipe) => ({
    recipeId: recipe.RecipeId,
    title: recipe.RecipeName,
    description: recipe.Description,
    ingredients: recipe.Ingredients,
    instructions: recipe.Instructions,
    imageUrl: recipe.ImageUrl,
    likes: recipe.likes,
    likedByLoggedInUser: recipe.IsLikedByLoggedInUser,
    userId: recipe.UserId
});

const mapCommentsDAOToComments = (comments) => ({
    commentId: comments.CommentId,
    comment: comments.Comments,
    createdTimeStamp: comments.CreatedTimestamp,
    recipeId: comments.RecipeId,
    userId: comments.UserId
})

const mapUserListDAOToUserList = (users) => (users.map(user => mapUserDAOToUser(user)));
const mapRecipeListDAOToRecipeList = (recipes) => (recipes.map(recipe => mapRecipeDAOToRecipe(recipe)));
const mapCommentsListDAOToCommentsList = (comments) => (comments.map(comment => mapCommentsDAOToComments(comment)));

module.exports = {
    getLoggedInUserId,
    setLoggedInUserId,
    mapUserDAOToUser,
    mapRecipeDAOToRecipe,
    mapUserListDAOToUserList,
    mapRecipeListDAOToRecipeList,
    mapCommentsDAOToComments,
    mapCommentsListDAOToCommentsList
};
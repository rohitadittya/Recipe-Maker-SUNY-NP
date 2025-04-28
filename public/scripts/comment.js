import { authGuard, logoutUser } from "../services/user.service.js";
import { getRecipeById } from "../services/recipe.service.js";
import { getAllCommentForRecipe, comment } from "../services/comment.service.js";
import { recipeFeedRenderer } from "../utils/recipeUtils.js";

const logout_anchor = document.getElementById('logout_anchor');
const recipeCommentFeed = document.getElementById('recipeCommentFeed');
const recipeCommentsList = document.getElementById('recipeCommentsList');
const commentBtn = document.getElementById('commentBtn');

let commentList = [];
let recipeIdQueryParam = null;

const onload = async () => {
    authGuard(); //check if the user is logged in, jwt token expired
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('recipeId') && queryParams.get('recipeId') !== "") {
        recipeIdQueryParam = queryParams.get('recipeId');
        await renderRecipeForComment();
        console.log("Commenting recipe with ID:", recipeIdQueryParam);
    }
};

commentBtn.addEventListener('click', async (e) => {
    const commentsNode = document.getElementById('commentInput');
    console.log("Commenting on the recipe", commentsNode.value);

    if (!commentsNode.value) {
        return;
    }

    try {
        const payload = {
            comment: commentsNode.value,
            recipeId: recipeIdQueryParam
        }
        const latestComment = await comment(payload);
        commentList.push(latestComment);
        renderComments(latestComment);
        commentsNode.value = "";
    }
    catch (error) {
        console.error("Error while commenting", error?.message);
        return;
    }
});

const createCommentsElements = (comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('recipe_comment_item');
    commentDiv.textContent = comment.comment;
    return commentDiv;
};

const renderComments = (newComment=null) => {
    if (newComment) {
        recipeCommentsList.appendChild(createCommentsElements(newComment));
        return;
    }

    recipeCommentsList.innerHTML = '';
    commentList.forEach(comment => {
        recipeCommentsList.appendChild(createCommentsElements(comment));
    });
};

const renderRecipeForComment = async () => {
    try {
        const recipe = await getRecipeById(recipeIdQueryParam);
        commentList = await getAllCommentForRecipe(recipeIdQueryParam);
        recipeFeedRenderer(recipeCommentFeed, [recipe], null, null, null, null);
        renderComments();
    }
    catch (error) {
        console.error("Error fetching recipe and comments", error?.message);
        return;
    }
};

logout_anchor.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

onload();
import { getRecipeById, likeARecipeById } from "../../services/recipe.service.js";
import { getAllCommentForRecipe, comment } from "../../services/comment.service.js";
import { recipeFeedRenderer } from "../shared/recipeCard.js";

const recipeCommentFeed = document.getElementById('recipeCommentFeed');
const recipeCommentsList = document.getElementById('recipeCommentsList');
const commentBtn = document.getElementById('commentBtn');

let recipe = null;
let commentList = [];
let recipeIdQueryParam = null;

const onload = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('recipeId') && queryParams.get('recipeId') !== "") {
        recipeIdQueryParam = queryParams.get('recipeId');
        await renderRecipeForComment();
    }
    else {
        console.error("No recipeId found in query params or incorrect query params");
        toggleHiddenWhenNoRecipe();
    }
};

const toggleHiddenWhenNoRecipe = (msg=null) => {
    const recipeNotFoundDiv = document.getElementById("recipeNotFound");
    recipeNotFoundDiv.classList.remove('hidden');
    msg && (recipeNotFoundDiv.textContent = msg);
    document.getElementById("recipeCommentSection").classList.add('hidden');
};

const likeARecipe = async () => {
    try {
        const res = await likeARecipeById(recipeIdQueryParam);
        if (res) {
            if (recipe?.likedByLoggedInUser) {
                recipe.likes > 0 ? recipe.likes-- : 0;
                recipe.likedByLoggedInUser = 0;
            }
            else {
                recipe.likes++;
                recipe.likedByLoggedInUser = 1;
            }
            const likeBtn = document.getElementById(`likeId_${recipeIdQueryParam}`);
            likeBtn.classList.toggle('recipe_liked');
            likeBtn.textContent=`Like ${recipe.likes}`;
        }
        console.info("Recipe liked/ unliked successfully:", recipeIdQueryParam);
    }
    catch (error) {
        console.error("Error deleting recipe:", error?.message);
        return;
    }
};

commentBtn.addEventListener('click', async (e) => {
    const commentsNode = document.getElementById('commentInput');
    console.info("Commenting on the recipe", commentsNode.value);

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
        recipeCommentsList.prepend(createCommentsElements(newComment));
        return;
    }

    recipeCommentsList.innerHTML = '';
    commentList.forEach(comment => {
        recipeCommentsList.appendChild(createCommentsElements(comment));
    });
};

const renderRecipeForComment = async () => {
    try {
        recipe = await getRecipeById(recipeIdQueryParam);
        commentList = await getAllCommentForRecipe(recipeIdQueryParam);
        recipeFeedRenderer(recipeCommentFeed, [recipe], null, null, likeARecipe, null);
        renderComments();
    }
    catch (error) {
        toggleHiddenWhenNoRecipe("Recipe not found!!!");
        console.error("Error fetching recipe and comments:", error?.message);
        return;
    }
};

onload();
export const recipeFeedRenderer = (srcContainer, recipeList, deleteBtnFn = null, editBtnFn = null, likeBtnFn=null, commentBtnFn=null) => {
    if (recipeList.length === 0) {
        const card = document.createElement('div');
        card.classList.add('recipe_card');
        card.innerHTML = `<div class="recipe_card_title">No recipes available</div>`;
        srcContainer.appendChild(card);
        return;
    }
    recipeList.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe_card');

        card.innerHTML = `
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.recipeName}" class="recipe_image">` : ''}
            <div class="recipe_name">${recipe.title}</div>
            <div class="recipe_description">${recipe.description}</div>
            <div class="recipe_section">
                <div class="section_title">Ingredients:</div>
                ${recipe.ingredients}
            </div>
            <div class="recipe_section">
                <div class="section_title">Instructions:</div>
                ${recipe.instructions}
            </div>
            `;

        if (likeBtnFn) {
            // Like btn
            const likeButton = document.createElement('button');
            likeButton.id=`likeId_${recipe.recipeId}`;
            likeButton.textContent = `Like ${recipe.likes}`;
            likeButton.classList.add('recipe_likeUnlike_btn', 'recipe_btn', `${recipe.likedByLoggedInUser ? 'recipe_liked' : "#"}`);
            likeButton.onclick = () => {
                likeBtnFn(recipe.recipeId);
            };
            card.appendChild(likeButton);
        }

        if (commentBtnFn) {
            // Comment btn
            const commentButton = document.createElement('button');
            commentButton.id=`commentId_${recipe.recipeId}`;
            commentButton.textContent = `Comment`;
            commentButton.classList.add('recipe_comment_btn', 'recipe_btn');
            commentButton.onclick = () => {
                commentBtnFn(recipe.recipeId);
            };
            card.appendChild(commentButton);
        }

        if (deleteBtnFn) {
            // Delete btn
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('recipe_delete_btn', 'recipe_btn');
            deleteButton.onclick = () => {
                deleteBtnFn(recipe.recipeId);
            };
            card.appendChild(deleteButton);
        }

        if (editBtnFn) {
            // Edit btn
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('recipe_edit_btn', 'recipe_btn');
            editButton.onclick = () => {
                editBtnFn(recipe.recipeId);
            };
            card.appendChild(editButton);
        }

        srcContainer.appendChild(card);
    });
};
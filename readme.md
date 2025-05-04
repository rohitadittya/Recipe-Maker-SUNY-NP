# Recipe Maker
Welcome to Recipe Maker—a social media application that brings food lovers together to share, inspire, and explore the world of recipes.

## Features:
1. Post a Recipe: Users can create and share their own recipes with others.
2. Engage with Recipes: Like and comment a recipes posted by others.
3. Mark Favorites: Save recipes to your favorites for easy access.

### Future Scope
Integrate AI feature, where users can input available ingredients, and the application generates possible recipes in real-time.

## ERD:
![ERD](https://github.com/user-attachments/assets/656bd39e-171d-4063-a537-9a3a4efd4bb3)

## Relations:
![image](https://github.com/user-attachments/assets/0ab14785-c11b-4bd2-bb4a-9749c90a8a15)

You can find SQL Scripts [here](https://github.com/rohitadittya/Recipe-Maker-SUNY-NP/blob/main/server/sql/recipemaker.sql)

## To start the server
1. npm i
2. Add the following properties and the values in the .env file
    1. MYSQL_HOST
    2. MYSQL_USERNAME
    3. MYSQL_PSWD
    4. JWT_SECRET
 3. npm run dev

## You can find the postman collection [here](https://github.com/rohitadittya/Recipe-Maker-SUNY-NP/tree/main/server/postmanCollection)
Import the [collection](https://github.com/rohitadittya/Recipe-Maker-SUNY-NP/blob/main/server/postmanCollection/SUNY%20Recipe%20Maker%20Appln.postman_collection.json) and the [environment_variables](https://github.com/rohitadittya/Recipe-Maker-SUNY-NP/blob/main/server/postmanCollection/recipe_app_local.postman_environment.json).
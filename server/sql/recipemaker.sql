const sql = `CREATE DATABASE IF NOT EXISTS recipegram;
USE recipegram;

CREATE TABLE IF NOT EXISTS USER (
	UserId INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(25) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedTimeStamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    DeletedTimeStamp DATETIME
);

CREATE TABLE IF NOT EXISTS RECIPE (
    RecipeId INT PRIMARY KEY AUTO_INCREMENT,
    RecipeName VARCHAR(50) NOT NULL,
    Description TEXT,
    Ingredients TEXT NOT NULL,
    Instructions TEXT NOT NULL,
    Image BLOB,
    CreatedTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    DeletedTimeStamp DATETIME,
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES USER(UserId)
);

CREATE TABLE IF NOT EXISTS Comment (
    CommentId INT PRIMARY KEY AUTO_INCREMENT,
    Comments VARCHAR(255) NOT NULL,
    CreatedTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    DeletedTimeStamp DATETIME,
    RecipeId INT,
    UserId INT,
    FOREIGN KEY (RecipeId) REFERENCES RECIPE(RecipeId),
    FOREIGN KEY (UserId) REFERENCES USER(UserId)
);

CREATE TABLE IF NOT EXISTS USER_RECIPE_LIKE (
    UserId INT,
    RecipeId INT,
    PRIMARY KEY (UserId, RecipeId),
    FOREIGN KEY (UserId) REFERENCES USER(UserId),
    FOREIGN KEY (RecipeId) REFERENCES RECIPE(RecipeId)
);

CREATE TABLE IF NOT EXISTS USER_RECIPE_FAVORITE (
    UserId INT,
    RecipeId INT,
    PRIMARY KEY (UserId, RecipeId),
    FOREIGN KEY (UserId) REFERENCES USER(UserId),
    FOREIGN KEY (RecipeId) REFERENCES RECIPE(RecipeId)
);`

module.exports = sql;

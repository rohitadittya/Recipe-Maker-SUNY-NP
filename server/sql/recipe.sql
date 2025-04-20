`CREATE TABLE IF NOT EXISTS RECIPE (
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
);`
const db = require('./Models/Tables');

/**
 * Gets the user's id, first name, and last name from the database.
 * @function
 * @param {Number} userId - The id of the user.
 */
function getUserInfo(userId) {
    return new Promise(function (resolve) {
        db.Users.findAll({
            attributes: ["id", "FirstName", "Username"],
            where: {
                id: userId,
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Success", Message: res[0].dataValues })
                }
                else {
                    resolve({ Result: "Error", Message: "No User Found with the id: " + userId });
                }
            } else {
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => { console.log(err); resolve({ Result: "Error", Message: err }) })
    })
};

/**
 * Gets all the user saved recipe's id, name, summary, and comments from the database.
 * @function
 * @param {Number} userId - The id of the user that saved the recipe.
 */
function getUserRecipes(userId) {
    return new Promise(function (resolve) {
        db.SavedRecipes.findAll({
            attributes: ["RecipeId", "RecipeName", "RecipeSummary", "RecipeComments"],
            where: {
                UserId: userId,
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Success", Message: res })
                }
                else {
                    resolve({ Result: "Success", Message: "No Recipes Found for the user with id: " + userId });
                }
            } else {
                console.log("Problem?")
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => {
            console.log(err);
            resolve({ Result: "Error", Message: err })
        })
    })
};

 var dbFunctions = {

/**
 * Checks to see if the username exists, if not, creats a user, if so,
 *  tells the user to choose another username because it's already used.
 * @function
 * @param {String} firstName - The first name of the user.
 * @param {String} username - The username of the user.
 * @param {String} hashedPassword - The hashed password of the user.
 */
  signup(firstName, username, hashedPassword) {
    return new Promise(function (resolve) {
        db.Users.findAll({
            where: {
                Username: username,
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Error", Message: "Username Taken" })
                }
                else {
                    db.Users.create({
                        FirstName: firstName,
                        Username: username,
                        HashPass: hashedPassword
                    })
                    resolve({ Result: "Success" });
                }
            } else {
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
},

/**
 * Checks to see if the username and password match in the database.
 * @function
 * @param {String} username - The username of the user.
 * @param {String} hashedPassword - The hashed password of the user.
 */
  login(username, hashedPassword) {
    return new Promise(function (resolve) {
        db.Users.findAll({
            where: {
                Username: username,
                HashPass: hashedPassword
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Success", Message: "Valid User" })
                }
                else {
                    resolve({ Result: "Error", Message: "Invalid User" });
                }
            } else {
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
},

/**
 * Uses the getUserInfo and getUserRecipe functions to return both information and saved recipes for the user.
 * @function
 * @param {Number} userId - The id of the user.
 */
async getInfo(userId) {
    var info = await getUserInfo(userId);
    var recipes = await getUserRecipes(userId);

    if (info.Result == "Success" && recipes.Result == "Success") {
        return {
            Result: "Success",
            Message: {
                Info: info.Message,
                Recipes: recipes.Message
            }
        }
    }
    else {
        return {
            Result: "Error",
            Message: {
                Info: info.Message,
                Recipes: recipes.Message
            }
        }
    }
},

/**
 * If the recipe isn't already added, this adds the recipe to the user's saved recipe list.
 * @function
 * @param {Number} userId - The id of the user.
 * @param {Number} recipeId - The id of the recipe being added.
 * @param {String} recipeName - The name of the recipe being added.
 * @param {String} recipeSummary - The summary of the recipe being added.
 * @param {String} recipeComments - The comments to the recipe being added.
 */
 addRecipe(userId, recipeId, recipeName, recipeSummary, recipeComments) {
    return new Promise(function (resolve) {
        db.SavedRecipes.findAll({
            where: {
                userId: userId,
                recipeId: recipeId
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Error", Message: "Recipe Already Saved" })
                }
                else {
                    db.SavedRecipes.create({
                        UserId: userId,
                        RecipeId: recipeId,
                        RecipeName: recipeName,
                        RecipeSummary: recipeSummary,
                        RecipeComments: recipeComments
                    })
                    resolve({ Result: "Success" });
                }
            } else {
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
},

/**
* If the recipe isn't already deleted, this deletes the recipe from the user list.
* @function
* @param {Number} userId - The id of the user.
* @param {Number} recipeId - The id of the recipe being deleted.
*/
 deleteRecipe(userId, recipeId) {
    return new Promise(function (resolve) {
        db.SavedRecipes.destroy({
            where: {
                userId: userId,
                recipeId: recipeId
            }
        }).then((res) => {
            console.log(res)
            if (res) {
                resolve({ Result: "Success", Message: "Recipe deleted" });
            } else {
                resolve({ Result: "Error", Message: "Recipe already deleted or Recipe didn't exist" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
},

/**
 * This edits the recipe comments if it exists.
 * @function
 * @param {Number} userId - The id of the user.
 * @param {Number} recipeId - The id of the recipe being edited.
 * @param {String} recipeComments - The new comments for the saved recipe.
 */
 editRecipeComment(userId, recipeId, recipeComments) {
    return new Promise(function (resolve) {
        db.SavedRecipes.update({ RecipeComments: recipeComments }, {
            where: {
                userId: userId,
                recipeId: recipeId
            }
        }).then((res) => {
            console.log(res)
            if (res[0] > 0) {
                resolve({ Result: "Success", Message: "Successfully updated comments" });
            } else {
                resolve({ Result: "Error", Message: "Recipe not found or no changes in the comments" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
},

/**
* Admin only, this just adds ingredients to the database if not already there.
* @function
* @param {String} ingredient - The ingredient to add.
*/
 addIngredient(ingredient) {
    return new Promise(function (resolve) {
        db.Ingredients.findAll({
            where: {
                Name: ingredient,
            }
        }).then((res) => {
            if (res) {
                if (res.length > 0) {
                    resolve({ Result: "Error", Message: "Ingredient already there" })
                }
                else {
                    db.Ingredients.create({
                        Name: ingredient,
                    })
                    resolve({ Result: "Success" });
                }
            } else {
                resolve({ Result: "Error", Message: "Unknown Error" })
            }

        }, (err) => { resolve({ Result: "Error", Message: err }) })
    })
}

}

module.exports = dbFunctions;
// async function tester() {
//     var test = await addIngredient("Roasted Chicken")
//     console.log(test)
// }

// tester()
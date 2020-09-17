const db = require('./Models/Tables');

function getUserInfo(userId) {
    return new Promise(function (resolve, reject) {
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

function getUserRecipes(userId) {
    return new Promise(function (resolve, reject) {
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

//module.exports = function () {
function signup(firstName, username, hashedPassword) {
    return new Promise(function (resolve, reject) {
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
}

function login(username, hashedPassword) {
    return new Promise(function (resolve, reject) {
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
}

async function getInfo(userId) {
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
}

function addRecipe(userId, recipeId, recipeName, recipeSummary, recipeComments) {
    return new Promise(function (resolve, reject) {
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
}

//}
// async function tester(){
//     var test = await addRecipe(1,4,"Test Recipe","Test Summary", "Test Comments")
//     console.log(test)
// }

// tester()
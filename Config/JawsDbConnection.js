const db = require("./Models/Tables");

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
      },
    }).then(
      (res) => {
        if (res) {
          if (res.length > 0) {
            resolve({ Result: "Success", Message: res[0].dataValues });
          } else {
            resolve({
              Result: "Error",
              Message: "No User Found with the id: " + userId,
            });
          }
        } else {
          resolve({ Result: "Error", Message: "Unknown Error" });
        }
      },
      (err) => {
        console.log(err);
        resolve({ Result: "Error", Message: err });
      }
    );
  });
}

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
      },
    }).then(
      (res) => {
        if (res) {
          if (res.length > 0) {
            resolve({ Result: "Success", Message: res });
          } else {
            resolve({
              Result: "Success",
              Message: "No Recipes Found for the user with id: " + userId,
            });
          }
        } else {
          resolve({ Result: "Error", Message: "Unknown Error" });
        }
      },
      (err) => {
        console.log(err);
        resolve({ Result: "Error", Message: err });
      }
    );
  });
}

/**
 * Gets all the user custom recipe's id, name, ingredients, instructions, summary, and comments from the database.
 * @function
 * @param {Number} userId - The id of the user.
 */
function getUserCustomRecipes(userId) {
  return new Promise(function (resolve) {
    db.CustomRecipes.findAll({
      attributes: [
        "id",
        "RecipeName",
        "RecipeIngredients",
        "RecipeInstructions",
        "RecipeSummary",
        "RecipeComments",
      ],
      where: {
        UserId: userId,
      },
    }).then(
      (res) => {
        if (res) {
          if (res.length > 0) {
            resolve({ Result: "Success", Message: res });
          } else {
            resolve({
              Result: "Success",
              Message:
                "No Custom Recipes Found for the user with id: " + userId,
            });
          }
        } else {
          resolve({ Result: "Error", Message: "Unknown Error" });
        }
      },
      (err) => {
        console.log(err);
        resolve({ Result: "Error", Message: err });
      }
    );
  });
}

var dbFunctions = {
  /**
   * Checks to see if the username exists, if not, creats a user, if so,
   *  tells the user to choose another username because it's already used.
   * @function
   * @param {String} firstName - The first name of the user.
   * @param {String} username - The username of the user.
   * @param {String} hashedPassword - The hashed password of the user.
   */
  async signup(firstName, username, hashedPassword) {
    console.log(username);
    return new Promise(function (resolve) {
      db.Users.findAll({
        where: {
          Username: username,
        },
      }).then(
        async (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({ Result: "Error", Message: "Username Taken" });
            } else {
              await db.Users.create({
                FirstName: firstName,
                Username: username,
                HashPass: hashedPassword,
              });
              db.Users.findAll({ where: { Username: username } }).then(
                (response) => {
                  resolve({
                    Result: "Success",
                    UserId: response[0].dataValues.id,
                  });
                }
              );
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
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
          HashPass: hashedPassword,
        },
      }).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({
                Result: "Success",
                Message: "Valid User",
                UserId: res[0].dataValues.id,
              });
            } else {
              resolve({ Result: "Error", Message: "Invalid User" });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * Uses the getUserInfo and getUserRecipe functions to return information, saved recipes, and customRecipes for the user.
   * @function
   * @param {Number} userId - The id of the user.
   */
  async getInfo(userId) {
    var info = await getUserInfo(userId);
    var savedRecipes = await getUserRecipes(userId);
    var customRecipes = await getUserCustomRecipes(userId);

    if (
      info.Result == "Success" &&
      savedRecipes.Result == "Success" &&
      customRecipes.Result == "Success"
    ) {
      return {
        Result: "Success",
        Message: {
          Info: info.Message,
          SavedRecipes: savedRecipes.Message,
          CustomRecipes: customRecipes.Message,
        },
      };
    } else {
      return {
        Result: "Error",
        Message: {
          Info: info.Message,
          SavedRecipes: savedRecipes.Message,
          CustomRecipes: customRecipes.Message,
        },
      };
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
          UserId: userId,
          RecipeId: recipeId,
        },
      }).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({ Result: "Error", Message: "Recipe Already Saved" });
            } else {
              db.SavedRecipes.create({
                UserId: userId,
                RecipeId: recipeId,
                RecipeName: recipeName,
                RecipeSummary: recipeSummary,
                RecipeComments: recipeComments,
              });
              resolve({ Result: "Success", Message: "Recipe Saved" });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
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
          UserId: userId,
          RecipeId: recipeId,
        },
      }).then(
        (res) => {
          console.log(res);
          if (res) {
            resolve({ Result: "Success", Message: "Recipe deleted" });
          } else {
            resolve({
              Result: "Error",
              Message: "Recipe already deleted or Recipe didn't exist",
            });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
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
      db.SavedRecipes.update(
        { RecipeComments: recipeComments },
        {
          where: {
            UserId: userId,
            RecipeId: recipeId,
          },
        }
      ).then(
        (res) => {
          if (res[0] > 0) {
            resolve({
              Result: "Success",
              Message: "Successfully updated comments",
            });
          } else {
            resolve({
              Result: "Error",
              Message: "Recipe not found or no changes in the comments",
            });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * Gets a specific user custom recipe by id.
   * @function
   * @param {Number} userId - The id of the user.
   * @param {Number} recipeId - The id of the recipe.
   */
  getUserCustomRecipe(userId, recipeId) {
    return new Promise(function (resolve) {
      db.CustomRecipes.findAll({
        attributes: [
          "RecipeName",
          "RecipeIngredients",
          "RecipeInstructions",
          "RecipeSummary",
          "RecipeComments",
        ],
        where: {
          id: recipeId,
          UserId: userId,
        },
      }).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({ Result: "Success", Message: res });
            } else {
              resolve({
                Result: "Success",
                Message: "No Custom Recipe Found with id: " + recipeId,
              });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * If the recipe isn't already added, this adds the recipe to the user's custom recipe list.
   * @function
   * @param {Number} userId - The id of the user.
   * @param {String} recipeName - The name of the recipe being added.
   * @param {String} recipeIngredients - The ingredients of the recipe being added.
   * @param {String} recipeInstructions - The instructions to the recipe being added.
   * @param {String} recipeSummary - The summary of the recipe being added.
   * @param {String} recipeComments - The comments to the recipe being added.
   */
  addCustomRecipe(
    userId,
    recipeName,
    recipeIngredients,
    recipeInstructions,
    recipeSummary,
    recipeComments
  ) {
    return new Promise(function (resolve) {
      db.CustomRecipes.findAll({
        where: {
          UserId: userId,
          RecipeName: recipeName,
        },
      }).then(
        async (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({
                Result: "Error",
                Message: "Custom Recipe Already Saved",
              });
            } else {
              await db.CustomRecipes.create({
                UserId: userId,
                RecipeName: recipeName,
                RecipeIngredients: recipeIngredients,
                RecipeInstructions: recipeInstructions,
                RecipeSummary: recipeSummary,
                RecipeComments: recipeComments,
              });
              db.CustomRecipes.findAll({
                where: { UserId: userId, RecipeName: recipeName },
              }).then((response) => {
                resolve({
                  Result: "Success",
                  Message: "Custom Recipe Added",
                  RecipeId: response[0].dataValues.id,
                });
              });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * If the recipe isn't already deleted, this deletes the recipe from the user custom recipe list.
   * @function
   * @param {Number} userId - The id of the user.
   * @param {Number} recipeId - The id of the recipe being deleted.
   */
  deleteCustomRecipe(userId, recipeId) {
    return new Promise(function (resolve) {
      db.CustomRecipes.destroy({
        where: {
          id: recipeId,
          UserId: userId,
        },
      }).then(
        (res) => {
          if (res) {
            resolve({ Result: "Success", Message: "Custom Recipe deleted" });
          } else {
            resolve({
              Result: "Error",
              Message:
                "Custom Recipe already deleted or Custom Recipe didn't exist",
            });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * This edits the recipe with the fields provided.
   * @function
   * @param {Number} userId - The id of the user.
   * @param {Number} recipeId - The id of the recipe edited
   * @param {String} recipeName - The name of the recipe being added.
   * @param {String} recipeIngredients - The ingredients of the recipe being added.
   * @param {String} recipeInstructions - The instructions to the recipe being added.
   * @param {String} recipeSummary - The summary of the recipe being added.
   * @param {String} recipeComments - The comments to the recipe being added.
   */
  editCustomRecipe(
    userId,
    recipeId,
    recipeName,
    recipeIngredients,
    recipeInstructions,
    recipeSummary,
    recipeComments
  ) {
    return new Promise(function (resolve) {
      db.CustomRecipes.update(
        {
          RecipeName: recipeName,
          RecipeIngredients: recipeIngredients,
          RecipeInstructions: recipeInstructions,
          RecipeSummary: recipeSummary,
          RecipeComments: recipeComments,
        },
        {
          where: {
            id: recipeId,
            UserId: userId,
          },
        }
      ).then(
        (res) => {
          if (res[0] > 0) {
            resolve({
              Result: "Success",
              Message: "Successfully updated custom recipe",
            });
          } else {
            resolve({
              Result: "Error",
              Message:
                "Custom Recipe not found or no changes in the custom recipe",
            });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },

  /**
   * Checks if they are a user.
   * @function
   * @param {String} username - The username of the user.
   * @param {String} hashPassword - The hashed password of the user.
   */
  isUser(username, hashPassword) {
    return new Promise(function (resolve) {
      db.Users.findAll({
        where: {
          Username: username,
          HashPass: hashPassword,
        },
      }).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        },
        (err) => {
          resolve(false);
        }
      );
    });
  },

  /**
   * This just returns all ingredients.
   * @function
   */
  getIngredients() {
    return new Promise(function (resolve) {
      db.Ingredients.findAll({}).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({ Result: "Success", Message: res });
            } else {
              resolve({ Result: "Error", Message: "No Ingredients found" });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: "Unknown Error" });
        }
      );
    });
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
        },
      }).then(
        (res) => {
          if (res) {
            if (res.length > 0) {
              resolve({ Result: "Error", Message: "Ingredient already there" });
            } else {
              db.Ingredients.create({
                Name: ingredient,
              });
              resolve({ Result: "Success" });
            }
          } else {
            resolve({ Result: "Error", Message: "Unknown Error" });
          }
        },
        (err) => {
          resolve({ Result: "Error", Message: err });
        }
      );
    });
  },
};

module.exports = dbFunctions;

// async function tester() {
//     var test = await dbFunctions.getIngredients("c")
//     console.log(test)
// }
// tester();

const { query } = require('express');
const external = require('../Config/External');

var recipeFunctions = {

         /** 
       * Gets 20 recipes by ingredients string.
       * @function
       * @param {String} token - The token given by the user.
       * @param {String} searchQuery - The search query.
       */
    async GetRecipeByIngredients(token, searchQuery) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.api.getRecipeByIngredients(searchQuery)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

      /** 
       * Gets 20 recipes by name.
       * @function
       * @param {String} token - The token given by the user.
       * @param {String} searchQuery - The search query.
       */
    async GetRecipeByName(token, searchQuery) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.api.getRecipeByName(searchQuery)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

      /** 
       * Gets recipe by id.
       * @function
       * @param {String} token - The token given by the user.
       * @param {Number} recipeId - The id of the recipe.
       */
    async GetRecipeById(token, recipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.api.getRecipeById(recipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

      /** 
       * Gets 5 random recipes.
       * @function
       * @param {String} token - The token given by the user.
       */
    async GetRandomRecipes(token) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.api.getRandomRecipes()
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

        /** 
       * Send an email when the user finds a ingredient missing.
       * @function
       * @param {String} token - The token given by the user.
       * @param {String} ingredient - The missing ingredient.
       * @param {String} username - The username of the user
       * @param {String} firstName - the first name of the user.
       */
    async MissingIngredient(token, ingredient, username, firstName){
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.email.AddSuggestion(ingredient,firstName, username)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

     /** 
       * Gets all ingredients for the table.
       * @function
       * @param {String} token - The token given by the user.
       */
    async GetIngredients(token){
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.getIngredients()
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    }


}
module.exports = recipeFunctions;
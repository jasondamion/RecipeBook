const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const baseUrl = "https://api.spoonacular.com/recipes/";
const axios = require('axios').default;
const apiKey = process.env.SpoonApiKey;
const db = require('./JawsDbConnection');
const { api } = require('./External');

/**
 * Gets recipe information from the api using the recipeId.
 * @function
 * @param {Number} recipeId - The id of the recipe.
 */
function getRecipeInformation(recipeId) {
    return new Promise(function (resolve) {
        axios.get(baseUrl + recipeId + "/information?apiKey=" + apiKey + "&includeNutrition=false").then(
            (res) => {
                if (res.data) {
                    resolve({ Result: "Success", Message: res.data })
                }
            }, err => {
                resolve({ Result: "Error", Message: "No recipes found, incorrect id: " + recipeId })
            })
    })
}

/**
  * Admin Only, Gets the ingredient from autocomplete from searchQuery, using api and adds it to the db if not there aleady.
  * @function
  * @param {Number} ingredient - The ingredient.
  */
function missingIngredient(ingredient) {
    return new Promise(function (resolve) {
        axios.get("https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=" + apiKey + "&query=" + ingredient + "&number=20").then(
            (res) => {
                for (let ingredient of res.data) {
                    console.log(ingredient)
                    db.addIngredient(ingredient.name)
                }
            }, err => {
                resolve({ Result: "Error", Message: err })
            })
    })
}


var apiFunctions = {

    /**
     * Gets 20 recipes from the api, searching by the searchQuery.
     * @function
     * @param {String} searchQuery - The Search Query.
     */
    getRecipeByName(searchQuery) {
        return new Promise(function (resolve) {
            axios.get(baseUrl + "complexSearch?apiKey=" + apiKey + "&query=" +
                searchQuery + "&instructionsRequired=true&number=20").then(
                    (res) => {
                        if (res.data.results.length > 0) {
                            resolve({ Result: "Success", Message: res.data.results })
                        }
                        else {
                            resolve({ Result: "Error", Message: "No recipes found, try a different search term" })
                        }
                    }, err => {
                        resolve({ Result: "Error", Message: err })

                    })
        })
    },

    /**
     * Gets 20 recipes from the api, searching by the ingredients.
     * @function
     * @param {String} searchQuery - The Search Query, string of ingredients.
     */
    getRecipeByIngredients(searchQuery) {
        return new Promise(function (resolve) {
            axios.get(baseUrl + "findByIngredients?apiKey=" + apiKey + "&ingredients=" +
                searchQuery + "&number=20").then(
                    (res) => {
                        if (res.data.length > 0) {
                            resolve({ Result: "Success", Message: res.data })
                        }
                        else {
                            resolve({ Result: "Error", Message: "No recipes found, try a different set of ingredients" })
                        }
                    }, err => {
                        resolve({ Result: "Error", Message: err })

                    })
        })
    },

    /**
    * Gets 5 random recipes.
    * @function
    */
    getRandomRecipes() {
        return new Promise(function (resolve) {
            axios.get(baseUrl + "random?apiKey=" + apiKey + "&number=5").then(
                (res) => {
                    if (res.data.recipes.length > 0) {
                        resolve({ Result: "Success", Message: res.data.recipes })
                    }
                    else {
                        resolve({ Result: "Error", Message: "Error getting random recipes" })
                    }
                }, err => {
                    resolve({ Result: "Error", Message: err })

                })
        })
    },

    /**
     * Gets the recipe from getRecipeinformation() and getRecipeInstructions() using the recipeId.
     * @function
     * @param {Number} recipeId - The id of the recipe.
     */
    async getRecipeById(recipeId) {
        var info = await getRecipeInformation(recipeId);

        if (info.Result == "Success") {
            return {
                Result: "Success",
                Message: {
                    Info: info.Message,
                }
            }
        }
        else {
            return {
                Result: "Error",
                Message: {
                    Info: info.Message,
                }
            }
        }
    }
};


module.exports = apiFunctions;

// async function tester() {
//     var test = await apiFunctions.getRandomRecipes()
//     console.log(test)
// }

// tester()

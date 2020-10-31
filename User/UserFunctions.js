const external = require('../Config/External');

var userFunctions = {

    /**
     * Signs the user up with a hashed password, username, and first name and sends back the JWT token. It also lets the admin know that there is a new user.
     * @function
     * @param {String} firstName - The first name of the user.
     * @param {String} username - The username of the user.
     * @param {String} password - The plain password of the user.
     */
    async SignUp(firstName, username, password) {
        var hashedPassword = external.auth.hasher(password);
        var signUpStatus = await external.db.signup(firstName, username, hashedPassword);
        if (signUpStatus.Result == "Success") {
            external.email.NewUser(firstName, username);
            var token = external.auth.genJWTCode(signUpStatus.UserId, username, password);
            return { Result: "Success", Token: token };
        }
        else {
            return { Result: "Error", Message: signUpStatus.Message }
        }
    },

    /**
 * Checks if it's a user and if the password and login is valid and sends back the JWT token.
 * @function
 * @param {String} username - The username of the user.
 * @param {String} password - The plain password of the user.
 */
    async Login(username, password) {
        var hashedPassword = external.auth.hasher(password);
        var loginStatus = await external.db.login(username, hashedPassword);
        if (loginStatus.Result == "Success") {
            var token = external.auth.genJWTCode(loginStatus.UserId, username, password)
            return { Result: "Success", Token: token };
        }
        else {
            return { Result: "Error", Message: loginStatus.Message }
        }
    },


    /**
     * Checks if token is for a valid user and if so, send back the user information and saved recipes.
     * @function
     * @param {String} token - The token given by the user.
     */
    async Info(token) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.getInfo(external.auth.getIdFromToken(token))
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /**
   * Checks if token is for a valid user and if so, adds the recipe to the SavedRecipe table.
   * @function
   * @param {String} token - The token given by the user.
   * @param {Number} recipeId - The id of the recipe being added.
   * @param {String} recipeName - The name of the recipe being added.
   * @param {String} recipeSummary - The summary of the recipe being added.
   * @param {String} recipeComments - The comments to the recipe being added.
   */
    async AddRecipe(token, recipeName, recipeId, recipeSummary, recipeComments) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.addRecipe(external.auth.getIdFromToken(token), recipeId, recipeName, recipeSummary, recipeComments)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /** 
    * If the recipe isn't already deleted, this deletes the recipe from the user list as long as the user is valid..
    * @function
    * @param {String} token - The token given by the user.
    * @param {Number} recipeId - The id of the recipe being deleted.
    */
    async DeleteRecipe(token, recipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.deleteRecipe(external.auth.getIdFromToken(token), recipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /** 
    * If the user is valid, this edits their comments on the recipe.
    * @function
    * @param {String} token - The token given by the user.
    * @param {Number} recipeId - The id of the recipe being deleted.
    * @param {String} comments - the new comments for the recipe
    */
    async EditRecipe(token, recipeId, comments) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.editRecipeComment(external.auth.getIdFromToken(token), recipeId, comments)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /**
       * Checks if token is for a valid user and if so, gets the specific custom recipe.
       * @function
       * @param {String} token - The token given by the user.
       * @param {Number} recipeId - The name of the recipe being added.   
       */
    async GetCustomRecipe(token, recipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.getUserCustomRecipe(external.auth.getIdFromToken(token), recipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /**
    * Checks if token is for a valid user and if so, adds the recipe to the CustomRecipes table.
    * @function
    * @param {String} token - The token given by the user.
    * @param {String} recipeName - The name of the recipe being added.   
    * @param {String} recipeIngredients - The ingredients of the recipe being added.
    * @param {String} recipeInstructions - The instructions of the recipe being added.
    * @param {String} recipeSummary - The summary of the recipe being added.
    * @param {String} recipeComments - The comments to the recipe being added.
    */
    async AddCustomRecipe(token, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments, image) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            var addCustomRecipeResults = external.db.addCustomRecipe(external.auth.getIdFromToken(token), recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments)
            if(image){
                var imageUploadResults = external.cloud.UploadImage(image, addCustomRecipeResults.RecipeId)
                return {RecipeResults: addCustomRecipeResults, ImageResults: imageUploadResults};
            }
            else{
              return {RecipeResults: addCustomRecipeResults, ImageResults: null};
            }
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /**
* Checks if token is for a valid user and if so, edit the recipe in the CustomRecipes table.
* @function
* @param {String} token - The token given by the user.
* @param {Number} recipeId - The id of the recipe
* @param {String} recipeName - The name of the recipe being added.
* @param {String} recipeSummary - The summary of the recipe being added.
* @param {String} recipeIngredients - The ingredients of the recipe being added.
* @param {String} recipeInstructions - The instructions of the recipe being added.
* @param {String} recipeComments - The comments to the recipe being added.
*/
    async EditCustomRecipe(token, recipeId, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.editCustomRecipe(external.auth.getIdFromToken(token), recipeId, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /** 
       * If the recipe isn't already deleted, this deletes the recipe from the user custom recipe list as long as the user is valid..
       * @function
       * @param {String} token - The token given by the user.
       * @param {Number} recipeId - The id of the recipe being deleted.
       */
    async DeleteCustomRecipe(token, recipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.db.deleteCustomRecipe(external.auth.getIdFromToken(token), recipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

    /** 
   * Sends an email when a user wants to change their password.
   * @function
   * @param {String} firstName - The first name of the user.
   * @param {String} username - The username of the user.
   * @param {String} suggestedPassword - The suggested password of the user.
   */
    async ForgetPassword(firstName, username, suggestedPassword) {
        var emailStatus = await external.email.ForgetPassword(firstName, username, suggestedPassword)
        console.log(emailStatus)
        return emailStatus;
    },
    
       /** 
       * Get the recipe image if valid user
       * @function
       * @param {String} token - The token given by the user.
       * @param {String} customRecipeId - The id of the recipe being gotten.
       */
      async GetImage(token, customRecipeId) {
        var isValid = await external.cloud.isValidUser(token);
        if (isValid) {
            return external.cloud.GetImage(customRecipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },


       /** 
       * Remove the recipe image if valid user
       * @function
       * @param {String} token - The token given by the user.
       * @param {Number} recipeId - The id of the recipe being deleted.
       */
      async RemoveImage(token, customRecipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.cloud.RemoveImage(image, customRecipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },

       /** 
       * Update the recipe image if valid user
       * @function
       * @param {String} token - The token given by the user.
       * @param {ImageData} image - The id of the recipe being deleted.
       * @param {Number} recipeId - The id of the recipe being deleted.
       */
      async UpdateImage(token, image, customRecipeId) {
        var isValid = await external.auth.isValidUser(token);
        if (isValid) {
            return external.cloud.UpdateImage(image, customRecipeId)
        }
        else {
            return { Result: "Error", Message: "Invalid User" }
        }
    },



}
module.exports = userFunctions;
const Recipe = require('./RecipeFunctions');

module.exports = function (app) {

    app.get("/recipe/ingredients/:ingredients", async function (req, res) {
        let response = await Recipe.GetRecipeByIngredients(req.header('token'), req.params.ingredients);
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response);
    })
    app.get("/recipe/name/:name", async function (req, res) {
        let response = await Recipe.GetRecipeByName(req.header('token'), req.params.name);
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response);
    })
    app.get("/recipe/:recipeId", async function (req, res) {
        let response = await Recipe.GetRecipeById(req.header('token'), req.params.recipeId);
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response);
    })
    app.get("/ingredients", async function (req, res) {
        let response = await Recipe.GetIngredients(req.header('token'));
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response);
    })
    app.post("/ingredients/missing", async function (req, res) {
        var token = req.header('token');
        ingredient = req.body.ingredient;
        username = req.body.username;
        firstName = req.body.firstName;
        let response = await Recipe.MissingIngredient(token, ingredient, username, firstName);
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response);
    })
}
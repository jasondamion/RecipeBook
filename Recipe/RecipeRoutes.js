const Recipe = require('./RecipeFunctions');

module.exports = function (app) {

    app.get("/recipe/ingredients/:ingredients", async function (req, res) {
        res.send(await Recipe.GetRecipeByIngredients(req.header('token'),req.params.ingredients))
    })
    app.get("/recipe/name/:name", async function (req, res) {
        res.send(await Recipe.GetRecipeByName(req.header('token'),req.params.name))
    })
    app.get("/recipe/:recipeId", async function (req, res) {
        res.send(await Recipe.GetRecipeById(req.header('token'),req.params.recipeId))
    })
    app.get("/ingredients", async function (req, res) {
        res.send(await Recipe.GetIngredients(req.header('token')))
    })
    app.post("/ingredients/missing", async function (req, res) {
        var token = req.header('token');
        ingredient = req.body.ingredient;
        username = req.body.username;
        firstName = req.body.firstName;
        res.send(await Recipe.MissingIngredient(token,ingredient,username,firstName))
    })
}
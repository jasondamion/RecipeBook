const User = require('./UserFunctions')

module.exports = function (app) {

    app.post("/login/", async function (req, res) {
        username = req.body.username;
        password = req.body.password;
        res.send(await User.Login(username, password))
    })

    app.post("/signup/", async function (req, res) {
        firstName = req.body.firstName;
        username = req.body.username;
        password = req.body.password;
        res.send(await User.SignUp(firstName, username, password))
    })

    app.get("/info/", async function (req, res) {
        res.send(await User.Info(req.header('token')))
    })

    app.post("/saved/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeName = req.body.recipeName;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        res.send(await User.AddRecipe(token, recipeName, recipeId, recipeSummary, recipeComments))
    })

    app.put("/saved/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeComments = req.body.recipeComments;
        res.send(await User.EditRecipe(token, recipeId, recipeComments))
    })

    app.delete("/saved/", async function (req, res) {
        var token = req.header('token');
        res.send(await User.DeleteRecipe(token, req.body.recipeId))
    })

    app.get("/custom/:recipeId", async function (req, res) {
        var token = req.header('token');
        res.send(await User.GetCustomRecipe(token, req.params.recipeId))
    })

    app.post("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeName = req.body.recipeName;
        recipeIngredients = req.body.recipeIngredients;
        recipeInstructions = req.body.recipeInstructions;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        res.send(await User.AddCustomRecipe(token, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments))
    })

    app.put("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeName = req.body.recipeName;
        recipeIngredients = req.body.recipeIngredients;
        recipeInstructions = req.body.recipeInstructions;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        res.send(await User.EditCustomRecipe(token, recipeId, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments))
    })

    app.delete("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        res.send(await User.DeleteCustomRecipe(token, recipeId))
    })

    app.post("/forgot/", async function (req, res) {
        firstName = req.body.firstName;
        username = req.body.username;
        suggestedPassword = req.body.suggestedPassword;
        res.send(await User.ForgetPassword(firstName, username, suggestedPassword))
    })
}
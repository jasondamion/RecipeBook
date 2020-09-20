const User = require('./UserFunctions')

module.exports = function (app) {

    app.post("/login/", async function (req, res) {
        username = req.body.username;
        password = req.body.password;
        let response = await User.Login(username, password)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.post("/signup/", async function (req, res) {
        firstName = req.body.firstName;
        username = req.body.username;
        password = req.body.password;
        let response = await User.SignUp(firstName, username, password)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.get("/info/", async function (req, res) {
        let response = await User.Info(req.header('token'))
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.post("/saved/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeName = req.body.recipeName;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        let response = await User.AddRecipe(token, recipeName, recipeId, recipeSummary, recipeComments)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
        currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.put("/saved/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeComments = req.body.recipeComments;
        let response = await User.EditRecipe(token, recipeId, recipeComments)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.delete("/saved/", async function (req, res) {
        var token = req.header('token');
        let response = await User.DeleteRecipe(token, req.body.recipeId)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.get("/custom/:recipeId", async function (req, res) {
        var token = req.header('token');
        let response = await User.GetCustomRecipe(token, req.params.recipeId)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.post("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeName = req.body.recipeName;
        recipeIngredients = req.body.recipeIngredients;
        recipeInstructions = req.body.recipeInstructions;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        let response = await User.AddCustomRecipe(token, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.put("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        recipeName = req.body.recipeName;
        recipeIngredients = req.body.recipeIngredients;
        recipeInstructions = req.body.recipeInstructions;
        recipeSummary = req.body.recipeSummary;
        recipeComments = req.body.recipeComments;
        let response = await User.EditCustomRecipe(token, recipeId, recipeName, recipeIngredients, recipeInstructions, recipeSummary, recipeComments)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.delete("/custom/", async function (req, res) {
        var token = req.header('token');
        recipeId = req.body.recipeId;
        let response = await User.DeleteCustomRecipe(token, recipeId)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })

    app.post("/forgot/", async function (req, res) {
        firstName = req.body.firstName;
        username = req.body.username;
        suggestedPassword = req.body.suggestedPassword;
        let response = await User.ForgetPassword(firstName, username, suggestedPassword)
        var currentTime = new Date();
        let timestamp = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + " | " +
            currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
        console.log({ Response: response, Timestamp: timestamp });
        res.send(response)
    })
}
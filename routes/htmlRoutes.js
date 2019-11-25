const db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                // If we were able to successfully find Articles, render the index page
                res.render("index",
                    {
                        js_file: "index.js",
                        articles: dbArticles
                    }
                )
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};

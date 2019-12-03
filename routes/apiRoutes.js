const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const mongoose = require("mongoose");

const newsUrl = "https://www.npr.org/sections/national/";

module.exports = function (app) {
    // Scrape the news site for new articles
    app.get("/api/scrape", function (req, res) {
        let articleCount = 0;
        axios.get(newsUrl).then(function (axiosRes) {
            var $ = cheerio.load(axiosRes.data);
            $("article.item").each(function (i, element) {
                var link = $(element).find("h2.title").find("a").attr("href");
                var title = $(element).find("h2.title").find("a").text();
                var teaser = $(element).find("p.teaser").find("a").text();
                // var imgUrl = $(element).find(".item-image").find("img").attr("src");

                // Push these into an object to insert into db
                let result = { link: link, title: title, teaser: teaser };

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        articleCount++;
                        console.log(articleCount);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
            res.status(200).json({ "message": "Article scraping completed.", "newArticleCount": articleCount, "website": newsUrl });
        });
    });

    // Return article info and any associated notes as json
    app.get("/api/article/:id", function (req, res) {
        db.Article.findById({ _id: mongoose.Types.ObjectId(req.params.id) }).populate("notes").then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    // Insert new comment into Notes collection and associate it with an Article document by ID
    app.post("/api/article/:id", function (req, res) {
        db.Note.create({ title: req.body.title, body: req.body.body }).then(note => {
            db.Article.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: { notes: mongoose.Types.ObjectId(note._id) } }).then(updateRes => {
                let msg = {
                    "message": "Article updated with new comment",
                    "articleId": req.params.id,
                    "commentId": note._id
                }
                
                res.json(msg);
            }).catch(err => {
                return res.status(500).json(err);
            })
        }).catch(err => {
            return res.status(500).json(err);
        });
    });

};

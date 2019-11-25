const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

const newsUrl = "https://www.npr.org/sections/national/";

module.exports = function (app) {
    // Scrape the news site for new articles
    app.get("/api/scrape", function (req, res) {
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
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
            res.status(200).end();
        });
    });
};

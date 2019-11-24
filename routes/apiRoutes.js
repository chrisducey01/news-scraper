const axios = require("axios");
const cheerio = require("cheerio");
const newsUrl = "https://www.npr.org/sections/national/";


module.exports = function (app) {
    // Scrape the news site for new articles
    app.get("/api/scrape", function (req, res) {
        axios.get(newsUrl).then(function (axiosRes) {
            var $ = cheerio.load(axiosRes.data);
            console.log("HI");
            $("article.item").each(function (i, element) {
                var link = $(element).find("h2.title").find("a").attr("href");
                var title = $(element).find("h2.title").find("a").text();
                var teaser = $(element).find("p.teaser").find("a").text();
                var imgUrl = $(element).find(".item-image").find("img").attr("src");
                // Push these into the db
                console.log(link, title, teaser, imgUrl);
            });
            res.status(200).end();
        });
    });

};

# news-scraper
Scrapes recent news articles, stores them in this app, displays content on webpage, and allows users to comment on each article.  Articles are pulled from the NPR US news page.  Each time you scrape for new articles, any that are new that didn't previously exist in the webapp will be included at the top of the page.  

# Getting Started

## Prerequisites for development

1.  MongoDB instance installed on your local machine or a MongoDB instance deployed to a remote server (i.e. mLab MongoDB on Heroku)
2.  Node and NPM installed on your local machine

## Installing

Follow the instructions in this section to get the app setup to run on your machine.

1.  Clone the git project to your machine (example below is using ssh)
    ``` bash
    git clone git@github.com:chrisducey01/news-scraper.git
    ```

2.  Install the node module dependencies from the package.json file
    ``` bash
    npm install
    ```

3.  Startup your MongoDB instance.  There is a line in the `server.js` file that defines the URL of the MongoDB that will default to the environment variable value in MONGODB_URI if it is set.  If it isn't set, it'll fall back to your localhost instance of MongoDB: 
```// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
```

# Running the app

There is a start script in the package.json file that starts up the server and connects to the MongoDB database.  If you're deploying the app to Heroku, part of the deployment will automatically call this script to start the server.  If you're running this on a local machine, navigate to the project folder and run the command:
``` bash
npm start
```

During development, you can take advantage of nodemon to detect changes and restart the app.  There is a `watch` script that invokes nodemon instead of node by running the command:
``` bash
npm run watch
```

## Demo

There is a demo of this app available on Heroku.  You can interact with the app and see the full functionality.  Some examples of the app's functionality:
1.  Scrape new articles by clicking on the "Get News Articles" button in the navbar.
2.  Read the full article on the NPR site by clicking on the "Read Full Article" link on any of the article summary cards.
3.  Leave a comment on an article by clicking on the comment icon for any of the article summary cards.
4.  Delete a comment on an article by clicking on the trash bin icon on any of the comments on the article comments page (step 3).
5.  Save an article by clicking on the bookmark icon on any of the article summary cards.
6.  View only the saved articles by clicking on the "Saved Articles" link in the navbar.

[Visit Demo Site](https://stormy-earth-39694.herokuapp.com/)

[View Demo Video](https://drive.google.com/file/d/1fHV7bAC99zAZbsuJTuQsgY8aDrQgtJ3d/view)

## Authors
* **Christopher Ducey** - *Initial work* - [chrisducey01](https://github.com/chrisducey01)

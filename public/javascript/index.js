$(document).ready(function(){
    $("#get-news-btn").click(event=>{
        //Scrape news by calling out to api and then displaying results
        $.get("/api/scrape").then(data=>{
            console.log(data);
        });
    });
});
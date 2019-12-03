$(document).ready(function(){
    $("#get-news-btn").click(event=>{
        //Scrape news by calling out to api and then displaying results
        $.get("/api/scrape").then(data=>{
            location.reload();
        });
    });

    // When user clicks on the notes commment icon for an article
    // then send the user to that article's details on a new page
    $(document).on("click",".notes",function(){
        let articleId = $(this).data("article-id");
        location.href = `/article/${articleId}`;
    });
});
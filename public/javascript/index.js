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

    $(document).on("click",".save",function(){
        const articleId = $(this).data("article-id");
        const state = $(this).data("state");
        const saved = state === "saved" ? false : true;
        $.ajax({
            type: "PUT",
            url: `api/article/${articleId}/saved`,
            data: {saved: saved}
        }).then(data=>{
            if(state === "saved"){
                //flip state to unsaved
                $(this).data("state","unsaved");
                $(this).removeClass("fas");
                $(this).addClass("far");
            }
            else if(state === "unsaved"){
                //flip state to saved
                $(this).data("state","saved");
                $(this).removeClass("far");
                $(this).addClass("fas");
            }
        })
    });

    $(document).on("click","#saved-switch",function(){
        if($(this)[0].checked)
            location.href = "/saved";
        else
            location.href = "/";
    });
});
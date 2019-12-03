$(document).ready(function(){
    $("form").on("submit", function (event) {
        event.preventDefault();

        let articleId = $(this).data("article-id");
        let noteData = {
            title : $("#newNoteTitle").val().trim(),
            body: $("#newNoteBody").val()
        };

        //Scrape news by calling out to api and then displaying results
        $.post(`/api/article/${articleId}`, noteData).then(res=>{
            $("#newNoteTitle").val("");
            $("#newNoteBody").val("");
            location.reload();
        });
    });

});
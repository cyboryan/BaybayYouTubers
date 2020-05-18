/**
 * Baybay YouTubers - Thumbnail Grabber
 * thumbnail.js
 * @author Graeme Xyber Pastoril / cyboryan
 * @link cyboryan.github.io
 */


/**
 * Load Messages whether it has successfully grabbed
 * or not yet.
 * 
 * @param {boolean} success Decides if show success msg or not
 * @param {Element} message
 * @param {Element} submit
 */
function loadMessage(success, message = $("#message"), submit = $("#submit"))
{
    if(success) {
        message.text("Successfully grabbed thumbnails. To select photo, right click to it for PCs or tap and hold for mobile.").addClass("flash");
        submit.removeClass("btn-primary").addClass("btn-secondary").attr("disabled", "");
        return 0;
    }
    message.text("To begin, copy and paste any youtube url in the input field below.").removeClass("flash");
    submit.removeClass("btn-secondary").addClass("btn-primary").removeAttr("disabled");
}

/**
 * Load Thumbnails from YouTube Thumbnail Server.
 * 
 * @param {String} id YouTube Watch ID 
 * @param {Element} thumbnails
 * @param {Element} main 
 */
function loadImages(id, thumbnails = $("#thumbnails"), main = $("#main")) 
{
    main.removeClass("mb-5").addClass("mb-5");

    thumbnails.text("")
    .append($('<div>')
        .append($('<p>')
            .attr("class", "text-center")
            .text("Maximum Quality")
        )
        .append($('<img>')
            .attr('style', 'width:100%')
            .attr("src", "https://i1.ytimg.com/vi/" + id + "/maxresdefault.jpg")
        )
    )
    .append($('<div>')
        .append($('<p>')
            .attr("class", "text-center")
            .text("High Quality")
        )
        .append($('<img>')
            .attr('style', 'width:100%')
            .attr("src", "https://i1.ytimg.com/vi/" + id + "/hqdefault.jpg")
        )
    )
    .append($('<div>')
        .append($('<p>')
            .attr("class", "text-center")
            .text("Medium Quality")
        )
        .append($('<img>')
            .attr('style', 'width:100%')
            .attr("src", "https://i1.ytimg.com/vi/" + id + "/mqdefault.jpg")
        )
    )
    .append($('<div>')
        .append($('<p>')
            .attr("class", "text-center")
            .text("Standard Quality")
        )
        .append($('<img>')
            .attr('style', 'width:100%')
            .attr("src", "https://i1.ytimg.com/vi/" + id + "/sddefault.jpg")
        )
    );
}

/**
 * Parses YouTube Watch ID from URL, either be in mobile, shortlink, etc.
 * 
 * @param {String} url YouTube Link with YouTube Watch ID 
 */
function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
} 

/**
 * Checks whether you are still connected to the internet or not.
 * 
 * @param {boolean} status Connection status
 * @param {Element} message 
 * @param {Element} submit 
 */
function isOnline(status, message = $("#message"), submit = $("#submit")) {
    if(status)
    {
        $.ajax({
            type: "GET",
            url: "thumbnail.html",
            success: function(msg){
                message.removeClass("bg-danger");
                message.text("Yey! You're back online! :>").addClass("bg-success");
                submit.removeClass("btn-secondary btn-warning").addClass("btn-primary").removeAttr("disabled");
                setTimeout(function() {
                    loadMessage(false);
                    message.removeClass("bg-success text-light");
                }, 5000 );
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus == 'timeout') {
                    message.text("Check your internet connection.").addClass("bg-warning text-light").removeClass("bg-success bg-danger");
                }
            }
        });
        
        return 0;
    }
    message.text("Aw, you went offline. You can't grab thumbnails with this :<").addClass("bg-danger text-light").remove("bg-warning bg-success");
    submit.removeClass("btn-primary").addClass("btn-secondary").attr("disabled", "");
}

// Check if user still online or not
window.addEventListener('online', () => isOnline(true));
window.addEventListener('offline', () => isOnline(false));

// Execute the ff on submitting url
$("#enterUrl").submit(function(event) {
    event.preventDefault();
    loadImages(youtube_parser($("#url").val()))
    loadMessage(true);
    setTimeout(function() { loadMessage(false) }, 10000);
});
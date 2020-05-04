/**
 * Loads dataTable plugin after button click and shows the list while hiding the welcome screen
 */
function dataTable()
{
    $('#tableList').DataTable({
        pageLength : 5,
        lengthMenu: [[5], [5]]
    });

    $('#logo').attr("style", "display:block; height:48px; width:auto;");

    $("#list").show();
    $("#welcome").hide();
    $("#tableList_length").hide();
}

$(document).ready(function()
{
    /**
     * If screen width more than 992px on start, add class to avoid layout issues
     * Still finding a fix on this though :<
     */
    var win = $(window);
    if (win.width() > 992) $('body').addClass('sb-sidenav-toggled');

    /**
     * This removes sb-sidenav-toggled class on small screens, thus accessible without
     * layout issues.
     */
    $(window).on('resize', function() {
        var win = $(this);
        if (win.width() > 992) $('body').addClass('sb-sidenav-toggled');
        else $('body').removeClass('sb-sidenav-toggled');
    });

    // Initialize youtuber data variables
    var name, totalViews, totalVideos, totalSubscribers;

    // list down channels here to be information grabbed
    var channelId = new Array(
        "UC37BgAsDXAuoKhQEzGbDemw", // cyboryan
        "UCkeY7_-SaiLOzgCPIISpseQ", // liza ann mae guinocor
        "UC4lOgaL2xSTrWxpFrX6uSZA", // mikone calungsod
        "UCtDrV-JMhipwfqnOqudwB8Q", // Jezrel David Lumakin
        "UCPfbILihlOQI7r-YEf1rWnw", // Georbel Felisario
        "UC_pCT17MGZagqWWdg0qkUtw", // renz argie oronos
        "UC9TjwyJ07j4qDJfQ5VjN9lg", // vince clifford
        "UCoIj09XmE9jxfaiG91V1vmQ", // jacob lopez wenceslao
        "UC-Ik4qSR6MOvZbBBqgm83fw", // czejan rae
        "UClF7kC4UkmH7G62uT3qbz9A", // rodjy vlogs
        "UC_gnvZEZMgXxvlzwfdxk1Cg", // precious gorre
        "UCS_aEOKESHVf_AB7CM03Biw", // clark quinn cabardo
        "UC6s5oVqvHvFMNikuasQeKGA", // yonexei
        "UCwOzGcNajublZXQO1JxccSg", // m1z
        "UClAmKlOklMnzzpreV1p-w6Q", // arron coraza
        "UCQV8eYDKiQi3sqOHBIUZN_Q", // lovelytisado
        "UCacjUTvggkVRtP7HtyJKKHQ", // mickthestick
        "UCpPzT23jO2OfMtv_s2r7-9g", // kimmy arcena
        "UCqV8AH_HC3oYzQh9NWw1l0A", // lorainne centino
        "UCqO3xF_0to0U66igiPcv--w", // danisse tabudlong
        "UCyIYwb3IoPli42HwmU3bvUQ", // nathaniel ricci vlogs
        "UCJi63Su4-C0P9w02aJk3wYQ", // juda minaling
        "UC9xAYD6yy7GGZwqzWHjoAzA", // antonette cords
        "UCDN8IQDcszWSxeiCqBnaF1Q", // hannah maxine
        "UCNo9pOnhzr32xF8xMC0ypHg", // maryjul abapo
        "UCVnbyXfgHiHMTXP9LRBcp5g", // anne telin
        "UC_-hGvRSdSHz-qqKNPy-n2g", // mark baybay vlogger
        "UCv_P5Zruu8_Qm6cTYZvZggw", // bobby d music
        "UC4VSPIA94al9vCVUTr6vSSw", // jaylou
        "UCR6q6y56SiNoB-0xzOJlrbg", // angel lie
        "UCl8xo6AKqbhPrfMFDGTtHaw", // shawn valenzona
        "UCOAVIUbLYCq84pdMHZZkLuw", // princess aicelle
        "UC_yDEeZQ119wW-ig92uo7rA", // jenelyn digman
        "UCnZPE5lIXRun3ca6PED-8eg", // mark film tv
        "UCz4TtrIdeVnNis9hQTsjY9w", // Ann Marie Augustine
        "UCF2OEYeORTtCFTfmeY6GyTA", // Goods YT - gefford neil roa godoy
        "UCzJdoWhBz_pDQW5n-qEtLQQ" // Ron Ny
    );

    /**
     * This function fetches data from the API
     */
    function fetchData(data)
    {
        imageLink = data.items[0].snippet.thumbnails.medium.url;
        name = data.items[0].snippet.title;
        totalSubscribers = data.items[0].statistics.subscriberCount;
        totalViews = data.items[0].statistics.viewCount;
        totalVideos = data.items[0].statistics.videoCount;
    }
    
    /**
     * This function adds row if data fetched successfully
     */
    function bindData(id, imageLink, name, totalSubscribers, totalViews, totalVideos)
    {
        // Maximum YouTuber Name Length
        var maxLength = 25;

        if(name.length > maxLength) name = name.substr(0, maxLength) + "...";

        $("#tableList").find('tbody')
        .append($('<tr>')
            .append($('<td>')
                .append($('<img>')
                    .attr('class', 'profile-photo ml-auto mr-auto')
                    .attr("src", imageLink)
                )
            )
            .append($('<td>')
                .append($('<p>')
                    .attr('class', 'text-strong')
                    .text(name)
                )
            )
            .append($('<td>')
                .append($('<p>')
                    .attr('class', 'text-right')
                    .text(totalVideos)
                )
            )
            .append($('<td>')
                .append($('<p>')
                    .attr('class', 'text-right')
                    .text(totalViews)
                )
            )
            .append($('<td>')
                .append($('<p>')
                    .attr('class', 'text-right')
                    .text(totalSubscribers)
                )
            )
            .append($('<td>')
                .append($('<a>')
                    .attr('class', 'btn btn-primary btn-md m-0')
                    .attr('target', '_blank')
                    .attr('href', "https://www.youtube.com/channel/" + id + "?sub_confirmation=1")
                    .text("View")
                )
            )
        );
    }
    
    /**
     * This code replaces the welcome screen if at least one data can't be loaded due to quota limit
     * which is 10k
     */
    function quotaReached()
    {
        $("#welcome").text("");
        $("#welcome")
        .append($('<p>')
            .attr('class', 'text-danger text-center mb-0')
            .attr('style', 'font-weight:700')
            .text("We regret to inform you that the list is currently unavailable due to quota limit.")
        )
        .append($('<p>')
            .attr('class', 'text-danger text-center')
            .text("The list will be back on 3:00 pm Philippine Time (GMT+8) after quota reset.")
        )
        window.stop();
    }

    /**
     * Based on the list of channels on an array, requests one-by-one the channel data and
     * show them to the table.
     */
    channelId.forEach(function(id)
    {
        key1 = "AIzaSyCwTZKgqu6ZaTMgd89r5wl5MQg_AVAsajs" // down
        key2 = "AIzaSyBXPp-tif9_fP7lgvLxB7uZqftFzD7xlUw";
        url = "https://www.googleapis.com/youtube/v3/channels?key=" + key2 + "&id=" + id + "&part=snippet,contentDetails,statistics";

        $.get( url, {} )
        .done(function( data ) {
            fetchData(data);
            bindData(id, imageLink, name, totalSubscribers, totalViews, totalVideos);
        })
        .fail(function() {
            quotaReached();
        });
    });
});

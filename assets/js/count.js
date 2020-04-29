function dataTable()
{
    $('#tableList').DataTable({
        pageLength : 5,
        lengthMenu: [[5, 10], [5, 10]],
        "columns": [
            { "width": "50%" },
            { "width": "12%" },
            { "width": "12%" },
            { "width": "12%" },
            { "width": "14%" }
        ]
    });

    $("#list").show();
    $("#welcome").hide();
}

$(document).ready(function()
{
    var title;
    var totalViews;
    var totalVideos;
    var totalSubscribers;

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
        "UCz4TtrIdeVnNis9hQTsjY9w" // Ann Marie Augustine
    );

    function fetchData(data)
    {
        title = data.items[0].snippet.title;
        totalSubscribers = data.items[0].statistics.subscriberCount;
        totalViews = data.items[0].statistics.viewCount;
        totalVideos = data.items[0].statistics.videoCount;
    }
    
    function bindData(id, title, totalSubscribers, totalViews, totalVideos)
    {
        $("#tableList").find('tbody')
        .append($('<tr>')
            .append($('<td>')
                .append($('<p>')
                    .attr('class', '')
                    .text(title)
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
                    .attr('class', 'btn btn-primary btn-sm m-0')
                    .attr('target', '_blank')
                    .attr('href', "https://www.youtube.com/channel/" + id + "?sub_confirmation=1")
                    .text("View")
                )
            )
        );
    }
    
    function quotaReached()
    {
        console.log("Quota reached");
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

    channelId.forEach(function(id)
    {
        url = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCwTZKgqu6ZaTMgd89r5wl5MQg_AVAsajs&id=" + id + "&part=snippet,contentDetails,statistics";

        $.get(url, function(data){
            fetchData(data);
            bindData(id, title, totalSubscribers, totalViews, totalVideos);
        }).catch(error => console.log('403', quotaReached()));
        
    });
    window.stop();
});

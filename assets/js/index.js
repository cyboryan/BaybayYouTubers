/**
 * Baybay YouTubers - List
 * index.js
 * @author Graeme Xyber Pastoril / cyboryan
 * @link cyboryan.github.io
 */

/**
 * Initialization of global variables
 */
var hiddenChannels = 0;

/**
 * If screen width more than 992px on start, add class to avoid layout issues
 * Still finding a fix on this though :<
 */
if ($(window).width() > 992) $('body').addClass('sb-sidenav-toggled');

/**
 * This removes sb-sidenav-toggled class on small screens, thus accessible without
 * layout issues.
 */
$(window).on('resize', function() {
    if ($(window).width() > 992) $('body').addClass('sb-sidenav-toggled');
    else $('body').removeClass('sb-sidenav-toggled');
});

/**
 * Loads dataTable plugin after button click and shows the list while hiding the welcome screen
 */
function dataTable()
{
    if(quotaError < 1)
    {
        $('#tableList').DataTable({
            pageLength : 5,
            lengthMenu: [[5], [5]]
        });
    
        $('#logo').attr("style", "display:block; height:48px; width:auto;");
    
        $("#list").show();
        $("#welcome").hide();
        $("#tableList_length").hide();
        successAudio.play();
    }
}

/**
 * This code replaces the welcome screen if at least one data can't be loaded due to quota limit
 * which is 10k
 */
function quotaReached()
{
    if(quotaError == 1)
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
        failedAudio.play();
    }
}

/**
 * This function fetches data from the API
 * and pass to the initiated variables
 * 
 * @param {JSON} data
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
 * 
 * @param {String} id Channel ID of YouTuber
 * @param {String} imageLink Link of Display Profile
 * @param {String} name Display Name of YouTuber
 * @param {Number} totalSubscribers
 * @param {Number} totalViews
 * @param {Number} totalVideos 
 */
function bindData(id, imageLink, name, totalSubscribers, totalViews, totalVideos)
{
    /**
     * If String Length of YouTuber's Display Name more than
     * 25 characters, it must be cutted off and replace
     * with continution ' ... '
     */
    if(name.length > 25) name = name.substr(0, 25) + "...";

    /**
     * Don't show channels that don't have videos
     */
    if(totalVideos == 0) {
        hiddenChannels++;
        return 0; // terminate function
    }

    // Create and supply row for every data
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

function showNumberOfHiddenChannels()
{
    if(hiddenChannels > 0)
    {
        $("#tableList").after($("<p>")
            .attr('class', 'mt-2 text-center')
            .attr('style', 'font-size:12px')
            .text(hiddenChannels + " of the member channels are temporary hidden due to blank content on their profile. They'll once appear when they release content.")
        )
    }
}

//...

/**
 * Execute the ff if the document is ready
 */
$(document).ready(function()
{
    /**
     * This count ensures that the dataTable() won't be loaded if it counted at least 1
     */
    quotaError = 0;

    /**
     * Based on the list of channels on an array, requests one-by-one the channel data and
     * show them to the table.
     */
    channelId.forEach(function(id)
    {
        key1 = "AIzaSyCwTZKgqu6ZaTMgd89r5wl5MQg_AVAsajs"; // down
        key2 = "AIzaSyBXPp-tif9_fP7lgvLxB7uZqftFzD7xlUw";
        url = "https://www.googleapis.com/youtube/v3/channels?key=" + key1 + "&id=" + id + "&part=snippet,contentDetails,statistics";

        $.get( url, {} )
        .done(function( data ) {
            fetchData(data);
            bindData(id, imageLink, name, totalSubscribers, totalViews, totalVideos);
        })
        .fail(function() {
            quotaReached();
            quotaError++;
        });
    });

    /**
     * Delay enabling of button for 7 seconds to successfully load all youtubers on the background
     */
    time = 7;
    setInterval(function(){
        if(time == 0)
        {
            dataTable();
            showNumberOfHiddenChannels();
        }
        time--;
        $('#time').text(time);
    }, 1000)
});
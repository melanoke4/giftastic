$(document).ready(function(){

    $('button').on('click', function() {
        var anime = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&ai_key=5qvsKLRIdgqsxVkNDs15MqJ1vl15pSI0";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {
                console.log(response)
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var animeDiv = $('<div/>');
                    var p =$('<p/>');

                    p.text(results[i].rating);

                    var animeImage = $('<img/>');

                    animeImage.addClass('anImg')
                    animeImage.attr('src', results[i].images.fixed_height.url);
                    animeImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animeImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    animeDiv.append(p);
                    animeDiv.append(animeImage);
                    animeDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                    } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });

    var topics = [''];

    
        //This function "adds" the buttons 

        // handles the event when clicked
        $('#theButton').on('click', function(){
            var animeButton = $("#gif-input").val();
            //adds the new anime

            var newButton = $("<button/>").addClass( "btn btn-info anime").attr('data-name',animeButton).html(animeButton).css({'margin': '5px'});
            
            $("#animesbuttons").append(newButton);
                console.log("Work");

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animeButton + "&api_key=dc6zaTOxFJmzC&limit=10";
                console.log(animeButton);

            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var animeDiv = $('<div/>');
                    var p =$('<p/>');

                    p.text(results[i].rating);

                    var animeImage = $('<img/>');

                    animeImage.addClass('anImg')
                    animeImage.attr('src', results[i].images.fixed_height_still.url);
                    animeImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animeImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    animeDiv.append(p);
                    animeDiv.append(animeImage);
                    animeDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                    } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
            return false;
        })
    });
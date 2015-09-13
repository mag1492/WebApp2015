/**
 * Created by Gabriel on 2015-09-13.
 */
function loadEpisodeFromSeason(seasonNumber){
    var seasonOne = $('.seasonOne');
    var seasonTwo = $('.seasonTwo');
    var trailer = $('#trailer');
    switch(seasonNumber) {

        case 1:
            seasonOne.css('opacity', 100);
            seasonTwo.css('opacity', 0);
            trailer.attr('src', 'https://www.youtube.com/embed/69V__a49xtw');
            break;
        case 2:
            seasonOne.css('opacity', 0);
            seasonTwo.css('opacity', 100);
            trailer.attr('src', "https://www.youtube.com/embed/63UNmod8zf0");
            break;
    }


}

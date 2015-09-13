/**
 * Created by Gabriel on 2015-09-13.
 */
function loadEpisodeFromSeason(seasonNumber){
    var seasonOne = $('.season-one');
    var seasonTwo = $('.season-two');
    var episodeList = $('#episode-list');
    var trailer = $('#trailer');
    var ituneLinkeSeasonOne = $('#ituneLinkSeasonOne');
    var ituneLinkSeasonTwo = $('#ituneLinkSeasonTwo');
    switch(seasonNumber) {

        case 1:
            episodeList.text('Season 1 : ' +
                '1. Minimum Viable Product, ' +
                            '2. The Cap Table, ' +
                            '3. Articles of Incorporation, ' +
                            '4. Fiduciary Duties, ' +
                            '5. Signaling Risk, ' +
                            '6. Third Party Insourcing, ' +
                            '7. Proof of Concept, ' +
                            '8. Optimal Tip-to-Tip Efficiency');
            trailer.attr('src', 'https://www.youtube.com/embed/69V__a49xtw');
            ituneLinkeSeasonOne.show();
            ituneLinkSeasonTwo.hide();
            break;
        case 2:
            episodeList.text('Season 2 : ' +
                '1. Sand Hill Shuffle, ' +
                '2. Runaway Devaluation, ' +
                '3. Bad Money, ' +
                '4. The Lady, ' +
                '5. Server Space, ' +
                '6. Homicide, ' +
                '7. Adult Content, ' +
                '8. White Hat/Black Hat, ' +
            '9. Binding Arbitration, ' +
            '10. Two Days of the Condor');
            trailer.attr('src', "https://www.youtube.com/embed/63UNmod8zf0");
            ituneLinkSeasonTwo.show();
            ituneLinkeSeasonOne.hide();
            break;
    }
}

var audio;

// Hide pause btn
$('#pause').hide();

// Initialize Audio
initAudio($('#playlist li:first-child'));

// Initializer fcn
function initAudio(element) {
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

    // Create Audio object
    audio = new Audio('media/' + song);

    // If the song hasn't stated yet
    if (!audio.currentTime) {
        $('#duration').html('0:00');
    }

    // Fill in the title
    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);

    // Insert cover image
    $('img.cover').attr('src', 'img/covers/' + cover);

    $('#playlist li').removeClass('active');
    element.addClass('active');
}

// Play Button
$('#play').click(() => {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});

// Pause Button
$('#pause').click(() => {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

// Stop Button
$('#stop').click(() => {
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#duration').fadeOut(400);
});

// Prev Button
$('#prev').click(() => {
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

// Next Button
$('#next').click(() => {
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

// Volume Control
$('#volume').change(function() {
    audio.volume = parseFloat(this.value / 10);
});

// Time Duration
function showDuration() {
    $(audio).bind('timeupdate', function() {
        // Get Second and Minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt(audio.currentTime / 60) % 60;
        // Add 0 if less than 10
        if (s < 10) {
            s = '0' + s;
        }
        if (m < 10) {
            m = '0' + m;
        }

        $('#duration').html(m + ':' + s);
        var value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        $('#progress').css('width', value + '%');
    });
}

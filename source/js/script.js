window.onload= function (){
  const webpi = $('.webp');
  Modernizr.on('webp', function(result) {
    if (!result) {
      webpi.addClass('no-webp');
    }
  });
}

let reviewLink = $('.reviews__link');
let review = $('.reviews__hidden')
reviewLink.focus(function() {
  review.css('opacity', 1);
});

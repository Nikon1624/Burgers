window.onload= function (){
  const webpi = $('.webp');
  Modernizr.on('webp', function(result) {
    if (!result) {
      webpi.addClass('no-webp');
    }
  });
}

let reviewLink = document.querySelectorAll('.reviews__link');

for (var i = 0; i < reviewLink.length; i++) {
  reviewLink[i].addEventListener('focus', function() {
    this.parentNode.style.opacity = '1';
  });

  reviewLink[i].addEventListener('blur', function() {
    this.parentNode.style.opacity = '0';
  });
}

var toggle = $('.main-nav__toggle');
var mainMenu = $('.main-nav__list');

toggle.click(function(event) {
  toggle.toggleClass('main-nav__toggle--active');
  mainMenu.toggleClass('main-nav__list--active');
});

var teamItems = document.querySelectorAll('.team__item');

var teamItemClick = function(teamItem) {
  teamItem.addEventListener('click', function(evt) {
    evt.preventDefault();
    teamItem.classList.toggle('team__item--active');
  });
};

for (var i = 0; i < teamItems.length; i++) {
  teamItemClick(teamItems[i]);
}

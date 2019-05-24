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

var burgerList = document.querySelector('.burgers__list');
var burgersButtonRight = document.querySelector('.burgers__control--right');
var burgersButtonLeft = document.querySelector('.burgers__control--left');
var burgerListLength = burgerList.children.length;
var translate = 0;
var maxTranslate = -100 * (burgerListLength - 1);

burgersButtonRight.addEventListener('click', function() {
  if (translate != maxTranslate) {
    translate -= 100;
    burgerList.style.transform = 'translateX(' + translate + '%)';
  }
});

burgersButtonLeft.addEventListener('click', function() {
  if (translate != 0) {
    translate += 100;
    burgerList.style.transform = 'translateX(' + translate + '%)';
  }
});

var burgersCloseButton = burgerList.querySelector('.burgers__consist-button');
var consistList = burgerList.querySelector('.burgers__consist-list');

burgersCloseButton.addEventListener('click', function() {
  consistList.style.opacity = '0';
  consistList.style.transform = 'scaleY(0)';
});


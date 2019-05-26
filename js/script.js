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
    this.parentNode.classList.add('show-review');
  });

  reviewLink[i].addEventListener('blur', function() {
    this.parentNode.classList.remove('show-review');
  });
}

var toggle = $('.main-nav__toggle');
var mainMenu = $('.main-nav__list');
var body = $('body');

toggle.click(function(evt) {
  evt.preventDefault();
  toggle.toggleClass('main-nav__toggle--active');
  mainMenu.toggleClass('main-nav__list--active');
  body.toggleClass('hidden');
});

var teamItems = document.querySelectorAll('.team__item');

var accordeonTeam = function(item, collection) {
  item.children[0].addEventListener('click', function(evt) {
    evt.preventDefault();
    item.classList.toggle('team__item--active');
    for (var i = 0; i < collection.length; i++) {
      if (collection[i] != item) {
        collection[i].classList.remove('team__item--active');
      }
    }
  });
};

for (var i = 0; i < teamItems.length; i++) {
  accordeonTeam(teamItems[i], teamItems);
}

var sliderList = document.querySelector('.slider__list');
var sliderButtonRight = document.querySelector('.slider__control--right');
var sliderButtonLeft = document.querySelector('.slider__control--left');
var sliderListLength = sliderList.children.length;
var translate = 0;
var maxTranslate = -100 * (sliderListLength - 1);

sliderButtonRight.addEventListener('click', function() {
  if (translate != maxTranslate) {
    translate -= 100;
    sliderList.style.transform = 'translateX(' + translate + '%)';
  } else {
    translate = 0;
    sliderList.style.transform = 'translateX(' + translate + '%)';
  }
});

sliderButtonLeft.addEventListener('click', function() {
  if (translate != 0) {
    translate += 100;
    sliderList.style.transform = 'translateX(' + translate + '%)';
  } else {
    translate = maxTranslate;
    sliderList.style.transform = 'translateX(' + translate + '%)';
  }
});

var menuItems = document.querySelectorAll('.menu__item');

var accordeonMenu = function(item, collection) {
  item.children[0].addEventListener('click', function(evt) {
    evt.preventDefault();
    item.classList.toggle('menu__item--active');
    for (var i = 0; i < collection.length; i++) {
      if (collection[i] != item) {
        collection[i].classList.remove('menu__item--active');
      }
    }
  });
};

for (var i = 0; i < menuItems.length; i++) {
  accordeonMenu(menuItems[i], menuItems);
}


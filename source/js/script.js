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
  } else {
    translate = 0;
    burgerList.style.transform = 'translateX(' + translate + '%)';
  }
});

burgersButtonLeft.addEventListener('click', function() {
  if (translate != 0) {
    translate += 100;
    burgerList.style.transform = 'translateX(' + translate + '%)';
  } else {
    translate = maxTranslate;
    burgerList.style.transform = 'translateX(' + translate + '%)';
  }
});

var burgersCloseButton = burgerList.querySelector('.burgers__consist-button');
var consistList = burgerList.querySelector('.burgers__consist-list');

burgersCloseButton.addEventListener('click', function() {
  consistList.style.opacity = '0';
  consistList.style.transform = 'scaleY(0)';
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


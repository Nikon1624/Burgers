window.onload= function (){
  const webpi = $('.webp');
  Modernizr.on('webp', function(result) {
    if (!result) {
      webpi.addClass('no-webp');
    }
  });
}

// Секция Отзывов
var reviewLink = document.querySelectorAll('.reviews__link');

for (var i = 0; i < reviewLink.length; i++) {
  reviewLink[i].addEventListener('focus', function() {
    this.parentNode.classList.add('show-review');
  });

  reviewLink[i].addEventListener('blur', function() {
    this.parentNode.classList.remove('show-review');
  });
}

// Главное Меню
var toggle = $('.main-nav__toggle');
var mainMenu = $('.main-nav__list');
var body = $('body');
var mainMenuCount = 0;

toggle.click(function(evt) {
  evt.preventDefault();
  mainMenuCount++;
  if (mainMenuCount % 2 != 0) {
    if (mainMenu.hasClass('main-nav__list--hide')) {
      mainMenu.removeClass('main-nav__list--hide');
    }
    mainMenu.addClass('main-nav__list--active');
  } else {
    mainMenu.addClass('main-nav__list--hide');
  }
  toggle.toggleClass('main-nav__toggle--active');
  body.toggleClass('hidden');
});

// Секция Команда
var teamList = document.querySelector('.team__list');
var teamItems = teamList.querySelectorAll('.team__item');

teamList.addEventListener('click', function(evt) {
  var target = evt.target;
  if (target.classList.contains('team__item-title')) {
    evt.preventDefault();
    for (var i = 0; i < teamItems.length; i++) {
      if (teamItems[i] != target.parentNode) {
        teamItems[i].classList.remove('team__item--active');
      }
    }
    target.parentNode.classList.toggle('team__item--active');
  }
});

// Секция Слайдера
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

if (window.innerWidth < 960) {
  var sliderList = document.querySelector('.slider__list');
  sliderList.addEventListener('click', function(evt) {
    var target = evt.target;
    console.log(target.getAttribute('class'));
    if (target.getAttribute('class') == 'consist__preview') {
      target.nextElementSibling.classList.add('consist__list--show');
    }
    if (target.classList.contains('consist__close')) {
      target.parentNode.classList.remove('consist__list--show');
    }
  });
}

var menuItems = document.querySelectorAll('.menu__item');

var accordeonMenu = function(item, collection) {
  item.children[0].addEventListener('click', function(evt) {
    evt.preventDefault();
    item.classList.toggle('menu__item--active');
    for (var i = 0; i < collection.length; i++) {
      if (collection[i] != item) {
        collection[i].classList.remove('menu__item--active');
        collection[i].classList.toggle('menu__item--hidden');
      }
    }
  });
};

for (var i = 0; i < menuItems.length; i++) {
  accordeonMenu(menuItems[i], menuItems);
}

var closeMenuItem = document.querySelectorAll('.menu__button-close');

var closeMenu = function(item) {
  item.addEventListener('click', function(evt) {
    evt.preventDefault();
    item.parentNode.parentNode.classList.remove('menu__item--active');
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('menu__item--hidden');
    }
  });
};

for (var i = 0; i < closeMenuItem.length; i++) {
    closeMenu(closeMenuItem[i]);
}




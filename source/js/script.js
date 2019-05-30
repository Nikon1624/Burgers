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

function addActiveClass(item, itemsCollection, activeClass) {
  for (var i = 0; i < itemsCollection.length; i++) {
    if (itemsCollection[i] != item.parentNode) {
      itemsCollection[i].classList.remove(activeClass);
    }
  }
  item.parentNode.classList.toggle(activeClass);
}


teamList.addEventListener('click', function(evt) {
  var target = evt.target;
  if (target.classList.contains('team__item-title')) {
    evt.preventDefault();
    addActiveClass(target, teamItems, 'team__item--active');
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
    while (target != this) {
      if (target.classList.contains('consist__preview')) {
        target.nextElementSibling.classList.add('consist__list--show');
      }
      if (target.classList.contains('consist__close')) {
        target.parentNode.classList.remove('consist__list--show');
      }
      target = target.parentNode;
    }
  });
}

// Секция Меню
var menuList = document.querySelector('.menu__list');
var menuItems = document.querySelectorAll('.menu__item');

menuList.addEventListener('click', function(evt) {
  var target = evt.target;
  while (target != this) {
    if (target.classList.contains('menu__button')) {
      evt.preventDefault();
      addActiveClass(target, menuItems, 'menu__item--active');
      if (window.innerWidth < 768) {
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i] != target.parentNode) {
            menuItems[i].classList.toggle('menu__item--hidden');
          }
        }
      }
    }
    if (target.classList.contains('menu__button-close')) {
      target.parentNode.parentNode.classList.remove('menu__item--active');
      if (window.innerWidth < 768) {
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].classList.contains('menu__item--hidden')) {
            menuItems[i].classList.remove('menu__item--hidden');
          }
        }
      }
    }
    target = target.parentNode;
  }
});

// Секция Формы
var form = document.querySelector('.delivery__form');
var submit = document.querySelector('.form__submit');
var formPopup = document.querySelector('.popup-form');

submit.addEventListener('click', function(evt) {
  evt.preventDefault();
  function validateField(field) {
    field.value = field.validationMessage;
    return field.checkValidity();
  }

  function validateForm(form) {
    var valid = true;
    if (!validateField(form.elements.name)) {
      valid = false;
    } else if (!validateField(form.elements.tel)) {
      valid = false;
    } else if (!validateField(form.elements.street)) {
      valid = false;
    } else if (!validateField(form.elements.house)) {
      valid = false;
    } else if (!validateField(form.elements.housing)) {
      valid = false;
    } else if (!validateField(form.elements.housing)) {
      valid = false;
    } else if (!validateField(form.elements.apartment)) {
      valid = false;
    } else if (!validateField(form.elements.comment)) {
      valid = false;
    }
    return valid;
  }

  console.log(validateForm(form));

  if (validateForm(form)) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    var data = {
      name: form.elements.name.value,
      phone: form.elements.tel.value,
      comment: form.elements.comment.value
    };
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function() {
      if (xhr.status >= 400) {
        console.log('Error');
      } else {
        formPopup.classList.add('popup-form--show');
      }
    });
  }
});




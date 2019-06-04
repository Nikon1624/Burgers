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

var reviews = document.querySelector('.reviews');
var reviewsModal = reviews.querySelector('.reviews__modal-wrapper');
var reviewsModalTitle = reviewsModal.querySelector('.reviews__modal-title');
var reviewsModalText = reviewsModal.querySelector('.reviews__modal-text');
var body = document.querySelector('body');

reviews.addEventListener('click', function(evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.classList.contains('reviews__link')) {
    reviewsModal.classList.add('reviews__modal-wrapper--show');
    reviewsModalTitle.textContent = target.parentNode.children[0].textContent;
    reviewsModalText.textContent = target.parentNode.children[1].textContent;
<<<<<<< HEAD
    closePopups(reviewsModal, 'reviews__modal-wrapper--show');
=======
    body.classList.add('hidden');
>>>>>>> e0eb11a7f8a965bd7a5fdfd91bd1cca02035cfc8
  }

  if (target.classList.contains('reviews__close-modal')) {
    target.parentNode.parentNode.classList.remove('reviews__modal-wrapper--show');
    body.classList.remove('hidden');
  }
});

reviews.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    reviewsModal.classList.remove('reviews__modal-wrapper--show');
  }
});

// Главное Меню
var toggle = $('.main-nav__toggle');
var mainMenu = $('.main-nav__list');

toggle.click(function(evt) {
  evt.preventDefault();
  if (mainMenu.hasClass('main-nav__list--active')) {
    mainMenu.removeClass('main-nav__list--active');
    mainMenu.addClass('main-nav__list--hide');
  } else {
    mainMenu.addClass('main-nav__list--active');
    if (mainMenu.hasClass('main-nav__list--hide')) {
      mainMenu.removeClass('main-nav__list--hide');
    }
  }
  toggle.toggleClass('main-nav__toggle--active');
  $('body').toggleClass('hidden');
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
var formPopup = document.querySelector('.popup-form__wrapper');
var formPopupMessage = formPopup.querySelector('.popup-form__text');
var inputCollection = form.querySelectorAll('.form__input');
<<<<<<< HEAD
var sendCount = 0;
=======
var body = document.querySelector('body');
>>>>>>> e0eb11a7f8a965bd7a5fdfd91bd1cca02035cfc8

submit.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (validateForm(form)) {
    var formData = new FormData();

    formData.append('name', form.elements.name.value);
    formData.append('phone', form.elements.tel.value);
    formData.append('comment', form.elements.comment.value);
    formData.append('to', 'form@mail.com');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    sendCount++;
    sendCount % 2 != 0 ? xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail') : xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);
    xhr.addEventListener('load', function () {
<<<<<<< HEAD
      formPopupMessage.textContent = xhr.response.message;
=======
      body.classList.add('hidden');
      if (xhr.status >= 400) {
        formPopupMessage.textContent = 'Не удалось отправить заявку, код ошибки ' + xhr.status;
      }
>>>>>>> e0eb11a7f8a965bd7a5fdfd91bd1cca02035cfc8
      formPopup.classList.add('popup-form--show');
      closePopups(formPopup, 'popup-form--show');
      for (var i = 0; i < inputCollection.length; i++) {
        inputCollection[i].value = '';
      }
    });
  }
});

function validateForm(form) {
  var valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.tel)) {
    valid = false;
  }

  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.classList.add('form__input--error');
    field.placeholder = field.validationMessage;
    return false;
  } else {
    if (field.classList.contains('form__input--error')) {
      field.classList.remove('form__input--error');
    }
    return true;
  }
}

var closePopup = formPopup.querySelector('.popup-form__button');

closePopup.addEventListener('click', function() {
  formPopup.classList.remove('popup-form--show');
  body.classList.remove('hidden');
});


// Закрытие попапа по клику вне
function closePopups(popup, activeClass) {
  popup.addEventListener('click', function(evt) {
    var target = evt.target;
    if (target == popup) {
      popup.classList.remove(activeClass);
    }
  });
}

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
    closePopups(reviewsModal, 'reviews__modal-wrapper--show');
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
var sendCount = 0;

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
      formPopupMessage.textContent = xhr.response.message;
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

// OnePageScroll
if (document.documentElement.clientHeight >= 700) {
  $(document).ready(function() {
    var wrapper = $('.wrapper');
    var topPosition = 0;
    var maxTopPosition = -($('.section').length - 1) * 100;
    var animation = true;
    var toggles = $('.toggle__item');
    var menuLinks = $('[data-scroll-index]');
    var toggleActive = toggles.filter('.toggle__item--active');
    var nextToggle = toggleActive.next();
    var prevToggle;

    $('body').addClass('hidden--onepagescroll');

    $('body').on('wheel', function(evt) {
      if (evt.originalEvent.deltaY > 0) {
        if (topPosition != maxTopPosition && animation) {
          animation = false;
          topPosition -= 100;
          wrapper.animate({
            'top': topPosition + 'vh'
          }, 700, function() {
            toggleActive.removeClass('toggle__item--active');
            nextToggle.addClass('toggle__item--active');
            toggleActive = nextToggle;
            nextToggle = nextToggle.next();
            animation = true;
          });
        }
      } else {
        if (topPosition != 0 && animation) {
          animation = false;
          topPosition += 100;
          wrapper.animate({
            'top': topPosition + 'vh'
          }, 700, function() {
            prevToggle = toggleActive.prev();
            toggleActive.removeClass('toggle__item--active');
            prevToggle.addClass('toggle__item--active');
            nextToggle = toggleActive;
            toggleActive = prevToggle;
            prevToggle = prevToggle.prev();
            animation = true;
          });
        }
      }
    });

    $('body').on('keydown', function (evt) {
      switch (evt.keyCode) {
        case 40:
          if (topPosition != maxTopPosition && animation) {
            animation = false;
            topPosition -= 100;
            wrapper.animate({
              'top': topPosition + 'vh'
            }, 700, function() {
            toggleActive.removeClass('toggle__item--active');
            nextToggle.addClass('toggle__item--active');
            toggleActive = nextToggle;
            nextToggle = nextToggle.next();
            animation = true;
            });
          }
          break;
        case 38:
          if (topPosition != 0 && animation) {
            animation = false;
            topPosition += 100;
            wrapper.animate({
              'top': topPosition + 'vh'
            }, 700, function() {
              var prevToggle = toggleActive.prev();
              toggleActive.removeClass('toggle__item--active');
              prevToggle.addClass('toggle__item--active');
              nextToggle = toggleActive;
              toggleActive = prevToggle;
              prevToggle = prevToggle.prev();
              animation = true;
            });
          }
          break;
      }
    });

    menuLinks.on('click', function (evt) {
      evt.preventDefault();
      var measurementUnit = (document.documentElement.clientWidth < 960) ? '%' : 'vh';
      var menuLinkIndex = parseInt($(this).attr('data-scroll-index'));
      if (animation) {
        animation = false;
        wrapper.animate({
          'top': -menuLinkIndex * 100 + measurementUnit
        }, 700, function() {
          topPosition = -menuLinkIndex * 100;
          toggleActive.removeClass('toggle__item--active');
          toggles.eq(menuLinkIndex).addClass('toggle__item--active');
          toggleActive = toggles.eq(menuLinkIndex);
          prevToggle = toggles.eq(menuLinkIndex).prev();
          nextToggle = toggles.eq(menuLinkIndex).next();
          animation = true;
        });
      }
    });

    toggles.on('click', function(evt) {
      evt.preventDefault();
      var $this = $(this);
      wrapper.animate({
        'top': -($this.index() * 100) + 'vh'
      }, 700, function() {
        topPosition = -($this.index() * 100);
        toggleActive.removeClass('toggle__item--active');
        $this.addClass('toggle__item--active');
        toggleActive = $this;
        prevToggle = $this.prev();
        nextToggle = $this.next();
      });
    });

    var arrowDown = $('.arrow-wrapper');

    arrowDown.on('click', function(evt) {
      evt.preventDefault();
      topPosition = 0;
      topPosition -= 100;
      var measurementUnit = (document.documentElement.clientWidth < 960) ? '%' : 'vh';
      wrapper.animate({
        'top': topPosition + measurementUnit
      }, 700, function() {
        toggleActive.removeClass('toggle__item--active');
        nextToggle.addClass('toggle__item--active');
        toggleActive = nextToggle;
        nextToggle = nextToggle.next();
        animation = true;
      });
    });

    if (document.documentElement.clientWidth < 960) {
      $(function() {
        $('.wrapper').swipe( {
          swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            $('body').addClass('hidden--onepagescroll');
            if (direction == 'up') {
              if (topPosition != maxTopPosition && animation) {
                animation = false;
                topPosition -= 100;
                wrapper.animate({
                  'top': topPosition + '%'
                }, 700, function() {
                  animation = true;
                });
              }
            } else if (direction = 'down') {
              if (topPosition != 0 && animation) {
                animation = false;
                topPosition += 100;
                wrapper.animate({
                  'top': topPosition + '%'
                }, 700, function() {
                  animation = true;
                });
              }
            }
          }
        });

        $('.wrapper').swipe( {fingers:1} );
      });
    }
  });
} else {
  $('.toggle').css('display', 'none');
  var arrowDown = $('.arrow-wrapper');
  var wrapper = $('.wrapper');
}



// Карта
ymaps.ready(init);

var placemarks = [
  {
    latitude: 59.966130762607534,
    longitude: 30.312358723270304,
    hintContent: 'Большой проспект П.С, д.35А'
  },
  {
    latitude: 59.94847814647842,
    longitude: 30.384830818410517,
    hintContent: 'ул. Шпалерная, д.51'
  },
  {
    latitude: 59.89310330004065,
    longitude: 30.319902770572032,
    hintContent: 'Московский проспект, д.110'
  },
  {
    latitude: 59.91713941136519,
    longitude: 30.4955342713557,
    hintContent: 'просп. Солидарности, д.19'
  }
];

function init () {
  var map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    zoom: 11,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  placemarks.forEach(function(obj) {
    var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent
    },
    {
      iconLayout: 'default#image',
      iconImageHref: './img/icons/map-marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]
    });

    map.geoObjects.add(placemark);
  });

  // Для одного маркера
  // var placemark = new ymaps.Placemark([59.966130762607534,30.312358723270304], {
  //   hintContent: 'Большой проспект П.С, д.35А',
  // },
  // {
  //   iconLayout: 'default#image',
  //   iconImageHref: './img/icons/map-marker.svg',
  //   iconImageSize: [46, 57],
  //   iconImageOffset: [-23, -57]
  // });

  // map.geoObjects.add(placemark);
}


var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    width: "660",
    height: "405",
    videoId: "zmg_jOwa9Fc",
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const duration = player.getDuration();
  let interval;
  updateTimerDisplay();

  $(".player").removeClass("hidden");

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    changeButtonPosition(percents);

    updateTimerDisplay();
  }, 1000);
}

function onPlayerStateChange(event) {
  const playerButton = $(".player__start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}

$(".player__start").on("click", e => {
  const playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...

  if (playerStatus !== 1) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
});


$(".player__playback").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  changeButtonPosition(clickedPercents);
  player.seekTo(newPlayerTime);
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

function changeButtonPosition(percents) {
  $(".player__playback-button").css({
    left: `${percents}%`
  });
}

function updateTimerDisplay() {
  $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
  $(".player__duration-estimate").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}


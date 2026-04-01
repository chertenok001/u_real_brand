$(function () {
  const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    slidesPerView: 3,
    loop: false,
    spaceBetween: 20,
    speed: 1200,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    slidesPerGroup: 1,

    breakpoints: {

      320: {
        slidesPerView: 1.1,
      },

      576: {
        slidesPerView: 1.5,
      },

      768: {
        slidesPerView: 2,
      },

      992: {
        slidesPerView: 2.5,
      },

      1200: {
        slidesPerView: 3,

      },
    },
  });

  const swiperReviews = new Swiper('.swiper-reviews', {
    direction: 'horizontal',
    slidesPerView: 3,
    loop: false,
    spaceBetween: 60,
    speed: 1200,



    pagination: {
      el: '.reviews__pagination',
      type: 'bullets',
      clickable: true,

    },

    slidesPerGroup: 1,

    breakpoints: {

      320: {
        slidesPerView: 1,
      },

      576: {
        slidesPerView: 1,
        spaceBetween: 80,
      },

      768: {
        slidesPerView:2,
        spaceBetween: 120,
      },

      992: {
        slidesPerView: 2,
        slidesPerGroup: 3,
        spaceBetween: 100,
      },

      1200: {
        slidesPerView: 2,
        slidesPerGroup: 3,
         spaceBetween: 70,
      },
    },

    mousewheel: {
      sensitivity: 1,
    }
  });

  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 0,
    mobile: true,
    live: true
  })
  wow.init();
});

$('a[href^="#"]').on('click', function (e) {
  const target = $(this).attr('href');

  if (target.length > 1 && $(target).length) {
    e.preventDefault();

    const offset = 80;
    const top = $(target).offset().top - offset;

    $('html, body').animate({
        scrollTop: top
      },
      1200
    );
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header__top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header__top--fixed');
    } else {
      header.classList.remove('header__top--fixed');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.menu__btn');
  const mobileMenu = document.querySelector('.menu-mobile');
  const bodyLock = document.body;

  if (!burger || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove('menu-mobile--active');
    bodyLock.classList.remove('lock');
    burger.classList.remove('menu__btn--active');
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();

    burger.classList.toggle('menu__btn--active');
    mobileMenu.classList.toggle('menu-mobile--active');
    bodyLock.classList.toggle('lock');
  });

  mobileMenu.addEventListener('click', (e) => {
    const link = e.target.closest('.menu-mobile__link');
    if (link) {
      closeMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.menu__btn') &&
      !e.target.closest('.menu-mobile')
    ) {
      closeMenu();
    }
  });
});

document.querySelectorAll(".plan__block summary").forEach(summary => {
  summary.addEventListener("click", (e) => {
    const current = summary.parentElement;

    document.querySelectorAll(".plan__block").forEach(block => {
      if (block !== current) {
        block.removeAttribute("open");
      }
    });
  });
});
$(function () {
  const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    slidesPerView: 3,
    loop: false,
    spaceBetween: 100,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
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
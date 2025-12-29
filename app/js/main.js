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

    $('html, body').animate(
      { scrollTop: top },
      800
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
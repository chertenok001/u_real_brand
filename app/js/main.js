$(function () {
  wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 0,
    mobile: true,
    live: true
  })
  wow.init();
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
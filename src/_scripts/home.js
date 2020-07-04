import 'slick-carousel';
import 'jquery-smooth-scroll';

$(document).ready(() => {
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    slidesToShow: 1,
    arrows: false,
  });

  $('.scroller').click((e) => {
    e.preventDefault();
    const id = $(e.currentTarget).attr('href')?.replace('/', '');

    if (!id) {
      return;
    }

    const offset = $(id).offset();

    if (!offset) {
      return;
    }

    $('html, body').animate(
      {
        scrollTop: offset.top - 60,
      },
      600
    );
  });
});

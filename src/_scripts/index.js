class MarkevCouriers {
  constructor() {
    switch (location.pathname) {
      case '/':
        this._slider();
        this._scroller();
        break;
      case '/contact-us/':
        this._contactForm();
    }
  }

  _slider() {
    $('.slider').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      slidesToShow: 1,
      arrows: false,
    });
  }

  _scroller() {
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
  }

  _contactForm() {
    $('#contact').validate({
      submitHandler: () => {
        $.ajax({
          url: 'https://formspree.io/markevinc@live.com',
          method: 'POST',
          data: $('#contact').serialize(),
          dataType: 'json',
        });

        $('#submit-button')
          .text('SENT')
          .css('background-color', '#3c763d')
          .attr('disabled', 'true');

        return false;
      },
    });
  }
}

$(document).ready(() => {
  new MarkevCouriers();
});

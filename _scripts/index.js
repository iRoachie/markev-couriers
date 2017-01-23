$(document).ready(() => {
  new MarkevCouriers();
})

class MarkevCouriers {
  constructor() {
    $('#date').text(new Date().getFullYear());

    switch(location.pathname) {
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
      autoplay: 4000,
      dots: true,
      slidesToShow: 1,
      arrows: false
    })
  }

  _scroller() {
    $('.scroller').click(e => {
      e.preventDefault();
      const id = $(e.currentTarget).attr('href').replace('/', '');

      $('html, body').animate({
        scrollTop: $(id).offset().top - 60
      }, 600);
    })
  }

  _contactForm() {
    $('#contact').validate({
      submitHandler: function(form) {
        $.ajax({
          url: "https://formspree.io/markevinc@live.com",
          method: "POST",
          data: $('#contact').serialize(),
          dataType: "json"
        });

        $('#submit-button').text('SENT').css('background-color', '#3c763d').attr('disabled', 'true')

        return false;
      }
    });
  }
}

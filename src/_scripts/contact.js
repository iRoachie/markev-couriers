import 'jquery-validation';

$(document).ready(() => {
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
});

$(document).ready(function () {
  function Nav_animation() {
    if ($(document).scrollTop() > 40) {
      $("#header__nav").addClass("navbar--scroll");
      $("#header__nav").removeClass("animation");
    }
    else {
      $("#header__nav").addClass("animation");
      $("#header__nav").removeClass("navbar--scroll");


    }
    if ($(document).scrollTop() > 300) {
      $("#btn_toTop").show();
    } else {
      $("#btn_toTop").hide();
    }
  }

  $(window).scroll(function () {
    Nav_animation();
  });
  Nav_animation();

  $('#btn_goTop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  })

  /************ Slider **************/
  $("#lightSlider").lightSlider({
    item: 4,
    auto: true,
    loop: true,
    slideMove: 1,
    pauseOnHover: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    prevHtml: '<i class="fa fa-angle-left"></i><span class="sr-only">Previous</span>',
    nextHtml: '<i class="fa fa-angle-right"></i><span class="sr-only">Next</span>',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          item: 2,
          slideMove: 1,
          slideMargin: 6,
        }
      },
      {
        breakpoint: 480,
        settings: {
          item: 1,
          slideMove: 1
        }
      }
    ]
  });
  /************ Slider **************/

  $('.scroll').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: eval($($(this).attr('href')).offset().top - 78)
    }, 1000);
  });


  // Mobile swipe if more than 5 pixels moved
  $(".carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) > 5) {
        $(this).carousel('next');
      }
      else if (Math.floor(xClick - xMove) < -5) {
        $(this).carousel('prev');
      }
    });
    $(".carousel").on("touchend", function () {
      $(this).off("touchmove");
    });
  });

  $("#myCarousel").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

      if (direction == 'left') {
        $(this).carousel('next');
      } else if (direction == 'right') {
        $(this).carousel('prev');
      }

    }
  });

});




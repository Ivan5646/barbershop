$(document).ready(function(){
  $(".header__close").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  $(".header__hamburger").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  // make menu li active
  $(".header__menu ul li").on("click", function(){
    // first remove .active. Modify for multiple classes
    var items = $(".header__menu ul li");
    items.each(function(index, li) {
      var item = $(li); 
      //console.log(item.attr("class"));
      if (item.attr("class") == "active") {
        item.removeClass("active");
      }
    });
    // set .active to the clicked li
    if ($(this).is(":last-child")) {
      return
    } else {
      $(this).toggleClass("active");
      // console.log(this.innerText);
    }
  })

  // call the owl carousel. https://stackoverflow.com/questions/28251644/disabling-owl-carousel-at-a-specific-viewport-width
  var owl = $('.advertisement__slider'),
      owlOptions = {
        items: 1,
        dotData: true
      };

  if ( $(window).width() < 768 ) {
    var owlActive = owl.owlCarousel(owlOptions); // calling the carousel
  } else {
    owl.addClass('off');
  }

  $(window).resize(function() {
    if ( $(window).width() < 768 ) {
      if ( $('.advertisement__slider').hasClass('off') ) {
        var owlActive = owl.owlCarousel(owlOptions);
        owl.removeClass('off');
      }
    } else {
      if ( !$('.owl-carousel').hasClass('off') ) {
        owl.addClass('off').trigger('destroy.owl.carousel');
        owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
      }
    }
  });

  $(".reviews__slider").owlCarousel({
    items: 1,
    dotData: true,
    nav:true,
    navText: ["<img src='../img/left-arrow.svg'>","<img src='../img/right-arrow.svg'>"]
  });

});
console.log("hello from test.js");
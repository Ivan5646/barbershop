$(document).ready(function(){
  $(".header__hamburger").on("click", function(){
    $(".header__menu").toggle();
  })

  $(".header__close").on("click", function(){
    $(".header__menu").toggle();
  })

  // calling the owl-carousel plugin  a
  $(".owl-carousel").owlCarousel({
    items: 1,
    dotData: true
  });


});
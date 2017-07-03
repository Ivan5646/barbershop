$(document).ready(function(){
  $(".header__close").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  $(".header__hamburger").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  // calling the owl-carousel plugin  a
  $(".owl-carousel").owlCarousel({
    items: 1,
    dotData: true
  });


});
console.log("hello from test.js");
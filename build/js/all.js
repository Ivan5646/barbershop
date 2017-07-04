$(document).ready(function(){
  $(".header__close").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  $(".header__hamburger").on("click", function(){
    $(".header__menu").toggleClass("header__menu_shown");
  })

  // make menu li active
  $(".header__menu ul li").on("click", function(){
    this.toggleClass("active");
  })

  // calling the owl-carousel plugin
  $(".owl-carousel").owlCarousel({
    items: 1,
    dotData: true
  });


});
console.log("hello from test.js");
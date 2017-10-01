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

  // if ($(window).width() > 768) {
  //   console.log("width is bigger than 768");
  //   $(".advertisement__slider").removeClass($(".owl-carousel"));
  // } 

  //calling the owl-carousel plugin
  // if ($(window).width() < 768) {
  //   $(".owl-carousel").owlCarousel({
  //     items: 1,
  //     dotData: true
  //   });
  // } else {
  //   $(".advertisement__slider").removeClass($("owl-carousel"));
  // }

  if ($(window).width() < 768) {
    console.log("width is less than 768");
    $(".advertisement__slider").addClass("owl-carousel");
    $(".owl-carousel").owlCarousel({
      items: 1,
      dotData: true
    });
  }


});
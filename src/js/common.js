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
    var lastItem = items.length - 1;
    items.each(function(index, li) {
      var item = $(li); 
      //console.log(item.attr("class"));
      if (item.attr("class") == "active") {
        item.removeClass("active");
      }
    });
    // set .active to the clicked li
    if (this.innerText == "Вход") { 
      return
    }
    $(this).toggleClass("active");
    // console.log(this.innerText);
  })

  // calling the owl-carousel plugin
  $(".owl-carousel").owlCarousel({
    items: 1,
    dotData: true
  });


});
$(document).ready(function(){$(".header__close").on("click",function(){$(".header__menu").toggleClass("header__menu_shown")}),$(".header__hamburger").on("click",function(){$(".header__menu").toggleClass("header__menu_shown")}),$(".header__menu ul li").on("click",function(){$(".header__menu ul li").each(function(e,a){var l=$(a);"active"==l.attr("class")&&l.removeClass("active")}),$(this).is(":last-child")||$(this).toggleClass("active")}),$(".owl-carousel").owlCarousel({items:1,dotData:!0})}),console.log("hello from test.js");
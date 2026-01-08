(function ($) {
  "use strict";

  /*
  |=============================================================
  | Template Name: Sweety
  | Author: Laralink
  | Version: 1.0.0
  |=============================================================
  |=============================================================
  | TABLE OF CONTENTS:
  |=============================================================
  |
  | 01. Preloader
  | 02. main nav
  | 03. sticky header
  | 04. dynamic background
  | 05. Modal Video
  | 06. Slick Slider
  | 07. Accordian
  | 08. heart toggle
  | 09. tabs
  | 10. Quantity
  | 11. Light Gallery
  | 12. Smooth Page Scroll
  | 13. Date And Time Picker
  | 14. hover tab
  | 15. Scroll Up
  | 16. AOS Animation
  | 17. Dynamic contact form
  |
  */
  /*====================================================
    Scripts initialization
  ======================================================*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(function () {
    dynamicBackground();
    mainNav();
    stickyHeader();
    modalVideo();
    slickInit();
    accordian();
    heartToggle();
    tabs();
    quantityInit();
    lightGallery();
    smoothScroll();
    dateTimePicker();
    hoverTab();
    scrollUp();
    aosInit();
    contactFormInit();
    $(".tom_select").each(function () {
      new TomSelect(this, {
        create: false,
        persist: true,
        onDropdownOpen: function (dropdown) {
          dropdown.classList.add("active");
        },
        onDropdownClose: function (dropdown) {
          dropdown.classList.remove("active");
        },
      });
    });
    if ($.exists(".cs_getting_year")) {
      const date = new Date();
      $(".cs_getting_year").text(date.getFullYear());
    }
  });

  $(window).on("load", function () {
    $("body").addClass("cs_preloader_active");
    preloader();
  });
  $(window).on("scroll", function () {
    stickyHeader();
    showScrollUp();
    initScrollTopButton();
  });
  $(window).on("resize", function () {
    $(".cs_site_header").removeClass("active");
    $(".cs_menu_toggle")
      .removeClass("cs_toggle_active")
      .siblings(".cs_nav_list_wrap")
      .removeClass("cs_active");
  });
  /*=====================================================
    01. Preloader
  =======================================================*/
  function preloader() {
    $(".cs_preloader_in").fadeOut();
    $(".cs_preloader")
      .delay(250)
      .fadeOut("slow", function () {
        // Remove scroll-block class after fadeOut
        $("body").removeClass("cs_preloader_active");
      });
  }
  /*====================================================
    02. main nav
  ======================================================*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>'
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("cs_toggle_active")
        .siblings(".cs_nav_list_wrap")
        .toggleClass("cs_active");
      $(".cs_site_header").addClass("active");
    });
    $(".cs_menu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
  }
  /*====================================================
    03. sticky header
  ======================================================*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    var isMenuActive = $(".cs_nav_list_wrap").hasClass("cs_active");
    if (scroll >= 10 || isMenuActive) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*====================================================
    04. dynamic background
  ======================================================*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      let src = $(this).attr("data-src");

      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*====================================================
    05. Modal Video
  ======================================================*/
  function modalVideo() {
    if ($.exists(".cs_video_open")) {
      $("body").append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on("click", ".cs_video_open", function (e) {
        e.preventDefault();
        var video = $(this).attr("href");

        $(".cs_video_popup_container iframe").attr("src", `${video}`);

        $(".cs_video_popup").addClass("active");
      });
      $(".cs_video_popup_close, .cs_video_popup-layer").on(
        "click",
        function (e) {
          $(".cs_video_popup").removeClass("active");
          $("html").removeClass("overflow-hidden");
          $(".cs_video_popup_container iframe").attr("src", "about:blank");
          e.preventDefault();
        }
      );
    }
  }
  /*====================================================
    06. Slick Slider
  ======================================================*/
  function slickInit() {
    if ($.exists(".cs_slider")) {
      $(".cs_slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs_slider_container");
        var $slickActive = $(this).find(".cs_slider_wrapper");
        var $status = $(this).find(".cs_slider_number");
        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10)
        );
        // Pagination
        var paginaiton = $(this)
          .find(".cs_pagination")
          .hasClass("cs_pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (fadeVar) slidesPerView = 1;
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10) || 1;
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10) || 4;
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10) || 3;
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10) || 2;
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10) || 1;
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
        /* Start Count Slide Number */
        $slickActive.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(
              `<span class="cs_current_number" data-number="${i}"><span>${i}</span></span> <span class="cs_slider_number_seperator"></span> <span class="cs_total_numbers"  data-number="${slick.slideCount}"><span>${slick.slideCount}</span></span>`
            );
          }
        );
        /* End Count Slide Number */
        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs_left_arrow"),
          nextArrow: $(this).find(".cs_right_arrow"),
          appendDots: $(this).find(".cs_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }
  /*====================================================
    07. Accordian
  ======================================================*/
  function accordian() {
    $(".cs_accordian").children(".cs_accordian_body").hide();
    $(".cs_accordian.active").children(".cs_accordian_body").show();
    $(".cs_accordian_head").on("click", function () {
      $(this)
        .parent(".cs_accordian")
        .siblings()
        .children(".cs_accordian_body")
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find(".cs_accordian_body")
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents(".cs_accordian").addClass("active");
      $(this).parent(".cs_accordian").siblings().removeClass("active");
    });
  }
  /*====================================================
    08. heart toggle
  ======================================================*/
  function heartToggle() {
    $(".cs_icon").on("click", function () {
      $(this).toggleClass("active");
    });
  }
  /*====================================================
   09. tabs
  ======================================================*/
  function tabs() {
    $(".cs_tabs .cs_tab_links a").on("click", function (e) {
      var currentAttrValue = $(this).attr("href");
      $(".cs_tabs " + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents("li").addClass("active").siblings().removeClass("active");
      e.preventDefault();
    });
  }
  /*====================================================
   10. Quantity
  ======================================================*/
  function quantityInit() {
    //Guest Summery Update Functionality
    function updateSummary() {
      const adults = parseInt($(".cs_adult input").val(), 10) || 0;
      const children = parseInt($(".cs_children input").val(), 10) || 0;

      let summary = [];

      if (adults > 0) {
        summary.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
      }

      if (children > 0) {
        summary.push(`${children} Child${children > 1 ? "ren" : ""}`);
      }
      if (summary.length === 0) {
        summary = ["Select Guests"];
      }

      $(".cs_quantity_btn").val(summary.join(", "));
    }
    $(".cs_quantity_btn").on("click", function () {
      $(this).siblings(".cs_quantity_dropdown").slideToggle("active");
    });
    // Increment button
    $(".cs_quantity_up").click(function () {
      var $input = $(this).closest(".cs_quantity").find("input");
      var max = parseInt($input.attr("max"));
      var currentVal = parseInt($input.val());

      if (currentVal < max) {
        $input.val(currentVal + 1);
      } else {
        $input.val(max);
      }
      updateSummary();
    });
    // Decrement button
    $(".cs_quantity_down").click(function () {
      var $input = $(this).closest(".cs_quantity").find("input");
      var min = parseInt($input.attr("min"));
      var currentVal = parseInt($input.val());

      if (currentVal > min) {
        $input.val(currentVal - 1);
      } else {
        $input.val(min);
      }
      updateSummary();
    });

    // Close Input Box
    function closeInputbox() {
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".cs_quantity_wrap").length) {
          $(".cs_quantity_dropdown").slideToggle("active");
        }
      });
    }
    closeInputbox();
  }
  /*===================================================
  11. Light Gallery
 ======================================================*/
  function lightGallery() {
    $(".cs_lightgallery").each(function () {
      $(this).lightGallery({
        selector: ".cs_lightbox_item",
        subHtmlSelectorRelative: false,
        thumbnail: true,
        mousewheel: true,
      });
    });
  }
  /*====================================================
    12. Smooth Page Scroll
  ======================================================*/
  function smoothScroll() {
    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis({
        duration: 1.2,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }
  /*====================================================
    13. Date And Time Picker
  ======================================================*/
  function dateTimePicker() {
    flatpickr("#timePicker", {
      enableTime: true,
      allowInput: true,
      noCalendar: true,
      dateFormat: "G:i: K",
    });
    flatpickr("#datePicker", {
      enableTime: false,
      allowInput: true,
      dateFormat: "d F Y",
    });
  }
  /*====================================================
    14. hover tab
  ======================================================*/
  function hoverTab() {
    $(".cs_iconbox").hover(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
  /*=============================================================
    15. Scroll Up
  ===============================================================*/
  function scrollUp() {
    $(".cs_scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
          behavior: "smooth",
        },
        0
      );
    });
  }
  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs_scrollup").addClass("active");
    } else {
      $(".cs_scrollup").removeClass("active");
    }
  }
  // Scroll Button Styling
  function initScrollTopButton() {
    var scrollBtn = $(".cs_scrollup");
    var progressCircle = scrollBtn.find(".progress-circle");
    var radius = progressCircle[0].r.baseVal.value;
    var circumference = 2 * Math.PI * radius;

    // Initial stroke setup
    progressCircle.css({
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    function setProgress(percent) {
      var offset = circumference - (percent / 100) * circumference;
      progressCircle.css("stroke-dashoffset", offset);
    }

    // Scroll event
    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height() - $(window).height();

      var percent = (scrollTop / docHeight) * 100;
      percent = Math.min(Math.max(percent, 0), 100);

      setProgress(percent);
      setProgress();
    });
  }
  /*=============================================================
    16. AOS Animation
  ===============================================================*/
  function aosInit() {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  /*====================================================
    17. Dynamic contact form
  ======================================================*/
  function contactFormInit() {
    if ($.exists("#cs_form")) {
      const form = document.getElementById("cs_form");
      const result = document.getElementById("cs_result");

      form.addEventListener("submit", function (e) {
        const formData = new FormData(form);
        e.preventDefault();
        var object = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        var json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        })
          .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              result.innerHTML = json.message;
            } else {
              console.log(response);
              result.innerHTML = json.message;
            }
          })
          .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
          })
          .then(function () {
            form.reset();
            setTimeout(() => {
              result.style.display = "none";
            }, 5000);
          });
      });
    }
  }
})(jQuery); // end of use strict

(function ($) {
  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(function () {
    dynamicBackground();
    mainNav();
    stickyHeader();
    modalVideo();
    hoverTab();
    slickInit();
    accordian();
    isotopInit();
    heartToggle();
    tabs();
    quantityInit();
    lightGallery();
    datePicker();
    smoothScroll();
    $.exists = function (selector) {
      return $(selector).length > 0;
    };
  });
  $(window).on("scroll", function () {
    stickyHeader();
  });
  $(window).on("resize", function () {
    isotopInit();
  });
  /*--------------------------------------------------------------
    1. main nav
  --------------------------------------------------------------*/
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
      stickyHeader();
    });
    $(".cs_menu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
    // Search Toggle
    $(".cs_search_tobble_btn").on("click", function () {
      $(".cs_header_form_wrap").toggleClass("active");
    });
    $(".cs_header_form_overlay").on("click", function () {
      $(".cs_header_form_wrap").removeClass("active");
    });
  }
  /*--------------------------------------------------------------
    2. sticky header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    var isMenuActive = $(".cs_nav_list_wrap").hasClass("cs_active");
    if (scroll >= 10 || isMenuActive) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*--------------------------------------------------------------
    3. dynamic background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      let src = $(this).attr("data-src");

      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*--------------------------------------------------------------
    4. Modal Video
  --------------------------------------------------------------*/
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
  /*--------------------------------------------------------------
    5. hover tab
  --------------------------------------------------------------*/
  function hoverTab() {
    $(".cs_iconbox").hover(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
  /*--------------------------------------------------------------
    6. Slick Slider
  --------------------------------------------------------------*/
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
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
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

  /*--------------------------------------------------------------
    7. Accordian
  --------------------------------------------------------------*/
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
  /*--------------------------------------------------------------
    8. heart toggle
  --------------------------------------------------------------*/
  function heartToggle() {
    $(".cs_icon").on("click", function () {
      $(this).toggleClass("active");
    });
  }
  /*--------------------------------------------------------------
    9. tabs
  --------------------------------------------------------------*/
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
  /*--------------------------------------------------------------
    10. Isotop
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists(".cs_isotop")) {
      $(".cs_isotop").isotope({
        itemSelector: ".cs_isotop_item",
        transitionDuration: "0.60s",
        masonry: {
          columnWidth: ".cs_grid_sizer",
        },
      });
      /* Active Class of Portfolio*/
      $(".cs_isotop_filter ul li").on("click", function (event) {
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
      });
      /=== Portfolio filtering ===/;
      $(".cs_isotop_filter ul").on("click", "a", function () {
        var filterElement = $(this).attr("data-filter");
        $(".cs_isotop").isotope({
          filter: filterElement,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    11. Date  Picker
  --------------------------------------------------------------*/
  function datePicker() {
    $("#myDatePicker").datepicker({
      dateFormat: "dd-mm-yy",
      onSelect: function (dateText, inst) {
        const date = $(this).datepicker("getDate");

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        $(this).val(formattedDate);
      },
    });
  }
  /*--------------------------------------------------------------
    12. Quantity
  --------------------------------------------------------------*/
  function quantityInit() {
    //Guest Summery Update Functionality
    function updateSummary() {
      let adults = $(".cs_adult input").val();
      let children = $(".cs_children input").val();
      const guestSummery = [
        adults > 0 ? `${adults} Adults` : "",
        children > 0 ? `${children} Children` : "",
      ]
        .filter(Boolean)
        .join(", ");
      $(".cs_quantity_btn").val(guestSummery);
    }
    $(".cs_quantity_btn").on("click", function () {
      $(this).siblings(".cs_quantity_dropdown").toggleClass("active");
      updateSummary();
    });
    $(".cs_select_btn").on("click", function () {
      $(this).siblings(".cs_quantity_dropdown").toggleClass("active");
      updateRoom();
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
    // Room Summery Update Functionality
    function updateRoom() {
      $(".cs_options_wrapper input").on("click", function () {
        var selectedValue = $(this).val();
        $(this)
          .closest(".cs_quantity_wrap")
          .find(".cs_select_btn")
          .val(selectedValue);
        $(".cs_quantity_dropdown").removeClass("active");
      });
    }
    // Language Update Functionality
    $(".cs_language_switcher").on("click", function () {
      $(this).siblings(".cs_language_dropdown").slideToggle();
      updateLanguage();
    });
    function updateLanguage() {
      $(".cs_language_dropdown input").on("click", function () {
        var selectedValue = $(this).val();
        $(this)
          .closest(".cs_language_select")
          .find(".cs_language_switcher input")
          .val(selectedValue);
        $(".cs_language_dropdown").slideUp();
      });
    }
    // Close Input Box
    function closeInputbox() {
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".cs_quantity_wrap").length) {
          $(".cs_quantity_dropdown").removeClass("active");
        }
      });
    }
    closeInputbox();
    updateSummary();
  }
  /*----------------------------------------------------------------
         13. Light Gallery
 --------------------------------------------------------------*/
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
  /*======================================================================
    08. Smooth Page Scroll
  ========================================================================*/
  function smoothScroll() {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
})(jQuery); // end of use strict

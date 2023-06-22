(function ($) {
    "use strict";

    /*--
        Menu Sticky
    -----------------------------------*/
    var windows = $(window);
    var sticky = $('.header-sticky');
    
    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 230) {
            sticky.removeClass('is-sticky');
        }else{
            sticky.addClass('is-sticky');
        }
    });
    
    
    /*--
        Header dropdowns
    ---------------------------*/
    $(".dropdown-toggle").on("click", function() {
        $(this).toggleClass('open').next('.dropdown-menu').toggleClass('open');
        $(this).parents().siblings().find('.dropdown-menu, .dropdown-toggle').removeClass('open');
    });

    // Closing the dropdown by clicking in the menu button or anywhere in the screen
    $('body').on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown-toggle, .dropdown-menu').removeClass('open');
        }
    });

    // Prevent closing dropdown upon clicking inside the dropdown
    $(".dropdown-menu,.main-search-active").on("click", function(e) {
        e.stopPropagation();
    });
    
    
    /*--
        Mobile Menu
    ------------------------*/
    var menuNav = $('nav.main-navigation');
    menuNav.meanmenu({
        meanScreenWidth: '991',
        meanMenuContainer: '.mobile-menu',
        meanMenuClose: '<span class="menu-close"></span>',
        meanMenuOpen: '<span class="menu-bar"></span>',
        meanRevealPosition: 'right',
        meanMenuCloseSize: '0',
    });

    /*--
       Sidebar Search Active
    -----------------------------*/
    function sidebarSearch() {
        var searchTrigger = $('.trigger-search'),
            container = $('.main-search-active');
        
        searchTrigger.on('click', function() {
            container.slideToggle('inside');
        });
    };
    sidebarSearch();
    // Closing the button or anywhere in the screen
    $('body').on('click', function (e) {
        var target = e.target;
        if (!$(target).is('.trigger-search') && !$(target).parents().is('.trigger-search')) {
            $('.main-search-active').slideUp();
        }
    });

    /*--
        Hero Slider
    --------------------------------------------*/
    var heroSlider = $('.hero-slider');
    heroSlider.slick({
        arrows: true,
        autoplay: false,
        autoplaySpeed: 5000,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                dots: false,
              }
            }
        ]
    });

    /*--
        Deals product active Slider
    -----------------------------------*/
    $('.deals-product-active').slick({
        accessibility: false,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    /*--
        Sidebar single active Slider
    -----------------------------------*/
    $('.sidebar-single-active').slick({
        accessibility: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    /*--
        Product Slider
    -----------------------------------*/
    $('.product-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    /*--
        Product show 3 Slider
    -----------------------------------*/
    $('.product-slider-show-3').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    /*--
        Product Slider
    -----------------------------------*/
    $('.trend-product-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


     /* Product Details Images Slider */
    $('.product-details-images').each(function(){
        var $this = $(this);
        var $thumb = $this.siblings('.product-details-thumbs');
        $this.slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            centerMode: false,
            centerPadding: 0,
            asNavFor: $thumb,
        });
    });
    $('.product-details-thumbs').each(function(){
        var $this = $(this);
        var $details = $this.siblings('.product-details-images');
        $this.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            focusOnSelect: true,
            centerMode: true,
            centerPadding: 0,
            prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
            nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
            asNavFor: $details,
        });
    });

     /* Product Details 2 Images Slider */
    $('.product-details-images-2').each(function(){
        var $this = $(this);
        var $thumb = $this.siblings('.product-details-thumbs-2');
        $this.slick({
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            centerMode: false,
            centerPadding: 0,
            asNavFor: $thumb,
        });
    });
    $('.product-details-thumbs-2').each(function(){
        var $this = $(this);
        var $details = $this.siblings('.product-details-images-2');
        $this.slick({
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            vertical:true,
            verticalSwiping:true,
            dots: false,
            infinite: true,
            focusOnSelect: true,
            centerMode: false,
            centerPadding: 0,
            prevArrow: '<span class="slick-prev"><i class="fa fa-angle-up"></i></span>',
            nextArrow: '<span class="slick-next"><i class="fa fa-angle-down"></i></span>',
            asNavFor: $details,
            responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 2,
              }
            }
        ]
        });
    });

    /*-- 
        Brand Slider 
    ------------------------------------*/
    var ourBrandActive = $('.our-brand-active');
    ourBrandActive.slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScoll: 2,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 2,
              }
            }
        ]
    });

    /*-- 
        Blog Slider 
    --------------------------*/
    var latestBlogSlider = $('.latest-blog-slider');
    latestBlogSlider.slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScoll: 1,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1,
              }
            }
        ]
    }); 
    /*-- 
        Brand Slider 
    --------------------------*/
    var blogSlider = $('.blog-image-slider');
    blogSlider.slick({
        arrows: true,
        autoplay: false,
        dots: false,
        pauseOnFocus: true,
        pauseOnHover: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScoll: 1,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        
    });

    /*-- 
        Testimonial Slider 
    -----------------------------*/
    var testimonialSlider = $('.testimonial-slider');
    testimonialSlider.slick({
        arrows: false,
        autoplay: false,
        autoplaySpeed: 7000,
        dots: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScoll: 1,
    });

    /*-- 
        Testimonial Slider 
    -----------------------------*/
    var testimonialSlider = $('.sidebar-client-active');
    testimonialSlider.slick({
        arrows: false,
        autoplay: false,
        autoplaySpeed: 7000,
        dots: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScoll: 1,
    });


    /*--
        vertical-product-active
    --------------------------------------*/
    $('.product-categproes-active').slick({
        slidesToShow: 4,
        arrows: false,
        autoplay: false,
        slidesToScroll: 1,
        button:false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
              slidesToShow: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                vertical:false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                vertical:false,
              }
            }
        ]

    });	  
    

    /*----------
        price-slider active
    -------------------------------*/  
    $( "#price-slider" ).slider({
       range: true,
       min: 0,
       max: 120,
       values: [ 20, 115 ],
       slide: function( event, ui ) {
            $( "#min-price" ).val('$' + ui.values[ 0 ] );
            $( "#max-price" ).val('$' + ui.values[ 1 ] );
         }
      });
      $( "#min-price" ).val('$' + $( "#price-slider" ).slider( "values", 0 ));   
      $( "#max-price" ).val('$' + $( "#price-slider" ).slider( "values", 1 )); 

   
    /*------------------------------ 
        Cart Plus Minus Button
    ---------------------------------*/
    $(".cart-plus-minus").append('<div class="dec qtybutton"><i class="fa fa-angle-down"></i></div><div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass('inc')) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
           // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
          }
          }
        $button.parent().find("input").val(newVal);
      }); 
    
     // Single Product Sticky Sidebar
        var windowWidth = $(window).width();
        if (992 <= windowWidth) {
            $('.sidebar-active').stickySidebar({
                topSpacing: 80,
                bottomSpacing: 30,
                minWidth: 767
            });
        }

     /*--
        Magnific Popup
    ------------------------*/
    $('.img-poppu').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    });

    /*--
        Count Down Timer
    ----------------------------*/
    $('[data-countdown]').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>mins</p></span> <span class="cdown second"><span class="time-count">%S</span> <p>secs</p></span>'));
        });
    }); 
    /*--
    Category menu Activation
    ------------------------------*/
    $('.category-sub-menu li.has-sub > a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        } else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    }); 

    /*--
        showlogin toggle function
    --------------------------*/
    $( '#showlogin' ).on('click', function() {
        $('#checkout-login' ).slideToggle(500);
    }); 

    /*--
        showcoupon toggle function
    --------------------------*/
    $( '#showcoupon' ).on('click', function() {
        $('#checkout-coupon' ).slideToggle(500);
    });

    /*--
        Checkout 
    --------------------------*/
    $("#chekout-box").on("change",function(){
        $(".account-create").slideToggle("100");
    });

    /*-- 
        Checkout 
    ---------------------------*/
    $("#chekout-box-2").on("change",function(){
        $(".ship-box-info").slideToggle("100");
    });   
    
    /* ---
       payment-accordion
    * --------------------------------*/ 
        $(".payment-accordion").collapse({
            accordion:true,
          open: function() {
            this.slideDown(550);
          },
          close: function() {
            this.slideUp(550);
          }		
        }); 
    
    /*--
        Accordion
    -------------------------*/
    $(".faequently-accordion").collapse({
        accordion:true,
      open: function() {
        this.slideDown(300);
      },
      close: function() {
        this.slideUp(300);
      }		
    });	 
    
    /* --
        counterUp 
    -----------------------------*/
    $('.count').counterUp({
        delay: 10,
        time: 1000
    });

    /*--
        ScrollUp Active
    -----------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });   
    
    
    /*------------------------------------
        DateCountdown active
    ------------------------------------- */
    $(".DateCountdown").TimeCircles({
        direction: "Counter-clockwise",
        fg_width: 0.009,
        bg_width: 0,
        use_background: false,
        time: {
            Days: {
                text: "Days",
                color: "#fff"
            },
            Hours: {
                text: "Hours",
                color: "#fff"
            },
            Minutes: {
                text: "Mins",
                color: "#fff"
            },
            Seconds: {
                text: "Secs",
                color: "#fff"
            }
        }

    });
    
    
    

})(jQuery);	

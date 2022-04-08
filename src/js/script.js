$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.svg"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img type="button" src="icons/chevron_right.svg"></img></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                dots: true,
                adaptiveHeight: true
              }
            }
          ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
        $(this)
          .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
          
      });

      function toggleSlide (item) {
        $(item).each(function(i) {
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
          }) 
        })
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      //Modals

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });

      $('[data-modal=buy]').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
      });

      $('[data-modal=buy]').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        })
      })

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      })

      function validateErrors(item) {
        $(item).validate({
          rules: {
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: "Введите ваше имя",
            email: {
              required: "Поле обязательно!",
              email: "Введите валидний емейл name@name.com"
            },
            phone: "Поле обязательно!"
          }
        });
      }

      validateErrors('#consultation form');
      validateErrors('#order form');
      validateErrors('#consultation-form');

      $('input[name=phone]').mask("+38(999) 999-9999");

      $(window).scroll(function() {
        if($(this).scrollTop() > 1000) {
          $('.page-up').fadeIn();
        }else {
          $('.page-up').fadeOut();
        }
      })

      $(".page-up").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
  });
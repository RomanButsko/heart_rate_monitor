$(document).ready(function(){
    $('.carousel__slider').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="carousel__left"><img src="img/slider-left.png"></button>',
        nextArrow: '<button type="button" class="carousel__right"><img src="img/right-slider.png"></button>'
    });
    $('ul.catalog_menu__items').on('click', 'li:not(.catalog_menu__item_active)', function() {
        $(this)
          .addClass('catalog_menu__item_active').siblings().removeClass('catalog_menu__item_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });
    function chooseCards(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog_cards_side__firstSide').eq(i).toggleClass('catalog_cards_side__firstSide_active');
                $('.catalog_cards_side__secondSide').eq(i).toggleClass('catalog_cards_side__secondSide_active');
        })
    })
}
    chooseCards('.catalog_cards__link')
    chooseCards('.catalog_cards_side__secondSide__link')

    //Modals

    $('[data-modal=consultation]').on('click', () => {
        $('.overheight, #consultation').fadeIn('slow')
    })
    $('.modal_close').on('click', () => {
        $('.overheight,  #consultation').fadeOut('slow')
    })
    $('.button__card').on('click', () => {
        $('.overheight, #order').fadeIn('slow')
    })
    $('.button__card').each(function(item) {
        $(this).on('click', function() {
            $('#order .modal_subdescr').text($('.catalog_cards__h3').eq(item).text())
        })
    })
    $('.modal_close').on('click', () => {
        $('.overheight,  #order').fadeOut('slow')
    })

    function changeForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            }, 
            messages: {
                name: {
                        required: "????????????????????, ?????????????? ???????? ??????",
                        minlength: jQuery.validator.format("?????????????? {0} ??????????????!")
                  },
                phone: "???????????????????? ?????????????? ?????? ??????????????",
                email: {
                  required: "????????????????????, ?????????????? e-mail",
                  email: "?????????? ?????????????? ??????????????"
                }
        }
    });
    }

    changeForm(".form_submit");
    changeForm('#consultation form');
    changeForm('#order form');

    $('.form').submit(function(e) {
        e.preventDefault();
        $.ajax ({
            type: 'POST',
            url: '/src/mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').value = '';
            $('#cosultation, #order').fadeOut()
            $('.overheight', '#response').fadeIn()
            $('form').trigger('reset');
        })
        return false
    })

    $(window).scroll(function() {
        $(this).scrollTop() > 1600 ? $('.scrollPage').fadeIn() : $('.scrollPage').fadeOut()
    })
    $("a.scrollPage").click(function() {
        const elementClick = $(this).attr("href")
        const destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
        });
})




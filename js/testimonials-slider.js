(function($) {
    $(document).ready(function() {
        $('.testimonials__slider > .testimonials__list').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1500,
            easing: 'cubic-bezier(0.4,0,0.2,1)',
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            pauseOnFocus: true,
            pauseOnHover: true,
            draggable: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 426,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 2561,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        });

        $('.testimonials-slider__prev-button').click(function() {
            $('.testimonials__slider > .testimonials__list').slick('slickPrev');
        });
        $('.testimonials-slider__next-button').click(function() {
            $('.testimonials__slider > .testimonials__list').slick('slickNext');
        });
    });
})(jQuery);
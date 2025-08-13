$(document).ready(function() {
    $('.testimonials__slider>.testimonials__list').slick({
      slidesToShow: 1, // Кількість відгуків, які відображаються одночасно
      slidesToScroll: 1, // Кількість відгуків, які прокручуються за один раз
      speed: 1500,
      easing: 'cubic-bezier(0.4,0,0.2,1)',
      autoplay: true, // Автоматичне прокручування
      autoplaySpeed: 3000, // Затримка між автоматичним прокручуванням (у мілісекундах)
      infinite: true,
      pauseOnFocus: true,
      pauseOnHover: true,
      draggable: true,
      arrows: false, // Не відображати стрілки навігації
      responsive: [
        {
          breakpoint: 400, // Розмір екрану, на якому застосовуються ці налаштування
          settings: {
            slidesToShow: 1, // Кількість відгуків на мобільному
          }
        },
        {
          breakpoint: 426, // Розмір екрану, на якому застосовуються ці налаштування
          settings: {
            slidesToShow: 1, // Кількість відгуків на мобільному
          }
        },
        // {
        //   breakpoint: 580,
        //   settings: {
        //     slidesToShow: 2, // Кількість відгуків на планшеті
        //   }
        // },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1, // Кількість відгуків на планшеті
          }
        },
        // {
        //   breakpoint: 1080,
        //   settings: {
        //     slidesToShow: 2, // Кількість відгуків на планшеті
        //   }
        // },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
          }
        },
        // {
        //   breakpoint: 1660,
        //   settings: {
        //     slidesToShow: 3,
        //     // centerPadding: '120px'
        //   }
        // },
        {
          breakpoint: 2560,
          settings: {
            slidesToShow: 3,
          }
        }
      ]
    });

    $('.testimonials-slider__prev-button').click(function() {
        $('.testimonials__slider>.testimonials__list').slick('slickPrev');
    });
    $('.testimonials-slider__next-button').click(function() {
        $('.testimonials__slider>.testimonials__list').slick('slickNext');
    });
  });
$(document).ready(function() {

    /* --- Функціонал фільтрації (Recent Projects) --- */

    // Обробник кліку для кнопок фільтра
    $('.projects__btn').on('click', function() {
        const $thisButton = $(this);
        const filterValue = $thisButton.data('filter');

        // Оновлюємо активний стан кнопок
        $('.projects__btn').removeClass('active');
        $thisButton.addClass('active');

        // Фільтруємо проєкти
        const $projectItems = $('.project__list .project__item');
        const $targetItems = (filterValue === 'all') 
            ? $projectItems 
            : $projectItems.filter('[data-category="' + filterValue + '"]');

        // ВИПРАВЛЕННЯ 1: Використання .stop(true, true) для запобігання морганню/конфліктам при швидкому кліку
        $projectItems.stop(true, true).fadeOut(300, function() {
            
            // Запобігаємо багаторазовому запуску fadeIn, лише один раз після завершення fadeOut
            if (!$(this).is(':animated') && $(this).css('display') === 'none') {
                
                // Приховуємо всі елементи, які, можливо, зависли
                $projectItems.hide(); 
                
                // Показуємо лише цільові елементи
                $targetItems.stop(true, true).fadeIn(300);
            }
        });
        
        // КЛЮЧОВЕ ВИПРАВЛЕННЯ 2: Запуск ініціалізації перемикача на активних картках
        // Це виправляємо, оскільки асинхронний fadeOut може обірвати логіку
        $targetItems.each(function() {
            const $article = $(this).find('.project__article');
            const $activeThumb = $article.find('.project__switcher-thumb.active');
            if ($activeThumb.length) {
                // Встановлюємо правильне зображення
                $article.find('.project__demo').attr('src', $activeThumb.data('image'));
            }
        });
        
    });

    // Ініціалізуємо фільтр при завантаженні сторінки
    // Зверніть увагу, що у вашій HTML-розмітці кнопки Home мають клас 'active', 
    // але інші кнопки мають клас 'hidden'. Переконайтеся, що ваш CSS правильно 
    // обробляє класи кнопок, щоб вони були видимими!
    $('.projects__btn.active').trigger('click');


    /* --- Функціонал перемикача Before/After --- */

    $('.project__list').on('click', '.project__switcher-thumb', function() {
        const $thisThumb = $(this);
        const $projectArticle = $thisThumb.closest('.project__article');
        const $mainImage = $projectArticle.find('.project__demo');
        const newImageUrl = $thisThumb.data('image');

        // Змінюємо головне зображення
        // ВИПРАВЛЕННЯ 3: Гарантуємо, що зображення змінюється негайно
        $mainImage.attr('src', newImageUrl);

        // Оновлюємо активний стан мініатюр
        $projectArticle.find('.project__switcher-thumb').removeClass('active');
        $thisThumb.addClass('active');
    });

    // Ініціалізація перемикача при завантаженні сторінки
    $('.project__article').each(function() {
        const $article = $(this);
        const $activeThumb = $article.find('.project__switcher-thumb.active');
        if ($activeThumb.length) {
            // Встановлюємо правильне зображення
            $article.find('.project__demo').attr('src', $activeThumb.data('image'));
        }
    });

});
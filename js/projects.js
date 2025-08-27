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

        $projectItems.fadeOut(300, function() {
            if (filterValue === 'all') {
                $projectItems.fadeIn(300);
            } else {
                $projectItems.filter('[data-category="' + filterValue + '"]').fadeIn(300);
            }
        });
    });

    // Ініціалізуємо фільтр при завантаженні сторінки
    $('.projects__btn.active').trigger('click');

    /* --- Функціонал перемикача Before/After --- */

    // Використовуємо делегування подій для обробки кліків
    // Це гарантує, що перемикачі працюватимуть навіть на тих картках,
    // які з'являються після фільтрації.
    $('.project__list').on('click', '.project__switcher-thumb', function() {
        const $thisThumb = $(this);
        const $projectArticle = $thisThumb.closest('.project__article');
        const $mainImage = $projectArticle.find('.project__demo');
        const newImageUrl = $thisThumb.data('image');

        // Змінюємо головне зображення
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
            $article.find('.project__demo').attr('src', $activeThumb.data('image'));
        }
    });

});
$(document).ready(function() {
    // Обробник кліку для кнопок фільтра
    $('.features__btn').on('click', function() {
        const $thisButton = $(this);
        const filterValue = $thisButton.data('filter'); // Отримуємо значення data-filter

        // 1. Оновлюємо активний стан кнопок фільтра
        // Виправляємо: використовуємо селектор .features__btn
        $('.features__btn').removeClass('active');
        $thisButton.addClass('active');

        // 2. Фільтруємо елементи
        const $featureItems = $('.feature__list .feature__item');

        // Спочатку приховуємо всі елементи
        $featureItems.fadeOut(300, function() {
            // Після того, як приховаються, показуємо тільки потрібні
            // Вибираємо ті, у яких data-category співпадає з data-filter кнопки
            $featureItems.filter('[data-category="' + filterValue + '"]').fadeIn(300);
        });
    });

    // Ініціалізація: Активуємо фільтр першої вкладки
    // Це забезпечить коректне відображення при першому завантаженні сторінки
    $('.features__btn.active').trigger('click');
});
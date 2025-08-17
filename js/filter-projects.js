$(document).ready(function() {

    // Обробник кліку для кнопок фільтра
    $('.projects__btn').on('click', function() {
        const $thisButton = $(this);
        const filterValue = $thisButton.data('filter'); // Отримуємо значення data-filter

        // 1. Оновлюємо активний стан кнопок фільтра
        $('.projects__btn').removeClass('active'); // Прибираємо active з усіх кнопок
        $thisButton.addClass('active'); // Додаємо active до натиснутої кнопки

        // 2. Фільтруємо проєкти
        const $projectItems = $('.project__list .project__item'); // Всі картки проєктів

        if (filterValue === 'all') {
            // Якщо вибрано "all" (наприклад, кнопка Home), показуємо всі проєкти
            $projectItems.fadeIn(300); // Плавно показуємо всі
        } else {
            // Приховуємо всі проєкти спочатку
            $projectItems.fadeOut(300, function() {
                // Після того, як приховаються, показуємо тільки потрібні
                // Вибираємо тільки ті, у яких data-category співпадає з filterValue
                $projectItems.filter('[data-category="' + filterValue + '"]').fadeIn(300);
            });
        }
    });

    // Ініціалізація: Активуємо фільтр "Home" (який відповідає "all" проектам за замовчуванням)
    // Це забезпечить коректне відображення при першому завантаженні сторінки
    $('.projects__btn.active').trigger('click'); // Імітуємо клік по активній кнопці
});
$(document).ready(function() {

    // Обробник кліку для мініатюр "Before" та "After"
    $('.project__switcher-thumb').on('click', function() {
        const $thisThumb = $(this); // Зберігаємо посилання на натиснуту мініатюру
        const $projectArticle = $thisThumb.closest('.project__article'); // Знаходимо батьківську картку проєкту
        const $mainImage = $projectArticle.find('.project__demo'); // Головне демонстраційне зображення
        const newImageUrl = $thisThumb.data('image'); // Отримуємо URL зображення з data-атрибута

        // 1. Змінюємо головне демонстраційне зображення
        $mainImage.attr('src', newImageUrl);

        // 2. Оновлюємо активний стан мініатюр (керування оверлеями)
        $projectArticle.find('.project__switcher-thumb').removeClass('active'); // Прибираємо active з усіх мініатюр
        $thisThumb.addClass('active'); // Додаємо active до натиснутої мініатюри
    });

    // Ініціалізація: За замовчуванням, робимо мініатюру After активною
    // Це потрібно, якщо ви не додаєте клас active до HTML вручну
    // Або просто переконайтесь, що у HTML у вас вже є клас 'active' на After за замовчуванням.
    // Якщо у вас вже є 'active' в HTML, цей блок не є строго необхідним,
    // але не завадить, якщо ви захочете програмно контролювати початковий стан.
    $('.project__switcher-thumb.project__switcher-after').addClass('active');

    // Щоб переконатися, що перша демонстраційна картинка відповідає active мініатюрі After при завантаженні сторінки
    // Знайдемо кожну статтю
    $('.project__article').each(function() {
        const $article = $(this);
        const $activeThumb = $article.find('.project__switcher-thumb.active');
        if ($activeThumb.length) {
            $article.find('.project__demo').attr('src', $activeThumb.data('image'));
        }
    });

});
// Налаштовуємо подію для зміни кольору псевдоелемента для елемента списку навменю для мобільного
// Знаходимо елементи
const servicesItem = document.querySelector('.mobile-menu__item:nth-child(2)');
const servicesLink = servicesItem.querySelector('.mobile-menu__link');
const submenuList = servicesItem.querySelector('.mobile-submenu__list');

// Перевіряємо, чи існують елементи
if (servicesItem && servicesLink && submenuList) {
    // Додаємо слухач події на посилання "Services"
    servicesLink.addEventListener('click', (event) => {
        // Запобігаємо стандартній дії посилання
        event.preventDefault();

        // Перемикаємо клас 'active' на посиланні
        servicesLink.classList.toggle('select');

        // Перемикаємо клас 'is-open' на батьківському елементі, щоб розкрити підменю
        servicesItem.classList.toggle('is-open');

        // Додаткова логіка для показу/приховування підменю
        if (servicesItem.classList.contains('is-open')) {
            submenuList.style.display = 'block'; // Або інша ваша логіка
        } else {
            submenuList.style.display = 'none'; // Або інша ваша логіка
        }
    });
}

// Налаштовуємо системне оновлення періоду (років) створення сайту компанії
document.addEventListener('DOMContentLoaded', function() {
    const yearsElement = document.getElementById('copyright-years');

    if (yearsElement) {
        const startYear = yearsElement.textContent; // Отримуємо початковий рік з HTML
        const currentYear = new Date().getFullYear(); // Отримуємо поточний рік

        // Перевіряємо, чи поточний рік відрізняється від року початку
        // Якщо вони однакові (наприклад, зараз 2025 і рік початку 2025),
        // відображаємо лише 2025.
        // Якщо вони різні (наприклад, зараз 2026, а рік початку 2025),
        // відображаємо 2025-2026.
        if (parseInt(startYear) < currentYear) { // parseInt перетворює рядок на число для порівняння
            yearsElement.textContent = `${startYear}-${currentYear}`;
        } else {
            // Якщо рік початку дорівнює поточному, або рік початку більший (що малоймовірно),
            // залишаємо тільки рік початку.
            yearsElement.textContent = startYear; // Залишаємо 2025
        }
    }
});

// JavaScript для зміни прозорості HEADER
$(document).ready(function() {
    const $header = $('.header'); // Зберігаємо хедер в змінну jQuery
    const scrollThreshold = 50; // Поріг скролу в пікселях, після якого хедер стає прозорим

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop(); // Поточне положення скролу

        if (scrollTop > scrollThreshold) {
            $header.addClass('scrolled'); // Додаємо клас, щоб хедер став напівпрозорим
        } else {
            $header.removeClass('scrolled'); // Видаляємо клас, хедер повертається до початкового стану
        }
    });

    // Викликаємо функцію один раз при завантаженні сторінки,
    // якщо сторінка вже прокручена (наприклад, після оновлення)
    $(window).trigger('scroll');
});

// JavaScript для зміни для кнопки READ MORE
document.addEventListener('DOMContentLoaded', () => {
    // Встановіть це значення відповідно до вашого CSS: max-height у .related__details
    const maxHeight = 190; 
    
    // Отримуємо всі картки, які потрібно обробляти
    const relatedCards = document.querySelectorAll('.related__card');

    relatedCards.forEach(card => {
        const detailsBlock = card.querySelector('.related__details');
        const readMoreButton = card.querySelector('.related__btn');
        // !!! ОНОВЛЕНО: використовуємо новий клас .related__full-text
        const fullTextBlock = card.querySelector('.related__full-text');

        if (!detailsBlock || !readMoreButton || !fullTextBlock) {
            return;
        }

        /* --- КРОК 1: КОНТРОЛЬ ВИДИМОСТІ КНОПКИ (Розрахунок висоти) --- */

        // 1. Тимчасово показуємо повний текст, щоб scrollHeight його врахував.
        fullTextBlock.style.display = 'block';
        
        // 2. Отримуємо загальну висоту всього вмісту 
        const totalContentHeight = detailsBlock.scrollHeight;

        // 3. Повертаємо блок у прихований стан.
        fullTextBlock.style.display = 'none'; 
        
        // 4. Перевіряємо, чи вміст перевищує ліміт.
        if (totalContentHeight > maxHeight) {
            readMoreButton.style.display = 'block';
            
            // Якщо вміст перевищує, ми явно приховуємо fullTextBlock
            // та згортаємо detailsBlock, щоб CSS міг застосувати обмеження.
            detailsBlock.classList.remove('is-expanded'); 
            fullTextBlock.hidden = true; // Використовуємо 'hidden' для надійного приховування
        } else {
            readMoreButton.style.display = 'none';
            // Якщо вміст поміщається, розкриваємо detailsBlock, щоб уникнути overflow: hidden
            detailsBlock.classList.add('is-expanded'); 
            fullTextBlock.hidden = false;
        }

        /* --- КРОК 2: СЛУХАЧ КЛІКУ (Усунення конфлікту) --- */

        readMoreButton.addEventListener('click', () => {
            detailsBlock.classList.toggle('is-expanded');

            if (detailsBlock.classList.contains('is-expanded')) {
                readMoreButton.textContent = 'Read less';
                
                // При розкритті: Видаляємо всі інлайн-стилі приховування. 
                // Це дозволяє CSS-правилу `.is-expanded .related__full-text { display: block; }` спрацювати.
                fullTextBlock.style.display = ''; 
                fullTextBlock.hidden = false;
            } else {
                readMoreButton.textContent = 'Read more';
                
                // При згортанні: Примусово приховуємо блок.
                fullTextBlock.hidden = true;
                fullTextBlock.style.display = 'none';
            }
        });
    });
});

// Задаємо центральне положення для останнього проєкту
function centerLastItem() {
    const $visibleItems = $('.project__item:visible');
    // Перевіряємо, чи кількість видимих елементів непарна і більше одного
    if ($visibleItems.length % 2 !== 0 && $visibleItems.length > 1) {
        // Якщо так, додаємо клас до останнього видимого елемента
        const $lastItem = $visibleItems.last();
        $lastItem.addClass('center-item');
    } else {
        // Якщо ні, видаляємо клас з усіх елементів, щоб уникнути конфліктів
        $('.project__item').removeClass('center-item');
    }
}

$('.projects__btn').on('click', function() {
    const $thisButton = $(this);
    const filterValue = $thisButton.data('filter');

    $('.projects__btn').removeClass('active');
    $thisButton.addClass('active');

    const $projectItems = $('.project__list .project__item');

    $projectItems.fadeOut(300, function() {
        if (filterValue === 'all') {
            $projectItems.fadeIn(300, function() {
                // Викликаємо функцію після завершення анімації
                centerLastItem();
            });
        } else {
            $projectItems.filter('[data-category="' + filterValue + '"]').fadeIn(300, function() {
                // Викликаємо функцію після завершення анімації
                centerLastItem();
            });
        }
    });
});
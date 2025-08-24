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
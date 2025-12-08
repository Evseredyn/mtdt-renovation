// document.addEventListener('DOMContentLoaded', () => {
//     const scrollButton = document.getElementById('scrollToTopBtn');

//     if (!scrollButton) return;

//     // 1. Логіка показу/приховування кнопки
//     const toggleVisibility = () => {
//         // Показуємо кнопку, якщо користувач прокрутив більше ніж на 300px
//         if (window.scrollY > 300) {
//             scrollButton.style.display = 'block';
//         } else {
//             scrollButton.style.display = 'none';
//         }
//     };

//     // 2. Логіка прокручування
//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth' // Плавна анімація прокручування
//         });
//     };

//     // Додаємо слухачі
//     window.addEventListener('scroll', toggleVisibility);
//     scrollButton.addEventListener('click', scrollToTop);
    
//     // Запускаємо перевірку при завантаженні (для оновлення сторінки)
//     toggleVisibility();
// });

/**
 * Скрипт для керування кнопкою "Scroll To Top"
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Отримання елементів
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

    // Якщо кнопки немає на сторінці, зупиняємо виконання скрипта
    if (!scrollToTopBtn) {
        return;
    }

    // Порогове значення прокрутки (коли починати показувати кнопку)
    // Наприклад, 300 пікселів від верхньої частини
    const scrollThreshold = 300;

    /**
     * 2. Функція, що перемикає відображення кнопки
     */
    const toggleScrollToTopButton = () => {
        // window.scrollY - це поточна вертикальна позиція прокручування
        if (window.scrollY > scrollThreshold) {
            // Приховуємо за допомогою CSS властивості 'display: none', як у вашій стилізації
            // Тут використовуємо 'display: flex', як ви встановили в CSS
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    /**
     * 3. Обробник події кліку
     * Виконує плавне прокручування догори.
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Забезпечує плавне прокручування
        });
    };

    // Додаємо слухача події прокручування до вікна
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Додаємо слухача події кліку до кнопки
    scrollToTopBtn.addEventListener('click', scrollToTop);

    // Викликаємо функцію один раз при завантаженні, щоб встановити початковий стан
    toggleScrollToTopButton();
});
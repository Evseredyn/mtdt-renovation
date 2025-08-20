// // Очікуємо, поки DOM буде повністю завантажений
// document.addEventListener('DOMContentLoaded', function() {
//     // Знаходимо елемент, де потрібно відобразити рік
//     const yearElement = document.getElementById('current-year');

//     // Перевіряємо, чи елемент існує, щоб уникнути помилок
//     if (yearElement) {
//         // Отримуємо поточний рік
//         const currentYear = new Date().getFullYear();

//         // Оновлюємо текстовий вміст елемента
//         yearElement.textContent = currentYear;
//     }
// });

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
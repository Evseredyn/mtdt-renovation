document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.getElementById('scrollToTopBtn');

    if (!scrollButton) return;

    // 1. Логіка показу/приховування кнопки
    const toggleVisibility = () => {
        // Показуємо кнопку, якщо користувач прокрутив більше ніж на 300px
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    };

    // 2. Логіка прокручування
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавна анімація прокручування
        });
    };

    // Додаємо слухачі
    window.addEventListener('scroll', toggleVisibility);
    scrollButton.addEventListener('click', scrollToTop);
    
    // Запускаємо перевірку при завантаженні (для оновлення сторінки)
    toggleVisibility();
});
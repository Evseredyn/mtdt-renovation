document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.querySelector('.accordion-two-column-wrapper');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    function handleAccordionToggle(clickedToggle) {
        const accordionItem = clickedToggle.closest('.accordion-item');
        const targetIdMobile = clickedToggle.getAttribute('aria-controls');
        const targetContentMobile = document.getElementById(targetIdMobile);

        const targetIdDesktop = targetIdMobile.replace('-mobile', '-desktop');
        const targetContentDesktop = document.getElementById(targetIdDesktop);

        const isDesktopMode = window.getComputedStyle(accordionContainer).display === 'flex';

        if (isDesktopMode) {
            // --- Десктопний режим (дві колонки) ---
            // Знімаємо активний стан з усіх питань (ліва колонка)
            document.querySelectorAll('.accordion-item').forEach(item => {
                const toggle = item.querySelector('.accordion-toggle');
                if (toggle) { // !!! Додали перевірку !!!
                    item.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Знімаємо активний стан з усіх десктопних відповідей (права колонка)
            document.querySelectorAll('.accordion-content-desktop').forEach(content => {
                content.classList.remove('is-active');
                content.setAttribute('aria-hidden', 'true');
            });

            // Робимо поточне питання активним
            if (accordionItem) {
                 accordionItem.classList.add('is-active');
                 clickedToggle.setAttribute('aria-expanded', 'true');
            }

            // Робимо відповідну десктопну відповідь видимою
            if (targetContentDesktop) {
                targetContentDesktop.classList.add('is-active');
                targetContentDesktop.setAttribute('aria-hidden', 'false');
            }

        } else {
            // --- Мобільний режим (стандартний акордеон) ---
            const isActive = accordionItem.classList.contains('is-active');

            // Закриваємо всі інші відкриті акордеони
            document.querySelectorAll('.accordion-item.is-active').forEach(item => {
                if (item !== accordionItem) {
                    const toggle = item.querySelector('.accordion-toggle');
                    const contentMobile = item.querySelector('.accordion-content-mobile');
                    if (toggle) { // !!! Додали перевірку !!!
                        item.classList.remove('is-active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                    if (contentMobile) { // !!! Додали перевірку !!!
                        contentMobile.setAttribute('aria-hidden', 'true');
                    }
                }
            });

            // Перемикаємо поточний акордеон
            if (isActive) {
                accordionItem.classList.remove('is-active');
                clickedToggle.setAttribute('aria-expanded', 'false');
                if (targetContentMobile) { // !!! Додали перевірку !!!
                    targetContentMobile.setAttribute('aria-hidden', 'true');
                }
            } else {
                accordionItem.classList.add('is-active');
                clickedToggle.setAttribute('aria-expanded', 'true');
                if (targetContentMobile) { // !!! Додали перевірку !!!
                    targetContentMobile.setAttribute('aria-hidden', 'false');
                }
            }
        }
    }

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => handleAccordionToggle(toggle));
    });

    function initializeAccordionState() {
        const firstItem = document.querySelector('.accordion-item');
        const firstToggle = firstItem ? firstItem.querySelector('.accordion-toggle') : null;
        const firstContentMobile = firstItem ? firstItem.querySelector('.accordion-content-mobile') : null;
        const firstContentDesktop = document.getElementById(firstToggle ? firstToggle.getAttribute('aria-controls').replace('-mobile', '-desktop') : null);

        const isDesktopInitial = window.getComputedStyle(accordionContainer).display === 'flex';

        // 1. Скидаємо всі активні стани для *всіх* елементів (важливо при ресайзі)
        document.querySelectorAll('.accordion-item').forEach(item => {
            const toggle = item.querySelector('.accordion-toggle');
            if (toggle) { // !!! Додали перевірку !!!
                item.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        document.querySelectorAll('.accordion-content-mobile').forEach(c => c.setAttribute('aria-hidden', 'true'));
        document.querySelectorAll('.accordion-content-desktop').forEach(c => {
            c.classList.remove('is-active');
            c.setAttribute('aria-hidden', 'true');
        });

        // 2. Встановлюємо початковий активний стан для першого елемента, якщо він існує
        if (firstItem && firstToggle) { // Перевірка firstContentMobile/Desktop робиться всередині
            if (isDesktopInitial) {
                // Десктоп: робимо перший елемент активним у лівій колонці
                firstItem.classList.add('is-active');
                firstToggle.setAttribute('aria-expanded', 'true');
                // Активуємо відповідну відповідь у правій колонці
                if (firstContentDesktop) { // !!! Додали перевірку !!!
                    firstContentDesktop.classList.add('is-active');
                    firstContentDesktop.setAttribute('aria-hidden', 'false');
                }
            } else {
                // Мобільний: робимо перший елемент активним за замовчуванням
                firstItem.classList.add('is-active');
                firstToggle.setAttribute('aria-expanded', 'true');
                if (firstContentMobile) { // !!! Додали перевірку !!!
                    firstContentMobile.setAttribute('aria-hidden', 'false');
                }
            }
        }
    }

    initializeAccordionState();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initializeAccordionState, 100);
    });
});
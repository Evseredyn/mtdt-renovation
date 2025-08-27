document.addEventListener('DOMContentLoaded', () => {
    const accordionToggles = document.querySelectorAll('.accordion-more__toggle');

    function handleAccordionToggle(clickedToggle) {
        const accordionItem = clickedToggle.closest('.accordion-more__item');
        if (!accordionItem) return;

        const targetId = clickedToggle.getAttribute('aria-controls');
        const targetContent = document.getElementById(targetId);

        const isActive = accordionItem.classList.contains('is-active');

        // Закриваємо всі інші відкриті акордеони
        document.querySelectorAll('.accordion-more__item.is-active').forEach(item => {
            if (item !== accordionItem) {
                const toggle = item.querySelector('.accordion-more__toggle');
                const content = item.querySelector('.accordion-more__content');
                if (toggle) {
                    item.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
                if (content) {
                    content.setAttribute('aria-hidden', 'true');
                }
            }
        });

        // Перемикаємо поточний акордеон
        if (isActive) {
            accordionItem.classList.remove('is-active');
            clickedToggle.setAttribute('aria-expanded', 'false');
            if (targetContent) {
                targetContent.setAttribute('aria-hidden', 'true');
            }
        } else {
            accordionItem.classList.add('is-active');
            clickedToggle.setAttribute('aria-expanded', 'true');
            if (targetContent) {
                targetContent.setAttribute('aria-hidden', 'false');
            }
        }
    }

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => handleAccordionToggle(toggle));
    });

    // Ініціалізуємо стан першого елемента акордеону
    const firstItem = document.querySelector('.accordion-more__item');
    if (firstItem) {
        firstItem.classList.add('is-active');
        const firstToggle = firstItem.querySelector('.accordion-more__toggle');
        const firstContent = firstItem.querySelector('.accordion-more__content');
        if (firstToggle) firstToggle.setAttribute('aria-expanded', 'true');
        if (firstContent) firstContent.setAttribute('aria-hidden', 'false');
    }
});
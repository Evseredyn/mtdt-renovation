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
            document.querySelectorAll('.accordion-item').forEach(item => {
                const toggle = item.querySelector('.accordion-toggle');
                if (toggle) {
                    item.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            document.querySelectorAll('.accordion-content-desktop').forEach(content => {
                content.classList.remove('is-active');
                content.setAttribute('aria-hidden', 'true');
            });

            if (accordionItem) {
                 accordionItem.classList.add('is-active');
                 clickedToggle.setAttribute('aria-expanded', 'true');
            }

            if (targetContentDesktop) {
                targetContentDesktop.classList.add('is-active');
                targetContentDesktop.setAttribute('aria-hidden', 'false');
            }

        } else {
            const isActive = accordionItem.classList.contains('is-active');

            document.querySelectorAll('.accordion-item.is-active').forEach(item => {
                if (item !== accordionItem) {
                    const toggle = item.querySelector('.accordion-toggle');
                    const contentMobile = item.querySelector('.accordion-content-mobile');
                    if (toggle) {
                        item.classList.remove('is-active');
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                    if (contentMobile) {
                        contentMobile.setAttribute('aria-hidden', 'true');
                    }
                }
            });

            if (isActive) {
                accordionItem.classList.remove('is-active');
                clickedToggle.setAttribute('aria-expanded', 'false');
                if (targetContentMobile) {
                    targetContentMobile.setAttribute('aria-hidden', 'true');
                }
            } else {
                accordionItem.classList.add('is-active');
                clickedToggle.setAttribute('aria-expanded', 'true');
                if (targetContentMobile) {
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

        document.querySelectorAll('.accordion-item').forEach(item => {
            const toggle = item.querySelector('.accordion-toggle');
            if (toggle) {
                item.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        document.querySelectorAll('.accordion-content-mobile').forEach(c => c.setAttribute('aria-hidden', 'true'));
        document.querySelectorAll('.accordion-content-desktop').forEach(c => {
            c.classList.remove('is-active');
            c.setAttribute('aria-hidden', 'true');
        });

        if (firstItem && firstToggle) {
            if (isDesktopInitial) {
                firstItem.classList.add('is-active');
                firstToggle.setAttribute('aria-expanded', 'true');
                if (firstContentDesktop) {
                    firstContentDesktop.classList.add('is-active');
                    firstContentDesktop.setAttribute('aria-hidden', 'false');
                }
            } else {
                firstItem.classList.add('is-active');
                firstToggle.setAttribute('aria-expanded', 'true');
                if (firstContentMobile) {
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
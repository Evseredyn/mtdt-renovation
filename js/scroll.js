document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

    if (!scrollToTopBtn) {
        return;
    }

    const scrollThreshold = 300;

    const toggleScrollToTopButton = () => {

        if (window.scrollY > scrollThreshold) {

            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleScrollToTopButton);

    scrollToTopBtn.addEventListener('click', scrollToTop);

    toggleScrollToTopButton();
});
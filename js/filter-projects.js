document.addEventListener('DOMContentLoaded', () => {
    const filterButtonsContainer = document.querySelector('.projects__list');
    const projectItems = document.querySelectorAll('.project__item');
    const ANIMATION_DURATION = 300;

    if (!filterButtonsContainer || projectItems.length === 0) {
        return;
    }

    const filterProjects = (category) => {
        projectItems.forEach(item => {
            item.classList.add('hidden'); 
        });

        setTimeout(() => {
            projectItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (category === itemCategory) {
                    item.style.display = 'block';
                    item.classList.remove('hidden'); 
                } else {

                    item.style.display = 'none'; 
                }
            });

        }, ANIMATION_DURATION);
    };

    const initializeActiveTab = () => {
        const activeButton = filterButtonsContainer.querySelector('.projects__btn.active');

        if (activeButton) {
            const defaultCategory = activeButton.dataset.filter;
            filterProjects(defaultCategory);
        } else {
            const firstButton = filterButtonsContainer.querySelector('.projects__btn');
            if (firstButton) {
                firstButton.classList.add('active');
                filterProjects(firstButton.dataset.filter);
            }
        }
    };

    filterButtonsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.projects__btn')) {
            const selectedCategory = target.dataset.filter;

            filterButtonsContainer.querySelectorAll('.projects__btn').forEach(btn => {
                btn.classList.remove('active');
            });
            target.classList.add('active');

            filterProjects(selectedCategory);
        }
    });

    initializeActiveTab();
});
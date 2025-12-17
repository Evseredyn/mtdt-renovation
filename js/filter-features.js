document.addEventListener('DOMContentLoaded', () => {

    const filterButtonsContainer = document.querySelector('.features__list');
    const featureItems = document.querySelectorAll('.feature__item'); 
    
    const ANIMATION_DURATION = 300; 

    if (!filterButtonsContainer || featureItems.length === 0) {
        return;
    }

    const filterFeatures = (category) => {
        featureItems.forEach(item => {
            item.classList.add('hidden'); 
        });

        setTimeout(() => {
            featureItems.forEach(item => {
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
        const activeButton = filterButtonsContainer.querySelector('.features__btn.active');

        if (activeButton) {
            const defaultCategory = activeButton.dataset.filter;
            filterFeatures(defaultCategory);
        } else {
            const firstButton = filterButtonsContainer.querySelector('.features__btn');
            if (firstButton) {
                firstButton.classList.add('active');
                filterFeatures(firstButton.dataset.filter);
            }
        }
    };

    filterButtonsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.features__btn')) {
            const selectedCategory = target.dataset.filter;
            
            if (target.classList.contains('active')) {
                return; 
            }

            filterButtonsContainer.querySelectorAll('.features__btn').forEach(btn => {
                btn.classList.remove('active');
            });
            target.classList.add('active');

            filterFeatures(selectedCategory);
        }
    });

    initializeActiveTab();
});
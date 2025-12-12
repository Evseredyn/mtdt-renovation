// $(document).ready(function() {
//     // Обробник кліку для кнопок фільтра
//     $('.features__btn').on('click', function() {
//         const $thisButton = $(this);
//         const filterValue = $thisButton.data('filter'); // Отримуємо значення data-filter

//         // 1. Оновлюємо активний стан кнопок фільтра
//         // Виправляємо: використовуємо селектор .features__btn
//         $('.features__btn').removeClass('active');
//         $thisButton.addClass('active');

//         // 2. Фільтруємо елементи
//         const $featureItems = $('.feature__list .feature__item');

//         // Спочатку приховуємо всі елементи
//         $featureItems.fadeOut(300, function() {
//             // Після того, як приховаються, показуємо тільки потрібні
//             // Вибираємо ті, у яких data-category співпадає з data-filter кнопки
//             $featureItems.filter('[data-category="' + filterValue + '"]').fadeIn(300);
//         });
//     });

//     // Ініціалізація: Активуємо фільтр першої вкладки
//     // Це забезпечить коректне відображення при першому завантаженні сторінки
//     $('.features__btn.active').trigger('click');
// });

document.addEventListener('DOMContentLoaded', () => {
    // Змінено селектори на ваші: .features__list та .feature__item
    const filterButtonsContainer = document.querySelector('.features__list');
    const featureItems = document.querySelectorAll('.feature__item'); 
    
    // Час анімації в мс (повинен співпадати з вашим CSS transition: 0.3s)
    const ANIMATION_DURATION = 300; 

    if (!filterButtonsContainer || featureItems.length === 0) {
        return;
    }

    // --- 1. ФУНКЦІЯ ФІЛЬТРАЦІЇ (Анімована, як у прикладі) ---
    const filterFeatures = (category) => {
        // 1. Початок анімації: приховуємо всі поточні ЕЛЕМЕНТИ
        featureItems.forEach(item => {
            // Запускаємо анімацію згасання (opacity: 1 -> 0)
            item.classList.add('hidden'); 
        });

        // 2. Чекаємо завершення анімації приховування (300 мс)
        setTimeout(() => {
            // 3. Після анімації, фізично оновлюємо display
            featureItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (category === itemCategory) {
                    // Показуємо елемент, встановлюючи display: block
                    item.style.display = 'block'; 
                    // Видаляємо клас 'hidden', щоб запустити анімацію проявлення (opacity: 0 -> 1)
                    item.classList.remove('hidden'); 
                } else {
                    // Приховуємо елемент фізично (не займає місця)
                    item.style.display = 'none'; 
                }
            });
        }, ANIMATION_DURATION);
    };

    // --- 2. ЛОГІКА ІНІЦІАЛІЗАЦІЇ (ВИБІР ЗА ACTIVE-КЛАСОМ) ---
    const initializeActiveTab = () => {
        // Знаходимо кнопку, яка вже має клас 'active' у HTML
        const activeButton = filterButtonsContainer.querySelector('.features__btn.active');

        if (activeButton) {
            const defaultCategory = activeButton.dataset.filter;
            // Застосовуємо фільтр
            filterFeatures(defaultCategory);
        } else {
            // Якщо active-класу немає, активуємо першу кнопку за замовчуванням
            const firstButton = filterButtonsContainer.querySelector('.features__btn');
            if (firstButton) {
                firstButton.classList.add('active');
                filterFeatures(firstButton.dataset.filter);
            }
        }
    };

    // --- 3. ОБРОБНИК КНОПОК ---
    filterButtonsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.features__btn')) {
            const selectedCategory = target.dataset.filter;
            
            // Перевіряємо, чи кнопка вже активна
            if (target.classList.contains('active')) {
                return; 
            }

            // Оновлення активного стану
            filterButtonsContainer.querySelectorAll('.features__btn').forEach(btn => {
                btn.classList.remove('active');
            });
            target.classList.add('active');

            // Виклик функції фільтрації
            filterFeatures(selectedCategory);
        }
    });

    // --- ЗАПУСК ІНІЦІАЛІЗАЦІЇ ---
    initializeActiveTab();
});
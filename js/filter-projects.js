// $(document).ready(function() {

//     // Обробник кліку для кнопок фільтра
//     $('.projects__btn').on('click', function() {
//         const $thisButton = $(this);
//         const filterValue = $thisButton.data('filter'); // Отримуємо значення data-filter

//         // 1. Оновлюємо активний стан кнопок фільтра
//         $('.projects__btn').removeClass('active'); // Прибираємо active з усіх кнопок
//         $thisButton.addClass('active'); // Додаємо active до натиснутої кнопки

//         // 2. Фільтруємо проєкти
//         const $projectItems = $('.project__list .project__item'); // Всі картки проєктів

//         if (filterValue === 'all') {
//             // Якщо вибрано "all" (наприклад, кнопка Home), показуємо всі проєкти
//             $projectItems.fadeIn(300); // Плавно показуємо всі
//         } else {
//             // Приховуємо всі проєкти спочатку
//             $projectItems.fadeOut(300, function() {
//                 // Після того, як приховаються, показуємо тільки потрібні
//                 // Вибираємо тільки ті, у яких data-category співпадає з filterValue
//                 $projectItems.filter('[data-category="' + filterValue + '"]').fadeIn(300);
//             });
//         }
//     });

//     // Ініціалізація: Активуємо фільтр "Home" (який відповідає "all" проектам за замовчуванням)
//     // Це забезпечить коректне відображення при першому завантаженні сторінки
//     $('.projects__btn.active').trigger('click'); // Імітуємо клік по активній кнопці
// });

document.addEventListener('DOMContentLoaded', () => {
    const filterButtonsContainer = document.querySelector('.projects__list');
    const projectItems = document.querySelectorAll('.project__item');

    if (!filterButtonsContainer || projectItems.length === 0) {
        return;
    }

    // --- 1. ФУНКЦІЯ ФІЛЬТРАЦІЇ ---
    const filterProjects = (category) => {
        projectItems.forEach(item => {
            const itemCategory = item.dataset.category;
            
            if (category === itemCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // --- 2. ЛОГІКА ІНІЦІАЛІЗАЦІЇ (ВИБІР ЗА ACTIVE-КЛАСОМ) ---
    const initializeActiveTab = () => {
        // Знаходимо кнопку, яка вже має клас 'active' у HTML
        const activeButton = filterButtonsContainer.querySelector('.projects__btn.active');

        if (activeButton) {
            const defaultCategory = activeButton.dataset.filter;
            
            // Застосовуємо фільтр на основі знайденого активного класу
            filterProjects(defaultCategory);
        } else {
            // Якщо жодна кнопка не має класу 'active' (наприклад, на сторінці 'About Us')
            // або ви пропустили його в HTML, за замовчуванням відкриваємо першу вкладку
            const firstButton = filterButtonsContainer.querySelector('.projects__btn');
            if (firstButton) {
                firstButton.classList.add('active');
                filterProjects(firstButton.dataset.filter);
            }
        }
    };

    // --- 3. ОБРОБНИК КНОПОК ---
    filterButtonsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.projects__btn')) {
            const selectedCategory = target.dataset.filter;

            // Оновлення активного стану
            filterButtonsContainer.querySelectorAll('.projects__btn').forEach(btn => {
                btn.classList.remove('active');
            });
            target.classList.add('active');

            // Виклик функції фільтрації
            filterProjects(selectedCategory);
        }
    });

    // --- ЗАПУСК ІНІЦІАЛІЗАЦІЇ ---
    initializeActiveTab();
});
// document.addEventListener('DOMContentLoaded', () => {
//     const contactForm = document.getElementById('contact-form');

//     if (!contactForm) return;

//     contactForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const submitBtn = contactForm.querySelector('.hero-form__submit-btn');
//         const originalBtnText = submitBtn.textContent;
        
//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Sending...';

//         const formData = new FormData(contactForm);

//         try {
//             const response = await fetch('send.php', {
//                 method: 'POST',
//                 body: formData
//             });

//             const result = await response.json();

//             if (result.status === 'success') {
//                 alert('Thank you! Your message has been sent.');
//                 contactForm.reset();
//             } else {
//                 alert('Error: ' + result.message);
//             }
//         } catch (error) {
//             alert('Something went wrong. Please try again later.');
//         } finally {
//             submitBtn.disabled = false;
//             submitBtn.textContent = originalBtnText;
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     // Вибираємо всі три типи твоїх форм
//     const forms = document.querySelectorAll('.hero-form, .contact-us-form__mob, .contact-us-form__pc');

//     forms.forEach(form => {
//         form.addEventListener('submit', async (e) => {
//             e.preventDefault(); // Зупиняємо перезавантаження сторінки

//             const submitBtn = form.querySelector('button[type="submit"]');
//             const originalText = submitBtn.textContent;
            
//             // Створюємо об'єкт даних
//             const formData = new FormData(form);

//             try {
//                 submitBtn.textContent = 'Sending...';
//                 submitBtn.disabled = true;

//                 // Відправляємо дані на send.php, який лежить в корені
//                 const response = await fetch('send.php', {
//                     method: 'POST',
//                     body: formData
//                 });

//                 // Отримуємо відповідь
//                 const result = await response.json();

//                 if (result.status === 'success') {
//                     alert('Success! Your message has been sent.');
//                     form.reset();
//                 } else {
//                     alert('Error: ' + result.message);
//                 }
//             } catch (error) {
//                 console.error('Fetch error:', error);
//                 alert('Could not connect to the server. Check if send.php exists.');
//             } finally {
//                 submitBtn.textContent = originalText;
//                 submitBtn.disabled = false;
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    // 1. Знаходимо абсолютно всі форми на сторінці
    const allForms = document.querySelectorAll('form');
    
    console.log(`System: Found ${allForms.length} forms to initialize.`);

    allForms.forEach((form, index) => {
        form.addEventListener('submit', async (e) => {
            // 2. Зупиняємо стандартну поведінку (перезавантаження та дані в URL)
            e.preventDefault();

            // Знаходимо кнопку саме в тій формі, яку зараз відправляють
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

            // Збираємо дані конкретної форми
            const formData = new FormData(form);

            try {
                // Візуальна індикація завантаження
                if (submitBtn) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                }

                // 3. Відправляємо дані на send.php
                const response = await fetch('send.php', {
                    method: 'POST',
                    body: formData
                });

                // Отримуємо відповідь як текст (для безпеки, якщо там не JSON)
                const responseText = await response.text();
                
                try {
                    const result = JSON.parse(responseText);
                    
                    if (result.status === 'success') {
                        alert('Success! Your message has been sent.');
                        form.reset(); // Очищуємо лише ту форму, яку відправили
                    } else {
                        alert('Server error: ' + result.message);
                    }
                } catch (jsonErr) {
                    console.error('Invalid JSON from server:', responseText);
                    alert('Server error. Please check the logs.');
                }

            } catch (error) {
                console.error('Submission error:', error);
                alert('Connection error. Make sure you are testing on a real hosting/server.');
            } finally {
                // Повертаємо кнопку в робочий стан
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    });
});
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
    // 1. Більш надійний вибір усіх форм на сторінці
    const forms = document.querySelectorAll('form[class*="form"]');
    
    console.log(`Знайдено форм на сторінці: ${forms.length}`); // Перевір це в консолі!

    forms.forEach((form, index) => {
        console.log(`Форма №${index + 1} клас:`, form.className);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return; // Захист, якщо в формі немає кнопки

            const originalText = submitBtn.textContent;
            const formData = new FormData(form);

            try {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                const response = await fetch('send.php', {
                    method: 'POST',
                    body: formData
                });

                // 2. Перевіряємо, чи взагалі прийшла відповідь від сервера
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                // 3. Читаємо відповідь як текст, щоб уникнути помилки JSON
                const responseText = await response.text();
                
                try {
                    const result = JSON.parse(responseText);
                    if (result.status === 'success') {
                        alert('Success! Your message has been sent.');
                        form.reset();
                    } else {
                        alert('PHP Error: ' + result.message);
                    }
                } catch (jsonError) {
                    console.error('Server returned non-JSON:', responseText);
                    alert('Server returned an invalid response. Check console.');
                }

            } catch (error) {
                console.error('Fetch error:', error);
                alert('Connection error: ' + error.message);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
});
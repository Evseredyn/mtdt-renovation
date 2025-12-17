document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.hero-form__submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('send.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert('Thank you! Your message has been sent.');
                contactForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            alert('Something went wrong. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
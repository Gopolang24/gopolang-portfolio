document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("formMessage");

    if (!name || !email || !subject || !message) {
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields to send your message.';
        formMessage.style.cssText = 'color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin-top: 20px; display: flex; align-items: center; gap: 10px;';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.innerHTML = '<i class="fas fa-envelope"></i> Please enter a valid email address.';
        formMessage.style.cssText = 'color: #f59e0b; background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 20px; display: flex; align-items: center; gap: 10px;';
        return;
    }

    formMessage.innerHTML = '<i class="fas fa-paper-plane"></i> Sending your message...';
    formMessage.style.cssText = 'color: #3b82f6; background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 20px; display: flex; align-items: center; gap: 10px;';

    try {
        const response = await fetch("https://formspree.io/f/mgoovdqg", {
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });

        if (response.ok) {
            formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            formMessage.style.cssText = 'color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px; display: flex; align-items: center; gap: 10px;';
            document.getElementById("contactForm").reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.innerHTML = '';
            }, 5000);
        } else {
            const errorData = await response.json();
            formMessage.innerHTML = '<i class="fas fa-times-circle"></i> Oops! Something went wrong. Please try again or email me directly at <a href="mailto:pantsog24@gmail.com" style="color: inherit; text-decoration: underline;">pantsog24@gmail.com</a>';
            formMessage.style.cssText = 'color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin-top: 20px; display: flex; align-items: center; gap: 10px;';
        }
    } catch (error) {
        formMessage.innerHTML = '<i class="fas fa-wifi"></i> Network error. Please check your connection or email me at <a href="mailto:pantsog24@gmail.com" style="color: inherit; text-decoration: underline;">pantsog24@gmail.com</a>';
        formMessage.style.cssText = 'color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin-top: 20px; display: flex; align-items: center; gap: 10px;';
    }
});

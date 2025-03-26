function showPopup(message, isSuccess = false) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.padding = '15px 25px';
    popup.style.borderRadius = '5px';
    popup.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
    popup.style.color = 'white';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.5s ease';
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

function validateForm(event) {
    console.log("Form submission initiated."); // Debugging line
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const contactNumber = document.getElementById('contact_number').value;
    const services = Array.from(document.querySelectorAll('input[name="services[]"]:checked')).map(cb => cb.value);

    if (!name || !email || !message || !contactNumber) {
        showPopup('Please fill in all required fields.');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showPopup('Please enter a valid email address.');
        return false;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(contactNumber)) {
        showPopup('Please enter a valid phone number.');
        return false;
    }

    // Get form data
    const formData = {
        name: name,
        email: email,
        message: message,
        contact_number: contactNumber,
        services: services
    };

    // Disable submit button during submission
    const submitButton = document.querySelector('form button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send form data using fetch
    fetch('submit_form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        if (data.success) {
            showPopup('Thank you! Your message has been sent successfully.', true);
            
            // Reset the form
            document.querySelector('form').reset();
        } else {
            showPopup('Error: ' + (data.error || 'Failed to send message. Please try again.'));
        }
    })
    .catch(error => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        showPopup('Error: Failed to send message. Please try again.');
        console.error('Error:', error);
    });

    return false;
}
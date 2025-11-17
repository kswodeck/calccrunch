// Contact Form Handler with EmailJS
const EMAILJS_SERVICE_ID = "service_4lr49ci"
const EMAILJS_TEMPLATE_ID = "template_u1dabor";
const EMAILJS_PUBLIC_KEY = "5BTJMoMuZEoOJVIXt";

// Initialize EmailJS (add this script tag to your HTML: https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');
    
    // Form field elements
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    const phoneField = document.getElementById('phone');
    
    // Real-time validation
    if (nameField) {
        nameField.addEventListener('blur', () => validateField(nameField, 'name'));
        nameField.addEventListener('input', () => clearError(nameField));
    }
    
    if (emailField) {
        emailField.addEventListener('blur', () => validateField(emailField, 'email'));
        emailField.addEventListener('input', () => clearError(emailField));
    }
    
    if (subjectField) {
        subjectField.addEventListener('blur', () => validateField(subjectField, 'subject'));
        subjectField.addEventListener('input', () => clearError(subjectField));
    }
    
    if (messageField) {
        messageField.addEventListener('blur', () => validateField(messageField, 'message'));
        messageField.addEventListener('input', () => {
            clearError(messageField);
            updateCharacterCount();
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('input', (e) => {
            formatPhoneNumber(e);
            clearError(phoneField);
        });
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize character counter
    updateCharacterCount();
});

// Validation functions
function validateField(field, type) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch(type) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Please enter a valid name';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (value.length < 5) {
                errorMessage = 'Subject must be at least 5 characters';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 20) {
                errorMessage = 'Message must be at least 20 characters';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Message must be less than 1000 characters';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        fieldGroup.appendChild(errorDiv);
    }
    
    field.classList.add('error');
}

function clearError(field) {
    const fieldGroup = field.closest('.form-group');
    const errorMessage = fieldGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.classList.remove('error');
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
}

function updateCharacterCount() {
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');
    
    if (messageField && charCounter) {
        const currentLength = messageField.value.length;
        const maxLength = 1000;
        charCounter.textContent = `${currentLength} / ${maxLength} characters`;
        
        if (currentLength > maxLength * 0.9) {
            charCounter.style.color = 'var(--color-error)';
        } else {
            charCounter.style.color = 'var(--color-gray-dark)';
        }
    }
}

function validateForm() {
    const nameValid = validateField(document.getElementById('name'), 'name');
    const emailValid = validateField(document.getElementById('email'), 'email');
    const subjectValid = validateField(document.getElementById('subject'), 'subject');
    const messageValid = validateField(document.getElementById('message'), 'message');
    
    return nameValid && emailValid && subjectValid && messageValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear any previous messages
    const formMessage = document.getElementById('formMessage');
    formMessage.className = 'form-message hidden';
    formMessage.textContent = '';
    
    // Validate form
    if (!validateForm()) {
        showFormMessage('Please fix the errors above before submitting.', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value.trim(),
        from_email: 'info@calccrunch.com',
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_email: 'info@calccrunch.com',
        reply_to: document.getElementById('email').value.trim()
    };
    
    // Show loading state
    const submitButton = document.getElementById('submitButton');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    try {
        // Check if EmailJS is loaded and configured
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded. Please check your configuration.');
        }
        
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
            throw new Error('Please configure your EmailJS credentials first.');
        }
        
        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_PUBLIC_KEY);
        
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showFormMessage('Thank you for contacting us! We\'ll respond within 24-48 hours.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        updateCharacterCount();
        
        // Track successful submission (optional - for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submission', {
                'event_category': 'engagement',
                'event_label': 'contact_form'
            });
        }
        
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Show error message
        let errorMessage = 'Sorry, there was an error sending your message. ';
        
        if (error.message.includes('configure')) {
            errorMessage += error.message;
        } else if (error.message.includes('EmailJS')) {
            errorMessage += 'Email service is not properly configured.';
        } else {
            errorMessage += 'Please try again later or email us directly at info@calccrunch.com.';
        }
        
        showFormMessage(errorMessage, 'error');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.classList.remove('hidden');
    
    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 10000);
    }
}

// Optional: Add spam protection with honeypot field
function addHoneypot() {
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
        // If honeypot field is filled, it's likely a bot
        console.log('Spam detected');
        return false;
    }
    return true;
}
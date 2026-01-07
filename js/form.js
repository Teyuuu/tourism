// Form Step Management
let currentStep = 1;
const totalSteps = 4;

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    updateProgressIndicator();
    updateNavigationButtons();
    
    // Form submission
    const form = document.getElementById('eventApplicationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Navigation buttons
    const btnNext = document.getElementById('btnNext');
    const btnPrevious = document.getElementById('btnPrevious');
    const btnSubmit = document.getElementById('btnSubmit');
    
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (validateCurrentStep()) {
                nextStep();
            }
        });
    }
    
    if (btnPrevious) {
        btnPrevious.addEventListener('click', () => {
            previousStep();
        });
    }
});

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = currentStepElement.querySelectorAll(`input[name="${field.name}"]`);
            const isRadioChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isRadioChecked) {
                isValid = false;
                field.closest('.form-group')?.classList.add('error');
            } else {
                field.closest('.form-group')?.classList.remove('error');
            }
        } else if (field.type === 'file') {
            if (!field.files || field.files.length === 0) {
                isValid = false;
                field.closest('.form-group')?.classList.add('error');
            } else {
                field.closest('.form-group')?.classList.remove('error');
            }
        } else {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.style.borderColor = '#dc2626';
            } else {
                field.classList.remove('error');
                field.style.borderColor = '';
            }
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Next step
function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current step
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show next step
        currentStep++;
        const nextStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (nextStepElement) {
            nextStepElement.classList.add('active');
            // Scroll to top of form
            nextStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        updateProgressIndicator();
        updateNavigationButtons();
    }
}

// Previous step
function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show previous step
        currentStep--;
        const prevStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (prevStepElement) {
            prevStepElement.classList.add('active');
            // Scroll to top of form
            prevStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        updateProgressIndicator();
        updateNavigationButtons();
    }
}

// Update progress indicator
function updateProgressIndicator() {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update progress lines
    lines.forEach((line, index) => {
        if (index + 1 < currentStep) {
            line.style.background = '#014696';
        } else {
            line.style.background = '#e0e0e0';
        }
    });
}

// Update navigation buttons
function updateNavigationButtons() {
    const btnPrevious = document.getElementById('btnPrevious');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');
    
    // Previous button
    if (btnPrevious) {
        btnPrevious.disabled = currentStep === 1;
    }
    
    // Next/Submit button
    if (currentStep === totalSteps) {
        if (btnNext) btnNext.style.display = 'none';
        if (btnSubmit) btnSubmit.style.display = 'inline-block';
    } else {
        if (btnNext) btnNext.style.display = 'inline-block';
        if (btnSubmit) btnSubmit.style.display = 'none';
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all steps first
    if (!validateAllSteps()) {
        return;
    }
    
    // Show confirmation modal only if all steps are valid
    showConfirmationModal();
}

// Validate all steps
function validateAllSteps() {
    let allValid = true;
    let firstInvalidStep = null;
    
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.querySelector(`.form-step[data-step="${i}"]`);
        if (stepElement) {
            const requiredFields = stepElement.querySelectorAll('input[required], textarea[required]');
            let stepValid = true;
            
            requiredFields.forEach(field => {
                let fieldValid = true;
                
                if (field.type === 'radio') {
                    const radioGroup = stepElement.querySelectorAll(`input[name="${field.name}"]`);
                    const isRadioChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isRadioChecked) {
                        fieldValid = false;
                        stepValid = false;
                    }
                } else if (field.type === 'file') {
                    if (!field.files || field.files.length === 0) {
                        fieldValid = false;
                        stepValid = false;
                    }
                } else if (field.type === 'email') {
                    // Email validation
                    const emailValue = field.value.trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailValue || !emailRegex.test(emailValue)) {
                        fieldValid = false;
                        stepValid = false;
                    }
                } else {
                    if (!field.value.trim()) {
                        fieldValid = false;
                        stepValid = false;
                    }
                }
                
                // Mark field as invalid
                if (!fieldValid) {
                    field.classList.add('error');
                    field.style.borderColor = '#dc2626';
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = '';
                }
            });
            
            if (!stepValid) {
                allValid = false;
                if (!firstInvalidStep) {
                    firstInvalidStep = i;
                }
            }
        }
    }
    
    // If validation failed, go to first invalid step
    if (!allValid && firstInvalidStep) {
        // Show the invalid step
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        const invalidStep = document.querySelector(`.form-step[data-step="${firstInvalidStep}"]`);
        if (invalidStep) {
            invalidStep.classList.add('active');
            currentStep = firstInvalidStep;
            updateProgressIndicator();
            updateNavigationButtons();
            invalidStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        showToast('Please fill in all required fields correctly', 'error');
        return false;
    }
    
    return true;
}

// Show confirmation modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        const btnCancel = document.getElementById('btnCancelConfirm');
        const btnConfirm = document.getElementById('btnConfirmSubmit');
        
        if (btnCancel) {
            btnCancel.onclick = () => closeConfirmationModal();
        }
        
        if (btnConfirm) {
            btnConfirm.onclick = () => {
                closeConfirmationModal();
                processFormSubmission();
            };
        }
        
        // Close on overlay click
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeConfirmationModal();
            }
        };
    }
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('confirmationModal');
        if (modal && modal.classList.contains('show')) {
            closeConfirmationModal();
        }
    }
});

// Process form submission after confirmation
function processFormSubmission() {
    // Validation already done before showing confirmation modal
    // Just proceed with submission
    
    // Show success page
    const formContainer = document.querySelector('.form-page-container');
    const successPage = document.getElementById('successPage');
    
    if (formContainer) formContainer.style.display = 'none';
    if (successPage) {
        successPage.style.display = 'flex';
        successPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Show toast notification
    showToast('Event application submitted successfully!', 'success');
    
    // Note: In a real application, you would send the form data to a server here
    // For demo purposes, we're just showing the success message
    const form = document.getElementById('eventApplicationForm');
    if (form) {
        console.log('Form data (demo - not saved):', new FormData(form));
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .form-group.error input,
    .form-group.error textarea {
        border-color: #dc2626 !important;
    }
    
    .form-group.error label {
        color: #dc2626;
    }
`;
document.head.appendChild(style);

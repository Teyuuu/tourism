// Form Step Management
let currentStep = 1;
const totalSteps = 4;
let privacyAgreed = false;
let modalCompleted = false;

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    // Show privacy modal on page load
    showPrivacyModal();
    
    // Hide form container initially
    const formContainer = document.getElementById('formContainer');
    if (formContainer) {
        formContainer.style.display = 'none';
    }
    
    // Privacy agreement buttons
    const privacyAgreeBtn = document.getElementById('privacyAgree');
    const privacyDisagreeBtn = document.getElementById('privacyDisagree');
    
    if (privacyAgreeBtn) {
        privacyAgreeBtn.addEventListener('click', () => {
            privacyAgreed = true;
            privacyAgreeBtn.classList.add('active');
            privacyDisagreeBtn.classList.remove('active');
            hideError('privacyError');
            checkAndProceed();
        });
    }
    
    if (privacyDisagreeBtn) {
        privacyDisagreeBtn.addEventListener('click', () => {
            privacyAgreed = false;
            privacyDisagreeBtn.classList.add('active');
            privacyAgreeBtn.classList.remove('active');
            showError('privacyError', 'You must agree to the Data Privacy Notice to proceed with the application');
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('applicantEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validateEmail();
            checkAndProceed();
        });
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim()) {
                hideError('emailError');
                emailInput.classList.remove('error');
            }
            checkAndProceed();
        });
    }
    
    // Only initialize form if modal is completed
    if (modalCompleted) {
        initializeForm();
    }
});

// Show privacy modal
function showPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close privacy modal
function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Check if conditions are met and proceed automatically
function checkAndProceed() {
    const emailInput = document.getElementById('applicantEmail');
    const emailValid = emailInput && emailInput.value.trim() && validateEmailFormat(emailInput.value.trim());
    
    // If both email is valid and user agreed, proceed automatically
    if (privacyAgreed && emailValid) {
        // Small delay to show the agreement state
        setTimeout(() => {
            closePrivacyModal();
            modalCompleted = true;
            
            const formContainer = document.getElementById('formContainer');
            if (formContainer) {
                formContainer.style.display = 'block';
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Initialize form
            initializeForm();
        }, 300);
    }
}

// Validate email format
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form functionality
function initializeForm() {
    updateProgressIndicator();
    updateNavigationButtons();
    
    // Program Schedule radio button handler
    const programApplicable = document.getElementById('programApplicable');
    const programNotApplicable = document.getElementById('programNotApplicable');
    const programScheduleAttachment = document.getElementById('programScheduleAttachment');
    const programScheduleInput = document.getElementById('programSchedule');
    
    if (programApplicable && programNotApplicable && programScheduleAttachment) {
        // Handle radio button changes
        programApplicable.addEventListener('change', () => {
            if (programApplicable.checked) {
                programScheduleAttachment.style.display = 'block';
                if (programScheduleInput) {
                    programScheduleInput.setAttribute('required', 'required');
                }
            }
        });
        
        programNotApplicable.addEventListener('change', () => {
            if (programNotApplicable.checked) {
                programScheduleAttachment.style.display = 'none';
                if (programScheduleInput) {
                    programScheduleInput.removeAttribute('required');
                    programScheduleInput.value = ''; // Clear the file input
                }
            }
        });
        
        // Check initial state on page load
        if (programApplicable.checked) {
            programScheduleAttachment.style.display = 'block';
            if (programScheduleInput) {
                programScheduleInput.setAttribute('required', 'required');
            }
        } else if (programNotApplicable.checked) {
            programScheduleAttachment.style.display = 'none';
            if (programScheduleInput) {
                programScheduleInput.removeAttribute('required');
            }
        }
    }
    
    // Traffic Management Plan radio button handler
    const trafficApplicable = document.getElementById('trafficApplicable');
    const trafficNotApplicable = document.getElementById('trafficNotApplicable');
    const trafficPlanAttachment = document.getElementById('trafficPlanAttachment');
    const trafficPlanInput = document.getElementById('trafficPlan');
    
    if (trafficApplicable && trafficNotApplicable && trafficPlanAttachment) {
        // Handle radio button changes
        trafficApplicable.addEventListener('change', () => {
            if (trafficApplicable.checked) {
                trafficPlanAttachment.style.display = 'block';
                if (trafficPlanInput) {
                    trafficPlanInput.setAttribute('required', 'required');
                }
            }
        });
        
        trafficNotApplicable.addEventListener('change', () => {
            if (trafficNotApplicable.checked) {
                trafficPlanAttachment.style.display = 'none';
                if (trafficPlanInput) {
                    trafficPlanInput.removeAttribute('required');
                    trafficPlanInput.value = ''; // Clear the file input
                }
            }
        });
        
        // Check initial state on page load
        if (trafficApplicable.checked) {
            trafficPlanAttachment.style.display = 'block';
            if (trafficPlanInput) {
                trafficPlanInput.setAttribute('required', 'required');
            }
        } else if (trafficNotApplicable.checked) {
            trafficPlanAttachment.style.display = 'none';
            if (trafficPlanInput) {
                trafficPlanInput.removeAttribute('required');
            }
        }
    }
    
    // View Sample button for Traffic Management Plan
    const viewTrafficSampleBtn = document.getElementById('viewTrafficSample');
    if (viewTrafficSampleBtn) {
        viewTrafficSampleBtn.addEventListener('click', () => {
            openTrafficSampleModal();
        });
    }
    
    // Initialize Traffic Sample Modal zoom functionality
    initializeTrafficSampleModal();
    
    // Emergency Management Plan Template Link
    const emergencyTemplateLink = document.getElementById('emergencyTemplateLink');
    if (emergencyTemplateLink) {
        // Update this URL with your actual emergency management plan template link
        emergencyTemplateLink.href = 'https://docs.google.com/document/d/1tTppWiU5bjL9hFlR9SCNe_-NEoByHXI5t1WlP1DCtcw/edit?tab=t.0'; // Replace with actual template link
    }
    
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
}

// Validate email and privacy before proceeding
function validateFormPrerequisites() {
    const emailInput = document.getElementById('applicantEmail');
    let isValid = true;
    
    // Validate email
    if (!emailInput || !emailInput.value.trim()) {
        showError('emailError', 'Please enter your email address before proceeding');
        if (emailInput) {
            emailInput.classList.add('error');
        }
        isValid = false;
    } else if (!validateEmail()) {
        isValid = false;
    }
    
    // Validate privacy agreement
    if (!privacyAgreed) {
        showError('privacyError', 'You must agree to the Data Privacy Notice to proceed with the application');
        isValid = false;
    } else {
        hideError('privacyError');
    }
    
    return isValid;
}

// Validate email format
function validateEmail() {
    const emailInput = document.getElementById('applicantEmail');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput) return false;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('emailError', 'Please enter your email address before proceeding');
        emailInput.classList.add('error');
        return false;
    }
    
    if (!validateEmailFormat(email)) {
        showError('emailError', 'Please enter a valid email address');
        emailInput.classList.add('error');
        return false;
    }
    
    hideError('emailError');
    emailInput.classList.remove('error');
    return true;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        const span = errorElement.querySelector('span');
        if (span) {
            span.textContent = message;
        }
        errorElement.style.display = 'flex';
    }
}

// Hide error message
function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Validate current step
function validateCurrentStep() {
    // Check if modal was completed
    if (!modalCompleted) {
        showPrivacyModal();
        return false;
    }
    
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    // Special handling for program schedule and traffic plan in step 4
    if (currentStep === 4) {
        // Program Schedule validation
        const programApplicable = document.getElementById('programApplicable');
        const programScheduleInput = document.getElementById('programSchedule');
        
        if (programApplicable && programScheduleInput) {
            if (programApplicable.checked) {
                // If applicable is selected, file is required
                if (!programScheduleInput.files || programScheduleInput.files.length === 0) {
                    isValid = false;
                    programScheduleInput.closest('.form-group')?.classList.add('error');
                } else {
                    programScheduleInput.closest('.form-group')?.classList.remove('error');
                }
            } else {
                // If not applicable, remove error state
                programScheduleInput.closest('.form-group')?.classList.remove('error');
            }
        }
        
        // Traffic Management Plan validation
        const trafficApplicable = document.getElementById('trafficApplicable');
        const trafficPlanInput = document.getElementById('trafficPlan');
        
        if (trafficApplicable && trafficPlanInput) {
            if (trafficApplicable.checked) {
                // If applicable is selected, file is required
                if (!trafficPlanInput.files || trafficPlanInput.files.length === 0) {
                    isValid = false;
                    trafficPlanInput.closest('.form-group')?.classList.add('error');
                } else {
                    trafficPlanInput.closest('.form-group')?.classList.remove('error');
                }
            } else {
                // If not applicable, remove error state
                trafficPlanInput.closest('.form-group')?.classList.remove('error');
            }
        }
    }
    
    requiredFields.forEach(field => {
        // Skip program schedule file if not applicable
        if (field.id === 'programSchedule') {
            const programApplicable = document.getElementById('programApplicable');
            if (programApplicable && !programApplicable.checked) {
                return; // Skip validation for this field
            }
        }
        
        // Skip traffic plan file if not applicable
        if (field.id === 'trafficPlan') {
            const trafficApplicable = document.getElementById('trafficApplicable');
            if (trafficApplicable && !trafficApplicable.checked) {
                return; // Skip validation for this field
            }
        }
        
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
                // Red border removed for better visual
            } else {
                field.classList.remove('error');
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
    // Check if modal was completed
    if (!modalCompleted) {
        showPrivacyModal();
        return false;
    }
    
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
                    // Red border removed for better visual
                } else {
                    field.classList.remove('error');
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
        /* Red border removed for better visual */
    }
    
    .form-group.error label {
        /* Label color kept for subtle indication */
    }
`;
document.head.appendChild(style);

// Traffic Management Plan Sample Modal Functions
let trafficZoom = 1;
let trafficIsDragging = false;
let trafficStartX = 0;
let trafficStartY = 0;
let trafficScrollLeft = 0;
let trafficScrollTop = 0;

function initializeTrafficSampleModal() {
    const imageModalBody = document.getElementById('trafficImageModalBody');
    if (imageModalBody) {
        // Mouse wheel zoom
        imageModalBody.addEventListener('wheel', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                zoomTrafficImage(delta);
            }
        }, { passive: false });
        
        // Pan/drag functionality when zoomed
        imageModalBody.addEventListener('mousedown', function(e) {
            if (trafficZoom > 1) {
                trafficIsDragging = true;
                trafficStartX = e.pageX - imageModalBody.offsetLeft;
                trafficStartY = e.pageY - imageModalBody.offsetTop;
                trafficScrollLeft = imageModalBody.scrollLeft;
                trafficScrollTop = imageModalBody.scrollTop;
            }
        });
        
        imageModalBody.addEventListener('mouseleave', function() {
            trafficIsDragging = false;
        });
        
        imageModalBody.addEventListener('mouseup', function() {
            trafficIsDragging = false;
        });
        
        imageModalBody.addEventListener('mousemove', function(e) {
            if (!trafficIsDragging) return;
            e.preventDefault();
            const x = e.pageX - imageModalBody.offsetLeft;
            const y = e.pageY - imageModalBody.offsetTop;
            const walkX = (x - trafficStartX) * 2;
            const walkY = (y - trafficStartY) * 2;
            imageModalBody.scrollLeft = trafficScrollLeft - walkX;
            imageModalBody.scrollTop = trafficScrollTop - walkY;
        });
    }
}

function openTrafficSampleModal() {
    const modal = document.getElementById('trafficSampleModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        resetTrafficZoom();
    }
}

function closeTrafficSampleModal() {
    const modal = document.getElementById('trafficSampleModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        resetTrafficZoom();
    }
}

function zoomTrafficImage(delta) {
    const img = document.getElementById('trafficSampleImage');
    const modalBody = document.getElementById('trafficImageModalBody');
    if (!img || !modalBody) return;
    
    trafficZoom = Math.max(0.5, Math.min(3, trafficZoom + delta));
    img.style.transform = `scale(${trafficZoom})`;
    
    // Update cursor style based on zoom level
    if (trafficZoom > 1) {
        modalBody.classList.add('zoom-active');
    } else {
        modalBody.classList.remove('zoom-active');
    }
    
    updateTrafficZoomButtons();
}

function resetTrafficZoom() {
    const img = document.getElementById('trafficSampleImage');
    const modalBody = document.getElementById('trafficImageModalBody');
    if (!img || !modalBody) return;
    
    trafficZoom = 1;
    img.style.transform = 'scale(1)';
    modalBody.classList.remove('zoom-active');
    updateTrafficZoomButtons();
    
    // Reset scroll position
    modalBody.scrollLeft = 0;
    modalBody.scrollTop = 0;
}

function updateTrafficZoomButtons() {
    const zoomOutBtn = document.getElementById('trafficZoomOutBtn');
    const zoomInBtn = document.getElementById('trafficZoomInBtn');
    
    if (zoomOutBtn) {
        zoomOutBtn.disabled = trafficZoom <= 0.5;
        zoomOutBtn.style.opacity = trafficZoom <= 0.5 ? '0.5' : '1';
        zoomOutBtn.style.cursor = trafficZoom <= 0.5 ? 'not-allowed' : 'pointer';
    }
    
    if (zoomInBtn) {
        zoomInBtn.disabled = trafficZoom >= 3;
        zoomInBtn.style.opacity = trafficZoom >= 3 ? '0.5' : '1';
        zoomInBtn.style.cursor = trafficZoom >= 3 ? 'not-allowed' : 'pointer';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('trafficSampleModal');
    if (e.target === modal) {
        closeTrafficSampleModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('trafficSampleModal');
        if (modal && modal.style.display === 'flex') {
            closeTrafficSampleModal();
        }
    }
});

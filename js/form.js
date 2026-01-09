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
            const emailInput = document.getElementById('applicantEmail');
            
            // Check if email is empty
            if (!emailInput || !emailInput.value.trim()) {
                showError('emailError', 'Please enter your email address before agreeing');
                if (emailInput) {
                    emailInput.classList.add('error');
                    emailInput.focus();
                }
                return; // Don't proceed if email is empty
            }
            
            // Validate email format
            if (!validateEmailFormat(emailInput.value.trim())) {
                showError('emailError', 'Please enter a valid email address');
                emailInput.classList.add('error');
                emailInput.focus();
                return; // Don't proceed if email is invalid
            }
            
            // If email is valid, proceed with agreement
            privacyAgreed = true;
            privacyAgreeBtn.classList.add('active');
            privacyDisagreeBtn.classList.remove('active');
            hideError('privacyError');
            hideError('emailError');
            if (emailInput) {
                emailInput.classList.remove('error');
            }
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
    
    // Cancel button
    const privacyCancelBtn = document.getElementById('privacyCancel');
    if (privacyCancelBtn) {
        privacyCancelBtn.addEventListener('click', () => {
            // Redirect to homepage
            window.location.href = 'index.html';
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
                // Remove error class from parent form-group if exists
                emailInput.closest('.form-group')?.classList.remove('error');
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
    
    // Add number-only validation for phone number fields
    setupNumberOnlyValidation();
    
    // Setup character limit validation and counters
    setupCharacterLimitValidation();
    
    // Setup phone number validation
    setupPhoneNumberValidation();
    
    // Setup real-time validation feedback
    setupRealTimeValidation();
    
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
                // Character limits map
                const characterLimits = {
                    'eventTitle': 200,
                    'eventDuration': 100,
                    'eventVenue': 200,
                    'contactName': 100,
                    'contactAddress': 200,
                    'organizerBackground': 1000,
                    'eventDescription': 1500,
                    'audienceProfile': 1000,
                    'guestsList': 1000,
                    'vipsList': 1000
                };
                
                // Field name map for error messages
                const fieldNames = {
                    'eventTitle': 'Title of Event',
                    'eventDuration': 'Duration of Event',
                    'eventVenue': 'Venue',
                    'contactName': 'Name of Contact Person',
                    'contactAddress': 'Address of Contact Person',
                    'organizerBackground': 'Background of Organizer/Organization',
                    'eventDescription': 'Background / Description of Event',
                    'audienceProfile': 'Audience Profile',
                    'guestsList': 'List of Guests Attending',
                    'vipsList': 'List of VIPs Attending'
                };
                
                // Check character limits for text/textarea fields
                if (characterLimits[field.id] && field.value.length > characterLimits[field.id]) {
                    isValid = false;
                    field.classList.add('error');
                    const fieldName = fieldNames[field.id] || field.id;
                    showToast(`${fieldName} must not exceed ${characterLimits[field.id]} characters`, 'error');
                } else if (field.id === 'contactCellphone') {
                    // Check cellphone digit count
                    const digitCount = (field.value.match(/\d/g) || []).length;
                    if (digitCount > 11) {
                        isValid = false;
                        field.classList.add('error');
                        showToast('Cellphone Number must not exceed 11 digits', 'error');
                    } else {
                        field.classList.remove('error');
                    }
                } else if (field.id === 'contactTelephone' && field.value.trim()) {
                    // Check telephone digit count (only if field has value since it's optional)
                    const digitCount = (field.value.match(/\d/g) || []).length;
                    if (digitCount > 12) {
                        isValid = false;
                        field.classList.add('error');
                        showToast('Telephone Number must not exceed 12 digits', 'error');
                    } else {
                        field.classList.remove('error');
                    }
                } else {
                    // Remove error class for fields that passed validation
                    field.classList.remove('error');
                }
            }
        }
    });
    
    if (!isValid) {
        // Scroll to first invalid field
        highlightInvalidFields(currentStep);
        if (!document.querySelector('.form-step[data-step="' + currentStep + '"] .form-group input.error, .form-step[data-step="' + currentStep + '"] .form-group textarea.error')) {
            showToast('Please fill in all required fields', 'error');
        }
    } else {
        // Remove all error highlights from current step
        clearErrorHighlights(currentStep);
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
        // Highlight invalid fields and scroll to first error
        highlightAllInvalidFields();
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
    
    // Character limits map
    const characterLimits = {
        'eventTitle': 200,
        'eventDuration': 100,
        'eventVenue': 200,
        'contactName': 100,
        'contactAddress': 200,
        'organizerBackground': 1000,
        'eventDescription': 1500,
        'audienceProfile': 1000,
        'guestsList': 1000,
        'vipsList': 1000
    };
    
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.querySelector(`.form-step[data-step="${i}"]`);
        if (stepElement) {
            const requiredFields = stepElement.querySelectorAll('input[required], textarea[required]');
            // Also check optional fields with character limits if they have values
            const optionalFieldsWithLimits = stepElement.querySelectorAll('input[maxlength], textarea[maxlength]');
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
                    } else {
                        // Check character limits for text/textarea fields
                        if (characterLimits[field.id] && field.value.length > characterLimits[field.id]) {
                            fieldValid = false;
                            stepValid = false;
                        } else if (field.id === 'contactCellphone') {
                            // Check cellphone digit count
                            const digitCount = (field.value.match(/\d/g) || []).length;
                            if (digitCount > 11) {
                                fieldValid = false;
                                stepValid = false;
                            }
                        } else if (field.id === 'contactTelephone' && field.value.trim()) {
                            // Check telephone digit count (only if field has value since it's optional)
                            const digitCount = (field.value.match(/\d/g) || []).length;
                            if (digitCount > 12) {
                                fieldValid = false;
                                stepValid = false;
                            }
                        }
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
            
            // Also validate optional fields with character limits if they have values
            optionalFieldsWithLimits.forEach(field => {
                // Skip if field is already required (already validated above)
                if (field.hasAttribute('required')) {
                    return;
                }
                
                // Only validate if field has a value
                if (field.value.trim()) {
                    if (characterLimits[field.id] && field.value.length > characterLimits[field.id]) {
                        field.classList.add('error');
                        stepValid = false;
                        allValid = false;
                        if (!firstInvalidStep) {
                            firstInvalidStep = i;
                        }
                    } else {
                        field.classList.remove('error');
                    }
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

// Highlight invalid fields in a specific step and scroll to first error
function highlightInvalidFields(stepNumber) {
    const stepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (!stepElement) return;
    
    // Find first invalid field
    const firstInvalidField = stepElement.querySelector('.form-group.error input, .form-group.error textarea, input.error, textarea.error, .form-group.error input[type="file"]');
    
    if (firstInvalidField) {
        // Scroll to the invalid field with smooth behavior
        setTimeout(() => {
            firstInvalidField.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            
            // Focus on the field if it's not a file input or radio
            if (firstInvalidField.type !== 'file' && firstInvalidField.type !== 'radio') {
                firstInvalidField.focus();
            }
        }, 100);
    }
}

// Clear error highlights from a specific step
function clearErrorHighlights(stepNumber) {
    const stepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (!stepElement) return;
    
    stepElement.querySelectorAll('.form-group.error, input.error, textarea.error').forEach(element => {
        element.classList.remove('error');
    });
}

// Highlight all invalid fields across all steps
function highlightAllInvalidFields() {
    let firstInvalidField = null;
    
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.querySelector(`.form-step[data-step="${i}"]`);
        if (!stepElement) continue;
        
        const invalidFields = stepElement.querySelectorAll('.form-group.error input, .form-group.error textarea, input.error, textarea.error, .form-group.error input[type="file"]');
        
        if (invalidFields.length > 0 && !firstInvalidField) {
            firstInvalidField = invalidFields[0];
        }
    }
    
    if (firstInvalidField) {
        // Scroll to the first invalid field
        setTimeout(() => {
            firstInvalidField.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            
            // Focus on the field if it's not a file input or radio
            if (firstInvalidField.type !== 'file' && firstInvalidField.type !== 'radio') {
                firstInvalidField.focus();
            }
        }, 300);
    }
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

// Setup character limit validation and counters
function setupCharacterLimitValidation() {
    // Character limits for all text/textarea fields
    const characterLimits = {
        // Step 1: Event Info
        'eventTitle': 200,
        'eventDuration': 100,
        'eventVenue': 200,
        // Step 2: Event Profile Sheet
        'contactName': 100,
        'contactAddress': 200,
        'organizerBackground': 1000,
        // Step 3: Event Details
        'eventDescription': 1500,
        'audienceProfile': 1000,
        'guestsList': 1000,
        'vipsList': 1000
    };
    
    // Initialize counters and add event listeners
    Object.keys(characterLimits).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const counter = document.getElementById(fieldId + 'Counter');
        
        if (field && counter) {
            const maxLength = characterLimits[fieldId];
            
            // Update counter on input
            field.addEventListener('input', function() {
                const currentLength = this.value.length;
                counter.textContent = `${currentLength} / ${maxLength} characters`;
                
                // Update counter styling based on length
                counter.classList.remove('warning', 'error');
                if (currentLength >= maxLength) {
                    counter.classList.add('error');
                } else if (currentLength >= maxLength * 0.9) {
                    counter.classList.add('warning');
                }
            });
            
            // Initialize counter on page load
            const currentLength = field.value.length;
            counter.textContent = `${currentLength} / ${maxLength} characters`;
            if (currentLength >= maxLength) {
                counter.classList.add('error');
            } else if (currentLength >= maxLength * 0.9) {
                counter.classList.add('warning');
            }
        }
    });
}

// Validate character limits for a specific field
function validateCharacterLimit(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    if (!field) return true;
    
    const value = field.value.trim();
    if (value.length > maxLength) {
        field.classList.add('error');
        showToast(`${field.previousElementSibling?.textContent?.trim() || 'Field'} exceeds the maximum length of ${maxLength} characters`, 'error');
        return false;
    }
    return true;
}

// Setup phone number validation with digit counting
function setupPhoneNumberValidation() {
    // Phone number limits (digits only, not including formatting)
    const phoneLimits = {
        'contactCellphone': 11,  // Max 11 digits for cellphone
        'contactTelephone': 12   // Max 12 digits for telephone (allows for area codes and formatting)
    };
    
    Object.keys(phoneLimits).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const counter = document.getElementById(fieldId + 'Counter');
        
        if (field && counter) {
            const maxDigits = phoneLimits[fieldId];
            
            // Function to count digits in a string
            const countDigits = (str) => {
                return (str.match(/\d/g) || []).length;
            };
            
            // Update counter on input
            field.addEventListener('input', function() {
                const digitCount = countDigits(this.value);
                counter.textContent = `${digitCount} / ${maxDigits} digits`;
                
                // Update counter styling based on digit count
                counter.classList.remove('warning', 'error');
                if (digitCount > maxDigits) {
                    counter.classList.add('error');
                } else if (digitCount >= maxDigits * 0.9) {
                    counter.classList.add('warning');
                }
            });
            
            // Initialize counter on page load
            const digitCount = countDigits(field.value);
            counter.textContent = `${digitCount} / ${maxDigits} digits`;
            if (digitCount > maxDigits) {
                counter.classList.add('error');
            } else if (digitCount >= maxDigits * 0.9) {
                counter.classList.add('warning');
            }
        }
    });
}

// Setup real-time validation feedback - remove error class when user starts typing
function setupRealTimeValidation() {
    // Get all form inputs and textareas
    const formFields = document.querySelectorAll('#eventApplicationForm input, #eventApplicationForm textarea');
    
    formFields.forEach(field => {
        // Skip radio buttons and file inputs for input event
        if (field.type === 'radio' || field.type === 'file') return;
        
        // Remove error class when user starts typing
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                field.classList.remove('error');
                field.closest('.form-group')?.classList.remove('error');
            }
        });
        
        // Remove error class on blur if field is valid
        field.addEventListener('blur', () => {
            if (field.value.trim() && field.checkValidity()) {
                field.classList.remove('error');
                field.closest('.form-group')?.classList.remove('error');
            }
        });
    });
    
    // Handle file inputs separately
    const fileInputs = document.querySelectorAll('#eventApplicationForm input[type="file"]');
    fileInputs.forEach(fileInput => {
        fileInput.addEventListener('change', () => {
            if (fileInput.files && fileInput.files.length > 0) {
                fileInput.classList.remove('error');
                fileInput.closest('.form-group')?.classList.remove('error');
            }
        });
    });
}

// Validate phone number digit count
function validatePhoneNumber(fieldId, maxDigits) {
    const field = document.getElementById(fieldId);
    if (!field) return true;
    
    const value = field.value.trim();
    if (!value) {
        // If field is optional (telephone), empty is valid
        if (fieldId === 'contactTelephone') {
            return true;
        }
        // If field is required (cellphone), empty is invalid
        return false;
    }
    
    // Count only digits
    const digitCount = (value.match(/\d/g) || []).length;
    
    if (digitCount > maxDigits) {
        field.classList.add('error');
        const fieldName = fieldId === 'contactCellphone' ? 'Cellphone Number' : 'Telephone Number';
        showToast(`${fieldName} must not exceed ${maxDigits} digits`, 'error');
        return false;
    }
    
    return true;
}

// Setup number-only validation for fields that should only accept numbers
function setupNumberOnlyValidation() {
    // Phone number fields - only allow numbers, spaces, dashes, parentheses, and plus sign
    const phoneFields = [
        'contactCellphone',
        'contactTelephone'
    ];
    
    phoneFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Allow only numbers and common phone number characters
            field.addEventListener('input', function(e) {
                // Remove any characters that are not numbers, spaces, dashes, parentheses, or plus
                let value = this.value.replace(/[^0-9\s\-()\+]/g, '');
                this.value = value;
            });
            
            // Prevent paste of non-numeric characters
            field.addEventListener('paste', function(e) {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                // Only allow numbers and common phone number characters
                const cleaned = paste.replace(/[^0-9\s\-()\+]/g, '');
                this.value = cleaned;
            });
            
            // Prevent non-numeric key presses (allow backspace, delete, tab, arrow keys, etc.)
            field.addEventListener('keydown', function(e) {
                // Allow: backspace, delete, tab, escape, enter, home, end, arrow keys
                if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                    return;
                }
                // Ensure that it is a number, space, dash, parenthesis, or plus and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
                    (e.keyCode < 96 || e.keyCode > 105) &&
                    e.keyCode !== 32 && // space
                    e.keyCode !== 45 && // dash
                    e.keyCode !== 40 && // left parenthesis
                    e.keyCode !== 41 && // right parenthesis
                    e.keyCode !== 187) { // plus
                    e.preventDefault();
                }
            });
        }
    });
}

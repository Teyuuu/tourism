// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only process if href is a valid selector (starts with # and has valid characters)
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Apply for Event button functionality
const applyBtn = document.querySelector('.btn-apply');
if (applyBtn) {
    applyBtn.addEventListener('click', () => {
        alert('Event application form will open here.');
    });
}

// Learn More button functionality
const learnMoreBtn = document.querySelector('.btn-learn-more');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        document.getElementById('events').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Add animation on scroll for statistics cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize card animations
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Requirements Accordion
document.querySelectorAll('.requirement-item').forEach(item => {
    const header = item.querySelector('.requirement-header');
    if (header) {
        header.addEventListener('click', function(e) {
            // Don't toggle if clicking on the template button
            if (e.target.closest('.template-button')) {
                return;
            }
            // Close other items (optional - remove if you want multiple open)
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.requirement-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});

// Template Button Handler
document.querySelectorAll('.template-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent accordion toggle
        const templateType = this.getAttribute('data-template');
        
        if (templateType === 'traffic') {
            // Open image modal for traffic management plan
            openImageModal();
        } else {
            // For other templates, use the regular modal
            openTemplateModal(templateType);
        }
    });
});

// Emergency Management Plan Link - Update the href with your actual link
const emergencyLink = document.getElementById('emergencyLink');
if (emergencyLink) {
    // Update this URL with your actual emergency management plan link
    emergencyLink.href = 'https://docs.google.com/document/d/1tTppWiU5bjL9hFlR9SCNe_-NEoByHXI5t1WlP1DCtcw/edit?tab=t.0'; // Replace with actual link
    emergencyLink.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent accordion toggle
        // Link will navigate naturally
    });
}

// Image Modal Functions for Traffic Management Plan
let currentZoom = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;

function openImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Reset zoom when opening
        resetZoom();
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Reset zoom when closing
        resetZoom();
    }
}

function zoomImage(delta) {
    const img = document.getElementById('trafficPlanImage');
    const modalBody = document.getElementById('imageModalBody');
    if (!img || !modalBody) return;
    
    currentZoom = Math.max(0.5, Math.min(3, currentZoom + delta));
    img.style.transform = `scale(${currentZoom})`;
    
    // Update cursor style based on zoom level
    if (currentZoom > 1) {
        modalBody.classList.add('zoom-active');
    } else {
        modalBody.classList.remove('zoom-active');
    }
    
    updateZoomButtons();
}

function resetZoom() {
    const img = document.getElementById('trafficPlanImage');
    const modalBody = document.getElementById('imageModalBody');
    if (!img || !modalBody) return;
    
    currentZoom = 1;
    img.style.transform = 'scale(1)';
    modalBody.classList.remove('zoom-active');
    updateZoomButtons();
    
    // Reset scroll position
    modalBody.scrollLeft = 0;
    modalBody.scrollTop = 0;
}

function updateZoomButtons() {
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomInBtn = document.getElementById('zoomInBtn');
    
    if (zoomOutBtn) {
        zoomOutBtn.disabled = currentZoom <= 0.5;
        zoomOutBtn.style.opacity = currentZoom <= 0.5 ? '0.5' : '1';
        zoomOutBtn.style.cursor = currentZoom <= 0.5 ? 'not-allowed' : 'pointer';
    }
    
    if (zoomInBtn) {
        zoomInBtn.disabled = currentZoom >= 3;
        zoomInBtn.style.opacity = currentZoom >= 3 ? '0.5' : '1';
        zoomInBtn.style.cursor = currentZoom >= 3 ? 'not-allowed' : 'pointer';
    }
}

// Mouse wheel zoom
const imageModalBody = document.getElementById('imageModalBody');
if (imageModalBody) {
    imageModalBody.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            zoomImage(delta);
        }
    }, { passive: false });
    
    // Pan/drag functionality when zoomed
    imageModalBody.addEventListener('mousedown', function(e) {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.pageX - imageModalBody.offsetLeft;
            startY = e.pageY - imageModalBody.offsetTop;
            scrollLeft = imageModalBody.scrollLeft;
            scrollTop = imageModalBody.scrollTop;
        }
    });
    
    imageModalBody.addEventListener('mouseleave', function() {
        isDragging = false;
    });
    
    imageModalBody.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    imageModalBody.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - imageModalBody.offsetLeft;
        const y = e.pageY - imageModalBody.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        imageModalBody.scrollLeft = scrollLeft - walkX;
        imageModalBody.scrollTop = scrollTop - walkY;
    });
}

// Template Modal Functions (kept for future use)
function openTemplateModal(templateType) {
    const modal = document.getElementById('templateModal');
    const modalContent = document.getElementById('templateModalContent');
    
    if (!modal || !modalContent) return;
    
    const templates = {
        program: {
            title: 'Program/Schedule Template',
            description: 'Download or view the template for creating your event program and schedule of activities.',
            link: '#'
        }
    };
    
    const template = templates[templateType];
    if (!template) return;
    
    modalContent.innerHTML = `
        <div class="template-modal-header">
            <h3>${template.title}</h3>
            <button class="template-modal-close" onclick="closeTemplateModal()">&times;</button>
        </div>
        <div class="template-modal-body">
            <p>${template.description}</p>
            <div class="template-modal-actions">
                <a href="${template.link}" target="_blank" class="template-download-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9H15V3H9V9H5L12 16L19 9Z" fill="currentColor"/>
                        <path d="M5 18V20H19V18H5Z" fill="currentColor"/>
                    </svg>
                    <span>Download Template</span>
                </a>
                <button class="template-view-btn" onclick="window.open('${template.link}', '_blank')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
                    </svg>
                    <span>View Online</span>
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTemplateModal() {
    const modal = document.getElementById('templateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const templateModal = document.getElementById('templateModal');
    const imageModal = document.getElementById('imageModal');
    
    if (e.target === templateModal) {
        closeTemplateModal();
    }
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTemplateModal();
        closeImageModal();
    }
});

// Apply for Event Permit button
const applyPermitBtn = document.querySelector('.btn-apply-permit');
if (applyPermitBtn) {
    applyPermitBtn.addEventListener('click', () => {
        document.getElementById('requirements').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Draw Line Chart
function drawLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const isMobile = window.innerWidth <= 768;
    const height = isMobile ? 250 : 300;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Chart data (monthly events)
    const data = [12, 15, 18, 14, 22, 20, 16, 19, 21, 17, 23, 25];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Responsive padding
    const padding = isMobile ? 30 : 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const chartX = padding;
    const chartY = padding;
    
    // Draw axes
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(chartX, chartY);
    ctx.lineTo(chartX, chartY + chartHeight);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(chartX, chartY + chartHeight);
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
    ctx.stroke();
    
    // Draw Y-axis labels
    ctx.fillStyle = '#666';
    const fontSize = isMobile ? '10px' : '12px';
    ctx.font = fontSize + ' sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = (maxValue / 4) * i;
        const y = chartY + chartHeight - (chartHeight / 4) * i;
        ctx.fillText(Math.round(value).toString(), chartX - (isMobile ? 5 : 10), y + 4);
    }
    
    // Draw X-axis labels
    ctx.textAlign = 'center';
    const monthWidth = chartWidth / months.length;
    const monthFontSize = isMobile ? '9px' : '12px';
    ctx.font = monthFontSize + ' sans-serif';
    months.forEach((month, i) => {
        const x = chartX + monthWidth * i + monthWidth / 2;
        ctx.fillText(month, x, chartY + chartHeight + (isMobile ? 15 : 20));
    });
    
    // Draw line
    ctx.strokeStyle = '#014696';
    ctx.lineWidth = isMobile ? 2.5 : 3;
    ctx.beginPath();
    data.forEach((value, i) => {
        const x = chartX + monthWidth * i + monthWidth / 2;
        const y = chartY + chartHeight - (value / maxValue) * chartHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#014696';
    const pointRadius = isMobile ? 4 : 5;
    data.forEach((value, i) => {
        const x = chartX + monthWidth * i + monthWidth / 2;
        const y = chartY + chartHeight - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw legend
    ctx.fillStyle = '#014696';
    ctx.font = (isMobile ? '12px' : '14px') + ' sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('→ Events', chartX, chartY - (isMobile ? 5 : 10));
}

// Draw Pie Chart
function drawPieChart() {
    const canvas = document.getElementById('pieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const isMobile = window.innerWidth <= 768;
    const height = isMobile ? 250 : 300;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Chart data
    const data = [
        { label: 'Cultural', value: 35, color: '#014696' },
        { label: 'Sports', value: 25, color: '#4caf50' },
        { label: 'Corporate', value: 20, color: '#ffd700' },
        { label: 'Religious', value: 15, color: '#e53935' },
        { label: 'Others', value: 5, color: '#9c27b0' }
    ];
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - (isMobile ? 40 : 60);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Draw pie slices
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw label (only if not too small)
        if (!isMobile || radius > 60) {
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            
            ctx.fillStyle = '#fff';
            const labelFontSize = isMobile ? '10px' : '12px';
            ctx.font = 'bold ' + labelFontSize + ' sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, labelX, labelY - 5);
            ctx.fillText(item.value + '%', labelX, labelY + 10);
        }
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = isMobile ? width - 120 : width - 150;
    const legendY = 20;
    const legendFontSize = isMobile ? '10px' : '12px';
    data.forEach((item, index) => {
        const y = legendY + index * (isMobile ? 20 : 25);
        
        // Color box
        ctx.fillStyle = item.color;
        const boxSize = isMobile ? 12 : 15;
        ctx.fillRect(legendX, y, boxSize, boxSize);
        
        // Label
        ctx.fillStyle = '#333';
        ctx.font = legendFontSize + ' sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label + ' ' + item.value + '%', legendX + (isMobile ? 15 : 20), y + (isMobile ? 10 : 12));
    });
}

// Initialize charts when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        drawLineChart();
        drawPieChart();
    }, 100);
});

// Redraw charts on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        drawLineChart();
        drawPieChart();
    }, 250);
});

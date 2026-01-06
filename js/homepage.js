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
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
    item.addEventListener('click', function() {
        this.classList.toggle('active');
    });
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

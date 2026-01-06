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
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    
    // Chart data (monthly events)
    const data = [12, 15, 18, 14, 22, 20, 16, 19, 21, 17, 23, 25];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart area
    const padding = 40;
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
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = (maxValue / 4) * i;
        const y = chartY + chartHeight - (chartHeight / 4) * i;
        ctx.fillText(Math.round(value).toString(), chartX - 10, y + 4);
    }
    
    // Draw X-axis labels
    ctx.textAlign = 'center';
    const monthWidth = chartWidth / months.length;
    months.forEach((month, i) => {
        const x = chartX + monthWidth * i + monthWidth / 2;
        ctx.fillText(month, x, chartY + chartHeight + 20);
    });
    
    // Draw line
    ctx.strokeStyle = '#2a4a6f';
    ctx.lineWidth = 3;
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
    ctx.fillStyle = '#2a4a6f';
    data.forEach((value, i) => {
        const x = chartX + monthWidth * i + monthWidth / 2;
        const y = chartY + chartHeight - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw legend
    ctx.fillStyle = '#2a4a6f';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('→ Events', chartX, chartY - 10);
}

// Draw Pie Chart
function drawPieChart() {
    const canvas = document.getElementById('pieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    
    // Chart data
    const data = [
        { label: 'Cultural', value: 35, color: '#2a4a6f' },
        { label: 'Sports', value: 25, color: '#4caf50' },
        { label: 'Corporate', value: 20, color: '#ff6b35' },
        { label: 'Religious', value: 15, color: '#e53935' },
        { label: 'Others', value: 5, color: '#9c27b0' }
    ];
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;
    
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
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, labelX, labelY - 5);
        ctx.fillText(item.value + '%', labelX, labelY + 10);
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = width - 150;
    const legendY = 20;
    data.forEach((item, index) => {
        const y = legendY + index * 25;
        
        // Color box
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, y, 15, 15);
        
        // Label
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label + ' ' + item.value + '%', legendX + 20, y + 12);
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

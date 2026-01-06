// QR Popup Modal Functions
function openQRPopup() {
    const popup = document.getElementById('qrPopup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeQRPopup() {
    const popup = document.getElementById('qrPopup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    const popup = document.getElementById('qrPopup');
    if (e.target === popup) {
        closeQRPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQRPopup();
    }
});

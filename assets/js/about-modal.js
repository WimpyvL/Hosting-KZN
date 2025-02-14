function openAboutModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeAboutModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('about-modal')) {
        closeAboutModal(e.target.id);
    }
});

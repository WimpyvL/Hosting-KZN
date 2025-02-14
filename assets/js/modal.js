function openSpecialOfferModal() {
    const modal = document.getElementById('specialOfferModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSpecialOfferModal() {
    const modal = document.getElementById('specialOfferModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close when clicking outside the modal-content
document.addEventListener('click', (e) => {
    const modal = document.getElementById('specialOfferModal');
    if (e.target === modal) {
        closeSpecialOfferModal();
    }
});
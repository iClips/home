function toggleProfile(element) {
    // Get the parent card
    const profileCard = element.parentElement;

    // Toggle the 'active' class on the profile card
    profileCard.classList.toggle('active');
    
    const details = profileCard.querySelector('.profile-details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}
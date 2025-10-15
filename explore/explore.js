document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const clickableCards = document.querySelectorAll('.clickable-card');
    const fertilizersLink = document.getElementById('fertilizers-link');

    // Logic for switching tabs via the top navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Remove 'active' class from all links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add 'active' class to the clicked link
            link.classList.add('active');

            // Show the corresponding content section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // NEW: Logic for clicking on any product card
    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            // Programmatically click the 'Fertilizers' link in the topbar
            if (fertilizersLink) {
                fertilizersLink.click();
            }
        });
    });
});

// Handles changing the quantity on the product cards
function changeQty(id, delta) {
    const el = document.getElementById(id);
    if (el) {
        let val = parseInt(el.textContent);
        val = isNaN(val) ? 0 : val;
        val += delta;
        if (val < 0) val = 0; // Prevent quantity from going below 0
        el.textContent = val;
    }
}
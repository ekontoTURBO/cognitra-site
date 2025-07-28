document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Add 'scrolled' class to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Activates after 50px of scrolling
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
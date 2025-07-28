document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    // Add 'scrolled' class to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Modal logic
    const openModalBtns = document.querySelectorAll('.open-strategy-modal');
    const modalOverlay = document.getElementById('strategy-modal-overlay');

    if (openModalBtns.length && modalOverlay) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('active');
            });
        });

        // Close modal on overlay click (but not when clicking inside modal window)
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        // Optional: Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Contact form logic
    const contactForm = document.getElementById('strategy-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const position = document.getElementById('contact-position').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            // Compose email body for mailto link
            const subject = encodeURIComponent('Strategy Call Inquiry from ' + name);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPosition & Company: ${position}\n\nDescription:\n${message}`
            );
            const mailto = `mailto:erykczekalski01@gmail.com?subject=${subject}&body=${body}`;

            // This will open the user's default email client
            window.location.href = mailto;
        });
    }

    // Workflow toggle tabs logic
    const workflowTabs = document.querySelectorAll('.toggle-tabs button');
    const workflowImage = document.getElementById('workflow-image');

    if (workflowTabs.length && workflowImage) {
        workflowTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();

                if (this.classList.contains('active')) {
                    return; // Don't do anything if the clicked tab is already active
                }

                // Update active class on tabs
                workflowTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Get new image source from data attribute
                const newImageSrc = this.getAttribute('data-image');

                // 1. Slide the current image out
                workflowImage.classList.add('slide-out');

                // 2. After the slide-out animation finishes...
                setTimeout(() => {
                    // 3. Change the image source and instantly move it to the starting position for slide-in
                    workflowImage.src = newImageSrc;
                    workflowImage.classList.add('slide-in');

                    // 4. Use a tiny delay to allow the browser to apply the 'slide-in' styles
                    // before we trigger the animation by removing the classes.
                    setTimeout(() => {
                        workflowImage.classList.remove('slide-out', 'slide-in');
                    }, 20);

                }, 350); // This must match the CSS transition duration
            });
        });
    }
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
        // Optional: close menu when clicking a link (for single page feel)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
            });
        });
    }
});
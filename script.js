// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when a nav link is clicked (for smooth scrolling)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the fixed header height to offset scrolling
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add some extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Handling (for the contact form)
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server
            // For this static landing page, we'll just simulate a submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            // Simulate a successful submission
            formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            formStatus.style.display = 'block';

            // Clear the form fields
            contactForm.reset();

            // Optionally hide status message after a few seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.classList.remove('success');
            }, 5000);
        });
    }

    // Optional: Add a subtle fade-in animation for sections as they scroll into view
    // This uses Intersection Observer API for better performance

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-fade'); // Add initial hidden state for animation
        sectionObserver.observe(section);
    });

    // Add CSS for .hidden-fade and .fade-in to style.css
    // .hidden-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    // .fade-in { opacity: 1; transform: translateY(0); }
    // These styles are handled in style.css, here we just add/remove classes.
});
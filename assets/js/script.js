
// Navigation menu toggle

function toggleMenu() {
    const nav = document.querySelector('nav');
    const navbar = document.getElementById('navbar');
    const toggleButton = document.querySelector('.toggle-button');
    
    // Toggle menu visibility
    nav.classList.toggle('show');
    
    // Toggle button icon
    const icon = toggleButton.querySelector('i');
    if (nav.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Close all dropdowns when closing the menu
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }
}

// Mobile navigation setup
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const navbar = document.getElementById('navbar');
    const navbarItems = document.querySelectorAll('.navbar > li');
    const toggleButton = document.querySelector('.toggle-button');
    const isMobile = () => window.innerWidth <= 768;

    // Toggle button click handler
    if (toggleButton) {
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Handle dropdown menus
    navbarItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown && link) {
            // For mobile: handle click events
            link.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    navbarItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherDropdown = otherItem.querySelector('.dropdown');
                            if (otherDropdown) {
                                otherDropdown.classList.remove('show');
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('show');
                    
                    // Update arrow icon
                    const arrow = link.querySelector('.arrow');
                    if (arrow) {
                        arrow.classList.toggle('rotate');
                    }
                }
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMobile()) {
            const isClickInsideNav = nav.contains(e.target);
            const isClickOnToggle = toggleButton.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('show')) {
                toggleMenu();
            }
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (!isMobile()) {
                // Reset mobile-specific classes on desktop
                nav.classList.remove('show');
                navbar.classList.remove('show');
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                
                // Reset toggle button icon
                const icon = toggleButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }, 250);
    });
});

// Metrics animation
document.addEventListener('DOMContentLoaded', function() {
    const metrics = document.querySelectorAll('.metric-number');
    
    const animateMetric = (metric, target) => {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const steps = 100;
        const stepTime = duration / steps;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                metric.textContent = Math.ceil(current);
                setTimeout(updateCounter, stepTime);
            } else {
                metric.textContent = target;
            }
        };

        updateCounter();
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.parentElement.getAttribute('data-target'));
                animateMetric(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    metrics.forEach(metric => observer.observe(metric));
});

document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('your-selector'); // Replace with actual selector
    if (element) {
        // Access parentElement here
        element.parentElement.doSomething();
    }
});

function openVoxModal() {
    document.getElementById('voxModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVoxModal() {
    document.getElementById('voxModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('voxModal')) {
        closeVoxModal();
    }
}

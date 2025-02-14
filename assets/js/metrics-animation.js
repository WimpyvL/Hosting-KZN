// Metrics Animation Script
document.addEventListener('DOMContentLoaded', function () {
    const metrics = document.querySelectorAll('.metric-number');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.parentElement.getAttribute('data-target'));
                let count = 0;
                const increment = target / 200;

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    metrics.forEach(metric => observer.observe(metric));
});

// Video Slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentVideoIndex = 0;
    const videos = document.querySelectorAll('.video-slider video');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let autoplayInterval;
    
    // Optimize video loading
    function optimizeVideoLoading() {
        // Only load the first video initially
        videos[0].load();
        
        // For other videos, set src attribute but don't load until needed
        for(let i = 1; i < videos.length; i++) {
            // Store the src in a data attribute and remove it from src
            const src = videos[i].getAttribute('src');
            videos[i].setAttribute('data-src', src);
            // Don't remove src as it's needed for the slider to work properly
        }
    }

    // Function to show a specific video
    function showVideo(index) {
        // Hide all videos
        videos.forEach(video => {
            video.classList.remove('active');
            video.pause();
        });

        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Ensure the video is loaded before playing
        const videoToShow = videos[index];
        
        // If the video has a data-src attribute and hasn't been loaded yet
        if (videoToShow.getAttribute('data-src') && !videoToShow.getAttribute('data-loaded')) {
            // Set loaded flag to prevent reloading
            videoToShow.setAttribute('data-loaded', 'true');
            // Force the browser to load the video
            videoToShow.load();
        }
        
        // Show and play the selected video
        videoToShow.classList.add('active');
        videoToShow.currentTime = 0;
        
        // Play with error handling
        const playPromise = videoToShow.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Auto-play was prevented. Will try again when user interacts with the page.');
            });
        }
        
        // Add active class to the corresponding dot
        dots[index].classList.add('active');

        // Update current index
        currentVideoIndex = index;
        
        // Preload the next video if it exists
        const nextIndex = (index + 1) % videos.length;
        if (nextIndex !== index && videos[nextIndex].getAttribute('data-src') && !videos[nextIndex].getAttribute('data-loaded')) {
            videos[nextIndex].setAttribute('data-loaded', 'true');
            videos[nextIndex].load();
        }
    }

    // Function to show the next video
    function showNextVideo() {
        let nextIndex = currentVideoIndex + 1;
        if (nextIndex >= videos.length) {
            nextIndex = 0;
        }
        showVideo(nextIndex);
    }

    // Function to show the previous video
    function showPrevVideo() {
        let prevIndex = currentVideoIndex - 1;
        if (prevIndex < 0) {
            prevIndex = videos.length - 1;
        }
        showVideo(prevIndex);
    }

    // Start autoplay
    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval
        autoplayInterval = setInterval(showNextVideo, 8000); // Change video every 8 seconds
    }

    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Add event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showPrevVideo();
            startAutoplay(); // Restart autoplay after manual navigation
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showNextVideo();
            startAutoplay(); // Restart autoplay after manual navigation
        });
    }

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showVideo(index);
            startAutoplay(); // Restart autoplay after manual navigation
        });
    });

    // Add event listeners to videos for pause/play on click
    videos.forEach(video => {
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                startAutoplay();
            } else {
                video.pause();
                stopAutoplay();
            }
        });

        // When a video ends, show the next one
        video.addEventListener('ended', showNextVideo);
    });

    // Initialize the slider
    optimizeVideoLoading();
    showVideo(0);
    startAutoplay();
    
    // Add event listener for visibility changes to pause videos when not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause video when tab is not visible
            videos[currentVideoIndex].pause();
            stopAutoplay();
        } else {
            // Resume video and autoplay when tab becomes visible again
            videos[currentVideoIndex].play();
            startAutoplay();
        }
    });
    
    // Add event listener for intersection observer to pause videos when not in viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Pause video when not in viewport
                    videos[currentVideoIndex].pause();
                    stopAutoplay();
                } else {
                    // Resume video and autoplay when in viewport
                    videos[currentVideoIndex].play();
                    startAutoplay();
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the video slider container
        observer.observe(document.querySelector('.video-slider'));
    }
});
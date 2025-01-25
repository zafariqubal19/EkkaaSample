// Initialize your JavaScript code here
console.log('JavaScript is connected!');

// Example function
function init() {
    const heading = document.querySelector('h1');
    heading.addEventListener('click', () => {
        alert('Hello there!');
    });
}

// Run initialization when document is loaded
document.addEventListener('DOMContentLoaded', init);

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.close-btn');

// Sidebar toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Event listeners
hamburger.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Set up indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // Remove active class from current slide and indicator
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // Set new current slide
            currentSlide = index;
            
            // Add active class to new slide and indicator
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        });
    });

    // Start automatic slideshow
    setInterval(nextSlide, slideInterval);
}

// Update the Products Carousel functionality
function initProductsCarousel() {
    const slider = document.querySelector('.products-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.product-card');
    const cardWidth = 420; // card width + gap
    let autoScrollInterval;
    let currentIndex = 0;
    const totalCards = cards.length;

    // Clone first set of cards and append to end
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });

    function scrollToIndex(index) {
        slider.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalCards) {
            // When we reach the cloned set, quickly reset to start
            slider.scrollTo({ left: 0, behavior: 'auto' });
            currentIndex = 1;
            setTimeout(() => scrollToIndex(currentIndex), 50);
        } else {
            scrollToIndex(currentIndex);
        }
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalCards - 1;
            slider.scrollTo({ left: (totalCards + 1) * cardWidth, behavior: 'auto' });
            setTimeout(() => scrollToIndex(currentIndex), 50);
        } else {
            scrollToIndex(currentIndex);
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 2000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }

    // Event Listeners
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevSlide();
        });
    }

    // Start the automatic scrolling
    startAutoScroll();

    // Handle scroll end to create infinite effect
    slider.addEventListener('scroll', () => {
        if (slider.scrollLeft === 0) {
            currentIndex = 0;
        }
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initProductsCarousel();
}); 
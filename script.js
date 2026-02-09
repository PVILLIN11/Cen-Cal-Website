// Navigation functionality
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 60;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Carousel Functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.items = Array.from(element.querySelectorAll('.carousel-item'));
        this.prevBtn = element.querySelector('.prev');
        this.nextBtn = element.querySelector('.next');

        this.currentIndex = 0;
        this.itemsToShow = this.getItemsToShow();

        this.init();
    }

    getItemsToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 968) return 2;
        return 3;
    }

    init() {
        this.updateCarousel();

        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newItemsToShow = this.getItemsToShow();
                if (newItemsToShow !== this.itemsToShow) {
                    this.itemsToShow = newItemsToShow;
                    this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
                    this.updateCarousel();
                }
            }, 250);
        });
    }

    getMaxIndex() {
        return Math.max(0, this.items.length - this.itemsToShow);
    }

    updateCarousel() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = 20;
        const offset = -(this.currentIndex * (itemWidth + gap));

        this.track.style.transform = `translateX(${offset}px)`;

        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.getMaxIndex();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentIndex < this.getMaxIndex()) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.gallery-carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});
// Initialize lightbox
document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
});

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev-img');
    const nextBtn = document.querySelector('.lightbox-nav.next-img');
    const caption = document.querySelector('.lightbox-caption');

    let currentImages = [];
    let currentIndex = 0;
    let isZoomed = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    // Get all clickable images
    function updateImageList() {
        currentImages = Array.from(document.querySelectorAll('.carousel-item img, .carousel-item .image-placeholder'));
    }

    // Open lightbox when clicking on carousel items
    document.addEventListener('click', (e) => {
        const carouselItem = e.target.closest('.carousel-item');
        if (carouselItem) {
            updateImageList();
            const clickedElement = carouselItem.querySelector('img') || carouselItem.querySelector('.image-placeholder');
            currentIndex = currentImages.indexOf(clickedElement);

            if (currentIndex !== -1) {
                openLightbox(clickedElement);
            }
        }
    });

    function openLightbox(element) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        if (element.tagName === 'IMG') {
            lightboxImg.src = element.src;
            lightboxImg.alt = element.alt || 'Project image';
        } else {
            // Handle placeholder - create a temporary canvas representation
            lightboxImg.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="%23e8e8e8"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="%23999" text-anchor="middle" dominant-baseline="middle">Project Photo Placeholder</text></svg>'
            );
            lightboxImg.alt = 'Project placeholder';
        }

        updateNavigationButtons();
        isZoomed = false;
        lightboxImg.classList.remove('zoomed', 'panning');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        isZoomed = false;
        lightboxImg.classList.remove('zoomed', 'panning');
        lightboxImg.style.transform = '';
        translateX = 0;
        translateY = 0;
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentImages.length - 1;
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            resetZoom();
            openLightbox(currentImages[currentIndex]);
        }
    }

    function showNextImage() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            resetZoom();
            openLightbox(currentImages[currentIndex]);
        }
    }

    // Zoom functionality
    lightboxImg.addEventListener('click', (e) => {
        if (!isZoomed) {
            isZoomed = true;
            lightboxImg.classList.add('zoomed');

            // Calculate zoom position based on click
            const rect = lightboxImg.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            lightboxImg.style.transformOrigin = `${x}% ${y}%`;
        } else {
            isZoomed = false;
            lightboxImg.classList.remove('zoomed', 'panning');
            lightboxImg.style.transform = '';
            translateX = 0;
            translateY = 0;
        }
    });

    // Pan functionality when zoomed
    let lastX = 0;
    let lastY = 0;
    let translateX = 0;
    let translateY = 0;

    lightboxImg.addEventListener('mousedown', (e) => {
        if (isZoomed) {
            isDragging = true;
            lightboxImg.classList.add('panning');
            lastX = e.clientX;
            lastY = e.clientY;
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && isZoomed) {
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;

            translateX += deltaX;
            translateY += deltaY;

            lightboxImg.style.transform = `scale(2) translate(${translateX / 2}px, ${translateY / 2}px)`;

            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImg.classList.remove('panning');
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    lightboxImg.addEventListener('touchstart', (e) => {
        if (isZoomed) {
            isDragging = true;
            const touch = e.touches[0];
            lastX = touch.clientX;
            lastY = touch.clientY;
        }
    });

    lightboxImg.addEventListener('touchmove', (e) => {
        if (isDragging && isZoomed) {
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.clientX - lastX;
            const deltaY = touch.clientY - lastY;

            translateX += deltaX;
            translateY += deltaY;

            lightboxImg.style.transform = `scale(2) translate(${translateX / 2}px, ${translateY / 2}px)`;

            lastX = touch.clientX;
            lastY = touch.clientY;
        }
    });

    lightboxImg.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Reset zoom and pan when changing images
    function resetZoom() {
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transform = '';
        isZoomed = false;
        lightboxImg.classList.remove('zoomed', 'panning');
    }
}
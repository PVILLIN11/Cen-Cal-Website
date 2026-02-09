// Navigation functionality
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(item => {
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

// Gallery Carousel Class
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

        // Handle window resize
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

// Lightbox Functionality
class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-nav.prev-img');
        this.nextBtn = document.querySelector('.lightbox-nav.next-img');
        this.currentImages = [];
        this.currentIndex = 0;
        this.isZoomed = false;
        this.isDragging = false;
        this.translateX = 0;
        this.translateY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.init();
    }

    init() {
        // Click on carousel items to open lightbox
        document.addEventListener('click', (e) => {
            const carouselItem = e.target.closest('.carousel-item');
            if (carouselItem) {
                this.updateImageList();
                const clickedImg = carouselItem.querySelector('img');
                this.currentIndex = this.currentImages.indexOf(clickedImg);
                if (this.currentIndex !== -1) {
                    this.open(clickedImg);
                }
            }
        });

        // Close lightbox
        this.lightboxClose.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        // Navigation
        this.prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showPrev();
        });
        this.nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showNext();
        });

        // Zoom functionality
        this.lightboxImg.addEventListener('click', (e) => this.toggleZoom(e));

        // Pan functionality
        this.lightboxImg.addEventListener('mousedown', (e) => this.startPan(e));
        document.addEventListener('mousemove', (e) => this.pan(e));
        document.addEventListener('mouseup', () => this.endPan());

        // Touch support
        this.lightboxImg.addEventListener('touchstart', (e) => this.startPan(e.touches[0]));
        this.lightboxImg.addEventListener('touchmove', (e) => {
            if (this.isDragging && this.isZoomed) {
                e.preventDefault();
                this.pan(e.touches[0]);
            }
        });
        this.lightboxImg.addEventListener('touchend', () => this.endPan());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.showPrev();
            if (e.key === 'ArrowRight') this.showNext();
        });
    }

    updateImageList() {
        this.currentImages = Array.from(document.querySelectorAll('.carousel-item img'));
    }

    open(img) {
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = img.alt || 'Project image';
        this.updateNavButtons();
        this.resetZoom();
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.resetZoom();
    }

    updateNavButtons() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.currentImages.length - 1;
    }

    showPrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.open(this.currentImages[this.currentIndex]);
        }
    }

    showNext() {
        if (this.currentIndex < this.currentImages.length - 1) {
            this.currentIndex++;
            this.open(this.currentImages[this.currentIndex]);
        }
    }

    toggleZoom(e) {
        if (!this.isZoomed) {
            this.isZoomed = true;
            this.lightboxImg.classList.add('zoomed');
            const rect = this.lightboxImg.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.lightboxImg.style.transformOrigin = `${x}% ${y}%`;
        } else {
            this.resetZoom();
        }
    }

    startPan(e) {
        if (this.isZoomed) {
            this.isDragging = true;
            this.lightboxImg.classList.add('panning');
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            if (e.preventDefault) e.preventDefault();
        }
    }

    pan(e) {
        if (this.isDragging && this.isZoomed) {
            const deltaX = e.clientX - this.lastX;
            const deltaY = e.clientY - this.lastY;
            this.translateX += deltaX;
            this.translateY += deltaY;
            this.lightboxImg.style.transform = `scale(2) translate(${this.translateX / 2}px, ${this.translateY / 2}px)`;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        }
    }

    endPan() {
        if (this.isDragging) {
            this.isDragging = false;
            this.lightboxImg.classList.remove('panning');
        }
    }

    resetZoom() {
        this.translateX = 0;
        this.translateY = 0;
        this.isZoomed = false;
        this.lightboxImg.classList.remove('zoomed', 'panning');
        this.lightboxImg.style.transform = '';
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all carousels
    document.querySelectorAll('.gallery-carousel').forEach(carousel => new Carousel(carousel));

    // Initialize lightbox
    new Lightbox();
});
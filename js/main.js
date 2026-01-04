/**
 * ATELIER SITE — JAVASCRIPT INTERACTIONS
 * Hover reveals, image loading, subtle animations
 * No urgency, no aggressive CTAs, no cart
 */

(function() {
  'use strict';

  // ==========================================
  // HOMEPAGE GALLERY INTERACTION
  // ==========================================
  
  function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      // Click to navigate
      item.addEventListener('click', function() {
        const link = this.dataset.link;
        if (link) {
          window.location.href = link;
        }
      });

      // Add keyboard navigation
      item.setAttribute('tabindex', '0');
      item.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // ==========================================
  // LAZY LOAD IMAGES WITH FADE-IN
  // ==========================================
  
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add fade-in class when image loads
    images.forEach(img => {
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease-in';
        
        img.addEventListener('load', function() {
          this.style.opacity = '1';
        });
      }
    });
  }

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // ==========================================
  // ACQUIRE BUTTON INTERACTION
  // ==========================================
  
  function initAcquireButtons() {
    const acquireButtons = document.querySelectorAll('.acquire-button');
    
    acquireButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Subtle acknowledgment
        const originalText = this.textContent;
        this.textContent = 'Added';
        this.style.background = '#2a2a2a';
        this.style.color = 'white';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '';
          this.style.color = '';
        }, 1500);
        
        // In production, this would trigger cart logic
        // For now, just console log
        console.log('Acquire button clicked - would add to cart');
      });
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ==========================================
  
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll(`
      .collection-entry,
      .exhibition-entry,
      .curatorial-project,
      .crusade-entry,
      .book-entry,
      .object-inline
    `);

    fadeElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // ==========================================
  // NAVIGATION ACTIVE STATE
  // ==========================================
  
  function initNavigationHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if current page matches link
      if (currentPath.includes(href) && href !== 'index.html') {
        link.classList.add('active');
      }
      
      // Handle homepage
      if ((currentPath === '/' || currentPath.endsWith('index.html')) && 
          href === 'index.html') {
        // Don't highlight home on homepage
        link.classList.remove('active');
      }
    });
  }

  // ==========================================
  // PREVENT LAYOUT SHIFT FOR IMAGES
  // ==========================================
  
  function preventLayoutShift() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    
    images.forEach(img => {
      if (!img.complete) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add min-height based on aspect ratio if available
              const parent = img.parentElement;
              if (parent && parent.offsetWidth) {
                img.style.minHeight = `${parent.offsetWidth * 0.75}px`;
              }
              observer.unobserve(img);
            }
          });
        });
        observer.observe(img);
      }
    });
  }

  // ==========================================
  // INITIALIZE ALL FUNCTIONALITY
  // ==========================================
  
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all modules
    initGalleryItems();
    initLazyLoad();
    initSmoothScroll();
    initAcquireButtons();
    initScrollAnimations();
    initNavigationHighlight();
    preventLayoutShift();

    // Add loaded class to body for CSS hooks
    document.body.classList.add('js-loaded');
  }

  // Start initialization
  init();

})();

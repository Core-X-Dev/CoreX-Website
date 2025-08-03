// CoreX Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCopyButtons();
    initMobileMenu();
    initSmoothScrolling();
    initActiveSection();
    initAnimations();
    initThemeToggle();
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    body.setAttribute('data-theme', theme);
    
    if (theme === 'light') {
        // Light theme colors
        document.documentElement.style.setProperty('--text-primary', '#1f2937');
        document.documentElement.style.setProperty('--text-secondary', '#6b7280');
        document.documentElement.style.setProperty('--text-muted', '#9ca3af');
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f9fafb');
        document.documentElement.style.setProperty('--bg-tertiary', '#f3f4f6');
        document.documentElement.style.setProperty('--border-color', '#e5e7eb');
        document.documentElement.style.setProperty('--border-hover', '#d1d5db');
        document.documentElement.style.setProperty('--shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.05)');
        document.documentElement.style.setProperty('--shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)');
        document.documentElement.style.setProperty('--shadow-lg', '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
        
        // Update code block colors for light theme
        document.documentElement.style.setProperty('--code-bg', '#f8f9fa');
        document.documentElement.style.setProperty('--code-header-bg', '#e9ecef');
        document.documentElement.style.setProperty('--code-text', '#212529');
        
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to dark mode';
    } else {
        // Dark theme colors
        document.documentElement.style.setProperty('--text-primary', '#f9fafb');
        document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
        document.documentElement.style.setProperty('--text-muted', '#9ca3af');
        document.documentElement.style.setProperty('--bg-primary', '#111827');
        document.documentElement.style.setProperty('--bg-secondary', '#1f2937');
        document.documentElement.style.setProperty('--bg-tertiary', '#374151');
        document.documentElement.style.setProperty('--border-color', '#374151');
        document.documentElement.style.setProperty('--border-hover', '#4b5563');
        document.documentElement.style.setProperty('--shadow-sm', '0 1px 2px 0 rgb(0 0 0 / 0.3)');
        document.documentElement.style.setProperty('--shadow-md', '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)');
        document.documentElement.style.setProperty('--shadow-lg', '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)');
        
        // Update code block colors for dark theme
        document.documentElement.style.setProperty('--code-bg', '#1e1e1e');
        document.documentElement.style.setProperty('--code-header-bg', '#2d2d2d');
        document.documentElement.style.setProperty('--code-text', '#e5e7eb');
        
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to light mode';
    }
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#111827' : '#ffffff');
    }
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, null, '#' + targetId);
            }
        });
    });
}

// Copy button functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const textToCopy = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(textToCopy, this);
            });
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.color = '';
        }, 2000);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Mobile menu functionality
function initMobileMenu() {
    // Add mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    // Handle anchor links in the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active section highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial update
    updateActiveSection();
}

// Animation functionality
function initAnimations() {
    // Add animation delay to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    // Intersection Observer for fade-in animations
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
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility functions
function copyCode(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const text = element.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Code copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy code', 'error');
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
    
    // Ctrl/Cmd + K for search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Search functionality coming soon!', 'info');
    }
    
    // Ctrl/Cmd + T for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .notification {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    /* Theme transition */
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
`;
document.head.appendChild(style); 
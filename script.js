// HealthCare+ Website JavaScript
// Modern, interactive healthcare website functionality

class HealthCareWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupDemoFunctionality();
        this.setupContactForm();
        this.setupCounters();
        this.setupProgressBars();
        this.setupMobileMenu();
        this.setupScrollEffects();
    }

    // Navigation Setup
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Update active navigation state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });

        // Navbar scroll effect
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
                } else {
                    navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
                }
            });
        }
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars text-xl';
                } else {
                    icon.className = 'fas fa-times text-xl';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
                }
            });
        }
    }

    // Animation Setup
    setupAnimations() {
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

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });

        // Feature cards hover enhancement
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            });
        });
    }

    // Demo Tab Functionality
    setupDemoFunctionality() {
        const tabBtns = document.querySelectorAll('.demo-tab-btn');
        const tabContents = document.querySelectorAll('.demo-tab');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active states
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active state
                btn.classList.add('active');
                const targetTab = document.getElementById(`${tabId}-tab`);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });

        // Start demo animations when demo page loads
        if (window.location.pathname.includes('demo.html')) {
            setTimeout(() => {
                this.startDashboardDemo();
                this.startVitalSignsDemo();
            }, 1000);
        }
    }

    // Dashboard Demo Animation
    startDashboardDemo() {
        const patientsCount = document.getElementById('patients-count');
        const appointmentsCount = document.getElementById('appointments-count');
        const satisfactionRate = document.getElementById('satisfaction-rate');

        if (patientsCount) {
            this.animateCounter(patientsCount, 0, 47, 2000);
        }
        if (appointmentsCount) {
            this.animateCounter(appointmentsCount, 0, 23, 2000);
        }
        if (satisfactionRate) {
            this.animateCounter(satisfactionRate, 0, 96, 2000, '%');
        }

        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth) {
                    bar.style.width = `${targetWidth}%`;
                }
            });
        }, 500);
    }

    // Vital Signs Demo
    startVitalSignsDemo() {
        const heartRate = document.getElementById('heart-rate');
        
        if (heartRate) {
            setInterval(() => {
                const rate = Math.floor(Math.random() * 10) + 68; // 68-77 BPM
                heartRate.textContent = `${rate} BPM`;
                heartRate.classList.add('pulse-animation');
                
                setTimeout(() => {
                    heartRate.classList.remove('pulse-animation');
                }, 1000);
            }, 3000);
        }
    }

    // Counter Animation
    animateCounter(element, start, end, duration, suffix = '') {
        const range = end - start;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (range * this.easeOutQuart(progress)));
            element.textContent = current + suffix;
            element.classList.add('count-animation');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Easing function for smooth animations
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Counter Setup for Stats
    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = entry.target.querySelector('.text-3xl, .text-4xl');
                    const finalValue = parseInt(entry.target.getAttribute('data-count'));
                    
                    if (target) {
                        this.animateCounter(target, 0, finalValue, 2000);
                        entry.target.classList.add('counted');
                    }
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Progress Bars Animation
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    
                    if (targetWidth && !bar.classList.contains('animated')) {
                        setTimeout(() => {
                            bar.style.width = `${targetWidth}%`;
                            bar.classList.add('animated');
                        }, 200);
                    }
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // Contact Form Handling
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    // Form Submission Handler
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate all fields
        const isValid = this.validateForm(form);
        
        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                this.showSuccessMessage(form);
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    // Form Validation
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Field Validation
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Email Validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show Field Error
    showFieldError(field, message) {
        field.classList.add('border-red-500', 'bg-red-50');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message text-sm text-red-600 mt-1';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Clear Field Error
    clearFieldError(field) {
        field.classList.remove('border-red-500', 'bg-red-50');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Show Success Message
    showSuccessMessage(form) {
        // Remove any existing success messages
        const existingMessage = form.parentNode.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message mb-6';
        successMessage.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-600 mr-3"></i>
                <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
            </div>
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 5000);
    }

    // Scroll Effects
    setupScrollEffects() {
        // Smooth scroll for anchor links
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

        // Parallax effect for hero images
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImages = document.querySelectorAll('.hero-image');
            
            heroImages.forEach(img => {
                const rate = scrolled * -0.5;
                img.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Enhanced Demo Tab Switching
    setupDemoTabs() {
        const tabBtns = document.querySelectorAll('.demo-tab-btn');
        const tabContents = document.querySelectorAll('.demo-tab');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Smooth transition out
                tabContents.forEach(content => {
                    if (content.classList.contains('active')) {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            content.classList.remove('active');
                        }, 200);
                    }
                });
                
                // Remove active states
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active state to clicked button
                btn.classList.add('active');
                
                // Show new tab with animation
                setTimeout(() => {
                    const targetTab = document.getElementById(`${tabId}-tab`);
                    if (targetTab) {
                        targetTab.classList.add('active');
                        targetTab.style.opacity = '0';
                        targetTab.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            targetTab.style.opacity = '1';
                            targetTab.style.transform = 'translateY(0)';
                        }, 50);
                    }
                }, 200);
            });
        });
    }

    // Interactive Dashboard Demo
    startInteractiveDashboard() {
        // Patient count animation
        const patientsCount = document.getElementById('patients-count');
        if (patientsCount) {
            this.animateCounter(patientsCount, 0, 47, 2500);
        }

        // Appointments count animation
        const appointmentsCount = document.getElementById('appointments-count');
        if (appointmentsCount) {
            this.animateCounter(appointmentsCount, 0, 23, 2500);
        }

        // Satisfaction rate animation
        const satisfactionRate = document.getElementById('satisfaction-rate');
        if (satisfactionRate) {
            this.animateCounter(satisfactionRate, 0, 96, 2500, '%');
        }

        // Animate progress bars with staggered timing
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach((bar, index) => {
                setTimeout(() => {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        bar.style.width = `${targetWidth}%`;
                    }
                }, index * 300);
            });
        }, 1000);
    }

    // Real-time Vital Signs Simulation
    startVitalSignsMonitor() {
        const heartRate = document.getElementById('heart-rate');
        
        if (heartRate) {
            const updateVitalSigns = () => {
                // Simulate realistic heart rate variation
                const baseRate = 72;
                const variation = Math.floor(Math.random() * 8) - 4; // ±4 BPM
                const newRate = baseRate + variation;
                
                heartRate.textContent = `${newRate} BPM`;
                heartRate.classList.add('pulse-animation');
                
                setTimeout(() => {
                    heartRate.classList.remove('pulse-animation');
                }, 1000);
            };

            // Update every 3 seconds
            updateVitalSigns();
            setInterval(updateVitalSigns, 3000);
        }
    }

    // Patient Management Interactions
    setupPatientManagement() {
        const patientRows = document.querySelectorAll('.patient-row');
        
        patientRows.forEach(row => {
            row.addEventListener('click', () => {
                // Remove active state from other rows
                patientRows.forEach(r => r.classList.remove('bg-blue-50', 'border-l-4', 'border-blue-500'));
                
                // Add active state to clicked row
                row.classList.add('bg-blue-50', 'border-l-4', 'border-blue-500');
                
                // Simulate loading patient details
                this.showPatientDetails(row);
            });

            // Enhanced hover effects
            row.addEventListener('mouseenter', () => {
                if (!row.classList.contains('bg-blue-50')) {
                    row.style.transform = 'translateX(8px)';
                    row.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }
            });

            row.addEventListener('mouseleave', () => {
                if (!row.classList.contains('bg-blue-50')) {
                    row.style.transform = 'translateX(0)';
                    row.style.boxShadow = 'none';
                }
            });
        });
    }

    // Show Patient Details Modal (Simulation)
    showPatientDetails(row) {
        const patientName = row.querySelector('.font-semibold').textContent;
        
        // Create a simple modal effect
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform scale-0 transition-transform duration-300">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Patient Details</h3>
                <p class="text-gray-600 mb-6">Loading details for <strong>${patientName}</strong>...</p>
                <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 10);
        
        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.tagName === 'BUTTON') {
                modal.querySelector('div').style.transform = 'scale(0)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    }

    // Alert System Animations
    setupAlertSystem() {
        const alertItems = document.querySelectorAll('.alert-item');
        
        alertItems.forEach((alert, index) => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                alert.style.opacity = '1';
                alert.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    // Calendar Interactions
    setupCalendarDemo() {
        const calendarDays = document.querySelectorAll('.calendar-day');
        
        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                // Remove previous selections
                calendarDays.forEach(d => {
                    d.classList.remove('bg-blue-600', 'text-white');
                    if (!d.classList.contains('appointment-day')) {
                        d.classList.add('text-gray-600');
                    }
                });
                
                // Select clicked day
                day.classList.add('bg-blue-600', 'text-white');
                day.classList.remove('text-gray-600');
                
                // Animate appointment slots
                this.updateAppointmentSlots(day.textContent);
            });
        });
    }

    // Update Appointment Slots
    updateAppointmentSlots(selectedDay) {
        const appointmentSlots = document.querySelectorAll('.appointment-slot');
        
        // Animate out current slots
        appointmentSlots.forEach(slot => {
            slot.style.transform = 'translateX(-100%)';
            slot.style.opacity = '0';
        });
        
        // Animate in new slots after delay
        setTimeout(() => {
            appointmentSlots.forEach((slot, index) => {
                setTimeout(() => {
                    slot.style.transform = 'translateX(0)';
                    slot.style.opacity = '1';
                }, index * 100);
            });
        }, 300);
    }

    // Enhanced Page Load Animations
    setupPageLoadAnimations() {
        // Stagger animation timing for multiple elements
        const animatedElements = document.querySelectorAll('.fade-in-up');
        
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Interactive Prescription Demo
    setupPrescriptionDemo() {
        const prescriptionBtn = document.querySelector('button:contains("Generate Prescription")');
        
        if (prescriptionBtn) {
            prescriptionBtn.addEventListener('click', () => {
                const inputs = prescriptionBtn.parentNode.querySelectorAll('input');
                const allFilled = Array.from(inputs).every(input => input.value.trim());
                
                if (allFilled) {
                    // Show success animation
                    prescriptionBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Prescription Generated!';
                    prescriptionBtn.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        prescriptionBtn.innerHTML = 'Generate Prescription';
                        prescriptionBtn.classList.remove('bg-green-600');
                    }, 2000);
                } else {
                    // Highlight empty fields
                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            input.classList.add('border-red-500', 'shake');
                            setTimeout(() => {
                                input.classList.remove('border-red-500', 'shake');
                            }, 1000);
                        }
                    });
                }
            });
        }
    }

    // Dynamic Content Loading
    loadDynamicContent() {
        // Simulate real-time updates for dashboard
        if (window.location.pathname.includes('demo.html')) {
            setInterval(() => {
                this.updateDashboardMetrics();
            }, 5000);
        }
    }

    // Update Dashboard Metrics
    updateDashboardMetrics() {
        const metrics = {
            patients: Math.floor(Math.random() * 5) + 45,
            appointments: Math.floor(Math.random() * 3) + 21,
            satisfaction: Math.floor(Math.random() * 4) + 94
        };

        Object.keys(metrics).forEach(key => {
            const element = document.getElementById(`${key}-count`) || 
                           document.getElementById(`${key}s-count`);
            if (element) {
                const currentValue = parseInt(element.textContent);
                const newValue = metrics[key];
                
                if (currentValue !== newValue) {
                    this.animateCounter(element, currentValue, newValue, 1000, 
                                      key === 'satisfaction' ? '%' : '');
                }
            }
        });
    }
}

// Initialize website functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new HealthCareWebsite();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            // Home page specific setup
            break;
            
        case 'demo.html':
            setTimeout(() => {
                website.setupDemoTabs();
                website.startInteractiveDashboard();
                website.startVitalSignsMonitor();
                website.setupPatientManagement();
                website.setupAlertSystem();
                website.setupCalendarDemo();
                website.setupPrescriptionDemo();
            }, 500);
            break;
            
        case 'contact.html':
            // Contact page specific setup
            break;
    }
    
    // Start dynamic content updates
    website.loadDynamicContent();
});

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HealthCareWebsite, utils };
}
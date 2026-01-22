/**
 * JKD Tech Portfolio - JavaScript Moderno 2025
 * Funcionalidades avanzadas para el portafolio profesional
 */

// Configuración global
const CONFIG = {
    animationDuration: 1000,
    scrollOffset: 100,
    typingSpeed: 50,
    skillAnimationDelay: 200
};

// Estado de la aplicación
const appState = {
    isLoaded: false,
    activeSection: 'inicio',
    skillsAnimated: false,
    timelineAnimated: false
};

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicialización principal de la aplicación
 */
function initializeApp() {
    console.log('🚀 Inicializando JKD Tech Portfolio...');
    
    // Inicializar componentes
    initializeNavbar();
    initializeAnimations();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeSkillBars();
    initializeTimelineAnimations();
    initializeProjectFilters();
    initializeContactForm();
    initializePerformanceOptimizations();
    
    // Marcar como cargado
    appState.isLoaded = true;
    document.body.classList.add('loaded');
    
    console.log('✅ Portfolio cargado exitosamente');
}

/**
 * ========================================
 * NAVEGACIÓN MODERNA
 * ========================================
 */

function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto de scroll en navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo
        updateActiveNavLink();
    });
    
    // Smooth scroll para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scrollOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar navbar en móvil
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - CONFIG.scrollOffset) {
            current = section.getAttribute('id');
        }
    });
    
    // Actualizar estado
    appState.activeSection = current;
    
    // Actualizar clases de navegación
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * ========================================
 * ANIMACIONES AOS
 * ========================================
 */

function initializeAnimations() {
    // Configurar AOS (Animate On Scroll)
    AOS.init({
        duration: CONFIG.animationDuration,
        easing: 'ease-out-cubic',
        once: true,
        offset: 150,
        delay: 100
    });
    
    // Animaciones personalizadas adicionales
    initializeCustomAnimations();
}

function initializeCustomAnimations() {
    // Animación de aparición progresiva para elementos
    const elements = document.querySelectorAll('.loading');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, Math.random() * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
}

/**
 * ========================================
 * EFECTOS DE SCROLL
 * ========================================
 */

function initializeScrollEffects() {
    // Parallax suave para elementos hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Efecto parallax en hero background
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Animación de floating icons
        animateFloatingIcons(scrolled);
    });
    
    // Scroll to top button
    createScrollToTopButton();
}

function animateFloatingIcons(scrolled) {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        icon.style.transform = `translateY(${yPos}px)`;
    });
}

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top-btn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidad de scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ========================================
 * EFECTO DE TYPING
 * ========================================
 */

function initializeTypingEffect() {
    const typingElement = document.querySelector('.hero-title');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    // Simular efecto de typing
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, CONFIG.typingSpeed);
        }
    };
    
    // Iniciar después de un delay
    setTimeout(typeWriter, 1000);
}

/**
 * ========================================
 * BARRAS DE HABILIDADES ANIMADAS
 * ========================================
 */

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !appState.skillsAnimated) {
                animateSkillBars();
                appState.skillsAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });
    
    const skillsSection = document.querySelector('.about-skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
            
            // Efecto de contador
            const skillValue = parseInt(width);
            animateCounter(bar.parentElement.previousElementSibling.querySelector('.text-primary'), 0, skillValue);
            
        }, index * CONFIG.skillAnimationDelay);
    });
}

function animateCounter(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
}

/**
 * ========================================
 * ANIMACIONES DE TIMELINE
 * ========================================
 */

function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar marcador
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.transform = 'translateX(-50%) scale(1.2)';
                        setTimeout(() => {
                            marker.style.transform = 'translateX(-50%) scale(1)';
                        }, 200);
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

/**
 * ========================================
 * FILTROS DE PROYECTOS
 * ========================================
 */

function initializeProjectFilters() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Agregar efectos hover avanzados
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Analytics para clics en proyectos
        const projectLinks = card.querySelectorAll('a');
        projectLinks.forEach(link => {
            link.addEventListener('click', function() {
                const projectName = card.querySelector('.project-title').textContent;
                trackEvent('project_click', {
                    project_name: projectName,
                    link_type: this.textContent.includes('Demo') ? 'demo' : 'code'
                });
            });
        });
    });
}

/**
 * ========================================
 * FORMULARIO DE CONTACTO
 * ========================================
 */

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(this);
    });
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Character counter para textarea
    const messageTextarea = contactForm.querySelector('#message');
    const characterCounter = contactForm.querySelector('.character-count');
    
    if (messageTextarea && characterCounter) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 1000;
            characterCounter.textContent = `${currentLength} / ${maxLength}`;
            
            // Cambiar color según proximidad al límite
            if (currentLength > maxLength * 0.9) {
                characterCounter.style.color = '#dc3545'; // Rojo
            } else if (currentLength > maxLength * 0.7) {
                characterCounter.style.color = '#ffc107'; // Amarillo
            } else {
                characterCounter.style.color = '#6c757d'; // Gris normal
            }
        });
    }
    
    // Phone number formatting
    const phoneInput = contactForm.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}

function formatPhoneNumber(input) {
    // Auto-format Chilean phone numbers
    let value = input.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 0) {
        if (value.startsWith('569')) {
            // Format: +56 9 XXXX XXXX
            value = value.replace(/^569(\d{4})(\d{4})/, '+56 9 $1 $2');
        } else if (value.startsWith('56') && value.length >= 11) {
            // Format: +56 9 XXXX XXXX
            value = value.replace(/^56(\d)(\d{4})(\d{4})/, '+56 $1 $2 $3');
        } else if (value.startsWith('9') && value.length >= 9) {
            // Format: 9 XXXX XXXX
            value = value.replace(/^9(\d{4})(\d{4})/, '9 $1 $2');
        }
    }
    
    input.value = value;
}

async function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validar formulario
    if (!validateContactForm(data)) {
        return;
    }
    
    // Verificar política de privacidad
    if (!data.privacy_policy) {
        showNotification('Debes aceptar la política de privacidad para continuar.', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    
    try {
        const response = await fetch(form.action, {
            method: form.method || 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
            form.reset();
            
            // Track successful submission
            trackEvent('contact_form_submit', {
                success: true,
                project_type: data.project_type,
                has_budget: !!data.budget
            });
        } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                 const errorMessages = data.errors.map(error => error.message).join(", ");
                 throw new Error(errorMessages);
            } else {
                throw new Error('Hubo un problema al enviar el formulario');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente.', 'error');
        
        // Track failed submission
        trackEvent('contact_form_submit', {
            success: false,
            error: error.message
        });
    } finally {
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
    }
}

function getProjectTypeText(value) {
    const projectTypes = {
        'ia-platform': 'Plataforma de IA',
        'mobile-app': 'Aplicación móvil',
        'website': 'Sitio web corporativo',
        'web-app': 'Aplicación web',
        'automation': 'Automatización',
        'consulting': 'Consultoría tecnológica',
        'other': 'Otro'
    };
    return projectTypes[value] || 'No especificado';
}

function getBudgetText(value) {
    const budgets = {
        'under-1k': 'Menos de $500.000 CLP',
        '1k-3k': '$500.000 - $1.500.000 CLP',
        '3k-5k': '$1.500.000 - $2.500.000 CLP',
        '5k-10k': '$2.500.000 - $5.000.000 CLP',
        'over-10k': 'Más de $5.000.000 CLP',
        'discuss': 'Prefiero discutirlo'
    };
    return budgets[value] || 'No especificado';
}

function validateContactForm(data) {
    const errors = [];
    
    // Validar nombre
    if (!data.name || data.name.length < 2) {
        errors.push({ field: 'name', message: 'El nombre debe tener al menos 2 caracteres' });
    } else if (data.name.length > 50) {
        errors.push({ field: 'name', message: 'El nombre no puede exceder 50 caracteres' });
    }
    
    // Validar email
    if (!data.email || !isValidEmail(data.email)) {
        errors.push({ field: 'email', message: 'Ingresa un email válido' });
    }
    
    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push({ field: 'phone', message: 'Ingresa un teléfono válido (ej: +56 9 XXXX XXXX)' });
    }
    
    // Validar mensaje
    if (!data.message || data.message.length < 10) {
        errors.push({ field: 'message', message: 'El mensaje debe tener al menos 10 caracteres' });
    } else if (data.message.length > 1000) {
        errors.push({ field: 'message', message: 'El mensaje no puede exceder 1000 caracteres' });
    }
    
    // Mostrar errores
    if (errors.length > 0) {
        errors.forEach(error => {
            showFieldError(error.field, error.message);
        });
        
        // Scroll al primer error
        const firstErrorField = document.querySelector('.form-control.is-invalid');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
        
        showNotification(`Por favor, corrige los ${errors.length} error${errors.length > 1 ? 'es' : ''} en el formulario.`, 'error');
        return false;
    }
    
    return true;
}

function isValidPhone(phone) {
    // Validar formato chileno: +56 9 XXXX XXXX o variaciones
    const phoneRegex = /^(\+?56\s?)?[9]\s?\d{4}\s?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (field.name) {
        case 'name':
            if (!value || value.length < 2) {
                showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
            } else if (value.length > 50) {
                showFieldError('name', 'El nombre no puede exceder 50 caracteres');
            } else {
                showFieldSuccess('name');
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                showFieldError('email', 'Ingresa un email válido');
            } else {
                showFieldSuccess('email');
            }
            break;
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError('phone', 'Ingresa un teléfono válido (ej: +56 9 XXXX XXXX)');
            } else if (value) {
                showFieldSuccess('phone');
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
            } else if (value.length > 1000) {
                showFieldError('message', 'El mensaje no puede exceder 1000 caracteres');
            } else {
                showFieldSuccess('message');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.classList.add('is-invalid');
    
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

function showFieldSuccess(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Remove error feedback
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Add success feedback
    let successDiv = field.parentNode.querySelector('.valid-feedback');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'valid-feedback';
        field.parentNode.appendChild(successDiv);
    }
    
    const successMessages = {
        'name': '✓ Nombre válido',
        'email': '✓ Email válido',
        'phone': '✓ Teléfono válido',
        'message': '✓ Mensaje válido'
    };
    
    successDiv.textContent = successMessages[fieldName] || '✓ Campo válido';
}

function clearFieldError(field) {
    const fieldElement = field.target || field;
    fieldElement.classList.remove('is-invalid', 'is-valid');
    
    const errorDiv = fieldElement.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    const successDiv = fieldElement.parentNode.querySelector('.valid-feedback');
    if (successDiv) {
        successDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ========================================
 * NOTIFICACIONES
 * ========================================
 */

function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} notification`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * ========================================
 * OPTIMIZACIONES DE PERFORMANCE
 * ========================================
 */

function initializePerformanceOptimizations() {
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload de recursos críticos
    preloadCriticalResources();
    
    // Service Worker para PWA (si está disponible)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, continue without it
        });
    }
}

function preloadCriticalResources() {
    const criticalResources = [
        '/assets/css/estilos_modernos.css',
        '/assets/js/main_moderno.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * ========================================
 * ANALYTICS Y TRACKING
 * ========================================
 */

function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console log para desarrollo
    console.log('📊 Event tracked:', eventName, parameters);
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

/**
 * ========================================
 * UTILIDADES GENERALES
 * ========================================
 */

// Throttle function para optimizar eventos de scroll
function throttle(func, limit) {
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
}

// Debounce function para optimizar eventos de resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Función para detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para generar UUID simple
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * ========================================
 * MANEJO DE ERRORES GLOBAL
 * ========================================
 */

window.addEventListener('error', function(e) {
    console.error('💥 Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Unhandled Promise Rejection:', e.reason);
    trackEvent('promise_rejection', {
        reason: e.reason
    });
});

/**
 * ========================================
 * EXPORTAR FUNCIONES PÚBLICAS
 * ========================================
 */

// API pública para interacción externa
window.JKDTech = {
    showNotification,
    trackEvent,
    scrollToSection: (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    state: appState
};

console.log('🎉 JKD Tech Portfolio JavaScript cargado exitosamente!');
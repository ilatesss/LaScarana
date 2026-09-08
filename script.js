/**
 * script.js
 * Gestione di gallerie fotografiche, menu mobile, animazioni e modali per La Scarana
 */

// =========================================
// 1. GALLERIE FOTOGRAFICHE (CAROUSEL AUTOMATICO)
// =========================================
let galleryIndices = {};

document.addEventListener("DOMContentLoaded", function() {
    let carousels = document.querySelectorAll(".carousel-container");
    
    // Inizializza automaticamente tutte le gallerie presenti nella pagina
    carousels.forEach(function(carousel) {
        let id = carousel.id;
        if (id) {
            galleryIndices[id] = 1; 
            showSlides(id, 1);
        }
    });
});

// Collegamento globale (window.) per far funzionare gli onclick nell'HTML
window.changeSlide = function(galleryId, n) {
    if (!galleryIndices[galleryId]) {
        galleryIndices[galleryId] = 1;
    }
    galleryIndices[galleryId] += n;
    showSlides(galleryId, galleryIndices[galleryId]);
};

window.showSlides = function(galleryId, n) {
    const galleryContainer = document.getElementById(galleryId);
    if (!galleryContainer) return; 
    
    let slides = galleryContainer.getElementsByClassName("carousel-slide");
    if (slides.length === 0) return; // Evita blocchi se mancano le foto
    
    if (n > slides.length) {
        galleryIndices[galleryId] = 1;
    }
    if (n < 1) {
        galleryIndices[galleryId] = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[galleryIndices[galleryId] - 1].style.display = "block";
};

// =========================================
// 2. FUNZIONE LEGGI DI PIÙ / RIDUCI TESTO
// =========================================
window.toggleText = function(btn) {
    const textContent = btn.previousElementSibling;
    const btnText = btn.querySelector('span');

    if (textContent.classList.contains('text-collapsed')) {
        textContent.classList.remove('text-collapsed');
        textContent.classList.add('text-expanded');
        btnText.textContent = 'Riduci testo'; 
        btn.classList.add('active'); 
    } else {
        textContent.classList.remove('text-expanded');
        textContent.classList.add('text-collapsed');
        btnText.textContent = 'Leggi di più'; 
        btn.classList.remove('active'); 
    }
};

// =========================================
// 3. EFFETTI DINAMICI DI SCROLL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Menu Header Dinamico (solo in Homepage)
    const header = document.querySelector('header');
    const isHomePage = document.body.classList.contains('page-home');
    
    if (isHomePage && header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animazione "Reveal" degli elementi allo scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); 
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// =========================================
// 4. MENU HAMBURGER (MOBILE)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Chiude il menu quando si clicca un link (utile sui dispositivi mobili)
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
});

// =========================================
// 5. FINESTRE MODALI (PAGINA SERVIZI)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtns = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Blocca scroll pagina principale
        }
    }

    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('open');
        });
        document.body.style.overflow = ''; // Ripristina scroll
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Chiude cliccando fuori (sullo sfondo nero)
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeAllModals();
            }
        });
    });

    // Chiude premendo il tasto ESC sulla tastiera
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
});
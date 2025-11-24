document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. ANIMACIÓN DE SECCIONES + OPTIMIZACIÓN DE RENDIMIENTO
    // -------------------------------------------------------------------
    const sections = document.querySelectorAll('.full-screen:not(#inicio), .carousel-section');
    const introSection = document.getElementById('inicio');
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('active');
                
                // PERFORMANCE: Si no estamos en inicio, ocultar el slideshow para ahorrar GPU/Batería
                if (introSection) {
                    if (entry.target.id !== 'inicio') {
                        introSection.style.visibility = 'hidden';
                    } else {
                        introSection.style.visibility = 'visible';
                    }
                }
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('active');
            }
        });
    };

    const observer = new IntersectionObserver(sectionObserverCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    // Observar también el inicio para la lógica de visibilidad
    if(introSection) observer.observe(introSection);
    
    // -------------------------------------------------------------------
    // 2. NAVEGACIÓN SUAVE (Smooth Scroll)
    // -------------------------------------------------------------------
    const navMenu = document.querySelector('.navbar nav'); 
    const navLinks = document.querySelectorAll('.navbar nav a, .cta-button, .spec-price'); 

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Cálculo para compensar el header fijo
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active'); 
                }

                if (targetElement.classList.contains('hidden')) {
                     targetElement.classList.remove('hidden');
                     targetElement.classList.add('active');
                }
            }
        });
    });

    // -------------------------------------------------------------------
    // 3. MENÚ HAMBURGUESA
    // -------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // -------------------------------------------------------------------
    // 4. LÓGICA DE COTIZACIÓN DE MAQUINARIA
    // -------------------------------------------------------------------
    const contactForm = document.querySelector('.contact-form');
    const machineryCheckboxes = document.querySelectorAll('.machinery-card input[type="checkbox"]');
    const hiddenInput = document.getElementById('maquinaria_solicitada');

    const updateMachineryList = () => {
        const selectedMachines = [];
        machineryCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedMachines.push(checkbox.value);
            }
        });
        
        if (selectedMachines.length > 0) {
            hiddenInput.value = "Maquinaria solicitada: " + selectedMachines.join(', ');
        } else {
            hiddenInput.value = "No se seleccionó maquinaria.";
        }
    };
    
    if(contactForm) contactForm.addEventListener('submit', updateMachineryList);
    machineryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateMachineryList));

    // -------------------------------------------------------------------
    // 5. LÓGICA DE MODAL PARA PROYECTOS (CON PROTECCIÓN DE SWIPE)
    // -------------------------------------------------------------------
    const projectData = {
        'lomas-del-barro': {
            title: "Casa Lomas del Barro - Ciudad Guzman, Jal.",
            description: "Enclavada en la montaña Oriente, con vista hacia el valle...",
            images: ["images/obras/lomas/lomas1.webp", "images/obras/lomas/lomas2.webp", "images/obras/lomas/lomas3.webp", "images/obras/lomas/lomas4.webp", "images/obras/lomas/lomas5.webp", "images/obras/lomas/lomas6.webp"]
        },
        'callejones': {
            title: "Casa Callejones - Tamazula de Gordiano, Jal.",
            description: "La Casa Callejones es una vivienda unifamiliar ubicada...",
            images: ["images/obras/callejones/callejones1.webp", "images/obras/callejones/callejones2.webp", "images/obras/callejones/callejones3.webp","images/obras/callejones/callejones4.webp", "images/obras/callejones/callejones5.webp", "images/obras/callejones/callejones6.webp"]
        },
        'depas-zapotiltic': {
            title: "Edificio de Departamentos - Zapotiltic, Jal.",
            description: "Este exclusivo desarrollo en Zapotiltic, Jalisco...",
            images: ["images/obras/zapo/zapo8.webp", "images/obras/zapo/zapo2.webp", "images/obras/zapo/zapo3.webp", "images/obras/zapo/zapo4.webp", "images/obras/zapo/zapo5.webp", "images/obras/zapo/zapo6.webp", "images/obras/zapo/zapo7.webp"]
        },
        'carretera-sanmiguel': {
            title: "Carretera San Miguel - El Platanar, Tuxcacuesco, Jal.",
            description: "Trazado, demolicion, incorporacion, construccion de puente...",
            images: ["images/obras/carretera-sanmiguel/sanmiguel1.webp", "images/obras/carretera-sanmiguel/sanmiguel2.webp", "images/obras/carretera-sanmiguel/sanmiguel3.webp", "images/obras/carretera-sanmiguel/sanmiguel4.webp"]
        },
        'casa-maple': {
            title: "Casa Maple, Ciudad Guzman, Jal.",
            description: "Casa en residencial Maple, en Ciudad Guzman, Jalisco.",
            images: []
        },
        'casa-lazaro': {
            title: "Casa Lazaro Cárdenas, Ciudad Guzman, Jal.",
            description: "Casa ubicada en la calle Lazaro Cárdenas del Rio...",
            images: []
        },
        'nucleo-medico': {
            title: "Nucleo Medico HZ, Ciudad Guzman, Jal.",
            description: "Nucleo Medico de especialidades ubicado en el centro...",
            images: []
        }
    };

    const projectItems = document.querySelectorAll('.carousel-item'); 
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGallery = document.getElementById('modal-image-gallery');
    
    const showModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return; 

        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        modalGallery.innerHTML = '';
        data.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = data.title + ' foto';
            modalGallery.appendChild(img);
        });

        modal.classList.add('active');
    };

    // LÓGICA ANTI-CLIC ACCIDENTAL (SWIPE PROTECTION)
    let isDragging = false;
    let startX = 0;

    projectItems.forEach(item => {
        // Detectar inicio de toque
        item.addEventListener('touchstart', (e) => {
            isDragging = false;
            startX = e.touches[0].clientX;
        }, {passive: true});

        // Detectar movimiento
        item.addEventListener('touchmove', (e) => {
            if (Math.abs(e.touches[0].clientX - startX) > 10) {
                isDragging = true; // Si movió más de 10px, es un swipe, no un click
            }
        }, {passive: true});

        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Solo abrir si no estaba arrastrando
            if (!isDragging) {
                const projectId = item.getAttribute('data-project-id');
                showModal(projectId);
            }
        });
    });

    closeButton.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.remove('active');
    });

    // -------------------------------------------------------------------
    // 6. LÓGICA DE ANIMACIÓN DEL CARRUSEL DE HISTORIA (DESKTOP)
    // -------------------------------------------------------------------
    const carouselSection = document.querySelector('.carousel-section');
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    if (window.innerWidth > 768 && carouselSection && track) {
        let currentProjectIndex = 0;
        const numProjects = projectItems.length;

        const updateCarousel = (progress) => {
            const maxTranslate = track.scrollWidth - window.innerWidth;
            const translateValue = progress * maxTranslate;
            track.style.transform = `translateX(-${translateValue}px)`;
        };
        
        const scrollToProject = (index) => {
            const scrollableDistance = carouselSection.scrollHeight - window.innerHeight;
            const progress = index / (numProjects - 1);
            const scrollTop = progress * scrollableDistance + carouselSection.offsetTop;
            
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        };

        window.addEventListener('scroll', () => {
            const { top, height } = carouselSection.getBoundingClientRect();
            if (top > window.innerHeight || top + height < 0) return;

            const scrollableDistance = height - window.innerHeight;
            let progress = Math.max(0, Math.min(1, -top / scrollableDistance));
            
            currentProjectIndex = Math.round(progress * (numProjects - 1));
            
            requestAnimationFrame(() => updateCarousel(progress));
        });
        
        prevButton.addEventListener('click', () => {
            let targetIndex = Math.max(0, currentProjectIndex - 1);
            scrollToProject(targetIndex);
        });
        
        nextButton.addEventListener('click', () => {
            let targetIndex = Math.min(numProjects - 1, currentProjectIndex + 1);
            scrollToProject(targetIndex);
        });
    }

    // -------------------------------------------------------------------
    // 7. LÓGICA DE VIDEOS MEJORADA (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------
    const videoCards = document.querySelectorAll('.project-video-card');
    
    const videoObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // El video debe estar al 60% visible para reproducirse
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const video = card.querySelector('video');
            
            // Carga diferida (Lazy Loading) real
            if (!video.dataset.loaded) {
                const sources = video.querySelectorAll('source');
                sources.forEach(source => {
                    if(source.dataset.src) source.src = source.dataset.src;
                });
                video.load();
                video.dataset.loaded = "true";
            }

            if (entry.isIntersecting) {
                // Play seguro (sin sonido)
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        card.classList.add('is-playing');
                    }).catch(error => {
                        // Auto-play fue prevenido (ej. modo ahorro de datos)
                        console.log("Autoplay prevenido por navegador");
                    });
                }
            } else {
                video.pause();
                card.classList.remove('is-playing');
            }
        });
    }, videoObserverOptions);

    videoCards.forEach(card => {
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        
        if (isTouch) {
            // MÓVIL: Usar Observer para Autoplay al hacer scroll
            videoObserver.observe(card);
            // Ocultar icono de play vía variable CSS
            card.style.setProperty('--play-icon-display', 'none'); 
        } else {
            // DESKTOP: Mantener hover
            const video = card.querySelector('video');
            card.addEventListener('mouseenter', () => {
                if (!video.dataset.loaded) {
                    const sources = video.querySelectorAll('source');
                    sources.forEach(s => s.src = s.dataset.src);
                    video.load();
                    video.dataset.loaded = "true";
                }
                video.play();
                card.classList.add('is-playing');
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                card.classList.remove('is-playing');
            });
        }
    });

    // -------------------------------------------------------------------
    // 8. LÓGICA DE LIGHTBOX PARA IMÁGENES
    // -------------------------------------------------------------------
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close-button');

    if(modalGallery && lightbox) {
        modalGallery.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                lightboxImage.src = e.target.src;
                lightbox.classList.add('visible');
            }
        });

        const closeLightbox = () => lightbox.classList.remove('visible');

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImage) closeLightbox();
        });
    }

    // -------------------------------------------------------------------
    // 9. FUNCIÓN GENÉRICA PARA INICIALIZAR SCROLLBARS PERSONALIZADOS
    // -------------------------------------------------------------------
    const initializeCustomScrollbar = (carousel, inner) => {
        const scrollbar = carousel.nextElementSibling;
        
        if (!inner || !scrollbar || !scrollbar.classList.contains('custom-scrollbar')) return;

        const items = inner.children;
        const itemCount = items.length;
        if (itemCount === 0) return;

        let dots = [];
        scrollbar.innerHTML = '';

        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scrollbar-dot');
            
            // Mejorar UX del dot click
            dot.addEventListener('click', () => {
                const itemWidth = items[0].offsetWidth;
                const gap = parseInt(window.getComputedStyle(inner).gap) || 0;
                carousel.scrollTo({ left: i * (itemWidth + gap), behavior: 'smooth' });
            });
            scrollbar.appendChild(dot);
            dots.push(dot);
        }

        if (dots.length > 0) dots[0].classList.add('active');
        
        let timeout;
        carousel.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const itemWidth = items[0].offsetWidth;
                const gap = parseInt(window.getComputedStyle(inner).gap) || 0;
                const scrollLeft = carousel.scrollLeft;

                let activeIndex = Math.round(scrollLeft / (itemWidth + gap));
                activeIndex = Math.max(0, Math.min(itemCount - 1, activeIndex));

                dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
            }, 50); 
        });
    };

    // Aplicar a los carruseles existentes
    document.querySelectorAll('.horizontal-carousel-wrapper').forEach(carousel => {
        initializeCustomScrollbar(carousel, carousel.querySelector('.horizontal-carousel-inner'));
    });
    
    // -------------------------------------------------------------------
    // 10. CARRUSEL DE EQUIPO CON SCROLLBAR Y AUTOSCROLL
    // -------------------------------------------------------------------
    const teamScroller = document.querySelector('.team-scroller');
    if (teamScroller) {
        const teamInner = teamScroller.querySelector('.team-scroller__inner');
        initializeCustomScrollbar(teamScroller, teamInner);

        let autoScrollInterval;
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        const startAutoScroll = () => {
            // No hacer autoscroll en móviles, es molesto para la lectura táctil
            if (isTouchDevice) return;
            
            stopAutoScroll(); 
            autoScrollInterval = setInterval(() => {
                const firstCard = teamInner.children[0];
                const cardWidth = firstCard.offsetWidth;
                const gap = parseInt(window.getComputedStyle(teamInner).gap);

                if (teamScroller.scrollLeft >= teamScroller.scrollWidth - teamScroller.clientWidth - 1) {
                    teamScroller.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    teamScroller.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
                }
            }, 3000); 
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        let scrollTimeout;
        teamScroller.addEventListener('scroll', () => {
            stopAutoScroll();
            clearTimeout(scrollTimeout);
            // Reiniciar autoscroll solo en desktop
            if (!isTouchDevice) {
                scrollTimeout = setTimeout(startAutoScroll, 5000);
            }
        });

        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            });
        });
        teamObserver.observe(document.getElementById('identidad'));
    }
});

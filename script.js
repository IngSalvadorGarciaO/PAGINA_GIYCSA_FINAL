document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. ANIMACIÓN DE SECCIONES (Intersection Observer)
    // -------------------------------------------------------------------
    const sections = document.querySelectorAll('.full-screen:not(#inicio), .carousel-section');
    
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
                window.scrollTo({
                    top: targetElement.offsetTop,
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
    // 5. LÓGICA DE MODAL PARA PROYECTOS
    // -------------------------------------------------------------------
    const projectData = {
        'lomas-del-barro': {
            title: "Casa Lomas del Barro - Ciudad Guzman, Jal.",
            description: "Enclavada en la montaña Oriente, con vista hacia el valle, el Nevado de Colima y la laguna de Zapotlán, la Casa Loma de Barro ubicada en Ciudad Guzmán, Jalisco, nace de la necesidad de crear una residencia única en su tipo, que se adaptara a la topografía pronunciada del terreno. Es por ello por lo que surge el concepto de arquitectura blanca y panorámica, cuyo objetivo principal es fusionarse con el contexto natural que la rodea. Este concepto se materializa a través de grandes jardines y terrazas que enmarcan vistas tanto hacia la ciudad como hacia el entorno natural del valle de Zapotlán. El terreno presenta un desnivel pronunciado de aproximadamente 15 metros, lo que condicionó la estrategia de diseño. Para responder a esta topografía, la casa se desarrolla en cuatro niveles principales, adaptándose al relieve natural mediante plataformas escalonadas. Además, cuenta con tres niveles adicionales de terrazas abiertas llenas de vegetación, contribuyendo a la sensación de serenidad y paz dentro del espacio habitacional. El acceso se encuentra en la parte más alta del terreno, desde donde se inicia el recorrido descendente a través de los distintos niveles que conforman la residencia.",
            images: ["images/obras/lomas/lomas1.webp", "images/obras/lomas/lomas2.webp", "images/obras/lomas/lomas3.webp", "images/obras/lomas/lomas4.webp", "images/obras/lomas/lomas5.webp", "images/obras/lomas/lomas6.webp"]
        },
        'callejones': {
            title: "Casa Callejones - Tamazula de Gordiano, Jal.",
            description: "La Casa Callejones es una vivienda unifamiliar ubicada en el municipio de Tamazula de Gordiano, Jalisco, rodeada por vastas extenciones de tierras de cultivo. Su concepto se basa en la introspección, generando un espacio que se vive desde dentro hacia fuera. La arquitectura de la casa prioriza la privacidad y el contacto con la naturaleza a través de un gran patio central, el cual se convierte en el corazón del proyecto. Este patio además de aportar luz y ventilación natural a la vivienda también alberga un imponente árbol de mezquite, que se vuelve un habitante más de la casa, elemento simbólico de arraigo y fortaleza en la región.El diseño responde a la necesidad de integrar la vivienda con su contexto natural sin perder la comodidad y funcionalidad de un hogar contemporáneo. La materialidad y la paleta de colores utilizados refuerzan esta intención, con muros en tonos blancos que transmiten serenidad y generan una transición armoniosa con el paisaje horizontal. La jardinería ha sido trabajada con vegetación nativa, favoreciendo la sustentabilidad y reduciendo la necesidad de riego excesivo, lo que hace de la casa una propuesta ecológica y responsable con el medio ambiente",
            images: ["images/obras/callejones/callejones1.webp", "images/obras/callejones/callejones2.webp", "images/obras/callejones/callejones3.webp","images/obras/callejones/callejones4.webp", "images/obras/callejones/callejones5.webp", "images/obras/callejones/callejones6.webp"]
        },
        'depas-zapotiltic': {
            title: "Edificio de Departamentos - Zapotiltic, Jal.",
            description: "Este exclusivo desarrollo en Zapotiltic, Jalisco, es más que un conjunto de departamentos: es un oasis de calma pensado para su bienestar. Hemos fusionado un diseño moderno y minimalista con la calidez que su hogar merece. Los tonos neutros y las líneas limpias de la fachada crean un impacto visual elegante, proporcionando un telón de fondo perfecto para la vida que desea construir.La verdadera magia está en el interior y la forma en que se conecta con el entorno. Gracias a los amplios ventanales de piso a techo y los generosos balcones acristalados, la luz natural inunda cada rincón, mientras que las vistas al verde paisaje se convierten en parte de su decoración diaria. Aquí, el ajetreo se queda fuera; solo entra la tranquilidad. Descubra la comodidad de acabados de primer nivel y la paz de vivir en un entorno que celebra la arquitectura de vanguardia, sin renunciar a la esencia acogedora de la vida en Jalisco. Su nuevo capítulo comienza aquí, en un hogar donde el diseño se encuentra con la naturaleza para ofrecerle una vida de estilo, luz y absoluta paz.",
            images: ["images/obras/zapo/zapo8.webp", "images/obras/zapo/zapo2.webp", "images/obras/zapo/zapo3.webp", "images/obras/zapo/zapo4.webp", "images/obras/zapo/zapo5.webp", "images/obras/zapo/zapo6.webp", "images/obras/zapo/zapo7.webp"]
        },
        'carretera-sanmiguel': {
            title: "Carretera San Miguel - El Platanar, Tuxcacuesco, Jal.",
            description: "Trazado, demolicion, incorporacion, construccion de puente y construccion de carpeta asfaltica en carretera estatel San Miguel - El Platanar, en el municipio de Tuxcacuesco, Jalisco.",
            images: ["images/obras/carretera-sanmiguel/sanmiguel1.webp", "images/obras/carretera-sanmiguel/sanmiguel2.webp", "images/obras/carretera-sanmiguel/sanmiguel3.webp", "images/obras/carretera-sanmiguel/sanmiguel4.webp"]
        },
        'casa-maple': {
            title: "Casa Maple, Ciudad Guzman, Jal.",
            description: "Casa en residencial Maple, en Ciudad Guzman, Jalisco.",
            images: []
        },
        'casa-lazaro': {
            title: "Casa Lazaro Cárdenas, Ciudad Guzman, Jal.",
            description: "Casa ubicada en la calle Lazaro Cárdenas del Rio, en el centro de Ciudad Guzman, Jalisco.",
            images: []
        },
        'nucleo-medico': {
            title: "Nucleo Medico HZ, Ciudad Guzman, Jal.",
            description: "Nucleo Medico de especialidades ubicado en el centro de Ciudad Guzman, Jalisco.",
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

    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = item.getAttribute('data-project-id');
            showModal(projectId);
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
    // 7. LÓGICA PARA REPRODUCIR VIDEOS (COMPATIBLE CON MÓVIL Y DESKTOP)
    // -------------------------------------------------------------------
    const videoCards = document.querySelectorAll('.project-video-card');
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        let isVideoLoaded = false;

        const loadVideo = () => {
            if (!isVideoLoaded) {
                const sources = video.querySelectorAll('source');
                sources.forEach(source => {
                    source.src = source.dataset.src;
                });
                video.load();
                isVideoLoaded = true;
            }
        };

        if (isTouchDevice) {
            card.addEventListener('click', () => {
                loadVideo();
                if (video.paused) {
                    video.play();
                    card.classList.add('is-playing');
                } else {
                    video.pause();
                    card.classList.remove('is-playing');
                }
            });
        } else {
            card.addEventListener('mouseenter', () => {
                loadVideo();
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
    // 10. NUEVA LÓGICA: CARRUSEL DE EQUIPO CON SCROLLBAR Y AUTOSCROLL
    // -------------------------------------------------------------------
    const teamScroller = document.querySelector('.team-scroller');
    if (teamScroller) {
        const teamInner = teamScroller.querySelector('.team-scroller__inner');
        initializeCustomScrollbar(teamScroller, teamInner); // Reutilizamos la función del scrollbar

        let autoScrollInterval;

        const startAutoScroll = () => {
            // No hacer autoscroll en móviles
            if (isTouchDevice) return;
            
            stopAutoScroll(); // Asegurarse de que no haya intervalos duplicados
            autoScrollInterval = setInterval(() => {
                const firstCard = teamInner.children[0];
                const cardWidth = firstCard.offsetWidth;
                const gap = parseInt(window.getComputedStyle(teamInner).gap);

                // Si llegó al final, vuelve al inicio
                if (teamScroller.scrollLeft >= teamScroller.scrollWidth - teamScroller.clientWidth - 1) {
                    teamScroller.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    teamScroller.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
                }
            }, 3000); // Cambia de tarjeta cada 3 segundos
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        let scrollTimeout;
        teamScroller.addEventListener('scroll', () => {
            // Si el usuario hace scroll, detener el autoscroll y reiniciarlo después de 5 segundos de inactividad
            stopAutoScroll();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(startAutoScroll, 5000);
        });

        // Iniciar el autoscroll cuando la sección es visible
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

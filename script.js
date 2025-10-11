document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. ANIMACIÓN DE SECCIONES (Intersection Observer)
    // -------------------------------------------------------------------
    // Se incluye #identidad
    const sections = document.querySelectorAll('.full-screen:not(#inicio)');
    
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
    const navLinks = document.querySelectorAll('.navbar nav a'); 

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
                
                // Cierra el menú en móvil después de hacer clic
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active'); 
                }

                // Asegura la visibilidad del destino para el scroll
                if (targetElement.classList.contains('hidden')) {
                     targetElement.classList.remove('hidden');
                     targetElement.classList.add('active');
                }
            }
        });
    });

    // -------------------------------------------------------------------
    // 3. MENÚ HAMBURGUESA (Mobile Toggle)
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

    // Función para actualizar el campo oculto antes de enviar
    const updateMachineryList = () => {
        const selectedMachines = [];
        machineryCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedMachines.push(checkbox.value);
            }
        });
        
        if (selectedMachines.length > 0) {
            // Se actualiza el campo oculto con la lista de maquinaria seleccionada
            hiddenInput.value = "Maquinaria solicitada: " + selectedMachines.join(', ');
        } else {
            hiddenInput.value = "No se seleccionó maquinaria.";
        }
    };
    
    // Escucha el evento de envío del formulario para actualizar la lista de maquinaria
    contactForm.addEventListener('submit', updateMachineryList);

    // Escucha el cambio en los checkboxes (opcional pero buena práctica)
    machineryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateMachineryList);
    });

    // -------------------------------------------------------------------
    // 5. LÓGICA DE MODAL PARA MOSAICO DE HISTORIA
    // -------------------------------------------------------------------

    // Base de datos de proyectos para cargar la información
    const projectData = {
        'lomas-del-barro': {
            title: "Casa Lomas del Barro - Ciudad Guzman, Jal.",
            description: "Enclavada en la montaña Oriente, con vista hacia el valle, el Nevado de Colima y la laguna de Zapotlán, la Casa Loma de Barro ubicada en Ciudad Guzmán, Jalisco, nace de la necesidad de crear una residencia única en su tipo, que se adaptara a la topografía pronunciada del terreno. Es por ello por lo que surge el concepto de arquitectura blanca y panorámica, cuyo objetivo principal es fusionarse con el contexto natural que la rodea. Este concepto se materializa a través de grandes jardines y terrazas que enmarcan vistas tanto hacia la ciudad como hacia el entorno natural del valle de Zapotlán. El terreno presenta un desnivel pronunciado de aproximadamente 15 metros, lo que condicionó la estrategia de diseño. Para responder a esta topografía, la casa se desarrolla en cuatro niveles principales, adaptándose al relieve natural mediante plataformas escalonadas. Además, cuenta con tres niveles adicionales de terrazas abiertas llenas de vegetación, contribuyendo a la sensación de serenidad y paz dentro del espacio habitacional. El acceso se encuentra en la parte más alta del terreno, desde donde se inicia el recorrido descendente a través de los distintos niveles que conforman la residencia.",
            images: ["images/obras/lomas/lomas1.webp", "images/obras/lomas/lomas2.webp", "images/obras/lomas/lomas3.webp", "images/obras/lomas/lomas4.webp", "images/obras/lomas/lomas5.webp", "images/obras/lomas/lomas6.webp"] // Nombres de tus archivos de imagen
        },
        'callejones': {
            title: "Casa Callejones - Tamazula de Gordiano, Jal.",
            description: "La Casa Callejones es una vivienda unifamiliar ubicada en el municipio de Tamazula de Gordiano, Jalisco, rodeada por vastas extensiones de tierras de cultivo. Su concepto se basa en la introspección, generando un espacio que se vive desde dentro hacia fuera. La arquitectura de la casa prioriza la privacidad y el contacto con la naturaleza a través de un gran patio central, el cual se convierte en el corazón del proyecto. Este patio además de aportar luz y ventilación natural a la vivienda también alberga un imponente árbol de mezquite, que se vuelve un habitante más de la casa, elemento simbólico de arraigo y fortaleza en la región.El diseño responde a la necesidad de integrar la vivienda con su contexto natural sin perder la comodidad y funcionalidad de un hogar contemporáneo. La materialidad y la paleta de colores utilizados refuerzan esta intención, con muros en tonos blancos que transmiten serenidad y generan una transición armoniosa con el paisaje horizontal. La jardinería ha sido trabajada con vegetación nativa, favoreciendo la sustentabilidad y reduciendo la necesidad de riego excesivo, lo que hace de la casa una propuesta ecológica y responsable con el medio ambiente",
            images: ["images/obras/callejones/callejones1.png", "images/obras/callejones/callejones2.png", "images/obras/callejones/callejones3.png","images/obras/callejones/callejones4.png", "images/obras/callejones/callejones5.png", "images/obras/callejones/callejones6.png"]
        },
        'depas-zapotiltic': {
            title: "Edificio de Departamentos - Zapotiltic, Jal.",
            description: "Este exclusivo desarrollo en Zapotiltic, Jalisco, es más que un conjunto de departamentos: es un oasis de calma pensado para su bienestar. Hemos fusionado un diseño moderno y minimalista con la calidez que su hogar merece. Los tonos neutros y las líneas limpias de la fachada crean un impacto visual elegante, proporcionando un telón de fondo perfecto para la vida que desea construir.La verdadera magia está en el interior y la forma en que se conecta con el entorno. Gracias a los amplios ventanales de piso a techo y los generosos balcones acristalados, la luz natural inunda cada rincón, mientras que las vistas al verde paisaje se convierten en parte de su decoración diaria. Aquí, el ajetreo se queda fuera; solo entra la tranquilidad. Descubra la comodidad de acabados de primer nivel y la paz de vivir en un entorno que celebra la arquitectura de vanguardia, sin renunciar a la esencia acogedora de la vida en Jalisco. Su nuevo capítulo comienza aquí, en un hogar donde el diseño se encuentra con la naturaleza para ofrecerle una vida de estilo, luz y absoluta paz.",
            images: ["images/obras/zapo/zapo8.png", "images/obras/zapo/zapo2.png", "images/obras/zapo/zapo3.png", "images/obras/zapo/zapo4.png", "images/obras/zapo/zapo5.png", "images/obras/zapo/zapo6.png", "images/obras/zapo/zapo7.png"]
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

    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalGallery = document.getElementById('modal-image-gallery');
    
    // Función para mostrar el modal y cargar contenido
    const showModal = (projectId) => {
        const data = projectData[projectId];
        
        if (!data) return; 

        // 1. Cargar texto
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        // 2. Cargar galería de imágenes
        modalGallery.innerHTML = ''; // Limpiar galería previa
        data.images.forEach(imageSrc => {
            const img = document.createElement('img');
            // Usamos las imágenes de tu proyecto, asume que están en la raíz o ajusta la ruta si las mueves
            img.src = imageSrc;
            img.alt = data.title + ' foto';
            modalGallery.appendChild(img);
        });

        modal.classList.add('active');
    };

    // ------------------- EVENT LISTENERS -------------------

    // 1. Mostrar modal al hacer hover (o al hacer click, lo cual es mejor para móvil/UX)
    mosaicItems.forEach(item => {
        const projectId = item.getAttribute('data-project-id');
        
        // Usaremos 'click' para la apertura, que es más amigable para el usuario.
        // Si insistes en hover, cambia 'click' por 'mouseenter', pero NO es recomendable.
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(projectId);
        });
    });

    // 2. Cerrar modal con el botón X
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // 3. Cerrar modal al hacer click fuera
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active'); // <-- LÍNEA CAMBIADA
        }
    });

});
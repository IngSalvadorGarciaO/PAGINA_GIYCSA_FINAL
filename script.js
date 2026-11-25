/* =========================================================================
   GIYC SA de CV · Interacciones
   - Carruseles: flechas y arrastre con mouse, puntos, teclado y deslizamiento táctil
   - Menú móvil, animaciones de entrada, videos, modal de obras y formulario
   El sitio sigue funcionando si este script no carga (progresivo).
   ========================================================================= */
(function () {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Datos de las obras: se muestran en el modal al dar clic en una tarjeta
    const PROYECTOS = {
        'lomas-del-barro': {
            nombre: 'Casa Lomas del Barro',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Ciudad Guzmán, Jal.',
            descripcion: 'Casa enclavada en la montaña Oriente, con vista hacia el valle.',
            imagenes: [1, 2, 3, 4, 5, 6].map(n => `images/obras/lomas/lomas${n}.webp`),
        },
        'callejones': {
            nombre: 'Casa Callejones',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Tamazula de Gordiano, Jal.',
            descripcion: 'Vivienda unifamiliar ubicada en Tamazula de Gordiano, Jalisco.',
            imagenes: [1, 2, 3, 4, 5, 6].map(n => `images/obras/callejones/callejones${n}.webp`),
        },
        'depas-zapotiltic': {
            nombre: 'Edificio de Departamentos',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Zapotiltic, Jal.',
            descripcion: 'Exclusivo desarrollo de departamentos en Zapotiltic, Jalisco.',
            imagenes: [1, 2, 3, 4, 5, 6, 7, 8].map(n => `images/obras/zapo/zapo${n}.webp`),
        },
        'carretera-sanmiguel': {
            nombre: 'Carretera San Miguel – El Platanar',
            categoria: 'Obra pública',
            ubicacion: 'Tuxcacuesco, Jal.',
            descripcion: 'Trabajos de trazado, demolición, incorporación y construcción de puente.',
            imagenes: [1, 2, 3, 4].map(n => `images/obras/carretera-sanmiguel/sanmiguel${n}.webp`),
        },
        'casa-maple': {
            nombre: 'Casa Maple',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Ciudad Guzmán, Jal.',
            descripcion: 'Casa en el residencial Maple, en Ciudad Guzmán, Jalisco.',
            imagenes: ['images/mosaico/maple.webp'],
        },
        'casa-lazaro': {
            nombre: 'Casa Lázaro Cárdenas',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Ciudad Guzmán, Jal.',
            descripcion: 'Casa ubicada en la calle Lázaro Cárdenas del Río, Ciudad Guzmán, Jalisco.',
            imagenes: ['images/mosaico/fachada-lazaro.webp'],
        },
        'nucleo-medico': {
            nombre: 'Núcleo Médico HZ',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Ciudad Guzmán, Jal.',
            descripcion: 'Núcleo médico de especialidades ubicado en el centro de Ciudad Guzmán.',
            imagenes: ['images/mosaico/fachada-nucleo.webp'],
        },
        'nave-industrial': {
            nombre: 'Naves industriales y obra civil',
            categoria: 'Edificación y vivienda',
            ubicacion: 'Jalisco',
            descripcion: 'Construcción de naves industriales, estructuras metálicas y obra civil para empresas.',
            imagenes: ['images/cv/estructura-nave.webp'],
        },
        'plataformas-agricolas': {
            nombre: 'Plataformas agrícolas',
            categoria: 'Agroindustria',
            ubicacion: 'Jalisco',
            descripcion: 'Nivelación, compactación y construcción de plataformas para invernaderos, malla sombra y áreas de empaque.',
            imagenes: ['images/cv/plataforma-excavadora.webp', 'images/cv/plataforma-camion.webp', 'images/cv/excavadora-cielo.webp'],
        },
        'nave-empaque': {
            nombre: 'Nave de empaque agroindustrial',
            categoria: 'Agroindustria',
            ubicacion: 'Jalisco',
            descripcion: 'Construcción de nave industrial para empaque agrícola, con cimentaciones y adecuación de áreas de empaque.',
            imagenes: ['images/cv/nave-interior.webp', 'images/cv/empaque-piso.webp'],
        },
        'carreteras-pavimentacion': {
            nombre: 'Carreteras y pavimentación',
            categoria: 'Obra pública',
            ubicacion: 'Jalisco',
            descripcion: 'Construcción, rehabilitación y pavimentación de caminos, vialidades urbanas, drenaje y obras complementarias.',
            imagenes: ['images/cv/carretera-amplia.webp', 'images/cv/carretera.webp', 'images/cv/pavimentacion.webp'],
        },
        'equipamiento-salud-educativo': {
            nombre: 'Centros de salud y planteles educativos',
            categoria: 'Infraestructura y equipamiento',
            ubicacion: 'Jalisco',
            descripcion: 'Construcción de centros de salud y planteles educativos, y rehabilitación de instalaciones públicas.',
            imagenes: ['images/cv/centro-salud.webp', 'images/cv/equipamiento-educativo.webp'],
        },
    };

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setYear();
        initHeader();
        initMenu();
        initReveal();
        initFilters();
        initProjects();
        initVideos();
        initMachinery();
        initForm();
    }

    /* ------------------------------------------------------------------
       Año del pie de página
       ------------------------------------------------------------------ */
    function setYear() {
        const el = $('#anio');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ------------------------------------------------------------------
       Encabezado: sombra al hacer scroll
       ------------------------------------------------------------------ */
    function initHeader() {
        const header = $('.site-header');
        if (!header) return;
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ------------------------------------------------------------------
       Menú móvil (pantalla completa)
       ------------------------------------------------------------------ */
    function initMenu() {
        const toggle = $('.nav-toggle');
        const nav = $('#menu-principal');
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        toggle.addEventListener('click', () => {
            const open = !document.body.classList.contains('nav-open');
            setOpen(open);
            if (open) nav.querySelector('a').focus();
        });

        // Al tocar un enlace, el menú se cierra y la página baja a la sección
        nav.addEventListener('click', (e) => {
            if (e.target.closest('a')) setOpen(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
                setOpen(false);
                toggle.focus();
            }
        });

        // Si se gira el celular o se amplía la ventana, se cierra el menú
        window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => {
            if (e.matches) setOpen(false);
        });
    }

    /* ------------------------------------------------------------------
       Animación de entrada (una sola vez, sin ocultar contenido)
       ------------------------------------------------------------------ */
    function initReveal() {
        const items = $$('.reveal');
        if (!('IntersectionObserver' in window) || reduceMotion.matches) {
            items.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ------------------------------------------------------------------
       Filtros de obras: Todas, Agroindustria, Obra pública, etc.
       En celular se muestran 6 obras y un botón para ver todas
       ------------------------------------------------------------------ */
    function initFilters() {
        const bar = $('.filters');
        const list = $('#obras-lista');
        if (!bar || !list) return;

        const items = $$('li[data-category]', list);
        const buttons = $$('.chip', bar);
        const status = $('#filtro-estado');
        const more = $('#obras-mas');
        const LIMITE = 6;
        let expandida = false;
        const visible = (filtro, li) => filtro === 'todas' || li.dataset.category === filtro;

        buttons.forEach((b) => {
            const n = items.filter(li => visible(b.dataset.filter, li)).length;
            b.querySelector('.chip__count').textContent = n;
            if (n === 0) b.hidden = true;
        });

        const actualizar = (anunciar) => {
            const cumplen = items.filter(li => !li.hidden);
            // Solo afecta a celular (CSS): las obras de más se ocultan
            cumplen.forEach((li, i) => li.classList.toggle('is-extra', !expandida && i >= LIMITE));
            if (more) {
                more.hidden = cumplen.length <= LIMITE;
                more.setAttribute('aria-expanded', String(expandida));
                more.textContent = expandida ? 'Ver menos obras' : `Ver todas las obras (${cumplen.length})`;
            }
            if (anunciar && status) {
                status.textContent = `Mostrando ${cumplen.length} ${cumplen.length === 1 ? 'obra' : 'obras'}.`;
            }
        };

        bar.addEventListener('click', (e) => {
            const btn = e.target.closest('.chip');
            if (!btn) return;
            buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            items.forEach(li => { li.hidden = !visible(btn.dataset.filter, li); });
            expandida = false;
            actualizar(true);
        });

        if (more) {
            more.addEventListener('click', () => {
                expandida = !expandida;
                actualizar(false);
                if (!expandida) $('.obras-head').scrollIntoView({ block: 'start' });
            });
        }

        actualizar(false);
    }

    /* ------------------------------------------------------------------
       Modal de obras y foto ampliada (con flechas y teclado)
       ------------------------------------------------------------------ */
    function initProjects() {
        const modal = $('#project-modal');
        const lightbox = $('#lightbox');
        const lightboxImg = $('#lightbox-image');
        const gallery = $('#modal-image-gallery');
        if (!modal || !gallery) return;

        let lastTrigger = null;
        let fotos = [];  // fotos del proyecto abierto
        let indice = 0;  // foto que se ve en la lightbox

        const openProject = (id, trigger) => {
            const data = PROYECTOS[id];
            if (!data) return;
            lastTrigger = trigger;
            $('#modal-meta').textContent = `${data.categoria} · ${data.ubicacion}`;
            $('#modal-title').textContent = data.nombre;
            $('#modal-description').textContent = data.descripcion;
            const total = data.imagenes.length;
            $('#modal-count').textContent = `${total} ${total === 1 ? 'foto' : 'fotos'}`;
            fotos = data.imagenes.map((src, i) => ({ src, alt: `${data.nombre}, foto ${i + 1}` }));
            gallery.innerHTML = '';
            fotos.forEach((foto) => {
                const img = document.createElement('img');
                img.src = foto.src;
                img.alt = foto.alt;
                img.loading = 'lazy';
                img.decoding = 'async';
                gallery.appendChild(img);
            });
            modal.showModal();
            modal.querySelector('.dialog__close').focus();
        };

        $$('.obra-card').forEach((btn) => {
            btn.addEventListener('click', () => openProject(btn.dataset.projectId, btn));
        });

        // Clic en el fondo cierra el diálogo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });

        // El botón "cotizar similar" cierra el diálogo y la página baja al formulario
        const similar = modal.querySelector('[data-cotizar-similar]');
        if (similar) similar.addEventListener('click', () => modal.close());

        modal.addEventListener('close', () => {
            if (lastTrigger) lastTrigger.focus({ preventScroll: true });
        });

        if (!lightbox || !lightboxImg) return;
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');
        const counter = lightbox.querySelector('#lightbox-count');

        const mostrar = (i) => {
            if (!fotos.length) return;
            indice = (i + fotos.length) % fotos.length;
            lightboxImg.src = fotos[indice].src;
            lightboxImg.alt = fotos[indice].alt;
            const varias = fotos.length > 1;
            prevBtn.hidden = !varias;
            nextBtn.hidden = !varias;
            counter.hidden = !varias;
            counter.textContent = `${indice + 1} / ${fotos.length}`;
        };

        gallery.addEventListener('click', (e) => {
            if (e.target.tagName !== 'IMG') return;
            mostrar(Math.max(0, Array.from(gallery.children).indexOf(e.target)));
            lightbox.showModal();
        });

        prevBtn.addEventListener('click', () => mostrar(indice - 1));
        nextBtn.addEventListener('click', () => mostrar(indice + 1));
        lightbox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(indice - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(indice + 1); }
        });

        // Clic en el fondo o en la foto cierra la vista ampliada
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxImg) lightbox.close();
        });
    }

    /* ------------------------------------------------------------------
       Videos: carga diferida, reproducción al verse y botón de pausa
       ------------------------------------------------------------------ */
    function initVideos() {
        const cards = $$('.video-card');
        if (!cards.length) return;

        const loadSources = (video) => {
            if (video.dataset.loaded) return;
            $$('source', video).forEach((s) => {
                if (s.dataset.src) s.src = s.dataset.src;
            });
            video.load();
            video.dataset.loaded = '1';
        };

        const setPlaying = (card, playing) => {
            card.classList.toggle('is-playing', playing);
            const btn = $('.video-card__toggle', card);
            const title = $('figcaption h4', card).textContent;
            btn.setAttribute('aria-pressed', String(playing));
            btn.setAttribute('aria-label', `${playing ? 'Pausar' : 'Reproducir'} video: ${title}`);
        };

        const play = (card) => {
            const video = $('video', card);
            loadSources(video);
            const p = video.play();
            if (p && typeof p.then === 'function') {
                p.then(() => setPlaying(card, true)).catch(() => setPlaying(card, false));
            } else {
                setPlaying(card, true);
            }
        };

        const pause = (card) => {
            $('video', card).pause();
            setPlaying(card, false);
        };

        // Botón manual: el usuario decide y se recuerda hasta que vuelva a entrar en pantalla
        cards.forEach((card) => {
            const btn = $('.video-card__toggle', card);
            btn.addEventListener('click', () => {
                const playing = card.classList.contains('is-playing');
                card.dataset.userPaused = playing ? '1' : '0';
                playing ? pause(card) : play(card);
            });
        });

        if (!('IntersectionObserver' in window)) return;

        // 1) Cargar el video cuando está cerca de pantalla
        const loadObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadSources($('video', entry.target));
                    loadObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px' });

        // 2) Reproducir solo cuando al menos 60 % es visible; con movimiento reducido, no se reproduce solo
        const playObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const card = entry.target;
                if (reduceMotion.matches) return;
                if (entry.intersectionRatio >= 0.6 && card.dataset.userPaused !== '1') {
                    play(card);
                } else if (entry.intersectionRatio < 0.6) {
                    card.dataset.userPaused = '0';
                    pause(card);
                }
            });
        }, { threshold: [0, 0.6] });

        cards.forEach((card) => {
            loadObserver.observe(card);
            playObserver.observe(card);
        });
    }

    /* ------------------------------------------------------------------
       Maquinaria: contador, resumen y selección para la cotización
       ------------------------------------------------------------------ */
    function initMachinery() {
        const boxes = $$('.machine-card input[type="checkbox"]');
        const count = $('#maq-count');
        const picked = $('#maquinaria-elegida');
        const pickedList = $('#maquinaria-lista');
        const hidden = $('#maquinaria_solicitada');
        if (!boxes.length) return;

        const update = () => {
            const selected = boxes.filter(b => b.checked).map(b => b.value);
            if (count) {
                count.textContent = selected.length
                    ? `${selected.length} seleccionada${selected.length > 1 ? 's' : ''}`
                    : 'Ninguna seleccionada';
            }
            if (picked) picked.hidden = selected.length === 0;
            if (pickedList) pickedList.textContent = selected.join(', ');
            if (hidden) {
                hidden.value = selected.length
                    ? 'Maquinaria solicitada: ' + selected.join(', ')
                    : 'No se seleccionó maquinaria.';
            }
        };

        boxes.forEach(b => b.addEventListener('change', update));
        update();
        window.giycMachineryReset = () => { boxes.forEach(b => { b.checked = false; }); update(); };
    }

    /* ------------------------------------------------------------------
       Formulario de contacto: envío sin recargar la página
       ------------------------------------------------------------------ */
    function initForm() {
        const form = $('#contact-form');
        const status = $('#form-status');
        if (!form || !status) return;

        form.addEventListener('submit', async (e) => {
            if (!form.checkValidity()) return; // el navegador muestra los avisos
            e.preventDefault();

            const submit = form.querySelector('button[type="submit"]');
            submit.disabled = true;
            status.className = 'form-status';
            status.textContent = 'Enviando tu solicitud…';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                form.reset();
                if (window.giycMachineryReset) window.giycMachineryReset();
                status.classList.add('is-ok');
                status.textContent = '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.';
            } catch (err) {
                status.classList.add('is-error');
                status.textContent = 'No pudimos enviar tu mensaje. Inténtalo de nuevo o llámanos al (341) 412 9265.';
            } finally {
                submit.disabled = false;
            }
        });
    }
})();

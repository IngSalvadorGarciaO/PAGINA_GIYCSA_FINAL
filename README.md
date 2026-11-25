# GIYC SA de CV · Sitio web

Sitio estático de GIYC SA de CV (García Inmobiliaria y Construcción), constructora y renta de maquinaria en Ciudad Guzmán, Jalisco.

## Ver el sitio
Abre `index.html` en el navegador, o publícalo con GitHub Pages.

## Estructura
- `index.html`: página principal (inicio, servicios, proyectos, maquinaria, clientes y contacto).
- `aviso-de-privacidad.html`: aviso de privacidad (borrador, revisar con asesor legal antes de publicar).
- `style.css`: estilos. Diseño primero para celular; luego tablet (960 px) y escritorio (1100 px).
- `script.js`: filtros de obras (con botón "ver todas" en celular), modal de obras, videos y formulario.
- `images/` y `videos/`: multimedia. Las versiones `-m.webp` son para celular.
- `images/cv/`: fotos tomadas del currículum 2026 de GIYC.

## Cómo editar
- **Servicios, obras, videos y maquinaria**: están en `index.html`, cada uno como `<li>` dentro de una cuadrícula (`ul.grid`).
- **Datos de cada obra** (nombre, ubicación, categoría, descripción y fotos): en `PROYECTOS` dentro de `script.js`. La categoría debe coincidir con `data-category` del `<li>` en `index.html` y con `data-filter` de los botones `.chip`.
- **Colores**: variables al inicio de `style.css` (`--orange`, `--ink`, `--concrete`).
- **Formulario**: se envía con Formspree (`action` en `index.html`).

## Pendientes antes de publicar
- Confirmar año de fundación (el sitio dice "Desde 2015").
- Confirmar el aviso de privacidad con un asesor legal.
- Agregar la URL final del sitio para las vistas previas al compartir (Open Graph) y el mapa del sitio.

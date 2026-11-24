- Stack: HTML5 semántico, CSS nativo (con nesting, variables CSS y medidas `rem`) y JavaScript Vanilla mediante módulos ESM (`<script type="module" src="js/main.js"></script>` con `import`/`export`).
- Estilos: Prohibido usar Tailwind CSS. Los estilos deben ser puramente nativos y limpios.
- Accesibilidad: Cumplimiento riguroso de WCAG AA. No uses atributos ARIA si existe un elemento HTML semántico nativo que cumpla la función.
- Gestor de paquetes: Utiliza exclusivamente pnpm en lugar de npm.
- Idioma de código: Todos los nombres de clases, identificadores (IDs) y funciones deben estar estrictamente en inglés.
- Modularidad de CSS y JS (obligatoria):
- Prohibido concentrar estilos o lógica en archivos monolíticos; divide todo en archivos pequeños y temáticos (objetivo: 100–250 líneas por archivo, máximo ~300)
- En `css/`: separa por capa o componente (`base.css` para `:root`, reset y tipografía; `layout.css` para estructura y rejillas; componentes como `modal.css`, `navbar.css`, `cards.css` o `components.css`; y `states.css` o `utilities.css` para estados `is-*`, temas o utilidades), cargándolos en ese orden desde `index.html` o mediante `@import` en `css/main.css`.
- En `modules/`: separa por responsabilidad usando ES Modules, p. ej. `main.js`/`app.js` (entrada), `state.js`/`store.js` (estado), `ui.js`/`dom.js` (DOM y renderizado), `api.js`/`storage.js` (datos y persistencia) y módulos por función o componente.
- En cada iteración, indica en qué archivo(s) de `css/` o `modules/` aplica cada cambio y extrae a un archivo nuevo si un componente, vista o función crece.
- Control y ejecución:
* No ejecutes linters ni formateadores (los ejecuto yo manualmente).
* No hagas build ni levantes servidores de desarrollo automáticamente.
* No ejecutes Google Chrome en modo `--headless` ni scripts con `--screenshot` o carpetas `uitest` en `/tmp` o `/var/folders`.
* No inspecciones imágenes de capturas de pantalla salvo que te lo pida explícitamente en el turno. Verifica los cambios de estilos y layout revisando directamente el código HTML/CSS/JS o pidiéndome que compruebe el resultado en mi navegador local.
-Metodología: Si tienes cualquier duda o necesitas tomar una decisión de diseño/arquitectura, pregúntame primero.

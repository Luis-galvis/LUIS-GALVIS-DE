# Prompts listos para Antigravity

Copia el bloque que necesites. Todos asumen que el agente puede leer `CONTEXTO-PROYECTOS.md`.

---

## 0. Prompt base (pégalo siempre al inicio de una sesión nueva)

```
Vas a trabajar conmigo, Luis Fernando Galvis Moreno: Data Engineer en ScotiaTech
(Scotiabank GBS), en Ibagué, Colombia. Estoy construyendo tres cosas a la vez:
un libro técnico ("Cómo ser un Data Engineer"), su laboratorio reproducible y una
comunidad de formación (Data Career Lab).

Antes de escribir una línea de código, LEE estos archivos en este orden:

1. C:\Users\lgalv\Desktop\landing-libro\CONTEXTO-PROYECTOS.md   ← quién soy y qué he construido
2. C:\Users\lgalv\Desktop\landing-libro\DESIGN.md               ← el sistema de diseño (Linear). Es la fuente de verdad visual.
3. C:\Users\lgalv\Desktop\landing-libro\README.md               ← cómo está armada la landing
4. C:\Users\lgalv\Desktop\landing-libro\assets\js\config.js     ← WhatsApp, redes, planes y precios

Reglas que no se negocian:
- No inventes datos, precios, métricas ni testimonios. Si falta un dato, pregúntame.
- No leas, imprimas ni subas archivos .env, credenciales, dumps de clientes ni IPs de servidores.
- Antes de decir que algo está terminado, verifícalo (servidor local + captura o test).
- Escribe en español de Colombia, directo, sin relleno ni superlativos de marketing vacío.
- Sigue DESIGN.md al pie de la letra: canvas #010102, superficies #0f1011/#141516/#18191a,
  un ÚNICO acento lavanda #5e6ad2, Inter con tracking negativo en display, botones de 8px,
  tarjetas de 12px con borde de 1px. Nada de gradientes decorativos ni de un segundo color de acento.

La página me vende a MÍ: trayectoria, liderazgo, proyectos, docencia y comunidad.
El libro es una sección destacada, no el argumento principal.

Cuando termines una tarea, dime qué cambiaste, qué verificaste y qué queda pendiente.
```

---

## 1. Para seguir mejorando la landing

```
Trabaja sobre C:\Users\lgalv\Desktop\landing-libro (sitio estático: index.html,
muestra.html, assets/css/styles.css, assets/js/config.js, assets/js/app.js, DESIGN.md).

Objetivo: subir la conversión de MI landing personal (marca personal, no venta de libro)
sin salir del sistema de diseño Linear de DESIGN.md.

Precios vigentes: libro $40.000 (Núcleo + Completa), mentoría 1 sesión $60.000,
mentoría 4 sesiones $100.000. Todo se cierra por WhatsApp al 573204545796. Sin pasarela.

Tareas concretas:
1. Integra mi foto real. Es assets/img/portrait.jpg (4:5). Si te doy otra, recórtala y
   reemplázala sin tocar el HTML: el <img> ya tiene width, height y alt.
2. Añade analítica: la página ya emite `window.dispatchEvent(new CustomEvent("site:track"))`
   y `dataLayer.push` en los CTA. Engánchalo a GA4 o Vercel Analytics sin dependencias pesadas.
3. Añade testimonios reales cuando te los pase (config.js → `testimonials`). Si el arreglo
   está vacío, la sección debe seguir oculta.
4. Refuerza la sección de proyectos: si tengo capturas de Boxapp, del bot de ventas o de
   Sentinel QA, móntalas como paneles `product-screenshot-card` (radio 16px, superficie 1).
5. Revisa accesibilidad: contraste AA, foco visible, navegación solo con teclado,
   y que la página se vea completa con JavaScript desactivado.

Verificación obligatoria antes de terminar:
- `python -m http.server 5500` y revisar en 1440×900 y en 390×844.
- `node tools/qa.js` debe reportar 0 errores y ningún desborde horizontal.
- `node tools/qa-interactions.js` debe seguir pasando (13 enlaces wa.me al número correcto).
```

---

## 2. Para trabajar en el libro

```
Contexto: el libro "Cómo ser un Data Engineer" está completo (51 capítulos, 495 páginas,
12 partes) y se vende SOLO en PDF, en dos ediciones (Núcleo + Completa) por $40.000.
La fuente vive en C:\Users\lgalv\Desktop\obsidian\libro\capitulos\ como Markdown de Obsidian,
y se compila a PDF con la toolchain de C:\Users\lgalv\Desktop\obsidian (bookCompiler.js,
export_docx.py, export_epub.py). EPUB, DOCX y HTML son formatos internos: no se comercializan.

Estado editorial: todos los capítulos están redactados. Los capítulos 08 (formatos de
archivo) y 12 (joins distribuidos) nacieron como material nuevo, no como apuntes previos.

Lo que necesito ahora: [ESCRIBE AQUÍ — p. ej. revisar un capítulo, unificar terminología,
generar ejercicios nuevos, maquetar una edición impresa].

Reglas:
- No reescribas mi voz. Corrige sintaxis, claridad y consistencia, no el estilo.
- Cada capítulo mantiene su estructura: objetivos de aprendizaje, teoría, código
  ejecutable, consideraciones de producción, anti-patrones, preguntas de revisión y
  ejercicios con solución, resumen, lecturas recomendadas.
- Todo el código de ejemplo debe ser ejecutable contra el laboratorio del repositorio
  (PostgreSQL 16, MinIO, Spark 3.5.3, DuckDB) o contra DuckDB en memoria.
- Antes de compilar, avísame: la compilación completa genera PDF de 495 páginas.
```

---

## 3. Para el laboratorio y la comunidad

```
Contexto: el laboratorio del libro es
https://github.com/Luis-galvis/como-ser-un-data-engineer — Docker Compose con
PostgreSQL 16, MinIO (S3 local), Spark 3.5.3 master+worker y DuckDB; 8 datasets
deterministas (seed=42); CI en GitHub Actions con ruff + pytest.

Encima de eso estoy montando Data Career Lab: 72 sesiones de una hora en 13 fases,
con material propio en C:\Users\lgalv\Desktop\obsidian\clases.

Lo que necesito: [ESCRIBE AQUÍ — p. ej. añadir tests a un ejercicio, generar el
dataset de la sesión S14, convertir un guion de clase en cuaderno ejecutable,
preparar el entregable de una fase].

Reglas:
- Los datasets deben ser reproducibles: misma semilla, mismo resultado.
- Cada ejercicio nuevo necesita su test en tests/ y su solución documentada.
- Nada de dependencias innecesarias; si añades una, justifícala y fíjala con versión.
- Ejecuta `pytest -v tests/` antes de decir que terminaste.
```

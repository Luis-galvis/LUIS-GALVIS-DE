# Landing personal — Luis Galvis

Sitio de marca personal: trayectoria, proyectos, docencia y comunidad. El libro está dentro,
pero no es el argumento principal. Estático, sin build y sin dependencias de npm en producción.

**Sistema de diseño:** [`DESIGN.md`](DESIGN.md) es el archivo de **Linear** copiado de
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md). Toda decisión visual
sale de ahí: canvas `#010102`, escalera de superficies, un solo acento lavanda `#5e6ad2`, Inter con
tracking negativo, tarjetas de 12px con borde de 1px. **Si agregas una sección, primero decides en
qué superficie vive.**

---

## Ver la página

**Rápido:** abre `index.html` en el navegador.

**Recomendado** (para que rutas y fuentes se comporten como en producción):

```powershell
cd C:\Users\lgalv\Desktop\landing-libro
python -m http.server 5500
```

Luego entra a <http://localhost:5500>.

---

## Estructura

```
landing-libro/
├─ index.html               → la landing (9 secciones)
├─ muestra.html             → temario de 51 capítulos + capítulo de muestra
├─ DESIGN.md                → sistema de diseño (Linear) — la fuente de verdad visual
├─ CONTEXTO-PROYECTOS.md    → brief completo para Antigravity u otro agente
├─ PROMPT-ANTIGRAVITY.md    → prompts listos para copiar
├─ README.md
├─ assets/
│  ├─ css/styles.css        → tokens + componentes del sistema
│  ├─ js/config.js          → ⭐ WHATSAPP, REDES, PLANES Y PRECIOS
│  ├─ js/app.js             → interacciones
│  └─ img/                  → condor.png · og-image.jpg · favicon.png · portrait.jpg
└─ tools/
   ├─ build_assets.py       → regenera imagen OG, favicon, marcador de retrato
   ├─ qa.js                 → QA visual (Puppeteer + Chrome)
   └─ qa-interactions.js    → QA de precios, enlaces y menú
```

Orden de las secciones: hero con retrato → cifras → perfil/trayectoria → stack → proyectos →
docencia → comunidad gratis → **el libro** → mentorías/precios → FAQ → cierre.

---

## 1. Tu foto (pendiente)

`assets/img/portrait.jpg` es un **marcador generado**. Reemplázalo por una foto tuya:

- Proporción **4:5** (vertical), ~1000×1250 px, JPG.
- Mismo nombre y ruta: `assets/img/portrait.jpg`.
- Recorta a la altura del pecho, fondo neutro si puedes.
- La etiqueta `<img>` ya tiene `width`, `height` y `alt`; no hace falta tocar el HTML.

Si el archivo no existe o falla, la página dibuja una silueta con «Tu foto aquí» en vez de romperse.

---

## 2. Lo que se edita: `assets/js/config.js`

### WhatsApp y redes

```js
links: {
  whatsappNumber: "573204545796",   // formato internacional, sin + ni espacios
  whatsappPretty: "+57 320 454 5796",
  tiktok:    "https://www.tiktok.com/@luchotechos",
  instagram: "https://www.instagram.com/luchotechos/",
  youtube:   "https://www.youtube.com/@LF_TECH3",
  discord:   "https://discord.gg/R9rtKefPF",
  linkedin:  "https://www.linkedin.com/in/luis-fernando-galvis-moreno-a589a6262/",
  github:    "https://github.com/Luis-galvis",
  sample:    "muestra.html"
}
```

**Todo se cierra por WhatsApp.** No hay pasarela en la página: cada botón abre la conversación con el
mensaje ya escrito (plan + precio), usando `messages` para el texto genérico y `waMsg` para cada plan.

### Precios

```js
plans: [
  { id: "libro",     price: 40000,  ... },   // Núcleo + Completa
  { id: "mentoria1", price: 60000,  ... },   // 1 sesión 1:1
  { id: "mentoria4", price: 100000, ... }    // 4 sesiones
]
```

- `featured: true` deja la tarjeta en superficie elevada con el botón lavanda.
- `badge` pinta la etiqueta superior («Empieza aquí», «Mejor valor»).
- `{ text: "...", off: true }` en `features` lo muestra tachado (lo que **no** incluye).
- `unit` es la línea mono debajo del precio.
- `waMsg` es el mensaje que le llega al abrir WhatsApp para ese plan.

### Mensajes

```js
messages: {
  hello:     "Hola Luis, vi tu página y quiero hablar contigo.",
  proyecto:  "Hola Luis, vi tus proyectos y quiero contarte una idea.",
  comunidad: "Hola Luis, quiero entrar a la comunidad de Data Career Lab.",
  libro:     "..."
}
```

Cada CTA del HTML lleva `data-wa="hello|proyecto|comunidad|libro"` y `app.js` le pega el texto.

### Testimonios

```js
testimonials: [ { text: "...", name: "Nombre", role: "Analista BI → Data Engineer" } ]
```

Vacío = sección oculta. Solo testimonios reales y con permiso.

---

## 3. Cobrar (lo único que falta para vender)

Todos los botones de compra abren un **modal** con dos o tres salidas. Qué tan corto es el camino
depende de lo que configures en `config.js`.

### `checkoutUrl` — pago con tarjeta, Nequi o PSE

Pega ahí el **link de pago** de tu proveedor. Cuando existe, el modal muestra un botón primario
**«Pagar ahora · $40.000»** que lleva directo al checkout.

| Opción | Costo aproximado | Entrega del PDF | Cuándo conviene |
|---|---|---|---|
| **Hotmart** | ~9,9% + fijo | **Automática** (correo + área de miembros) | Si no quieres enviar el PDF a mano. Muy conocido en LATAM |
| **MercadoPago** (link de pago) | ~3,5–4,5% | Manual (lo envías tú) | Si te importa la comisión y aceptas responder pocos correos |
| **Wompi** (Bancolombia) | ~2,9% + IVA | Manual | Si ya tienes RUT y cuenta Bancolombia |
| **Gumroad** | ~10% | Automática | Si quieres vender en USD fuera de Colombia |

### Agenda de mentorías — agendador propio

No usa Calendly ni Cal.com: el calendario vive en `config.js` → `booking`.

```js
booking: {
  enabled: true,
  email: "lgalvismoreno@gmail.com",   // aquí llegan las reservas
  timezoneLabel: "hora de Colombia (GMT-5)",
  durationMin: 60,
  weekdays: [2, 4],                   // martes y jueves (0=domingo)
  times: ["18:00", "19:00", "20:00"],
  weeksAhead: 4,
  leadDays: 1,
  meetUrl: ""                         // link de Meet/Zoom (opcional)
}
```

**Cómo funciona:** el plan con `booking: true` muestra en el modal un botón
**«Ya pagué · elegir horario»**. Al abrirlo se generan los horarios disponibles, la persona elige
uno, deja nombre / correo / WhatsApp y confirma.

- La reserva se envía a **tu correo** con `_subject`, plan, fecha, hora y objetivo.
- Se agrega `_cc` con **el correo del estudiante**, así a él también le llega copia.
- En pantalla recibe la confirmación + **Google Calendar** + **.ics** descargable. Eso es su
  confirmación real, aunque el correo falle.
- Si el envío falla, la pantalla cambia y ofrece **WhatsApp** como acción principal, con todos
  los datos ya escritos: la reserva no se pierde.

> ⚠️ **Activación única (importante):** el envío usa [FormSubmit](https://formsubmit.co).
> La **primera** reserva real dispara un correo de confirmación a `lgalvismoreno@gmail.com`
> con un enlace tipo *"Activate Form"*. Hay que darle clic **una sola vez**.
> Hasta activarlo, las reservas caen al respaldo de WhatsApp (funciona, pero sin correo).

**Limitación honesta:** los horarios son fijos; no hay sincronización con tu Google Calendar.
Si un martes no puedes, cambia `weekdays`/`times` o sube `leadDays`. Cuando quieras
disponibilidad real sincronizada, el reemplazo natural es Cal.com (gratis) — el resto de la
página no cambia.

### Flujos por plan

| Plan | Flujo |
|---|---|
| **Libro** | Pago (MercadoPago) → te llega el aviso → envías el PDF |
| **Mentoría 1:1** | Pago → **agendador propio** para elegir el horario de la única sesión |
| **Mentoría 4 sesiones** | Pago → WhatsApp para agendar **la primera**; las siguientes se validan sesión a sesión |

### Sin links configurados

El modal ofrece **WhatsApp** (mensaje ya redactado con plan y precio) y un botón
**«Copiar el número»**. Sirve para vender desde hoy, sin pasarela, y evita que un clic termine
en una pantalla vacía cuando el visitante no tiene WhatsApp instalado.

---

## 4. Publicar

### Vercel
1. Sube la carpeta a un repo de GitHub.
2. *Add New → Project → Import*.
3. Framework preset **Other**, build command vacío, output directory `.`
4. Deploy.

### Netlify
Arrastra la carpeta completa a <https://app.netlify.com/drop>.

### GitHub Pages
Rama `main` → *Settings → Pages → Deploy from branch → / (root)*.

### VPS propio (Nginx)
```bash
rsync -av --delete ./landing-libro/ usuario@servidor:/var/www/luisgalvis/
```
```nginx
server {
    listen 443 ssl;
    server_name luisgalvis.dev;
    root /var/www/luisgalvis;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```
> Las credenciales del VPS viven en tu guía de despliegue, **nunca** en este repositorio.

---

## 5. Checklist antes de publicar

- [ ] Foto real en `assets/img/portrait.jpg`.
- [ ] Dominio real en `canonical`, `og:url` y `twitter:*` de `index.html` y `muestra.html` (hoy: `https://luisgalvis.dev/`).
- [ ] Probar el enlace de Discord desde el celular (que la invitación no haya expirado).
- [ ] Probar los 13 enlaces de WhatsApp: deben abrir el chat con el texto correcto.
- [ ] Verificar la vista previa al compartir (metatags.io o el depurador de LinkedIn) con `assets/img/og-image.jpg`.
- [ ] Confirmar que la cuenta de Nequi/Bancolombia que compartes es la correcta.
- [ ] Añadir testimonios cuando existan.

---

## 6. QA

```powershell
node tools/qa.js              # capturas por sección + desbordes + errores de consola
node tools/qa-interactions.js # precios, enlaces wa.me, retrato, redes, FAQ, menú móvil
```

Los resultados esperados hoy: **0 errores de JS, 0 desbordes horizontales** en 1440×900 y 390×844,
13 enlaces de WhatsApp apuntando a `573204545796`, 3 planes con precios `$40.000 / $60.000 / $100.000`.

Para regenerar imágenes (OG, favicon, marcador de retrato) desde la portada del libro:

```powershell
python tools/build_assets.py
```

Necesita Pillow y la portada en `C:\Users\lgalv\Desktop\obsidian\libro\condor_profesional.jpg`.

---

## 7. Tokens del sistema

| Token | Valor | Uso |
|---|---|---|
| `--canvas` | `#010102` | Fondo de página |
| `--surface-1` | `#0f1011` | Tarjetas, paneles |
| `--surface-2` | `#141516` | Tarjeta destacada, hover |
| `--hairline` | `#23252a` | Bordes de 1px |
| `--hairline-strong` | `#34343a` | Bordes de énfasis, inputs |
| `--ink` | `#f7f8f8` | Títulos |
| `--ink-subtle` | `#8a8f98` | Texto secundario |
| `--primary` | `#5e6ad2` | Único acento: CTA, marca, foco |
| `--success` | `#27a644` | Punto de disponibilidad |
| Radios | 8px botones · 12px tarjetas · 16px paneles | |
| Sección | 96px vertical | `--section` |

**Reglas del sistema (no las rompas):**
- Un solo color de acento. Nada de naranjas, verdes ni rosas decorativos.
- Sin gradientes atmosféricos ni halos de color. La jerarquía se hace con superficies y bordes.
- Botones con radio de 8px, nunca píldora.
- Tracking negativo solo en display; el cuerpo va casi neutro.
- El mono se usa para datos, versiones y etiquetas, no para texto corrido.

**Marca personal:** sin monograma ni cuadro con iniciales. El logotipo es el nombre
«Luis Galvis» precedido por un punto lavanda (`.brand::before`). El favicon es el cóndor del libro
sobre lavanda.

**El libro se vende solo en PDF** (las dos ediciones). EPUB, DOCX y HTML existen como formatos
internos de trabajo, pero no se ofrecen al comprador. Si en algún momento los quieres vender,
se agregan en `config.js` → `features` y en la sección del libro.

---

## 8. Accesibilidad y rendimiento

- Funciona sin JavaScript: el contenido se ve completo; el JS solo añade animaciones.
- Teclado: enlace «Saltar al contenido», foco visible con el lavanda del sistema, `Esc` en acordeones nativos.
- `prefers-reduced-motion` desactiva animaciones y contadores.
- Sin librerías. Todo el JS son ~200 líneas propias. Única dependencia externa: Google Fonts (con fallback del sistema).
- Imágenes optimizadas: OG 1200×630 (75 KB), condor con alfa real, retrato JPG.

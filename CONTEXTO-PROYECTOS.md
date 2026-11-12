# Contexto de proyectos — Luis Fernando Galvis Moreno

> **Para qué sirve este archivo:** es el brief completo de quién soy, qué he construido y dónde vive cada cosa en mi PC. Está escrito para pegarlo en Antigravity (o en cualquier agente de código) y que arranque con contexto real, sin inventar.
>
> **Última actualización:** octubre de 2026.
> **Regla de oro:** si un dato no está aquí, pregúntamelo. No rellenes huecos con suposiciones.

---

## 1. Quién soy

**Luis Fernando Galvis Moreno** — Data Engineer. Ibagué, Tolima, Colombia (trabajo remoto).

- **Rol actual:** Data Engineer en **ScotiaTech (Scotiabank GBS)**, desde febrero de 2026.
- **Formación:** Ingeniería de Sistemas, CUN · Tecnólogo en Análisis y Desarrollo de Software, SENA (2023–2025) · Diplomado en Ethical Hacking (Red/Blue/Purple Team), UdeCataluña & CertJoin (2025).
- **Certificaciones (las 8 que aparecen en todos mis CV):** CEH — Certified Ethical Hacker (EC-Council) · CS50 Computer Science & Databases (Harvard edX) · Google Cloud Platform (Platzi) · AWS Cloud Fundamentals (Platzi) · Pandas & NumPy (Platzi) · Business Intelligence (Platzi) · Prompt Engineering for GenAI (Alura) · Scrum & Agile (Platzi/UOC).
- **Certs en planes, NO obtenidas todavía:** Databricks Data Engineer Associate, DP-700 (Fabric), GCP Professional Data Engineer, AWS DEA-C01. Están analizadas en `Documents\job-search-agents\CERTS_PLAN.md`. **No presentarlas como conseguidas.**
- **Idiomas:** español nativo; inglés C1, usado a diario con contrapartes internacionales.
- **Contacto:** `lgalvismoreno@gmail.com` · **WhatsApp `+57 320 454 5796`** (canal oficial para todo lo comercial) · [LinkedIn](https://www.linkedin.com/in/luis-fernando-galvis-moreno-a589a6262/) · [GitHub](https://github.com/Luis-galvis).
- **Redes:** TikTok [@luchotechos](https://www.tiktok.com/@luchotechos) · Instagram [@luchotechos](https://www.instagram.com/luchotechos/) · YouTube [@LF_TECH3](https://www.youtube.com/@LF_TECH3) · Discord de la comunidad: https://discord.gg/R9rtKefPF

### Trayectoria en una línea
Full-stack freelance (PHP/MySQL) → automatización con APIs, n8n, Apps Script y LLMs en Alegra → ingeniería de datos de seguridad en BigQuery/Looker → Data Engineer en banca con SQL Server, SSIS, Databricks y PySpark.

### Hitos que puedo demostrar con números
- Dueño de pipelines ETL de extremo a extremo para **más de 38.000 activos** empresariales (datos de vulnerabilidad, Tenable), con exigencia regulatoria.
- Estabilicé un pipeline que perdía datos y retrasaba el reporte: **33% de mejora** medida en rendimiento (tuning de SQL e indexación).
- Reduje tiempos de respuesta **30%** automatizando procesos del área de Personas (n8n, Apps Script, APIs).
- Fundé el **Security Hub** de Alegra: plataforma central de datos de seguridad que absorbió operaciones manuales de consola.

---

## 2. El libro: «Cómo ser un Data Engineer»

Es mi proyecto principal y el activo comercial más valioso que tengo.

| Campo | Valor |
|---|---|
| Título | **Cómo ser un Data Engineer** |
| Subtítulo | Una mirada a fondo de los fundamentos y los procesos prácticos para llegar de cero a Data Engineer |
| Autor | Luis Galvis (portada) / Luis Fernando Galvis Moreno (legal) |
| Edición | Primera edición, 2026, español (es-CO) |
| Extensión | **495 páginas** · **51 capítulos** · **12 partes** |
| Formato físico de referencia | 7×10 in (178×254 mm), sangre 0.125 in |
| Formatos que se venden | **Solo PDF** (Edición Núcleo + Edición Completa) |
| Formatos internos | También existen EPUB 3.0, DOCX y HTML maestro con KaTeX, pero **no se comercializan** |
| Registro | ISBN y DNDA **aún no asignados** (no inventarlos) |
| Licencia | Texto: todos los derechos reservados. Código: MIT |

**Tesis del libro:** el problema no es la información, es el orden. Es una secuencia que no se salta el fundamento (SQL, modelado, Python) antes de entrar a Spark, Lakehouse y System Design, con un laboratorio reproducible que corre en la máquina del lector.

**Promesa editorial:** cada capítulo trae objetivos de aprendizaje, teoría, código ejecutable, consideraciones de producción, anti-patrones, preguntas de revisión y **ejercicios con solución**. No hay secciones sin cerrar.

### Las 12 partes
1. **Panorama y fundamentos** (Caps. 00, 00A–00D, 01, 02, 02A, 02B) — roadmap, Linux/Git/Docker/redes, OLTP, Python, laboratorio, SQL, window functions, DuckDB, algoritmos.
2. **Computación distribuida con Spark** (03–06) — de MapReduce a Spark, arquitectura de clúster, SparkSession, RDD → DataFrame.
3. **Ingesta, formatos y esquemas** (07–09) — CSV/JSON/JDBC, Parquet/ORC/Avro, casting riguroso.
4. **Transformación con DataFrame API** (10–12) — filtrado, condicionales, esquemas, joins distribuidos.
5. **Motor interno y optimización** (13–16) — lazy evaluation y DAG, Catalyst, memoria y caché, particionado y skew.
6. **Lakehouse y ACID** (17, 18, 18A, 19, 20) — medallón, Delta Lake/Iceberg, Databricks, Unity Catalog, data contracts.
7. **Streaming** (21–22) — Kafka, Structured Streaming, CDC.
8. **Orquestación, modelado y DataOps** (23, 23A, 24, 25, 26, 26A) — Airflow/ADF, dbt, Terraform, CI/CD, pytest y Testcontainers.
9. **Observabilidad y calidad** (27–28) — logging, métricas, Great Expectations.
10. **Cloud, system design e IA** (29, 29A–29D, 30–33) — FinOps, Fabric, AWS, GCP, Snowflake, entrevistas senior, seguridad, NoSQL, LLMs.
11. **Proyecto integrador** (34) — plataforma Lakehouse de punta a punta.
12. **Apéndices y epílogo** (35–37) — glosario A–Z, cheatsheet de escala, epílogo.

### Dónde vive
- Fuente en Markdown (Obsidian): `C:\Users\lgalv\Desktop\obsidian\libro\capitulos\`
- Compilados: `C:\Users\lgalv\Desktop\obsidian\libro\libro-digital.pdf` · `.epub` · `libro-profesional.docx` · `libro_academico_completo.html`
- Arte de portada: `C:\Users\lgalv\Desktop\obsidian\libro\condor_profesional.jpg` (cóndor grabado, negro sobre blanco)
- Metadatos editoriales: `metadata.yaml`, `ESTADO_Y_PROGRESO.md`, `REPORTE_EDITORIAL.md`
- Toolchain de compilación propia (Node + Puppeteer): `bookCompiler.js`, `export_docx.py`, `export_epub.py`, `server.js`

---

## 3. El laboratorio del libro (repositorio acompañante)

**Repo:** https://github.com/Luis-galvis/como-ser-un-data-engineer

No es un anexo: es el diferenciador comercial. Reproduce una plataforma de datos moderna en una sola máquina con Docker Compose, sin costos de nube.

- **Servicios:** PostgreSQL 16 (:5432), MinIO como S3 local (:9000 API, :9001 UI), Apache Spark 3.5.3 master (:8080/:7077) + worker (2 cores, 2 GB), DuckDB in-process.
- **Buckets:** landing, bronze, silver, gold (creados por `minio-init`).
- **8 datasets deterministas** (`seed=42`, vía `scripts/generar_datos.py`): ventas 10k, clientes, telemetría JSON anidada, clickstream 25k, usuarios con PII, pedidos 20k, eventos anuales 50k y transacciones sesgadas 100k (Zipf/Pareto) para provocar *data skew* y *shuffle spill*.
- **Estudio de mercado verificado:** `data/estudio_mercado_50_ofertas_2026.csv` (50 ofertas analizadas, Q1 2026, Colombia/LATAM/remoto USD).
- **CI:** GitHub Actions con `ruff`, generación reproducible de datos y `pytest` (contratos Pydantic, consultas DuckDB, idempotencia).
- **Arranque:** `git clone` → `cp .env.example .env` → `docker compose up -d` → `python scripts/generar_datos.py` → `pytest -v tests/`.

---

## 4. Tutorías y comunidad: Data Career Lab

Enseño ingeniería de datos y análisis uno a uno. La marca de trabajo es **Data Career Lab**.

### Currículo: 72 sesiones de 1 hora, 13 fases
Diseñado «para aprender, no para lucirse». Las fases 0–6 se dictan hoy; 7–13 se abren cuando el alumno ya entregó lo de la fase anterior.

| Fase | Nombre | Sesiones |
|---|---|---|
| 0 | Arranque y laboratorio listo | 2 |
| 1 | SQL que no miente | 11 |
| 2 | Modelado: dar forma al dato | 6 |
| 3 | SQL analítico | 6 |
| 4 | Python para mover el dato | 8 |
| 5 | Pipeline completo y salida en BI | 6 |
| 6 | Calidad y operación | 4 |
| 7 | Orquestación | 3 |
| 8 | dbt | 3 |
| 9 | Cloud | 4 |
| 10 | Databricks | 9 |
| 11 | Spark a escala | 4 |
| 12 | Streaming | 3 |
| 13 | Arquitectura y empleabilidad | 3 |

**Ritmo:** 1 sesión/semana = 18 meses · 2 = 9 meses · 3 = 6 meses.

**Estructura de cada clase (60 min):** 0–5 arranque con una pregunta que no saben responder (se anota sin corregir) · 5–20 concepto con un ejemplo resuelto en vivo · 20–50 práctica mientras circulo · 50–58 cierre y respuesta a la pregunta inicial · 58–60 tarea con criterio de aceptación. Reglas: una sola idea por sesión, nadie sale sin ejecutar algo, el entregable se revisa en cinco minutos.

### Material que ya existe
- `clases/Curriculo-Data-Engineer-72-Sesiones.docx` (+ versión `.md`)
- `clases/Como-ser-un-Data-Engineer-Parte-I.pptx` — **129 diapositivas** con guion hablado, pregunta para el grupo y error típico en las notas del orador.
- `clases/Clase-01-SQL-Guion-1-Hora.docx` y `Mensaje-para-Estudiantes-Clase-01.md`
- `clases/laboratorio/` — `generar_datos_callcenter.py` crea la base `DataCareer` con esquema `analytics` (5 dimensiones, 3 hechos, 1 tabla cruda), inyecta errores controlados e imprime la hoja de respuestas. `clase_01_consultas.sql`, `clase_02_joins.sql`, `hoja_de_respuestas.txt`.
- `clases/datasets/` — `ventas.csv`, `clientes.csv`, `pedidos.csv` para SQL Server.
- `Desktop\DataCareer_Lab.zip` — paquete autónomo (`setup_datacareer.py`) que crea el laboratorio en SQL Server.

### Alumnos
- **Julieth Herrera Olivar** — preparación para rol Junior Data Analyst / BI. Su ruta usa el laboratorio de call center: descubrir problemas de calidad, definir KPIs, analizar agentes y campañas, construir Power BI y cerrar con 5 hallazgos + 5 recomendaciones. **No se le entregan las reglas de corrupción de datos: debe descubrirlas.**

Todo lo anterior vive en `C:\Users\lgalv\Desktop\obsidian\clases\`.

---

## 5. Los proyectos técnicos

### 5.1 Boxapp — SaaS de inventario y facturación
- **Qué es:** plataforma multi-inquilino (multi-tenant) para inventario por referencia y talla, pedidos, comprobantes y logística. Uso real en comercio de calzado y en operación tipo *showroom*.
- **Stack:** Node/Express, React + TypeScript + Vite, Tailwind + shadcn/ui, Supabase (Postgres, RLS, Storage), worker de impresión (`printer-worker`), despliegue en Vercel.
- **Integraciones:** pasarela de pagos (MercadoPago) y transportadoras vía MiPaquete (cotización, guías, tracking).
- **Problemas reales resueltos:** duplicados por referencia+talla+inquilino, precios en cero, stock negativo, reconstrucción de inventario, saneamiento de reservas, migraciones de estados.
- **Rutas:** `Desktop\Boxapp-main` (versión activa, con `.git`), `Desktop\Boxapp`, `Desktop\boxaappmain` (copias antiguas), `Desktop\zapatos_julus`, `Desktop\atypical-store`, `Desktop\zapatos venta`.
- **Repo:** https://github.com/Luis-galvis/Boxapp
- ⚠️ Contiene `.env` con credenciales de Supabase y de pagos. **No leer, no imprimir, no subir.**

### 5.2 Sentinel QA Core — calidad y observabilidad del ecosistema
- **Qué es:** centro de mando de QA que vigila Boxapp, el bot de ventas/difusión, la landing y la base Postgres central.
- **Capacidades:** radar de integridad de base de datos (duplicados ilegales, precios en 0, stock negativo, discrepancias entre tallas), **sandbox E2E** sobre un tenant seguro y aislado con limpieza automática, auditor estático multi-repositorio (detecta consultas sin filtro `tenant_id` → fuga multi-tenant; sobreescritura de tallas) y asistente QA con LLM (Groq, `gpt-oss-20b` / `gpt-oss-120b`) con contexto en vivo de base de datos, procesos y repos.
- **Stack:** Node + Express, Socket.IO (dashboard en tiempo real con WebSockets), Supabase, SSH2 para operar el VPS, PM2, node-cron.
- **Rutas:** `Desktop\QA\` — `server.js` (≈27k), `src/{routes,services,middlewares,scripts}`, `alegra_demo/` (demo funcional de integración contable con guion de video), `data/` (histórico de auditorías y telemetría), `docs/` (arquitectura, modelo de datos, reglas de negocio, despliegue).
- ⚠️ No tiene repositorio público. `data/qa_api_keys.json` y `.env` contienen secretos reales.

### 5.3 Camello Online — mi bolsa de empleo
- **Qué es:** **producto propio en producción**: https://www.camelloonline.com/. Bolsa de empleo con publicación de vacantes, perfiles de candidato, postulaciones y panel para empresas.
- **Stack:** Supabase (PostgreSQL, Auth con roles, RLS por fila), JavaScript y SQL. Modelo con `companies`, `job_posts`, `candidate_profiles`, `job_applications` y `auth.users`.
- **Seguridad:** le hice una auditoría propia —encontré exposición de datos y la corregí— y documenté el proceso en un informe técnico. De ahí salió también un video divulgativo.
- **Material de la auditoría:** `Downloads\auditoria-camello\` — `reportes\informe_camelloonline.pdf`, `evidencia\`, `dump\`. Es evidencia de **mi propio** sistema; no se publica.
- **En la landing:** es la tarjeta ancha y principal de proyectos, con enlace "Ver el sitio" y la etiqueta "En producción".

### 5.4 Grainflow ERP — sistema para la industria molinera
ERP que integra cadena de suministro y lógica de negocio pesada. `Desktop\grainflow-erp-main`. Repo: https://github.com/Luis-galvis/grainflow-erp

### 5.5 Automatizaciones y bots
- **Bot de ventas y difusión por WhatsApp** (`VentasBot`): el proyecto más completo después del libro. Atiende, cotiza y cierra ventas por WhatsApp; difunde catálogo y crea referencias multi-talla.
  - **Stack:** Node + TypeScript, `@whiskeysockets/baileys` (WhatsApp multi-dispositivo), Gemini y OpenAI (texto y visión), **BullMQ + Redis** para colas de trabajo, Supabase como base, Express + Socket.IO para el panel, `pino` para logs, `cockatiel` para reintentos y `node-cron` para tareas programadas.
  - **Scripts Python** de apoyo: categorización de producto, generación de descripciones, clasificación de nicho y procesamiento unificado de fotos (modelos de visión).
  - **Frontend:** Vite + Tailwind.
  - **Ruta:** `D:\Bot ventas\` (activo, con `.git`); copia en `D:\Bot ventas - copia`. Corre en un VPS propio bajo PM2 junto a Sentinel QA.
  - ⚠️ `backend\.env` y `frontend\.env` tienen credenciales reales de Supabase, Meta y proveedores de IA. No leer ni replicar.
- **Automatizaciones de Personas** en Alegra: n8n + Apps Script + APIs externas.
- **monitor de seguridad con ML**: bot que bloquea actividad maliciosa con bucle de retroalimentación.
- **ADA / demandas de accesibilidad**: motor de investigación que usa LLMs y scraping para convertir datos legales no estructurados en estrategia. Repo: https://github.com/Luis-galvis/ADA-DEMANDAS-INVESTIGACION

### 5.6 Landings y sitios
- `Desktop\Optima-landing` (y variantes `Optima-landing-master`, `OptimaLanding`) — sitio de **Optima Labs** (`optimalabsconsulting.com`), **mi empresa de producción de software**. El sitio incluye agente conversacional, calculadora de retorno y captación de leads.
- `Desktop\Portafolio\index.html` — portafolio personal (HTML + Tailwind CDN, estética oscura con acento cian).
- `Desktop\landingsupreme` — tienda/landing de Supreme con checkout, integración de pagos y logística.
- `Desktop\landingpremier` — variante Premier del mismo comercio.

### 5.7 Proyectos menores y experimentos
`GastosAmor-main` (finanzas de pareja) · `import-path-pro-main` · `kick-chat-shop-main` · `style-sync-wardrobe-33-main` · `mesas` (asignación de mesas para una boda, con Excel y web) · `memoria` · `roblox-mcp` · `s23fe_tools` · `Scrumban` · `debate` (DEBATEAI).

### 5.8 Pipeline de contenido técnico (video)
Cadena propia para producir video vertical de divulgación:
- `Videos\NVIDIA\Desktop\camelloonline_tiktok\` — pipeline completo: guion → TTS → música/SFX → render 1080×1920 → **QA visual automatizado** (hojas de contacto de frames, detección de cambios de escena, verificación de audio).
- `Desktop\obsidian\clases\TikTok-Segundo-Salario-Guion.md` y `laboratorio\tiktok_segundo_salario.sql` — guiones de contenido.
- `Videos\NVIDIA\Desktop\tiktok-remotion\`, `_tiktok_build`, `_video_edit` — experimentos con Remotion, FFmpeg y edición programática.
- Material de la marca **LF TECH**: `LF TECH - DATOS+SEGURIDAD`, `LF-TECH-TikTok-*`, subtítulos y transcripciones.

---

## 6. Mapa de rutas en el PC

| Qué | Dónde |
|---|---|
| Libro (fuente y compilados) | `C:\Users\lgalv\Desktop\obsidian\libro\` |
| Clases y currículo de tutoría | `C:\Users\lgalv\Desktop\obsidian\clases\` |
| Laboratorio del libro (código, docker, tests) | `C:\Users\lgalv\Desktop\obsidian\` |
| Boxapp (activo) | `C:\Users\lgalv\Desktop\Boxapp-main\` |
| Sentinel QA Core | `C:\Users\lgalv\Desktop\QA\` |
| Auditoría Camello Online | `C:\Users\lgalv\Downloads\auditoria-camello\` |
| Portafolio | `C:\Users\lgalv\Desktop\Portafolio\` |
| Landings de cliente | `C:\Users\lgalv\Desktop\landingsupreme\`, `landingpremier\`, `Optima-landing\` |
| CV y cartas de presentación | `C:\Users\lgalv\Documents\CV_y_CARTAS_LISTAS\` |
| Bot de ventas WhatsApp | `D:\Bot ventas\` |
| **Landing personal (nueva)** | `C:\Users\lgalv\Desktop\landing-libro\` |
| Infraestructura del VPS | `C:\Users\lgalv\Desktop\QA\DEPLOY_VPS.md` — PM2 + Nginx. Las credenciales no viven en este repo. |
| Pipeline de video | `C:\Users\lgalv\Videos\NVIDIA\Desktop\camelloonline_tiktok\` |

---

## 7. Cómo trabajo (convenciones)

- **Idioma:** escribo y documento en **español de Colombia**, tono directo y técnico, sin relleno. En código, nombres de variables y comentarios en inglés solo cuando el ecosistema lo exige.
- **Estilo de código:** Node con `commonjs` en la mayoría de proyectos, Python 3.11+ con tipado, SQL con nombres en `snake_case`.
- **Preferencias de entrega:** archivos completos y ejecutables, no fragmentos. Si algo no se puede probar, se dice.
- **Rigor:** me importa la verificabilidad. Si afirmo un número, debe salir de una fuente. Los tests y el CI existen para eso.
- **Seguridad:** `.env`, claves de API, tokens y dumps de terceros nunca se leen, imprimen ni suben a un repo.

### Lo que pido cuando delego en un agente
1. No inventar datos, precios, testimonios ni métricas.
2. No tocar `.env`, credenciales ni material de clientes.
3. Verificar visualmente (captura o navegador) antes de dar algo por terminado.
4. Respetar el sistema de diseño: la landing y todo lo visual sigue **`DESIGN.md` (Linear)**, copiado de `VoltAgent/awesome-design-md`. Canvas `#010102`, escalera de superficies `#0f1011 → #191a1b`, un solo acento lavanda `#5e6ad2`, tipografía Inter con tracking negativo en display, tarjetas de 12px con borde de 1px. No introducir un segundo color de acento ni gradientes decorativos.
5. Español neutro-colombiano en lo público; voseo solo en conversación informal.

### Redes y canales oficiales
| Canal | Enlace |
|---|---|
| WhatsApp (todo se cierra aquí) | `wa.me/573204545796` |
| TikTok | https://www.tiktok.com/@luchotechos |
| Instagram | https://www.instagram.com/luchotechos/ |
| YouTube | https://www.youtube.com/@LF_TECH3 |
| Discord (comunidad, gratis) | https://discord.gg/R9rtKefPF |
| LinkedIn | https://www.linkedin.com/in/luis-fernando-galvis-moreno-a589a6262/ |
| GitHub | https://github.com/Luis-galvis |

---

## 8. La landing personal (estado actual)

**Ruta:** `C:\Users\lgalv\Desktop\landing-libro\`

No es una página de venta del libro: es **mi landing personal**. El eje es quién soy —trayectoria,
liderazgo, stack, proyectos, docencia y comunidad—. El libro aparece como una sección destacada,
no como el argumento principal.

Sitio estático, sin build y sin dependencias de npm en producción (solo Google Fonts). Se abre con
doble clic en `index.html`.

- **Sistema de diseño:** `DESIGN.md` de **Linear** (copiado de `VoltAgent/awesome-design-md`). Canvas `#010102`, superficies `#0f1011 / #141516 / #18191a`, acento único lavanda `#5e6ad2`, Inter con tracking negativo, botones de 8px, tarjetas de 12px.
- **Secciones:** hero con retrato → cifras → perfil + trayectoria + capacidades → stack → 8 proyectos → docencia (72 sesiones) → comunidad gratis (Discord) → el libro → mentorías y precios → FAQ → CTA final.
- **`muestra.html`** — temario de los 51 capítulos + capítulo de muestra real (lead magnet).
- **`assets/js/config.js`** — todo lo editable: número de WhatsApp, redes, planes, precios y mensajes prellenados.
- **`assets/img/portrait.jpg`** — **marcador generado**. Reemplazar por la foto real (4:5, ~1000×1250). Si el archivo falta, la página dibuja una silueta con «Tu foto aquí».
- **Marca personal:** sin monograma. El logotipo es el nombre «Luis Galvis» precedido por un punto lavanda. El favicon es el cóndor del libro sobre lavanda. **Nada de cuadros con iniciales.**
- **`tools/build_assets.py`** — regenera portada del libro, OG image, favicon y el marcador de retrato.
- **`tools/qa.js`** y **`tools/qa-interactions.js`** — QA visual y de interacción con Puppeteer sobre Chrome local.

### Precios vigentes (decididos por mí)
| Plan | Precio | Qué incluye |
|---|---|---|
| **El libro** | **$40.000 COP** | Edición **Núcleo + Edición Completa**, 4 formatos, laboratorio y comunidad |
| **Mentoría 1:1** | **$60.000 COP** | 1 sesión de 60 min, ruta a 90 días, revisión de CV y portafolio, libro incluido, WhatsApp 15 días |
| **Mentoría 4 sesiones** | **$100.000 COP** | 4 sesiones, ruta con entregables, revisión del proyecto, simulacro de entrevista, libro y WhatsApp durante el proceso |

**Regla comercial:** las clases, los retos, el laboratorio y la comunidad son **gratis**. Solo se cobra
el libro y las mentorías. Los botones de compra abren un **modal** con: pago directo (si hay
`checkoutUrl`), agendador propio (si `booking: true`), WhatsApp con el pedido redactado y un botón para
copiar el número (`+57 320 454 5796`).

### Cobro y agenda
- **Libro:** `checkoutUrl` → `https://mpago.li/11d27mm` (MercadoPago, **$40.000**). Entrega manual del PDF por correo.
- **Mentoría 1:1 ($60.000):** `checkoutUrl` → `https://mpago.li/1Dsybqh` + `booking: true`. Después de pagar, el estudiante elige el horario en el **agendador propio** de la página.
- **Mentoría 4 sesiones ($100.000):** `checkoutUrl` → `https://mpago.li/1TyYA7Y`. Pago primero; luego se agenda **la primera** sesión por WhatsApp y las siguientes se validan una por una.
- **Agendador propio** (`assets/js/booking.js` + `SITE.booking`): genera horarios desde `weekdays`/`times` (martes y jueves, 18:00–20:00, hora Colombia), manda la reserva a `lgalvismoreno@gmail.com` con `_cc` al correo del estudiante vía **FormSubmit**, y entrega confirmación con Google Calendar y `.ics`.
- ⚠️ **FormSubmit requiere una activación única**: la primera reserva envía un correo con el enlace *Activate Form* a `lgalvismoreno@gmail.com`. Sin ese clic, las reservas caen al respaldo de WhatsApp.
- Los horarios **no** están sincronizados con un calendario real: son fijos según configuración.
- La portada real del libro se extrajo del PDF (`D:\estudio\libro\libro-digital.pdf`, página 1) y vive en `assets/img/cover.jpg`.

### Pendientes antes de publicar
1. **Foto real** en `assets/img/portrait.jpg` (4:5).
2. **Activar FormSubmit** con la primera reserva de prueba.
3. Ajustar la disponibilidad real en `SITE.booking` (`weekdays`, `times`, `leadDays`).
4. Poner el **dominio real** en `<link rel="canonical">`, `og:url` y `twitter:*` de `index.html` y `muestra.html` (hoy dice `https://luisgalvis.dev/`).
5. Verificar que la invitación de Discord (`discord.gg/R9rtKefPF`) no expire; si se rota, cambiarla en `config.js`, en el HTML y en el pie.
5. Confirmar la cuenta de **Nequi/Bancolombia** para recibir pagos.
6. Añadir **testimonios reales** en `config.js` cuando existan (la sección está oculta si el arreglo está vacío).
7. Publicar (Vercel/Netlify/GitHub Pages) y probar los enlaces desde un celular real.

### Nota de seguridad
La guía `QA\DEPLOY_VPS.md` documenta el despliegue en un VPS con PM2 y Nginx. **Las credenciales de
ese servidor no deben copiarse a este repositorio, a la landing ni a documentos que se compartan.**
Si alguna credencial circuló en un chat, se rota.

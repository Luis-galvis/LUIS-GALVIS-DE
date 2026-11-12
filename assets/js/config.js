/* =========================================================
   CONFIGURACIÓN — único archivo que necesitas tocar
   Precios, enlaces, planes y mensajes de WhatsApp.
   ========================================================= */

window.SITE = {
  /* ---------- 1. CONTACTO Y REDES ---------- */
  links: {
    // Número en formato internacional, sin + ni espacios.
    whatsappNumber: "573204545796",
    whatsappPretty: "+57 320 454 5796",

    tiktok: "https://www.tiktok.com/@luchotechos",
    instagram: "https://www.instagram.com/luchotechos/",
    youtube: "https://www.youtube.com/@LF_TECH3",
    discord: "https://discord.gg/R9rtKefPF",
    linkedin: "https://www.linkedin.com/in/luis-fernando-galvis-moreno-a589a6262/",
    github: "https://github.com/Luis-galvis",
    repo: "https://github.com/Luis-galvis/como-ser-un-data-engineer",
    email: "mailto:lgalvismoreno@gmail.com",

    // Muestra gratuita (temario + capítulo)
    sample: "muestra.html"
  },

  /* ---------- 2. PRECIOS ---------- */
  // El libro son dos ediciones juntas (Núcleo + Completa) por 40.000.
  // Solo se cobra el libro y las mentorías: las clases son gratis en la comunidad.
  plans: [
    {
      id: "libro",
      name: "El libro",
      tagline: "Las dos ediciones juntas: Núcleo y Completa.",
      price: 40000,
      unit: "COP · pago único",
      badge: "Empieza aquí",
      featured: true,
      cta: "Quiero el libro",
      waMsg: "Hola Luis, quiero el libro «Cómo ser un Data Engineer» (las dos ediciones, $40.000). ¿Me pasas los datos de pago?",
      // 👇 Link de pago (MercadoPago / Hotmart / Gumroad / Wompi).
      // Vacío = el botón abre WhatsApp con el pedido ya escrito.
      checkoutUrl: "https://mpago.li/11d27mm",
      booking: false,
      features: [
        "Edición Núcleo + Edición Completa",
        "Las dos ediciones en PDF",
        "495 páginas · 51 capítulos",
        "Laboratorio reproducible en Docker",
        "Repositorio de código (licencia MIT)",
        "Comunidad y clases, gratis para siempre",
        { text: "Sesiones 1:1", off: true }
      ]
    },
    {
      id: "mentoria1",
      name: "Mentoría 1:1",
      tagline: "Una sesión de una hora para destrabar tu ruta.",
      price: 60000,
      unit: "COP · 1 sesión",
      badge: "",
      featured: false,
      cta: "Pagar y agendar",
      waMsg: "Hola Luis, quiero agendar una mentoría 1:1 de una hora ($60.000). ¿Qué horarios tienes?",
      // 👇 Paso 1: pagar. Paso 2: elegir el horario en el agendador de la página.
      checkoutUrl: "https://mpago.li/1Dsybqh",
      booking: true,
      bookingNote: "Primero el pago y después eliges el horario. Si ya pagaste, toca «Ya pagué · elegir horario».",
      features: [
        "Una sesión de 60 minutos por videollamada",
        "Diagnóstico de tu punto de partida",
        "Ruta de estudio priorizada (90 días)",
        "Revisión de CV y portafolio en vivo",
        "El libro completo incluido",
        "Dudas por WhatsApp durante 15 días"
      ]
    },
    {
      id: "mentoria4",
      name: "Mentoría 4 sesiones",
      tagline: "Acompañamiento real hasta que el proyecto esté en pie.",
      price: 100000,
      unit: "COP · 4 sesiones",
      badge: "Mejor valor",
      featured: false,
      cta: "Empezar el proceso",
      waMsg: "Hola Luis, ya pagué el acompañamiento de 4 sesiones ($100.000). ¿Cómo agendamos la primera?",
      // 👇 Pago primero. Después se agenda la 1.ª sesión por WhatsApp y las
      // siguientes se validan sesión a sesión.
      checkoutUrl: "https://mpago.li/1TyYA7Y",
      booking: false,
      bookingNote: "Pagas, y ahí mismo te paso mi WhatsApp para agendar la primera sesión. Las siguientes las validamos después de cada una.",
      features: [
        "Cuatro sesiones de 60 minutos",
        "Ruta personalizada a 90 días con entregables",
        "Revisión de tu proyecto de punta a punta",
        "Simulacro de entrevista técnica",
        "El libro completo incluido",
        "WhatsApp directo durante todo el proceso"
      ]
    }
  ],

  /* ---------- 2b. AGENDADOR PROPIO ---------- */
  // Los horarios que se muestran salen de aquí. Cada reserva llega a tu correo
  // y se envía copia al correo del estudiante.
  booking: {
    enabled: true,
    email: "lgalvismoreno@gmail.com",   // ← aquí te llegan las reservas
    timezoneLabel: "hora de Colombia (GMT-5)",
    durationMin: 60,
    weekdays: [2, 4],                  // 0=domingo … 6=sábado  → martes y jueves
    times: ["18:00", "19:00", "20:00"],// hora local de Colombia
    weeksAhead: 4,                     // cuántas semanas hacia adelante mostrar
    leadDays: 1,                       // días mínimos de anticipación
    meetUrl: ""                        // link de Meet/Zoom (opcional; se incluye en el correo y el .ics)
  },

  /* ---------- 3. MENSAJES DE WHATSAPP ---------- */
  // Todo abre WhatsApp. Cambia aquí el texto que llega prellenado.
  messages: {
    hello: "Hola Luis, vi tu página y quiero hablar contigo.",
    proyecto: "Hola Luis, vi tus proyectos y quiero contarte una idea.",
    comunidad: "Hola Luis, quiero entrar a la comunidad de Data Career Lab.",
    libro: "Hola Luis, quiero el libro «Cómo ser un Data Engineer» (las dos ediciones, $40.000). ¿Me pasas los datos de pago?"
  },

  /* ---------- 4. MÉTODOS DE PAGO ---------- */
  payments: ["Tarjeta", "Nequi", "PSE"],

  /* ---------- 4b. TEXTOS DEL MODAL DE COMPRA ---------- */
  checkout: {
    noteWithLink: "Pago seguro con MercadoPago. Apenas se confirme, te envío el PDF y la invitación al Discord al correo que uses en el pago.",
    noteWithoutLink: "Te paso los datos de pago por WhatsApp: Nequi, Bancolombia o tarjeta.",
    copyLabel: "Copiar el número",
    copiedLabel: "¡Número copiado!",
    scheduleLabel: "Ver horarios disponibles",
    payLabel: "Pagar ahora"
  },

  /* ---------- 5. TESTIMONIOS (opcional) ---------- */
  // Si el arreglo está vacío, la sección no se muestra.
  testimonials: []
};

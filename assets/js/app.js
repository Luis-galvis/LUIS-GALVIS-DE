/* =========================================================
   Comportamiento de la landing.
   No hace falta editar este archivo: vive de config.js
   ========================================================= */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var links = SITE.links || {};
  var plans = SITE.plans || [];
  var messages = SITE.messages || {};

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */
  function money(n) {
    return "$" + Number(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });
  }

  function waLink(text) {
    var num = links.whatsappNumber || "";
    if (!num) return "#";
    var base = "https://wa.me/" + num;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  function track(name, data) {
    try {
      window.dispatchEvent(new CustomEvent("site:track", { detail: { name: name, data: data || null } }));
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, data: data || null });
    } catch (e) { /* silencio */ }
  }

  /* ---------------------------------------------------------
     Enlaces de WhatsApp (data-wa="clave")
     --------------------------------------------------------- */
  function upgradeWhatsApp(scope) {
    $$("[data-wa]", scope || document).forEach(function (el) {
      var key = el.getAttribute("data-wa");
      var text = messages[key] || messages.hello || "";
      el.setAttribute("href", waLink(text));
      el.addEventListener("click", function () { track("wa_" + key); });
    });
  }
  upgradeWhatsApp();

  /* ---------------------------------------------------------
     Retrato: si la foto no carga, se muestra el marcador
     --------------------------------------------------------- */
  var portrait = $("#portrait");
  var portraitImg = $("#portraitImg");
  if (portrait && portraitImg) {
    var markEmpty = function () {
      portrait.classList.add("is-empty");
      portraitImg.remove();
    };
    if (portraitImg.complete && portraitImg.naturalWidth === 0) markEmpty();
    portraitImg.addEventListener("error", markEmpty);
  }

  /* ---------------------------------------------------------
     Compra: modal con pago directo o WhatsApp
     --------------------------------------------------------- */
  var CHECK = SITE.checkout || {};
  var buyModal = $("#buy");
  var lastFocus = null;

  function planById(id) {
    for (var i = 0; i < plans.length; i++) {
      if (plans[i].id === id) return plans[i];
    }
    return null;
  }

  function openBuy(p) {
    if (!buyModal) return;
    lastFocus = document.activeElement;

    var checkoutUrl = p.checkoutUrl || "";
    var canBook = !!p.booking;

    $("#buyKicker").textContent = canBook ? "Paso 1 · pago" : "Tu compra";
    $("#buyTitle").textContent = p.name;
    $("#buyPrice").textContent = money(p.price) + " · " + (p.unit || "");

    $("#buyList").innerHTML = (p.features || [])
      .filter(function (f) { return !(typeof f === "object" && f.off); })
      .map(function (f) {
        var text = typeof f === "string" ? f : f.text;
        return "<li>" + text + "</li>";
      }).join("");

    var pay = $("#buyPay");
    if (checkoutUrl) {
      pay.hidden = false;
      pay.setAttribute("href", checkoutUrl);
      pay.textContent = (CHECK.payLabel || "Pagar ahora") + " · " + money(p.price);
    } else {
      pay.hidden = true;
    }

    // Paso 2: agendador propio
    var book = $("#buyBook");
    if (book) {
      book.hidden = !canBook;
      book.onclick = function () {
        closeBuy();
        if (window.DSBooking) window.DSBooking.open(p);
      };
    }

    var wa = $("#buyWa");
    wa.setAttribute("href", waLink(p.waMsg || messages.hello));
    wa.className = (checkoutUrl || canBook) ? "btn btn--secondary btn--block" : "btn btn--primary btn--block";

    $("#buyNote").textContent = p.bookingNote
      || (checkoutUrl ? (CHECK.noteWithLink || "") : (CHECK.noteWithoutLink || ""));

    $("#buyCopy").textContent = CHECK.copyLabel || "Copiar el número";

    buyModal.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      var box = buyModal.querySelector(".modal__box");
      if (box) box.focus();
    }, 60);
    track("buy_open", { plan: p.id });
  }

  function closeBuy() {
    if (!buyModal || buyModal.hidden) return;
    buyModal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (buyModal) {
    buyModal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeBuy();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBuy();
    });
    buyModal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = $$("a[href], button:not([disabled])", buyModal).filter(function (el) {
        return !el.hidden && el.offsetParent !== null;
      });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    var copyBtn = $("#buyCopy");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var num = "+" + (links.whatsappNumber || "");
        var restore = function () {
          copyBtn.textContent = CHECK.copiedLabel || "¡Número copiado!";
          setTimeout(function () {
            copyBtn.textContent = CHECK.copyLabel || "Copiar el número";
          }, 2200);
        };
        var fallback = function () {
          var ta = document.createElement("textarea");
          ta.value = num;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); restore(); }
          catch (err) { copyBtn.textContent = num; }
          document.body.removeChild(ta);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(num).then(restore, fallback);
        } else {
          fallback();
        }
      });
    }

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-buy]");
      if (!b) return;
      e.preventDefault();
      var p = planById(b.getAttribute("data-buy"));
      if (p) openBuy(p);
    });
  }

  /* ---------------------------------------------------------
     Planes
     --------------------------------------------------------- */
  var plansWrap = $("#plans");
  if (plansWrap && plans.length) {
    plansWrap.innerHTML = plans.map(function (p) {
      var feats = (p.features || []).map(function (f) {
        var text = typeof f === "string" ? f : f.text;
        var off = typeof f === "object" && f.off;
        return '<li class="' + (off ? "is-off" : "") + '">' + text + "</li>";
      }).join("");

      return (
        '<article class="plan reveal' + (p.featured ? " plan--featured" : "") + '" data-plan="' + p.id + '">' +
          (p.badge ? '<span class="plan__badge">' + p.badge + "</span>" : "") +
          '<h3 class="plan__name">' + p.name + "</h3>" +
          '<p class="plan__tag">' + (p.tagline || "") + "</p>" +
          '<div class="plan__price">' +
            '<span class="plan__amount">' + money(p.price) + "</span>" +
            '<span class="plan__unit">' + (p.unit || "") + "</span>" +
          "</div>" +
          '<ul class="plan__list">' + feats + "</ul>" +
          '<button type="button" class="btn ' + (p.featured ? "btn--primary" : "btn--secondary") + ' btn--block" ' +
             'data-plan-cta="' + p.id + '">' + p.cta + "</button>" +
        "</article>"
      );
    }).join("");

    plansWrap.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-plan-cta]");
      if (!btn) return;
      var p = planById(btn.getAttribute("data-plan-cta"));
      if (p) openBuy(p);
    });

    observeReveals();
  }

  /* ---------------------------------------------------------
     Nota de pagos
     --------------------------------------------------------- */
  var payNote = $("#paymentsNote");
  if (payNote && SITE.payments && SITE.payments.length) {
    payNote.textContent = SITE.payments.join(" · ") + " · Acceso inmediato";
  }

  /* ---------------------------------------------------------
     Testimonios (solo si hay datos reales)
     --------------------------------------------------------- */
  var tSection = $("#testimonios");
  var tWrap = $("#testimonials");
  if (tSection && tWrap && Array.isArray(SITE.testimonials) && SITE.testimonials.length) {
    tWrap.innerHTML = SITE.testimonials.map(function (t) {
      return (
        '<figure class="card card--static reveal">' +
          '<p style="font-size:15px;line-height:1.65;color:var(--ink-muted);margin-bottom:16px">“' + t.text + '”</p>' +
          '<figcaption class="caption">' + t.name + (t.role ? " · " + t.role : "") + "</figcaption>" +
        "</figure>"
      );
    }).join("");
    tSection.hidden = false;
  }

  /* ---------------------------------------------------------
     Nav: barra, menú móvil y enlace activo
     --------------------------------------------------------- */
  var nav = $("#nav");
  var burger = $("#burger");
  var navLinks = $("#navLinks");

  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", (window.scrollY || 0) > 8);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  var navAnchors = $$("#navLinks a[href^='#']");
  var sections = navAnchors
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { activeObs.observe(s); });
  }

  /* ---------------------------------------------------------
     Reveal
     --------------------------------------------------------- */
  var revealObs = null;
  function observeReveals() {
    var els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!revealObs) {
      revealObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          obs.unobserve(en.target);
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    }
    els.forEach(function (el) { revealObs.observe(el); });
  }
  observeReveals();

  /* ---------------------------------------------------------
     Contadores de las cifras
     --------------------------------------------------------- */
  var counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var countObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var start = performance.now();
        var dur = 1000;

        function step(now) {
          var t = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          var val = Math.round(target * eased);
          el.textContent = (target >= 1000
            ? val.toLocaleString("es-CO")
            : String(val)) + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { countObs.observe(c); });
  }

  /* ---------------------------------------------------------
     Tracking genérico de CTAs
     --------------------------------------------------------- */
  $$("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () { track("cta_" + el.getAttribute("data-track")); });
  });

  /* ---------------------------------------------------------
     Año del footer
     --------------------------------------------------------- */
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();

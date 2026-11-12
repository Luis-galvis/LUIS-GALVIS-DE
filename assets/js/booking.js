/* =========================================================
   Agendador propio (sin Calendly ni Cal.com)
   - Muestra los horarios definidos en config.js → booking
   - Envía la reserva al correo de Luis y copia al del estudiante
     (FormSubmit AJAX). Si el envío falla, ofrece WhatsApp.
   - Genera la invitación .ics y el enlace a Google Calendar.
   ========================================================= */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var B = SITE.booking || {};
  var modal = document.getElementById("booking");
  if (!modal || !B.enabled) return;

  var TZ_OFF = 5;          // Colombia = UTC-5 (sin horario de verano)
  var state = { plan: null, slot: null, last: null };
  var lastFocus = null;

  function $(sel) { return modal.querySelector(sel); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function money(n) { return "$" + Number(n).toLocaleString("es-CO", { maximumFractionDigits: 0 }); }

  /* ---------------- Fechas ---------------- */
  function bogotaWallNow() { return new Date(Date.now() - TZ_OFF * 3600000); }

  function slotInstant(wall, time) {
    var p = time.split(":");
    return new Date(Date.UTC(
      wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate(),
      parseInt(p[0], 10) + TZ_OFF, parseInt(p[1] || "0", 10)
    ));
  }

  function fmtDay(date, style) {
    return new Intl.DateTimeFormat("es-CO", {
      weekday: style === "short" ? "short" : "long",
      day: "numeric",
      month: style === "short" ? "short" : "long",
      timeZone: "UTC"
    }).format(date).replace(/\.$/, "");
  }

  function utcStamp(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
      "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
  }

  function buildDays() {
    var days = [];
    var now = bogotaWallNow();
    var y = now.getUTCFullYear(), m = now.getUTCMonth(), d = now.getUTCDate();
    var minTime = Date.now() + (B.leadDays || 1) * 86400000;
    var total = (B.weeksAhead || 4) * 7;
    var weekdays = B.weekdays || [];

    for (var i = 0; i < total; i++) {
      var wall = new Date(Date.UTC(y, m, d + i));
      if (weekdays.indexOf(wall.getUTCDay()) === -1) continue;

      var slots = (B.times || []).map(function (t) {
        return { time: t, instant: slotInstant(wall, t) };
      }).filter(function (s) { return s.instant.getTime() > minTime; });

      if (slots.length) days.push({ wall: wall, slots: slots });
    }
    return days;
  }

  /* ---------------- Pintar horarios ---------------- */
  function renderSlots() {
    var wrap = $("#bkSlots");
    var days = buildDays();

    if (!days.length) {
      wrap.innerHTML = '<p class="bk__empty">No hay horarios libres en las próximas semanas. Escríbeme por WhatsApp y lo cuadramos a mano.</p>';
      return;
    }

    wrap.innerHTML = days.map(function (day) {
      var dayText = fmtDay(day.wall);
      return '<div class="bk__day">' +
        '<p class="bk__day-label">' + dayText + '</p>' +
        '<div class="bk__times">' +
          day.slots.map(function (s) {
            return '<button type="button" class="bk__slot" ' +
              'data-iso="' + s.instant.toISOString() + '" ' +
              'data-time="' + s.time + '" ' +
              'data-day="' + dayText + '">' + s.time + '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }).join("");

    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".bk__slot");
      if (!btn) return;
      Array.prototype.forEach.call(wrap.querySelectorAll(".bk__slot"), function (b) {
        b.classList.remove("is-selected");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");
      state.slot = {
        iso: btn.getAttribute("data-iso"),
        time: btn.getAttribute("data-time"),
        day: btn.getAttribute("data-day")
      };
      var err = $("#bkError");
      if (!err.hidden) { err.hidden = true; }
    });
  }

  /* ---------------- Envío ---------------- */
  function val(name) {
    var el = modal.querySelector('[name="' + name + '"]');
    return el ? (el.value || "").trim() : "";
  }

  function markInvalid(name, bad) {
    var el = modal.querySelector('[name="' + name + '"]');
    if (el) el.classList.toggle("is-invalid", bad);
  }

  function showError(msg) {
    var err = $("#bkError");
    err.textContent = msg;
    err.hidden = false;
  }

  function send(data) {
    var btn = $("#bkSubmit");
    var s = state.slot;
    btn.disabled = true;
    btn.textContent = "Enviando…";

    var payload = {
      _subject: "Mentoría agendada · " + state.plan.name + " · " + s.day + " " + s.time,
      _template: "table",
      _captcha: "false",
      Nombre: data.nombre,
      Correo: data.email,
      WhatsApp: data.whatsapp,
      Plan: state.plan.name + " — " + money(state.plan.price),
      Fecha: s.day,
      Hora: s.time + " · " + (B.timezoneLabel || ""),
      Duracion: (B.durationMin || 60) + " minutos",
      Objetivo: data.objetivo,
      Videollamada: B.meetUrl || "Se comparte antes de la sesión"
    };
    if (data.email) payload._cc = data.email;

    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(B.email), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var ok = !!(res && (res.success === "true" || res.success === true));
        finished(data, s, ok);
      })
      .catch(function () { finished(data, s, false); });
  }

  /* ---------------- Pantalla final ---------------- */
  function finished(data, slot, emailOk) {
    state.last = { data: data, slot: slot, emailOk: emailOk, plan: state.plan };

    var first = (data.nombre || "").split(" ")[0] || "listo";
    $("#bkForm").hidden = true;
    $("#bkDone").hidden = false;
    $("#bkKicker").textContent = "Reserva apartada";

    $("#bkDoneTitle").textContent = "Listo, " + first + ". Tu horario quedó apartado.";
    $("#bkDoneText").textContent = emailOk
      ? "Te envié el resumen a " + data.email + " y a mí me llegó copia. Te confirmo por WhatsApp antes de la sesión."
      : "No pude enviar el correo automático. Mándame tu reserva por WhatsApp para que el horario no se pierda.";

    $("#bkSummary").innerHTML =
      "<li><strong>" + state.plan.name + "</strong> — " + money(state.plan.price) + "</li>" +
      "<li>" + slot.day + " a las " + slot.time + " · " + (B.timezoneLabel || "") + "</li>" +
      "<li>" + (B.durationMin || 60) + " minutos por videollamada</li>" +
      "<li>Objetivo: " + data.objetivo + "</li>";

    var start = new Date(slot.iso);
    var end = new Date(start.getTime() + (B.durationMin || 60) * 60000);
    var title = "Mentoría con Luis Galvis · " + state.plan.name;
    var details = "Sesión reservada desde luisgalvis.dev" +
      (B.meetUrl ? "\nVideollamada: " + B.meetUrl : "") +
      "\nObjetivo: " + data.objetivo;

    $("#bkGcal").setAttribute("href",
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(title) +
      "&dates=" + utcStamp(start) + "/" + utcStamp(end) +
      "&details=" + encodeURIComponent(details) +
      "&location=" + encodeURIComponent(B.meetUrl || "Videollamada")
    );

    $("#bkIcs").onclick = function () { downloadIcs(title, details, start, end); };

    var waText = "Hola Luis, acabo de reservar una mentoría.\n" +
      "Plan: " + state.plan.name + " (" + money(state.plan.price) + ")\n" +
      "Fecha: " + slot.day + " " + slot.time + "\n" +
      "Nombre: " + data.nombre + "\n" +
      "Correo: " + data.email + "\n" +
      "Objetivo: " + data.objetivo;
    $("#bkWa").setAttribute("href", "https://wa.me/" + (SITE.links.whatsappNumber || "") + "?text=" + encodeURIComponent(waText));

    $("#bkDoneNote").textContent = emailOk
      ? "Guarda la invitación en tu calendario para no olvidar la hora."
      : "Tu horario queda apartado igual: solo necesito tu mensaje para confirmarlo.";

    if (!emailOk) {
      $("#bkGcal").className = "btn btn--secondary btn--block";
      $("#bkWa").className = "btn btn--primary btn--block";
    }
  }

  function downloadIcs(title, details, start, end) {
    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Luis Galvis//Mentorias//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:" + start.getTime() + "@luisgalvis.dev",
      "DTSTAMP:" + utcStamp(new Date()),
      "DTSTART:" + utcStamp(start),
      "DTEND:" + utcStamp(end),
      "SUMMARY:" + title.replace(/[,;]/g, " "),
      "DESCRIPTION:" + details.replace(/\n/g, "\\n").replace(/[,;]/g, " "),
      "LOCATION:" + (B.meetUrl || "Videollamada"),
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Recordatorio de tu mentoría",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "mentoria-luis-galvis.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
  }

  /* ---------------- Abrir / cerrar ---------------- */
  function reset() {
    $("#bkForm").hidden = false;
    $("#bkDone").hidden = true;
    $("#bkError").hidden = true;
    $("#bkSubmit").disabled = false;
    $("#bkSubmit").textContent = "Confirmar mi horario";
    ["nombre", "email", "whatsapp"].forEach(function (k) {
      var el = modal.querySelector('[name="' + k + '"]');
      if (el) { el.value = ""; el.classList.remove("is-invalid"); }
    });
    state.slot = null;
    renderSlots();
  }

  function open(plan) {
    if (!plan) return;
    lastFocus = document.activeElement;
    state.plan = plan;
    state.slot = null;

    $("#bkTitle").textContent = plan.name;
    $("#bkPrice").textContent = money(plan.price) + " · " + (plan.unit || "");
    $("#bkKicker").textContent = "Elige tu horario";
    $("#bkHint").textContent = "Todos los horarios están en " + (B.timezoneLabel || "hora local") +
      ". La reserva me llega por correo y te envío copia a ti.";

    reset();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      var box = modal.querySelector(".modal__box");
      if (box) box.focus();
    }, 60);
  }

  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------------- Eventos ---------------- */
  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var f = Array.prototype.slice.call(modal.querySelectorAll("a[href], button:not([disabled]), input, select"))
      .filter(function (el) { return !el.hidden && el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  $("#bkForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {
      nombre: val("nombre"),
      email: val("email"),
      whatsapp: val("whatsapp"),
      objetivo: val("objetivo")
    };

    var bad = false;
    if (!data.nombre) { markInvalid("nombre", true); bad = true; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) { markInvalid("email", true); bad = true; }
    if (!data.whatsapp) { markInvalid("whatsapp", true); bad = true; }
    if (bad) { showError("Revisa tu nombre, correo y WhatsApp."); return; }
    if (!state.slot) { showError("Elige un horario de la lista."); return; }

    send(data);
  });

  window.DSBooking = { open: open, close: close };
})();

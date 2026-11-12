/* Pruebas de interacción: precios, enlaces de WhatsApp, retrato y menú móvil. */
const puppeteer = require("C:/Users/lgalv/Desktop/obsidian/node_modules/puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "shots");
fs.mkdirSync(OUT, { recursive: true });
const fileUrl = (f) => "file:///" + path.join(ROOT, f).replace(/\\/g, "/");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--hide-scrollbars", "--no-sandbox"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(fileUrl("index.html"), { waitUntil: "load" });
  // Sin scroll suave: si no, Puppeteer calcula coordenadas mientras la página se mueve
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
  await sleep(1400);

  // 1. Planes
  const plans = await page.evaluate(() => Array.from(document.querySelectorAll(".plan")).map((el) => {
    const cta = el.querySelector("[data-plan-cta]");
    return {
      name: el.querySelector(".plan__name").textContent,
      price: el.querySelector(".plan__amount").textContent,
      unit: el.querySelector(".plan__unit").textContent,
      cta: cta.textContent.trim(),
      trigger: cta.tagName.toLowerCase() + "[" + (cta.getAttribute("data-plan-cta") || "") + "]",
      featured: el.classList.contains("plan--featured"),
    };
  }));
  console.log("planes:", JSON.stringify(plans, null, 2));

  // 2. Todos los CTA de WhatsApp apuntan al número correcto
  const wa = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('a[href*="wa.me"]').forEach((a) => {
      out.push({ href: a.getAttribute("href").slice(0, 60), text: a.textContent.trim().slice(0, 34) });
    });
    return { total: out.length, malos: out.filter((o) => !o.href.includes("573204545796")).length, muestra: out.slice(0, 3) };
  });
  console.log("whatsapp:", JSON.stringify(wa));

  // 3. Retrato cargado (sin 404)
  const portrait = await page.evaluate(() => {
    const img = document.getElementById("portraitImg");
    const fig = document.getElementById("portrait");
    return { imgExiste: !!img, natural: img ? img.naturalWidth : 0, fallbackVisible: fig.classList.contains("is-empty") };
  });
  console.log("retrato:", JSON.stringify(portrait));

  // 4. Enlaces de redes
  const socials = await page.evaluate(() => ({
    tiktok: !!document.querySelector('a[href*="tiktok.com/@luchotechos"]'),
    instagram: !!document.querySelector('a[href*="instagram.com/luchotechos"]'),
    youtube: !!document.querySelector('a[href*="youtube.com/@LF_TECH3"]'),
    discord: !!document.querySelector('a[href*="discord.gg/R9rtKefPF"]'),
    discordCount: document.querySelectorAll('a[href*="discord.gg"]').length,
  }));
  console.log("redes:", JSON.stringify(socials));

  // 5. Acordeón FAQ
  const faq = await page.evaluate(async () => {
    const items = Array.from(document.querySelectorAll(".faq__item"));
    items[2].open = true;
    await new Promise((r) => setTimeout(r, 80));
    return { total: items.length, abiertos: items.filter((d) => d.open).length };
  });
  console.log("faq:", JSON.stringify(faq));

  // 5b. Modal de compra (botón del libro y botón de un plan)
  await page.evaluate(() => {
    document.querySelector('[data-buy="libro"]').scrollIntoView({ block: "center" });
  });
  await sleep(600);
  await page.click('[data-buy="libro"]');
  await sleep(500);
  const modalLibro = await page.evaluate(() => {
    const m = document.getElementById("buy");
    return {
      visible: !m.hidden,
      title: document.getElementById("buyTitle").textContent,
      price: document.getElementById("buyPrice").textContent,
      payOculto: document.getElementById("buyPay").hidden,
      wa: document.getElementById("buyWa").getAttribute("href").slice(0, 52),
      items: document.querySelectorAll("#buyList li").length,
      nota: document.getElementById("buyNote").textContent.slice(0, 42),
    };
  });
  console.log("modal libro:", JSON.stringify(modalLibro));
  await page.screenshot({ path: path.join(OUT, "qa-modal.png") });

  await page.keyboard.press("Escape");
  await sleep(250);
  console.log("modal cerrado con Esc:", await page.evaluate(() => document.getElementById("buy").hidden));

  await page.evaluate(() => {
    document.querySelector('[data-plan-cta="mentoria4"]').scrollIntoView({ block: "center" });
  });
  await sleep(500);
  await page.click('[data-plan-cta="mentoria4"]');
  await sleep(450);
  const modalPlan = await page.evaluate(() => ({
    title: document.getElementById("buyTitle").textContent,
    price: document.getElementById("buyPrice").textContent,
  }));
  console.log("modal plan:", JSON.stringify(modalPlan));
  await page.keyboard.press("Escape");
  await sleep(200);

  // 6. Menú móvil
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(fileUrl("index.html"), { waitUntil: "load" });
  await sleep(900);
  await page.click("#burger");
  await sleep(350);
  const menu = await page.evaluate(() => {
    const n = document.getElementById("navLinks");
    return { open: n.classList.contains("is-open"), display: getComputedStyle(n).display, links: n.querySelectorAll("a").length };
  });
  console.log("menú móvil:", JSON.stringify(menu));
  await page.screenshot({ path: path.join(OUT, "qa-mobile-menu.png") });

  // 7. Página de muestra
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(fileUrl("muestra.html"), { waitUntil: "load" });
  await sleep(1200);
  const doc = await page.evaluate(() => ({
    h1: document.querySelector("h1").innerText.replace(/\n/g, " "),
    filas: document.querySelectorAll(".toc__row").length,
    cta: document.querySelector(".doc__cta .btn--primary").getAttribute("href").slice(0, 40),
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  console.log("muestra:", JSON.stringify(doc));
  await page.screenshot({ path: path.join(OUT, "qa-muestra.png") });

  console.log("errores JS:", errors.length ? errors : "ninguno");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });

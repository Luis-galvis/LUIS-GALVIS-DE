/* QA visual de la landing con puppeteer-core (Chrome local).
   Uso: node tools/qa.js
   Genera capturas por sección en tools/shots/qa-*.png */

const path = require("path");
const fs = require("fs");

const puppeteer = require("C:/Users/lgalv/Desktop/obsidian/node_modules/puppeteer-core");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "shots");
const URL = "file:///" + path.join(ROOT, "index.html").replace(/\\/g, "/");

const SECTIONS = ["perfil", "stack", "proyectos", "enseno", "comunidad", "libro", "mentorias", "faq"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--hide-scrollbars", "--disable-gpu", "--no-sandbox", "--font-render-hinting=none"],
  });

  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
  page.on("requestfailed", (r) => errors.push("requestfailed: " + r.url().slice(-50)));
  page.on("response", (r) => { if (r.status() >= 400) errors.push("HTTP " + r.status() + " " + r.url().slice(-50)); });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
  await sleep(1400);

  await page.screenshot({ path: path.join(OUT, "qa-hero.png") });

  for (const id of SECTIONS) {
    const ok = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (!el) return false;
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo(0, y);
      return true;
    }, id);
    if (!ok) { console.log("falta sección:", id); continue; }
    await sleep(1300);
    await page.screenshot({ path: path.join(OUT, `qa-${id}.png`) });
    console.log("ok", id);
  }

  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 2 || r.left < -2)) {
        bad.push({ tag: el.tagName.toLowerCase(), cls: (el.className || "").toString().slice(0, 50) });
      }
    });
    return { vw, scrollW: document.documentElement.scrollWidth, total: bad.length, sample: bad.slice(0, 6) };
  });
  console.log("desbordes escritorio:", JSON.stringify(overflow));

  console.log("errores:", errors.length ? errors : "ninguno");

  // Móvil
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(URL, { waitUntil: "load" });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await sleep(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(700);
  await page.screenshot({ path: path.join(OUT, "qa-mobile-hero.png") });

  for (const [id, file] of [["libro", "qa-mobile-libro.png"], ["mentorias", "qa-mobile-mentorias.png"]]) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
    }, id);
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT, file) });
  }

  const overflowM = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  console.log("móvil:", JSON.stringify(overflowM));

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });

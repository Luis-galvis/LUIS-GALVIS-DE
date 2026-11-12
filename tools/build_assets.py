"""Genera los assets de la landing a partir de la portada original del libro.

Salidas (paleta del sistema Linear):
  assets/img/condor.png     -> arte del cóndor en blanco sobre transparente
  assets/img/og-image.jpg   -> tarjeta social 1200x630
  assets/img/favicon.png    -> icono 256x256
  assets/img/portrait.jpg   -> marcador 1000x1250 (reemplazar por la foto real)
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(r"C:\Users\lgalv\Desktop\obsidian\libro\condor_profesional.jpg")
OUT = ROOT / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

# Paleta Linear (DESIGN.md)
CANVAS = (1, 1, 2)
SURFACE_1 = (15, 16, 17)
SURFACE_2 = (20, 21, 22)
SURFACE_3 = (24, 25, 26)
HAIRLINE = (35, 37, 42)
HAIRLINE_STRONG = (52, 52, 58)
INK = (247, 248, 248)
INK_MUTED = (208, 214, 224)
INK_SUBTLE = (138, 143, 152)
INK_TERTIARY = (98, 102, 109)
PRIMARY = (94, 106, 210)


def condor_alpha() -> Image.Image:
    """Convierte el grabado negro sobre blanco en arte blanco con alfa."""
    src = Image.open(SRC).convert("RGB")
    gray = src.convert("L")
    alpha = gray.point(lambda v: 255 - v)
    white = Image.new("RGB", src.size, (255, 255, 255))
    white.putalpha(alpha)
    bbox = alpha.getbbox()
    if bbox:
        white = white.crop(bbox)
    return white


def font(name: str, size: int):
    for path in (
        rf"C:\Windows\Fonts\{name}",
        rf"C:\Users\lgalv\AppData\Local\Microsoft\Windows\Fonts\{name}",
    ):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> None:
    condor = condor_alpha()
    target_w = 1400
    if condor.width > target_w:
        ratio = target_w / condor.width
        condor = condor.resize((target_w, round(condor.height * ratio)), Image.LANCZOS)
    condor.save(OUT / "condor.png", optimize=True)
    print("condor.png", condor.size)

    # ---- Favicon: cóndor sobre lavanda ----
    fav = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(fav)
    d.rounded_rectangle([0, 0, 255, 255], radius=56, fill=PRIMARY)
    bird = condor.copy()
    bird.thumbnail((186, 186), Image.LANCZOS)
    fav.alpha_composite(bird, ((256 - bird.width) // 2, (256 - bird.height) // 2))
    fav.save(OUT / "favicon.png", optimize=True)
    print("favicon.png")

    # ---- OG image 1200x630 (perfil, no libro) ----
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), CANVAS)
    d = ImageDraw.Draw(og)

    # Retícula sutil de fondo
    for x in range(0, W, 48):
        d.line([(x, 0), (x, H)], fill=(8, 8, 10))
    for y in range(0, H, 48):
        d.line([(0, y), (W, y)], fill=(8, 8, 10))

    art = condor.copy()
    art.thumbnail((300, 300), Image.LANCZOS)
    og.paste(art, (W - art.width - 68, 74), art)

    d.text((68, 60), "LUIS GALVIS", font=font("consola.ttf", 19), fill=PRIMARY)

    d.text((66, 140), "Luis Galvis", font=font("segoeuib.ttf", 78), fill=INK)
    d.text((68, 234), "Data Engineer y educador", font=font("segoeui.ttf", 40), fill=INK_SUBTLE)

    d.line([(70, 330), (330, 330)], fill=HAIRLINE_STRONG, width=2)

    f_body = font("segoeui.ttf", 26)
    d.text((68, 362), "Pipelines con Databricks y PySpark para", font=f_body, fill=INK_MUTED)
    d.text((68, 400), "38.000+ activos. Automatización con IA,", font=f_body, fill=INK_MUTED)
    d.text((68, 438), "seguridad y clases gratis de datos.", font=f_body, fill=INK_MUTED)

    d.text((68, 540), "Ibagué, Colombia  ·  luisgalvis.dev", font=font("consola.ttf", 20), fill=INK_TERTIARY)

    og.save(OUT / "og-image.jpg", quality=90, optimize=True)
    print("og-image.jpg", og.size)

    # ---- Marcador de retrato ----
    PW, PH = 1000, 1250
    ph = Image.new("RGB", (PW, PH), SURFACE_2)
    d = ImageDraw.Draw(ph)
    for x in range(0, PW, 40):
        d.line([(x, 0), (x, PH)], fill=SURFACE_1)
    for y in range(0, PH, 40):
        d.line([(0, y), (PW, y)], fill=SURFACE_1)

    # Marco punteado
    step = 22
    for x in range(60, PW - 60, step * 2):
        d.line([(x, 60), (min(x + step, PW - 60), 60)], fill=HAIRLINE_STRONG, width=2)
        d.line([(x, PH - 60), (min(x + step, PW - 60), PH - 60)], fill=HAIRLINE_STRONG, width=2)
    for y in range(60, PH - 60, step * 2):
        d.line([(60, y), (60, min(y + step, PH - 60))], fill=HAIRLINE_STRONG, width=2)
        d.line([(PW - 60, y), (PW - 60, min(y + step, PH - 60))], fill=HAIRLINE_STRONG, width=2)

    # Silueta de retrato (sin monograma)
    cx, cy = PW / 2, PH / 2 - 120
    d.ellipse([cx - 82, cy - 172, cx + 82, cy - 8], fill=(54, 54, 62))
    d.rounded_rectangle([cx - 178, cy + 8, cx + 178, cy + 360], radius=150, fill=(54, 54, 62))

    f_cap = font("consola.ttf", 30)
    cap = "REEMPLAZA ESTE ARCHIVO POR TU FOTO"
    bbox = d.textbbox((0, 0), cap, font=f_cap)
    d.text((PW / 2 - (bbox[2] - bbox[0]) / 2, PH / 2 + 300), cap, font=f_cap, fill=(120, 124, 132))

    f_cap2 = font("consola.ttf", 24)
    cap2 = "assets/img/portrait.jpg  ·  4:5"
    bbox = d.textbbox((0, 0), cap2, font=f_cap2)
    d.text((PW / 2 - (bbox[2] - bbox[0]) / 2, PH / 2 + 348), cap2, font=f_cap2, fill=(84, 86, 94))

    # Acento lavanda inferior
    d.rounded_rectangle([PW / 2 - 40, PH / 2 + 408, PW / 2 + 40, PH / 2 + 412], radius=2, fill=PRIMARY)

    ph.save(OUT / "portrait.jpg", quality=92, optimize=True)
    print("portrait.jpg", ph.size)


if __name__ == "__main__":
    main()

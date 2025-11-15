#!/usr/bin/env python3
"""
Script para generar todos los iconos y assets faltantes para JKD Tech Portfolio
Requiere: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Configuración
ASSETS_DIR = "assets/img"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")

# Colores del tema
PRIMARY_COLOR = (0, 212, 255)  # #00D4FF
SECONDARY_COLOR = (26, 26, 46)  # #1A1A2E
WHITE = (255, 255, 255)

def create_square_icon(size, output_path, text="JKD"):
    """Crea un icono cuadrado con gradiente y texto"""
    print(f"Generando {output_path} ({size}x{size})...")

    # Crear imagen con fondo
    img = Image.new('RGBA', (size, size), SECONDARY_COLOR)
    draw = ImageDraw.Draw(img)

    # Dibujar gradiente simple (de arriba-izquierda a abajo-derecha)
    for y in range(size):
        for x in range(size):
            # Interpolación de color
            factor = (x + y) / (size * 2)
            r = int(PRIMARY_COLOR[0] * (1 - factor) + SECONDARY_COLOR[0] * factor)
            g = int(PRIMARY_COLOR[1] * (1 - factor) + SECONDARY_COLOR[1] * factor)
            b = int(PRIMARY_COLOR[2] * (1 - factor) + SECONDARY_COLOR[2] * factor)
            img.putpixel((x, y), (r, g, b, 255))

    # Añadir texto "JKD"
    try:
        # Intentar usar una fuente del sistema
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback a fuente por defecto
        font = ImageFont.load_default()

    # Dibujar texto centrado
    draw = ImageDraw.Draw(img)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size - text_width) // 2, (size - text_height) // 2 - font_size // 4)

    # Sombra del texto
    shadow_offset = max(2, size // 100)
    draw.text((position[0] + shadow_offset, position[1] + shadow_offset), text, font=font, fill=(0, 0, 0, 100))

    # Texto principal
    draw.text(position, text, font=font, fill=WHITE)

    # Guardar
    img.save(output_path, 'PNG', optimize=True)
    print(f"✓ Creado: {output_path}")

def create_og_image(output_path):
    """Crea imagen Open Graph para redes sociales (1200x630)"""
    print(f"Generando {output_path} (1200x630)...")

    width, height = 1200, 630
    img = Image.new('RGB', (width, height), SECONDARY_COLOR)
    draw = ImageDraw.Draw(img)

    # Gradiente de fondo
    for y in range(height):
        factor = y / height
        r = int(PRIMARY_COLOR[0] * (1 - factor) + SECONDARY_COLOR[0] * factor)
        g = int(PRIMARY_COLOR[1] * (1 - factor) + SECONDARY_COLOR[1] * factor)
        b = int(PRIMARY_COLOR[2] * (1 - factor) + SECONDARY_COLOR[2] * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Textos
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
        detail_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        detail_font = ImageFont.load_default()

    # Título
    title = "JKD TECH"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text(((width - title_width) // 2, 180), title, font=title_font, fill=WHITE)

    # Subtítulo
    subtitle = "Software Engineer Portfolio"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text(((width - subtitle_width) // 2, 280), subtitle, font=subtitle_font, fill=WHITE)

    # Detalles
    details = "Jonathan Moya • Java • Angular • AI Solutions"
    bbox = draw.textbbox((0, 0), details, font=detail_font)
    details_width = bbox[2] - bbox[0]
    draw.text(((width - details_width) // 2, 360), details, font=detail_font, fill=(200, 200, 200))

    # Línea decorativa
    draw.rectangle([(width // 2 - 100, 420), (width // 2 + 100, 425)], fill=PRIMARY_COLOR)

    # Guardar
    img.save(output_path, 'JPEG', quality=90, optimize=True)
    print(f"✓ Creado: {output_path}")

def create_apple_touch_icon(output_path):
    """Crea Apple Touch Icon (180x180)"""
    create_square_icon(180, output_path)

def main():
    """Genera todos los assets necesarios"""
    print("🎨 Generando assets para JKD Tech Portfolio...\n")

    # Verificar que existe el directorio
    if not os.path.exists(ASSETS_DIR):
        os.makedirs(ASSETS_DIR)
        print(f"✓ Creado directorio: {ASSETS_DIR}")

    # Generar favicons
    create_square_icon(32, os.path.join(ASSETS_DIR, "favicon.png"))
    create_square_icon(192, os.path.join(ASSETS_DIR, "icon-192.png"))
    create_square_icon(512, os.path.join(ASSETS_DIR, "icon-512.png"))

    # Generar Apple Touch Icon
    create_apple_touch_icon(os.path.join(ASSETS_DIR, "apple-touch-icon.png"))

    # Generar Open Graph image
    create_og_image(os.path.join(ASSETS_DIR, "og-image.jpg"))

    print("\n✅ ¡Todos los assets generados exitosamente!")
    print("\nArchivos creados:")
    print("  - favicon.png (32x32)")
    print("  - icon-192.png (192x192)")
    print("  - icon-512.png (512x512)")
    print("  - apple-touch-icon.png (180x180)")
    print("  - og-image.jpg (1200x630)")
    print("\n📋 Próximos pasos:")
    print("  1. Revisa las imágenes generadas")
    print("  2. Si quieres personalizarlas, edítalas con tu diseño")
    print("  3. El favicon.svg ya está listo para usar también")

if __name__ == "__main__":
    main()

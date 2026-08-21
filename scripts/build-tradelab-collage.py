from PIL import Image, ImageDraw, ImageFont
import os
import subprocess

ROOT = "/Users/nisarg/Development/Portfolio-Website"
SRC = f"{ROOT}/public/images/tradelab-shots"
OUT = f"{ROOT}/public/images/tradelab.png"

W, H = 1600, 1000
BG = (7, 11, 17)
BORDER = (28, 36, 48)
AMBER = (242, 167, 27)
CARD = (13, 18, 26)
GAP = 6
HEADER_H = 64
PAD = 8


def load(name):
    return Image.open(os.path.join(SRC, name)).convert("RGB")


def fit_in_cell(img, tw, th, bg=CARD):
    iw, ih = img.size
    scale = min(tw / iw, th / ih)
    nw, nh = max(1, int(iw * scale)), max(1, int(ih * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    cell = Image.new("RGB", (tw, th), bg)
    cell.paste(resized, ((tw - nw) // 2, (th - nh) // 2))
    return cell


def framed(img, tw, th):
    content = fit_in_cell(img, tw - 2, th - 2)
    frame = Image.new("RGB", (tw, th), BORDER)
    frame.paste(content, (1, 1))
    return frame


def build():
    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 30)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 16)
        font_badge = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 12)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = font_title
        font_badge = font_title

    draw.rounded_rectangle([PAD, PAD, W - PAD, PAD + HEADER_H], radius=12, fill=CARD, outline=BORDER, width=1)
    draw.rounded_rectangle([PAD + 14, PAD + 14, PAD + 50, PAD + 50], radius=8, fill=AMBER)
    draw.line([(PAD + 22, PAD + 40), (PAD + 30, PAD + 30), (PAD + 36, PAD + 34), (PAD + 42, PAD + 22)], fill=BG, width=3)
    draw.text((PAD + 62, PAD + 12), "Nisarg's TradeLab", fill=(244, 247, 251), font=font_title)
    draw.text((PAD + 62, PAD + 40), "Track · Analyze · Improve", fill=(167, 176, 190), font=font_sub)
    draw.rounded_rectangle([W - PAD - 118, PAD + 18, W - PAD - 16, PAD + 46], radius=7, fill=(42, 26, 8), outline=AMBER)
    draw.text((W - PAD - 106, PAD + 25), "AI Coach", fill=AMBER, font=font_badge)

    top = PAD + HEADER_H + GAP
    height = H - top - PAD
    width = W - PAD * 2

    left_w = int(width * 0.52)
    right_w = width - left_w - GAP
    half_h = (height - GAP) // 2

    ai_hero = load("ai-coach-hero.png")
    dashboard = load("dashboard.png")
    analytics = load("analytics.png")

    canvas.paste(framed(ai_hero, left_w, height), (PAD, top))
    canvas.paste(framed(dashboard, right_w, half_h), (PAD + left_w + GAP, top))
    canvas.paste(framed(analytics, right_w, height - half_h - GAP), (PAD + left_w + GAP, top + half_h + GAP))

    canvas.save(OUT, "PNG", optimize=True)
    print("Saved", OUT)


if __name__ == "__main__":
    build()

from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1600, 960
S = 3
iw, ih = W * S, H * S

# Palette (matching product-portfolio-visual)
BG     = (10, 16, 56)
GRID_C = (16, 26, 78)
HDR_C  = (7, 13, 48)
CARD_C = (244, 248, 255)
CYAN   = (0, 186, 244)
BLUE   = (37, 100, 220)
DKBLUE = (25, 55, 145)
MDBLUE = (55, 108, 193)
WHITE  = (255, 255, 255)
SILVER = (160, 185, 215)
GLOW_C = (22, 55, 148)

img = Image.new("RGB", (iw, ih), BG)
d   = ImageDraw.Draw(img, "RGBA")

FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
f_step = ImageFont.truetype(FONT_PATH, 20 * S)

# ── Grid ────────────────────────────────────────────────────────────
gs = 52 * S
for x in range(0, iw, gs):
    d.line([(x, 0), (x, ih)], fill=(*GRID_C, 150), width=S)
for y in range(0, ih, gs):
    d.line([(0, y), (iw, y)], fill=(*GRID_C, 150), width=S)

# ── Background glows ────────────────────────────────────────────────
def glow(cx, cy, max_r, color, max_a=45):
    for r in range(max_r * S, 4 * S, -10 * S):
        a = int(max_a * (1 - r / (max_r * S)))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, a))

glow(1460 * S, 80 * S,  380, GLOW_C, 55)
glow(120  * S, 900 * S, 300, GLOW_C, 40)
glow(800  * S, 500 * S, 180, GLOW_C, 18)

# ── Helpers ─────────────────────────────────────────────────────────
def rrect(x1, y1, x2, y2, r, fill=None, outline=None, lw=2):
    d.rounded_rectangle([x1*S, y1*S, x2*S, y2*S],
                        radius=r*S, fill=fill,
                        outline=outline, width=lw*S)

def card(x, y, w, h):
    for i in range(18, 0, -3):
        a = int(38 * (1 - i / 18))
        d.rounded_rectangle(
            [(x + i//3)*S, (y + i//2)*S, (x + w + i//4)*S, (y + h + i//2)*S],
            radius=12*S, fill=(5, 8, 35, a))
    d.rounded_rectangle([x*S, y*S, (x+w)*S, (y+h)*S], radius=12*S, fill=(*CARD_C, 255))

def header(x, y, w, dots, hh=46):
    r = 12*S
    d.rounded_rectangle([x*S, y*S, (x+w)*S, (y+hh)*S], radius=r, fill=(*HDR_C, 255))
    d.rectangle([x*S, (y+12)*S, (x+w)*S, (y+hh)*S],   fill=(*HDR_C, 255))
    mid_y = y + hh // 2
    for i, c in enumerate(dots):
        cx_ = (x + 18 + i * 18) * S
        cy_ = mid_y * S
        dr  = 5 * S
        d.ellipse([cx_-dr, cy_-dr, cx_+dr, cy_+dr], fill=(*c, 255))

def text_center(txt, cx, cy, font, color):
    bb = font.getbbox(txt)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    d.text((cx*S - tw//2, cy*S - th//2 - bb[1]), txt, font=font, fill=(*color, 255))

def arrow(cx, cy, aw=44, ah=26):
    ax, ay = cx - aw//2, cy - ah//2
    pts = [
        (ax*S,        (ay+4)*S),
        ((ax+aw-14)*S,(ay+4)*S),
        ((ax+aw-14)*S, ay*S),
        ((ax+aw)*S,   (ay+ah//2)*S),
        ((ax+aw-14)*S,(ay+ah)*S),
        ((ax+aw-14)*S,(ay+ah-4)*S),
        (ax*S,        (ay+ah-4)*S),
    ]
    d.polygon(pts, fill=(*CYAN, 220))

# ── Layout ──────────────────────────────────────────────────────────
card_w, card_h = 260, 360
card_ys = [300, 268, 308, 268]
n = 4
gap = (W - n * card_w) // (n + 1)
card_xs = [gap + i * (card_w + gap) for i in range(n)]

# ── Connecting dashed line through badge centers ─────────────────────
badge_ys    = [cy - 38 for cy in card_ys]
avg_badge_y = sum(badge_ys) // 4
for i in range(3):
    x1 = (card_xs[i]   + card_w // 2 + 24) * S
    x2 = (card_xs[i+1] + card_w // 2 - 24) * S
    yl = avg_badge_y * S
    seg, gap2 = 14*S, 8*S
    x  = x1
    while x < x2:
        d.line([(x, yl), (min(x+seg, x2), yl)], fill=(*MDBLUE, 160), width=2*S)
        x += seg + gap2

# ════════════════════════════════════════════════════════════════════
# CARD 1 — COLLECT
# ════════════════════════════════════════════════════════════════════
cx, cy = card_xs[0], card_ys[0]
card(cx, cy, card_w, card_h)
header(cx, cy, card_w, [CYAN, CYAN, MDBLUE])

icx, icy = cx + card_w//2, cy + 138

fp = [(icx-55, icy-52),(icx+55, icy-52),
      (icx+24, icy+8),(icx+18, icy+8),
      (icx+18, icy+52),(icx-18, icy+52),
      (icx-18, icy+8),(icx-24, icy+8)]
d.polygon([(p[0]*S, p[1]*S) for p in fp], fill=(*DKBLUE, 255))
for j, (off, bc, bw) in enumerate([(-38, CYAN, 78),(-22, BLUE, 58),(-7, MDBLUE, 38)]):
    d.rounded_rectangle(
        [(icx - bw//2)*S, (icy+off-4)*S, (icx+bw//2)*S, (icy+off+4)*S],
        radius=4*S, fill=(*bc, 210))
d.rounded_rectangle([(icx-8)*S,(icy+52)*S,(icx+8)*S,(icy+72)*S], radius=4*S, fill=(*CYAN,230))
d.polygon([((icx-14)*S,(icy+66)*S),((icx+14)*S,(icy+66)*S),(icx*S,(icy+82)*S)], fill=(*CYAN,230))

for j,(bw_p,bc) in enumerate([(0.75,BLUE),(0.50,MDBLUE),(0.62,CYAN)]):
    by = cy + card_h - 92 + j*27
    bpx = int((card_w-60)*bw_p)
    rrect(cx+30,by,cx+30+bpx,by+9,4,fill=(*bc,215))
    rrect(cx+30+bpx,by,cx+card_w-30,by+9,4,fill=(*SILVER,80))

# ════════════════════════════════════════════════════════════════════
# CARD 2 — PROCESS
# ════════════════════════════════════════════════════════════════════
cx, cy = card_xs[1], card_ys[1]
card(cx, cy, card_w, card_h)
header(cx, cy, card_w, [BLUE, CYAN, BLUE])

icx2, icy2 = cx + card_w//2, cy + 142
or_, ir_ = 58, 30

d.ellipse([(icx2-or_)*S,(icy2-or_)*S,(icx2+or_)*S,(icy2+or_)*S],
          outline=(*DKBLUE,255), width=14*S)
for j, ac in enumerate([CYAN, BLUE, MDBLUE, CYAN]):
    d.arc([(icx2-or_)*S,(icy2-or_)*S,(icx2+or_)*S,(icy2+or_)*S],
          j*90+8, j*90+72, fill=(*ac,255), width=14*S)
d.ellipse([(icx2-ir_)*S,(icy2-ir_)*S,(icx2+ir_)*S,(icy2+ir_)*S], fill=(*DKBLUE,255))
d.ellipse([(icx2-8)*S,(icy2-8)*S,(icx2+8)*S,(icy2+8)*S], fill=(*CYAN,255))
for ang in range(0, 360, 45):
    ar = math.radians(ang)
    px = int(icx2 + or_ * math.cos(ar))
    py = int(icy2 + or_ * math.sin(ar))
    d.ellipse([(px-5)*S,(py-5)*S,(px+5)*S,(py+5)*S], fill=(*WHITE,200))

for j,(bw_p,bc) in enumerate([(0.80,CYAN),(0.60,BLUE),(0.70,MDBLUE)]):
    by = cy + card_h - 92 + j*27
    bpx = int((card_w-60)*bw_p)
    rrect(cx+30,by,cx+30+bpx,by+9,4,fill=(*bc,215))
    rrect(cx+30+bpx,by,cx+card_w-30,by+9,4,fill=(*SILVER,80))

# ════════════════════════════════════════════════════════════════════
# CARD 3 — ANALYZE
# ════════════════════════════════════════════════════════════════════
cx, cy = card_xs[2], card_ys[2]
card(cx, cy, card_w, card_h)
header(cx, cy, card_w, [CYAN, BLUE, CYAN])

cl, ct, cr2, cb = cx+35, cy+65, cx+card_w-35, cy+220
cw = cr2 - cl
bars_h = [0.45, 0.70, 0.52, 0.90, 0.65, 0.85]
bars_c = [DKBLUE, BLUE, DKBLUE, CYAN, BLUE, CYAN]
bw_b   = cw // 6 - 4
for j, (bhr, bc) in enumerate(zip(bars_h, bars_c)):
    bx  = cl + j*(bw_b+4)
    bh2 = int((cb-ct)*bhr)
    rrect(bx, cb-bh2, bx+bw_b, cb, 4, fill=(*bc,255))

tpts = []
for j, bhr in enumerate(bars_h):
    tx = cl + j*(bw_b+4) + bw_b//2
    ty = cb - int((cb-ct)*bhr) - 6
    tpts.append((tx*S, ty*S))
for j in range(len(tpts)-1):
    d.line([tpts[j], tpts[j+1]], fill=(*CYAN,230), width=3*S)
for pt in tpts:
    dr = 5*S
    d.ellipse([pt[0]-dr,pt[1]-dr,pt[0]+dr,pt[1]+dr], fill=(*WHITE,230))

for j,(bw_p,bc) in enumerate([(0.70,BLUE),(0.52,CYAN),(0.65,MDBLUE)]):
    by = cy + card_h - 92 + j*27
    bpx = int((card_w-60)*bw_p)
    rrect(cx+30,by,cx+30+bpx,by+9,4,fill=(*bc,215))
    rrect(cx+30+bpx,by,cx+card_w-30,by+9,4,fill=(*SILVER,80))

# ════════════════════════════════════════════════════════════════════
# CARD 4 — DEPLOY
# ════════════════════════════════════════════════════════════════════
cx, cy = card_xs[3], card_ys[3]
card(cx, cy, card_w, card_h)
header(cx, cy, card_w, [CYAN, MDBLUE, CYAN])

icx4, icy4 = cx + card_w//2, cy + 142
for rad, alp in [(72, 35), (56, 70)]:
    d.ellipse([(icx4-rad)*S,(icy4-rad)*S,(icx4+rad)*S,(icy4+rad)*S],
              outline=(*CYAN,alp), width=4*S)
d.ellipse([(icx4-40)*S,(icy4-40)*S,(icx4+40)*S,(icy4+40)*S], fill=(*DKBLUE,255))
ck = [((icx4-20)*S, icy4*S),
      ((icx4- 5)*S, (icy4+18)*S),
      ((icx4+22)*S, (icy4-22)*S)]
d.line([ck[0], ck[1]], fill=(*CYAN,255), width=8*S)
d.line([ck[1], ck[2]], fill=(*CYAN,255), width=8*S)
for ang, c in zip([25, 145, 265], [CYAN, BLUE, MDBLUE]):
    ar  = math.radians(ang)
    px  = int(icx4 + 68 * math.cos(ar))
    py  = int(icy4 + 68 * math.sin(ar))
    ex  = int(icx4 + 42 * math.cos(ar))
    ey  = int(icy4 + 42 * math.sin(ar))
    d.line([(ex*S,ey*S),(px*S,py*S)], fill=(*MDBLUE,120), width=2*S)
    d.ellipse([(px-7)*S,(py-7)*S,(px+7)*S,(py+7)*S], fill=(*c,220))

for j,(bw_p,bc) in enumerate([(0.90,CYAN),(0.70,BLUE),(0.80,MDBLUE)]):
    by = cy + card_h - 92 + j*27
    bpx = int((card_w-60)*bw_p)
    rrect(cx+30,by,cx+30+bpx,by+9,4,fill=(*bc,215))
    rrect(cx+30+bpx,by,cx+card_w-30,by+9,4,fill=(*SILVER,80))

# ── Arrows between cards ─────────────────────────────────────────────
for i in range(3):
    mid_x = (card_xs[i] + card_w + card_xs[i+1]) // 2
    mid_y = (card_ys[i] + card_h//2 + card_ys[i+1] + card_h//2) // 2
    arrow(mid_x, mid_y)

# ── Step badges (numbers only, no card labels) ───────────────────────
for i in range(4):
    bcx = card_xs[i] + card_w // 2
    bcy = card_ys[i] - 38
    br  = 22
    d.ellipse([(bcx-br)*S,(bcy-br)*S,(bcx+br)*S,(bcy+br)*S],
              fill=(*DKBLUE,255), outline=(*CYAN,255), width=2*S)
    text_center(f"0{i+1}", bcx, bcy, f_step, WHITE)

# ── Scale down with LANCZOS AA ───────────────────────────────────────
out = img.resize((W, H), Image.LANCZOS)
out.save("www/img/workflow-visual.png", "PNG")
print("Saved www/img/workflow-visual.png")

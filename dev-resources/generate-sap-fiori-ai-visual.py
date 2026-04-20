from PIL import Image, ImageDraw, ImageFont
import math, random

W, H = 1600, 960
S = 3
iw, ih = W * S, H * S

BG      = (10, 16, 56)
GRID_C  = (16, 26, 78)
HDR_C   = (7,  13, 48)
CARD_C  = (244, 248, 255)
CYAN    = (0,  186, 244)
BLUE    = (37, 100, 220)
DKBLUE  = (25,  55, 145)
MDBLUE  = (55, 108, 193)
WHITE   = (255, 255, 255)
SILVER  = (160, 185, 215)
GLOW_C  = (22,  55, 148)

img = Image.new("RGB", (iw, ih), BG)
d   = ImageDraw.Draw(img, "RGBA")

# ── Grid ────────────────────────────────────────────────────────────
for x in range(0, iw, 52*S):
    d.line([(x,0),(x,ih)], fill=(*GRID_C,150), width=S)
for y in range(0, ih, 52*S):
    d.line([(0,y),(iw,y)], fill=(*GRID_C,150), width=S)

# ── Background glows ────────────────────────────────────────────────
def glow(cx, cy, mr, col, ma=45):
    for r in range(mr*S, 4*S, -10*S):
        a = int(ma*(1 - r/(mr*S)))
        d.ellipse([cx-r,cy-r,cx+r,cy+r], fill=(*col,a))

glow(1460*S,  80*S, 380, GLOW_C, 55)
glow( 120*S, 900*S, 300, GLOW_C, 40)
glow( 780*S, 460*S, 200, GLOW_C, 20)

random.seed(7)
for _ in range(35):
    sx,sy = random.randint(0,W), random.randint(0,H)
    sr,sa = random.randint(2,5), random.randint(15,60)
    sc = random.choice([CYAN, BLUE, MDBLUE])
    d.ellipse([(sx-sr)*S,(sy-sr)*S,(sx+sr)*S,(sy+sr)*S], fill=(*sc,sa))

# ── Helpers ─────────────────────────────────────────────────────────
def rrect(x1,y1,x2,y2,r,fill=None,outline=None,lw=2):
    d.rounded_rectangle([x1*S,y1*S,x2*S,y2*S], radius=r*S,
                        fill=fill, outline=outline, width=lw*S)

def card(x,y,w,h):
    for i in range(18,0,-3):
        a = int(38*(1-i/18))
        d.rounded_rectangle([(x+i//3)*S,(y+i//2)*S,(x+w+i//4)*S,(y+h+i//2)*S],
                             radius=14*S, fill=(5,8,35,a))
    d.rounded_rectangle([x*S,y*S,(x+w)*S,(y+h)*S], radius=14*S, fill=(*CARD_C,255))

def hdr(x,y,w,dots,hh=46):
    d.rounded_rectangle([x*S,y*S,(x+w)*S,(y+hh)*S], radius=14*S, fill=(*HDR_C,255))
    d.rectangle([x*S,(y+14)*S,(x+w)*S,(y+hh)*S],    fill=(*HDR_C,255))
    for i,c in enumerate(dots):
        cx_=(x+20+i*18)*S; cy_=(y+hh//2)*S; dr=5*S
        d.ellipse([cx_-dr,cy_-dr,cx_+dr,cy_+dr], fill=(*c,255))

def arrow(cx,cy,aw=52,ah=30):
    ax,ay = cx-aw//2, cy-ah//2
    pts = [(ax*S,(ay+5)*S),((ax+aw-16)*S,(ay+5)*S),((ax+aw-16)*S,ay*S),
           ((ax+aw)*S,(ay+ah//2)*S),((ax+aw-16)*S,(ay+ah)*S),
           ((ax+aw-16)*S,(ay+ah-5)*S),(ax*S,(ay+ah-5)*S)]
    d.polygon(pts, fill=(*CYAN,215))

# ════════════════════════════════════════════════════════════════════
# CARD 1 — FIORI LAUNCHPAD
# ════════════════════════════════════════════════════════════════════
C1x,C1y,C1w,C1h = 60, 200, 390, 555
card(C1x,C1y,C1w,C1h)
hdr(C1x,C1y,C1w,[CYAN,CYAN,MDBLUE])

SY = C1y+46
d.rectangle([C1x*S,SY*S,(C1x+C1w)*S,(SY+30)*S], fill=(*DKBLUE,255))
for i,(pw,pc) in enumerate([(60,CYAN),(58,MDBLUE),(56,MDBLUE)]):
    px = C1x+18+i*78; py=SY+8
    rrect(px,py,px+pw,py+14, 7, fill=(*pc,180 if i>0 else 230))

TS, TG = 96, 13
TX = C1x + (C1w - (3*TS+2*TG))//2
TY = SY + 30 + 18

icon_defs = [
    ("bars",  CYAN,   DKBLUE),
    ("orb",   CYAN,   BLUE),
    ("nodes", MDBLUE, DKBLUE),
    ("check", CYAN,   BLUE),
    ("user",  BLUE,   DKBLUE),
    ("doc",   MDBLUE, BLUE),
    ("bolt",  CYAN,   DKBLUE),
    ("grid4", BLUE,   DKBLUE),
    ("ring",  MDBLUE, BLUE),
]
ai_badge_tiles = {0, 1, 4, 6}

for idx,(icon,ac,tc) in enumerate(icon_defs):
    row,col = idx//3, idx%3
    tx = TX + col*(TS+TG)
    ty = TY + row*(TS+TG)
    rrect(tx,ty,tx+TS,ty+TS, 10, fill=(*tc,255))
    icx = tx+TS//2; icy = ty+TS//2 - 5

    if icon == "bars":
        for b,(bhr,bc) in enumerate(zip([0.45,0.75,0.55],[ac,CYAN,ac])):
            bx=icx-20+b*19; bh=int(32*bhr)
            rrect(bx,icy+16-bh,bx+13,icy+16,2,fill=(*bc,255))
    elif icon == "orb":
        d.ellipse([(icx-11)*S,(icy-11)*S,(icx+11)*S,(icy+11)*S],fill=(*ac,255))
        for ang in range(0,360,90):
            ar=math.radians(ang); px=int(icx+21*math.cos(ar)); py=int(icy+21*math.sin(ar))
            d.ellipse([(px-5)*S,(py-5)*S,(px+5)*S,(py+5)*S],fill=(*ac,210))
        d.ellipse([(icx-23)*S,(icy-23)*S,(icx+23)*S,(icy+23)*S],outline=(*ac,120),width=2*S)
    elif icon == "nodes":
        pts=[(icx-20,icy+14),(icx+20,icy+14),(icx,icy-16)]
        for a in pts:
            for b in pts:
                if a!=b: d.line([(a[0]*S,a[1]*S),(b[0]*S,b[1]*S)],fill=(*ac,130),width=2*S)
        for nx,ny in pts:
            d.ellipse([(nx-7)*S,(ny-7)*S,(nx+7)*S,(ny+7)*S],fill=(*ac,255))
    elif icon == "check":
        ck=[((icx-18)*S,icy*S),((icx-3)*S,(icy+16)*S),((icx+18)*S,(icy-18)*S)]
        d.line([ck[0],ck[1]],fill=(*ac,255),width=6*S)
        d.line([ck[1],ck[2]],fill=(*ac,255),width=6*S)
    elif icon == "user":
        d.ellipse([(icx-12)*S,(icy-18)*S,(icx+12)*S,(icy+6)*S],fill=(*ac,255))
        d.arc([(icx-20)*S,(icy+4)*S,(icx+20)*S,(icy+32)*S],200,340,fill=(*ac,255),width=5*S)
    elif icon == "doc":
        rrect(icx-14,icy-20,icx+17,icy+22,3,fill=None,outline=(*ac,255),lw=2)
        for ly2 in [icy-8,icy+2,icy+12]:
            rrect(icx-9,ly2,icx+12,ly2+5,2,fill=(*ac,200))
    elif icon == "bolt":
        bpts=[((icx+4)*S,(icy-20)*S),((icx-6)*S,(icy-2)*S),((icx+3)*S,(icy-2)*S),
              ((icx-9)*S,(icy+20)*S),((icx+6)*S,(icy+2)*S),((icx-2)*S,(icy+2)*S)]
        d.polygon(bpts,fill=(*ac,255))
    elif icon == "grid4":
        for gr,gc in [(0,0),(0,1),(1,0),(1,1)]:
            gx=icx-16+gc*20; gy=icy-16+gr*20
            rrect(gx,gy,gx+14,gy+14,3,fill=(*ac,255))
    elif icon == "ring":
        d.ellipse([(icx-20)*S,(icy-20)*S,(icx+20)*S,(icy+20)*S],outline=(*ac,255),width=5*S)
        for ang in range(0,360,120):
            ar=math.radians(ang); px=int(icx+20*math.cos(ar)); py=int(icy+20*math.sin(ar))
            d.ellipse([(px-6)*S,(py-6)*S,(px+6)*S,(py+6)*S],fill=(*ac,255))
        d.ellipse([(icx-7)*S,(icy-7)*S,(icx+7)*S,(icy+7)*S],fill=(*ac,255))

    if idx in ai_badge_tiles:
        bx2=tx+TS-13; by2=ty+10
        d.ellipse([(bx2-6)*S,(by2-6)*S,(bx2+6)*S,(by2+6)*S],fill=(*CYAN,255))
        d.ellipse([(bx2-3)*S,(by2-3)*S,(bx2+3)*S,(by2+3)*S],fill=(*WHITE,255))

bsy = TY + 3*(TS+TG) + 5
for j,(bp,bc) in enumerate([(0.78,BLUE),(0.52,CYAN),(0.65,MDBLUE)]):
    by=bsy+j*25; bpx=int((C1w-60)*bp)
    rrect(C1x+30,by,C1x+30+bpx,by+9,4,fill=(*bc,215))
    rrect(C1x+30+bpx,by,C1x+C1w-30,by+9,4,fill=(*SILVER,80))

# ════════════════════════════════════════════════════════════════════
# CARD 2 — AI NEURAL NETWORK
# ════════════════════════════════════════════════════════════════════
C2x,C2y,C2w,C2h = 555, 125, 458, 678
card(C2x,C2y,C2w,C2h)
hdr(C2x,C2y,C2w,[BLUE,CYAN,BLUE])

NX1,NY1 = C2x+22, C2y+46+18
NX2,NY2 = C2x+C2w-22, C2y+C2h-65
rrect(NX1,NY1,NX2,NY2, 10, fill=(*HDR_C,210))

LXS = [NX1+52, NX1+152, NX1+258, NX2-52]
NCY = (NY1+NY2)//2

def even_ys(n, cy, sp):
    return [cy - (n-1)*sp//2 + i*sp for i in range(n)]

layer_nodes = [
    even_ys(3, NCY, 92),
    even_ys(5, NCY, 70),
    even_ys(4, NCY, 80),
    even_ys(2, NCY, 104),
]
radii = [17,13,13,19]
HE = {(0,1,1,2),(1,2,2,1),(2,1,3,0)}

for li in range(3):
    for ni,ny1 in enumerate(layer_nodes[li]):
        for nj,ny2 in enumerate(layer_nodes[li+1]):
            if (li,ni,li+1,nj) not in HE:
                d.line([(LXS[li]*S,ny1*S),(LXS[li+1]*S,ny2*S)],fill=(*MDBLUE,40),width=S)

for li,ni,lj,nj in HE:
    x1,y1b = LXS[li], layer_nodes[li][ni]
    x2,y2b = LXS[lj], layer_nodes[lj][nj]
    for gw,ga in [(6,20),(4,55),(2,200)]:
        d.line([(x1*S,y1b*S),(x2*S,y2b*S)],fill=(*CYAN,ga),width=gw*S)
    mx,my = (x1+x2)//2, (y1b+y2b)//2
    d.ellipse([(mx-5)*S,(my-5)*S,(mx+5)*S,(my+5)*S],fill=(*CYAN,180))

active_nodes = set()
for li,ni,lj,nj in HE:
    active_nodes.add((li,ni)); active_nodes.add((lj,nj))

for li,(lx,nys) in enumerate(zip(LXS,layer_nodes)):
    for ni,ny in enumerate(nys):
        is_act = (li,ni) in active_nodes
        fc = CYAN if is_act else DKBLUE
        oc = CYAN if is_act else MDBLUE
        nr = radii[li]
        if is_act:
            d.ellipse([(lx-nr-7)*S,(ny-nr-7)*S,(lx+nr+7)*S,(ny+nr+7)*S],fill=(*CYAN,30))
            d.ellipse([(lx-nr-4)*S,(ny-nr-4)*S,(lx+nr+4)*S,(ny+nr+4)*S],fill=(*CYAN,70))
        d.ellipse([(lx-nr)*S,(ny-nr)*S,(lx+nr)*S,(ny+nr)*S],fill=(*fc,255))
        d.ellipse([(lx-nr)*S,(ny-nr)*S,(lx+nr)*S,(ny+nr)*S],outline=(*oc,255),width=2*S)

for li,lx in enumerate(LXS):
    lc = [CYAN, BLUE, MDBLUE, CYAN][li]
    label_y = NY2 + 14
    d.ellipse([(lx-5)*S,(label_y-5)*S,(lx+5)*S,(label_y+5)*S],fill=(*lc,200))

chip_y=NY2+8; chip_x=C2x+C2w//2; chip_w=80; chip_h=24
rrect(chip_x-chip_w//2,chip_y,chip_x+chip_w//2,chip_y+chip_h, chip_h//2, fill=(*CYAN,220))
for i in range(3):
    dx=chip_x-18+i*18; dy=chip_y+chip_h//2
    d.ellipse([(dx-5)*S,(dy-5)*S,(dx+5)*S,(dy+5)*S],fill=(*HDR_C,255))

# ════════════════════════════════════════════════════════════════════
# CARD 3 — SMART INSIGHTS
# ════════════════════════════════════════════════════════════════════
C3x,C3y,C3w,C3h = 1110, 190, 415, 568
card(C3x,C3y,C3w,C3h)
hdr(C3x,C3y,C3w,[CYAN,MDBLUE,CYAN])

kw,kh = 170,80; kg=14
kstart_x = C3x + (C3w - 2*kw - kg)//2
kstart_y = C3y + 46 + 18
for ki,(kc,kac) in enumerate([(DKBLUE,CYAN),(BLUE,MDBLUE)]):
    kx = kstart_x + ki*(kw+kg); ky = kstart_y
    rrect(kx,ky,kx+kw,ky+kh, 8, fill=(*kc,255))
    rrect(kx+12,ky+18,kx+kw-12,ky+36, 4, fill=(*kac,200))
    for si in range(2):
        rrect(kx+12,ky+44+si*16,kx+kw-12-si*30,ky+52+si*16, 3, fill=(*kac,140-si*40))
    d.ellipse([(kx+kw-16)*S,(ky+12)*S,(kx+kw-6)*S,(ky+22)*S],fill=(*kac,255))

DCX = C3x + C3w//2 - 20
DCY = kstart_y + kh + 95
DOR, DIR = 72, 38

for sc,sa,ea in [(CYAN,0,140),(BLUE,140,255),(MDBLUE,255,360)]:
    d.pieslice([(DCX-DOR)*S,(DCY-DOR)*S,(DCX+DOR)*S,(DCY+DOR)*S],
               sa-90,ea-90, fill=(*sc,255))
d.ellipse([(DCX-DIR)*S,(DCY-DIR)*S,(DCX+DIR)*S,(DCY+DIR)*S],fill=(*CARD_C,255))
d.ellipse([(DCX-7)*S,(DCY-7)*S,(DCX+7)*S,(DCY+7)*S],fill=(*DKBLUE,255))

lx = DCX + DOR + 18
for ji,(lc,lbw) in enumerate([(CYAN,45),(BLUE,32),(MDBLUE,38)]):
    ly = DCY - 22 + ji*26
    d.ellipse([(lx-5)*S,(ly-5)*S,(lx+5)*S,(ly+5)*S],fill=(*lc,255))
    rrect(lx+10,ly-5,lx+10+lbw,ly+5, 3, fill=(*lc,180))

bar_y0 = DCY + DOR + 25
for ji,(bp,bc,ic) in enumerate([(0.85,BLUE,CYAN),(0.65,CYAN,BLUE),(0.72,MDBLUE,CYAN),(0.55,BLUE,MDBLUE)]):
    by=bar_y0+ji*27; bpx=int((C3w-68)*bp)
    rrect(C3x+34,by,C3x+34+bpx,by+10,5,fill=(*bc,215))
    rrect(C3x+34+bpx,by,C3x+C3w-34,by+10,5,fill=(*SILVER,80))
    idx2=C3x+34+bpx+8
    d.ellipse([(idx2-5)*S,by*S,(idx2+5)*S,(by+10)*S],fill=(*ic,235))

# ── Connecting arrows ────────────────────────────────────────────────
arrow((C1x+C1w + C2x)//2, (C1y+C1h//2 + C2y+C2h//2)//2)
arrow((C2x+C2w + C3x)//2, (C2y+C2h//2 + C3y+C3h//2)//2)

# ── Output ───────────────────────────────────────────────────────────
out = img.resize((W, H), Image.LANCZOS)
out.save("www/img/sap-fiori-ai-visual.png", "PNG")
print("Saved www/img/sap-fiori-ai-visual.png")

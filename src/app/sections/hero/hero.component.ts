import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">

      <div class="hero-bg">
        <!-- Fotos reales de eventos cubriendo todo el fondo, en blanco y negro -->
        <div class="mosaic mosaic-mono" aria-hidden="true">
          <div class="mosaic-tile" *ngFor="let t of mosaicTiles" [style.backgroundImage]="'url(' + t.img + ')'"></div>
        </div>
      </div>
      <div class="hero-grid"></div>
      <div class="diagonal-slash"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="hero-wrap">

        <!-- ── IZQUIERDA ── -->
        <div class="hero-left">
          <div class="pretag">
            <span class="pt-line"></span>
            <span class="pt-text">Productora de eventos — Soluciones Gamer</span>
          </div>

          <h1 class="hero-title">
            <span class="ht-top">SOLUCIONES</span>
            <span class="ht-accent">GAMER</span>
          </h1>

          <p class="hero-desc">
            CGL Producciones potencia eventos, jugadores y marcas
            en el ecosistema del esports latinoamericano.
          </p>

          <div class="hero-cta">
            <a href="#contact" class="btn-primary">Contáctanos</a>
            <a href="#gallery" class="btn-ghost">Ver producciones</a>
          </div>
        </div>

        <!-- ── CENTRO: bloque editorial ── -->
        <div class="hero-center">
          <div class="reel-frame">
            <div class="reel-slash"></div>
            <div class="reel-number">+120</div>
            <div class="reel-label">EVENTOS<br>PRODUCIDOS</div>
            <div class="reel-divider"></div>
            <div class="reel-sub">
              <span class="rs-val">3M+</span>
              <span class="rs-lbl">alcance LATAM</span>
            </div>
            <div class="reel-since">
              <span class="rs-dot"></span>
              EST. 2017
            </div>
          </div>
        </div>

        <!-- ── DERECHA ── -->
        <div class="hero-right">
          <div class="brand-vert">
            <span class="bv-main">CGL</span>
            <span class="bv-dot"></span>
            <span class="bv-sub">PROD.</span>
          </div>
          <div class="status-panel">
            <div class="sp-row">
              <span class="sp-dot active"></span>
              <span class="sp-label">Sistema activo</span>
            </div>
            <div class="sp-row">
              <span class="sp-dot"></span>
              <span class="sp-label">LATAM Region</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ── STATS BAR ── -->
      <div class="stats-bar">
        <div class="stats-inner">
          <div class="stat" *ngFor="let s of stats; let last = last">
            <div class="stat-num">{{ s.display }}</div>
            <div class="stat-lbl">{{ s.label }}</div>
            <div class="stat-sep" *ngIf="!last"></div>
          </div>
          <div class="stats-badge">
            <span class="sb-dot"></span>
            EST. 2017
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <div class="sh-line"></div>
        <span>SCROLL</span>
      </div>

    </section>
  `,
  styles: [`
    :host { display: contents; }

    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      padding-top: 80px;
    }

    .hero-bg {
      position: absolute; inset: 0;
      z-index: 0;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute; inset: 0;
        background:
          linear-gradient(to right,  var(--bg) 0%, var(--bg) 10%, rgba(11,11,12,0.55) 40%, transparent 60%),
          linear-gradient(to left,   var(--bg) 0%, transparent 26%),
          linear-gradient(to bottom, transparent 22%, rgba(10,10,11,0.92) 100%);
      }
    }

    /* ── Mosaico fotográfico de fondo: fotos reales de eventos,
       cubriendo todo el hero en blanco y negro ── */
    .mosaic {
      position: absolute; inset: 0;
      display: grid;
      grid-template-columns: repeat(18, 1fr);
      grid-template-rows: repeat(8, 1fr);
      gap: 4px;
    }

    .mosaic-tile {
      background-size: cover;
      background-position: center;
      background-color: var(--bg3);
      border-radius: 3px;
    }

    .mosaic-mono .mosaic-tile {
      filter: grayscale(1) contrast(1.05) brightness(0.5);
      opacity: 0.32;
    }

    @media (max-width: 768px) {
      .mosaic { grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(9, 1fr); gap: 3px; }
      .mosaic-mono .mosaic-tile { opacity: 0.22; }
    }
    @media (max-width: 480px) {
      .mosaic-mono .mosaic-tile { opacity: 0.16; }
    }

    .hero-grid {
      position: absolute; inset: 0; z-index: 0;
      background-image:
        linear-gradient(rgba(255,0,73,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,0,73,0.025) 1px, transparent 1px);
      background-size: 50px 50px;
    }

    .diagonal-slash {
      position: absolute; top: -10%; right: 30%;
      width: 1px; height: 130%;
      background: linear-gradient(to bottom, transparent, rgba(255,0,73,0.12) 30%, rgba(255,0,73,0.08) 60%, transparent);
      transform: rotate(-15deg);
      z-index: 0;
    }

    .orb {
      position: absolute; border-radius: 50%;
      pointer-events: none; z-index: 0;
    }
    .orb-1 {
      width: 800px; height: 800px;
      background: radial-gradient(circle, rgba(255,0,73,0.06) 0%, transparent 65%);
      top: -200px; left: -200px; filter: blur(60px);
    }
    .orb-2 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(255,0,73,0.05) 0%, transparent 65%);
      bottom: -100px; right: 10%; filter: blur(80px);
    }

    .hero-wrap {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr auto 120px;
      gap: 0;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      padding: 40px 40px 20px;
      align-items: center;
      position: relative; z-index: 1;
    }

    .hero-left { padding-right: 60px; }

    .pretag {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 24px;
      animation: fadeUp 0.5s ease 0.1s both;

      .pt-line { display: block; width: 36px; height: 1px; background: var(--neon); flex-shrink: 0; }
      .pt-text {
        font-family: 'DM Mono', monospace;
        font-size: 10px; letter-spacing: 0.25em;
        color: var(--neon); text-transform: uppercase;
      }
    }

    .hero-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900; line-height: 0.88;
      text-transform: uppercase; margin-bottom: 28px;

      .ht-top {
        display: block;
        font-size: clamp(3.8rem, 6.5vw, 7rem);
        color: var(--text); letter-spacing: -0.02em;
        min-height: 1em;
      }
      .ht-accent {
        display: block;
        font-size: clamp(4.5rem, 8vw, 8.5rem);
        color: var(--neon); letter-spacing: -0.03em;
        text-shadow: 0 0 40px rgba(255,0,73,0.5), 0 0 80px rgba(255,0,73,0.2);
        min-height: 1em;
      }
    }

    .hero-desc {
      font-size: 1rem; line-height: 1.75;
      color: var(--muted); max-width: 380px;
      margin-bottom: 40px;
      animation: fadeUp 0.5s ease 1.8s both;
    }

    .hero-cta {
      display: flex; gap: 14px; flex-wrap: wrap;
      animation: fadeUp 0.5s ease 2s both;
    }

    .btn-primary {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 13px;
      letter-spacing: 0.18em; text-transform: uppercase;
      padding: 14px 36px;
      background: var(--neon); color: #0a0a0b;
      border: none;
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      cursor: pointer; text-decoration: none;
      display: inline-block; position: relative; overflow: hidden;
      transition: filter 0.2s;

      &::after {
        content: ''; position: absolute; inset: 0;
        background: rgba(255,255,255,0.15);
        transform: translateX(-100%) skew(-15deg);
        transition: transform 0.4s;
      }
      &:hover { filter: brightness(1.12); &::after { transform: translateX(200%) skew(-15deg); } }
    }

    .btn-ghost {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 13px;
      letter-spacing: 0.18em; text-transform: uppercase;
      padding: 13px 36px;
      background: transparent; color: var(--text);
      border: 1px solid rgba(255,255,255,0.2);
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      cursor: pointer; text-decoration: none;
      display: inline-block;
      transition: border-color 0.2s, color 0.2s;
      &:hover { border-color: var(--neon); color: var(--neon); }
    }

    /* ── Centro editorial ── */
    .hero-center {
      position: relative;
      width: 320px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .reel-frame {
      position: relative;
      width: 100%;
      padding: 44px 36px 36px;
      border: 1px solid rgba(255,0,73,0.22);
      background:
        linear-gradient(140deg, rgba(255,0,73,0.07) 0%, rgba(255,0,73,0.01) 50%, transparent 100%),
        rgba(10,10,11,0.75);
      backdrop-filter: blur(12px);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
      animation: fadeUp 0.6s ease 0.4s both;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 10%; right: 10%;
        height: 1px;
        background: linear-gradient(to right, transparent, var(--neon) 40%, var(--neon) 60%, transparent);
        box-shadow: 0 0 12px rgba(255,0,73,0.4);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 20px; height: 20px;
        background: var(--neon);
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
        opacity: 0.6;
      }
    }

    .reel-slash {
      position: absolute;
      top: 0; right: 60px;
      width: 1px; height: 100%;
      background: linear-gradient(to bottom, var(--neon), transparent 70%);
      opacity: 0.12;
      transform: rotate(8deg);
      transform-origin: top center;
      pointer-events: none;
    }

    .reel-number {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: clamp(3.5rem, 5.5vw, 5rem);
      font-weight: 900;
      line-height: 1;
      color: var(--neon);
      letter-spacing: -0.04em;
      text-shadow: 0 0 30px rgba(255,0,73,0.5), 0 0 60px rgba(255,0,73,0.15);
      margin-bottom: 4px;
    }

    .reel-label {
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--muted);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .reel-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, rgba(255,0,73,0.3), transparent);
      margin-bottom: 18px;
    }

    .reel-sub {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 20px;

      .rs-val {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: var(--text);
        line-height: 1;
      }
      .rs-lbl {
        font-family: 'DM Mono', monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--muted);
      }
    }

    .reel-since {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(255,0,73,0.4);

      .rs-dot {
        width: 6px; height: 6px;
        background: var(--neon);
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        flex-shrink: 0;
        box-shadow: 0 0 6px var(--neon);
      }
    }

    .hero-right {
      display: flex; flex-direction: column;
      align-items: flex-end; justify-content: space-between;
      height: 280px; padding-left: 40px;
      border-left: 1px solid var(--border);
      animation: fadeUp 0.5s ease 0.6s both;
    }

    .brand-vert {
      display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
      .bv-main {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2.5rem; font-weight: 900;
        color: var(--neon); line-height: 1;
        text-shadow: 0 0 20px rgba(255,0,73,0.4);
      }
      .bv-dot {
        display: block; width: 6px; height: 6px;
        background: var(--neon); border-radius: 50%;
        margin-left: auto; box-shadow: 0 0 8px var(--neon);
      }
      .bv-sub {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.25em; color: var(--muted); text-transform: uppercase;
      }
    }

    .status-panel {
      display: flex; flex-direction: column; gap: 10px;
      .sp-row { display: flex; align-items: center; gap: 8px; flex-direction: row-reverse; }
      .sp-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.25);
        &.active {
          background: var(--neon); border-color: var(--neon);
          box-shadow: 0 0 8px var(--neon);
        }
      }
      .sp-label {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.15em; color: var(--muted); text-transform: uppercase;
      }
    }

    .stats-bar {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      background: rgba(10,10,11,0.75);
      backdrop-filter: blur(12px);
      animation: fadeUp 0.5s ease 0.8s both;
    }

    .stats-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 0 40px; display: flex; align-items: stretch;
      flex-wrap: wrap;

      @media (max-width: 640px) { padding: 0 20px; }
    }

    .stat {
      display: flex; align-items: center; gap: 20px;
      padding: 24px 48px 24px 0; position: relative;

      .stat-num {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2.8rem; font-weight: 900;
        color: var(--neon); line-height: 1;
        text-shadow: 0 0 30px rgba(255,0,73,0.4);
      }
      .stat-lbl {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.22em; color: var(--muted);
        text-transform: uppercase; line-height: 1.5; max-width: 70px;
      }
      .stat-sep {
        position: absolute; right: 24px; top: 25%; bottom: 25%;
        width: 1px; background: var(--border);
      }
    }

    .stats-badge {
      margin-left: auto; display: flex; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.25em; color: var(--muted); text-transform: uppercase;
      padding-left: 40px; border-left: 1px solid var(--border);
      .sb-dot {
        width: 8px; height: 8px;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background: var(--neon); flex-shrink: 0;
      }
    }

    .scroll-hint {
      position: absolute; bottom: 80px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace; font-size: 9px;
      letter-spacing: 0.35em; color: rgba(255,0,73,0.3); z-index: 2;
      .sh-line {
        width: 1px; height: 40px;
        background: linear-gradient(to bottom, rgba(255,0,73,0.4), transparent);
        opacity: 0.7;
      }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1024px) {
      .hero-right { display: none; }
      .hero-wrap { grid-template-columns: 1fr auto; }
    }
    @media (max-width: 768px) {
      .hero-wrap { grid-template-columns: 1fr; padding: 20px 24px; text-align: center; gap: 40px; }
      .hero-left { padding-right: 0; }
      .pretag { justify-content: center; }
      .hero-desc { margin: 0 auto 40px; }
      .hero-cta { justify-content: center; }
      .hero-center { width: 100%; order: -1; }
      .reel-frame { padding: 28px 24px; }
      .reel-number { font-size: 3rem; }
      .stat { padding: 18px 24px 18px 0; }
      .stat .stat-num { font-size: 2.2rem; }
      .stats-badge { display: none; }
    }

    @media (max-width: 480px) {
      .hero-wrap { padding: 16px 16px; gap: 28px; }
      .hero-title {
        .ht-top { font-size: 2.8rem; }
        .ht-accent { font-size: 3.4rem; }
      }
      .hero-desc { font-size: 0.92rem; max-width: 100%; }
      .hero-cta { flex-direction: column; width: 100%; }
      .btn-primary, .btn-ghost { text-align: center; width: 100%; }
      .reel-frame { padding: 22px 18px; }
      .reel-number { font-size: 2.4rem; }
      .stats-inner { padding: 0 16px; }
      .stat { flex: 1 1 45%; padding: 16px 16px 16px 0; gap: 12px; }
      .stat .stat-num { font-size: 1.8rem; }
      .scroll-hint { display: none; }
    }
  `]
})
export class HeroComponent implements OnInit {

  stats = [
    { value: '50+',  label: 'Competencias', display: '--' },
    { value: '120+', label: 'Eventos',       display: '--' },
    { value: '3M+',  label: 'Alcance',       display: '--' },
  ];

  // ── Mosaico de fondo: grilla de fotos reales de eventos que cubre
  // todo el hero, en blanco y negro (ver .mosaic-mono en styles) ──
  private readonly MOSAIC_COLS = 18;
  private readonly MOSAIC_ROWS = 8;

  // Fotos reales de eventos usadas como relleno del mosaico
  private readonly MOSAIC_POOL = [
    'assets/gallery/eventos/img1.jpg',  'assets/gallery/eventos/img2.jpg',
    'assets/gallery/eventos/img3.png',  'assets/gallery/eventos/img4.png',
    'assets/gallery/eventos/img5.png',  'assets/gallery/eventos/img6.png',
    'assets/gallery/eventos/img7.png',  'assets/gallery/eventos/img8.png',
    'assets/gallery/eventos/img9.png',  'assets/gallery/eventos/img10.png',
    'assets/gallery/eventos/img11.png', 'assets/gallery/eventos/img12.png',
    'assets/gallery/eventos/img13.png', 'assets/gallery/eventos/img14.png',
    'assets/gallery/eventos/img15.png', 'assets/gallery/eventos/img16.png',
    'assets/gallery/eventos/img17.png', 'assets/gallery/eventos/img18.png',
    'assets/gallery/eventos/img19.png', 'assets/gallery/eventos/img20.png',
  ];

  mosaicTiles: { img: string }[] = this.buildMosaic();

  private buildMosaic(): { img: string }[] {
    const total = this.MOSAIC_COLS * this.MOSAIC_ROWS;
    const pool = this.MOSAIC_POOL;
    return Array.from({ length: total }, (_, i) => ({ img: pool[i % pool.length] }));
  }

  private CHARS_NUM = '0123456789ABCDEF#@!%&';

  ngOnInit() {
    this.stats.forEach((stat, i) => {
      setTimeout(() => this.scrambleNumber(stat), 1000 + i * 350);
    });
  }

  private scrambleNumber(stat: { value: string; display: string }) {
    const target   = stat.value;
    const duration = 1200;
    const start    = Date.now();

    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * target.length);
      let result = '';
      for (let i = 0; i < target.length; i++) {
        result += i < revealed
          ? target[i]
          : this.CHARS_NUM[Math.floor(Math.random() * this.CHARS_NUM.length)];
      }
      stat.display = result;
      if (progress < 1) requestAnimationFrame(tick);
      else stat.display = target;
    };

    requestAnimationFrame(tick);
  }
}
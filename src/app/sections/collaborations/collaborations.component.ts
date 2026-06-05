import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaborations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="collaborations">

      <!-- Fondo sutil -->
      <div class="bg-accent" aria-hidden="true"></div>

      <div class="container">
        <div class="section-head">
          <div class="section-tag">Con quiénes trabajamos</div>
          <h2 class="section-title">COLABORACIONES</h2>
        </div>

        <!-- NUEVO: bloque de stats de colaboraciones -->
        <div class="collab-stats">
          <div class="cs-item">
            <span class="cs-num">30+</span>
            <span class="cs-lbl">Marcas y<br>organizaciones</span>
          </div>
          <div class="cs-divider"></div>
          <div class="cs-item">
            <span class="cs-num">7+</span>
            <span class="cs-lbl">Años de<br>trayectoria</span>
          </div>
          <div class="cs-divider"></div>
          <div class="cs-item">
            <span class="cs-num">LATAM</span>
            <span class="cs-lbl">Alcance<br>regional</span>
          </div>
          <div class="cs-desc">
            <p>Marcas líderes del gaming, tecnología y entretenimiento
            confían en CGL Producciones para sus activaciones y eventos.</p>
          </div>
        </div>
      </div>

      <!-- Fila 1 → IZQUIERDA -->
      <div class="marquee-wrapper">
        <div class="marquee-track left">
          <div class="logos-row" *ngFor="let _ of [1,2]" aria-hidden="true">
            <div class="brand-logo" *ngFor="let brand of brands" [title]="brand.name">
              <img *ngIf="brand.logo" [src]="brand.logo" [alt]="brand.name" />
              <span *ngIf="!brand.logo" class="brand-text">{{ brand.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Fila 2 → DERECHA -->
      <div class="marquee-wrapper second">
        <div class="marquee-track right">
          <div class="logos-row" *ngFor="let _ of [1,2]" aria-hidden="true">
            <div class="brand-logo" *ngFor="let brand of brandsAlt" [title]="brand.name">
              <img *ngIf="brand.logo" [src]="brand.logo" [alt]="brand.name" />
              <span *ngIf="!brand.logo" class="brand-text">{{ brand.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- NUEVO: tagline inferior -->
      <div class="container">
        <div class="collab-footer">
          <div class="cf-line"></div>
          <span class="cf-text">¿Tu marca quiere ser parte?</span>
          <a href="#contact" class="cf-cta">Conversemos →</a>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .section {
      background: var(--bg);
      padding: 100px 0;
      overflow: hidden;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, var(--neon), transparent);
        opacity: 0.25;
      }
    }

    .bg-accent {
      position: absolute;
      bottom: 0; left: 50%; transform: translateX(-50%);
      width: 800px; height: 400px;
      background: radial-gradient(ellipse at bottom, rgba(255,0,73,0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      position: relative; z-index: 1;
    }

    .section-head {
      text-align: center;
      margin-bottom: 48px;
      .section-tag { justify-content: center; }
    }

    /* ── Stats de colaboraciones (NUEVO) ── */
    .collab-stats {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 56px;
      padding: 28px 40px;
      background: var(--bg2);
      border: 1px solid var(--border);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
      flex-wrap: wrap;
      gap: 0;

      /* Línea de acento superior */
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0; left: 40px; right: 40px;
        height: 1px;
        background: linear-gradient(to right, var(--neon), transparent);
        opacity: 0.5;
      }
    }

    .cs-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 36px 0 0;

      .cs-num {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2.4rem;
        font-weight: 900;
        color: var(--neon);
        line-height: 1;
        letter-spacing: -0.02em;
        text-shadow: 0 0 20px rgba(255,0,73,0.3);
      }
      .cs-lbl {
        font-family: 'DM Mono', monospace;
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--muted);
        line-height: 1.5;
      }
    }

    .cs-divider {
      width: 1px;
      height: 44px;
      background: var(--border);
      margin: 0 36px 0 0;
      flex-shrink: 0;
    }

    .cs-desc {
      margin-left: auto;
      max-width: 300px;

      p {
        font-size: 0.88rem;
        line-height: 1.65;
        color: var(--muted);
      }

      @media (max-width: 900px) {
        margin-left: 0;
        width: 100%;
        margin-top: 20px;
        max-width: 100%;
        padding-top: 16px;
        border-top: 1px solid var(--border);
      }
    }

    /* ── Marquee ── */
    .marquee-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;

      &.second { margin-top: 16px; }

      &::before, &::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 200px;
        z-index: 2;
        pointer-events: none;
      }
      &::before {
        left: 0;
        background: linear-gradient(to right, var(--bg), transparent);
      }
      &::after {
        right: 0;
        background: linear-gradient(to left, var(--bg), transparent);
      }
    }

    .marquee-track {
      display: flex;
      width: max-content;

      &.left  { animation: marquee-left  30s linear infinite; }
      &.right { animation: marquee-right 30s linear infinite; }

      &:hover { animation-play-state: paused; }
    }

    .logos-row {
      display: flex;
      align-items: center;
      gap: 48px;
      padding: 0 24px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 72px;
      opacity: 0.4;
      transition: opacity 0.35s;
      flex-shrink: 0;
      cursor: default;

      &:hover { opacity: 1; }

      img {
        max-height: 56px;
        max-width: 180px;
        object-fit: contain;
        filter: grayscale(100%) brightness(1.6);
        transition: filter 0.35s, transform 0.35s;

        &:hover {
          filter: none;
          transform: scale(1.05);
        }
      }
    }

    .brand-text {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text);
      white-space: nowrap;
    }

    /* ── Footer tagline (NUEVO) ── */
    .collab-footer {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 52px;
      flex-wrap: wrap;

      .cf-line {
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, var(--border), transparent);
        min-width: 40px;
      }

      .cf-text {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--muted);
        white-space: nowrap;
      }

      .cf-cta {
        font-family: 'Barlow Condensed', sans-serif;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--neon);
        text-decoration: none;
        border: 1px solid rgba(255,0,73,0.3);
        padding: 8px 20px;
        clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        transition: background 0.2s, color 0.2s;
        white-space: nowrap;

        &:hover {
          background: var(--neon);
          color: #0a0a0b;
        }
      }
    }

    @keyframes marquee-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    @keyframes marquee-right {
      from { transform: translateX(-50%); }
      to   { transform: translateX(0); }
    }

    @media (max-width: 768px) {
      .collab-stats { padding: 20px 20px; }
      .cs-item { padding-right: 20px; }
      .cs-divider { margin: 0 20px 0 0; }
    }
  `]
})
export class CollaborationsComponent {

  brands: { name: string; logo?: string }[] = [
    { name: 'BeFun',                     logo: 'assets/brands/befun.png' },
    { name: 'Cooler Master',             logo: 'assets/brands/coolermaster.png' },
    { name: 'XBOX',                      logo: 'assets/brands/xbox.png' },
    { name: 'Banco de Chile',            logo: 'assets/brands/bdechile.png' },
    { name: 'Festigame',                 logo: 'assets/brands/festigame.png' },
    { name: 'Universidad Andres Bello',  logo: 'assets/brands/unab.png' },
    { name: 'Universidad Gabriela Mistral', logo: 'assets/brands/ugm.png' },
    { name: 'ComicCon',                  logo: 'assets/brands/comiccon.webp' },
    { name: 'Red Bull',              logo: 'assets/brands/redbull.png' },
    
  ];

  brandsAlt: { name: string; logo?: string }[] = [
    { name: 'Mega',             logo: 'assets/brands/mega.png' },
    { name: '13 Esports',       logo: 'assets/brands/13s.webp' },
    { name: 'ETC',              logo: 'assets/brands/etc.png' },
    { name: 'Twitch',           logo: 'assets/brands/twitch.png' },
    { name: 'Gamersclub',       logo: 'assets/brands/gamersclub.png' },
    { name: 'Pegasum',          logo: 'assets/brands/pegasum.png' },
    { name: 'SocialBuyers',     logo: 'assets/brands/sb.png' },
    { name: 'Wacom',            logo: 'assets/brands/wacom.png' },
    { name: 'Republic of Gamers', logo: 'assets/brands/rog.png' },
    { name: 'Thermaltake',      logo: 'assets/brands/tt.png' },
  ];
}
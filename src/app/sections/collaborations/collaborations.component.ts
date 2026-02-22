import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaborations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="collaborations">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">Con quiénes trabajamos</div>
          <h2 class="section-title">COLABORACIONES</h2>
          <p class="section-sub">Marcas y organizaciones que confían en CGL Producciones.</p>
        </div>
      </div>

      <!-- Marquee track -->
      <div class="marquee-wrapper">
        <div class="marquee-track">
          <div class="logos-row">
            <div class="brand-logo" *ngFor="let brand of brands">
              <img *ngIf="brand.logo" [src]="brand.logo" [alt]="brand.name" />
              <span *ngIf="!brand.logo" class="brand-text">{{ brand.name }}</span>
            </div>
          </div>
          <!-- Duplicado para loop infinito -->
          <div class="logos-row" aria-hidden="true">
            <div class="brand-logo" *ngFor="let brand of brands">
              <img *ngIf="brand.logo" [src]="brand.logo" [alt]="brand.name" />
              <span *ngIf="!brand.logo" class="brand-text">{{ brand.name }}</span>
            </div>
          </div>
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
        opacity: 0.3;
      }
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .section-head {
      text-align: center;
      margin-bottom: 64px;

      .section-tag { justify-content: center; }

      .section-sub {
        margin-top: 16px;
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.6;
      }
    }

    /* ──────────── Marquee ──────────── */
    .marquee-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;

      /* Fade edges */
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 180px;
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
      animation: marquee 30s linear infinite;

      &:hover { animation-play-state: paused; }
    }

    .logos-row {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 48px;
      height: 80px;
      border-right: 1px solid var(--border);
      filter: grayscale(1) brightness(0.6);
      transition: filter 0.3s, transform 0.3s;
      cursor: default;
      flex-shrink: 0;

      &:hover {
        filter: grayscale(0) brightness(1);
        transform: scale(1.08);
      }

      img {
        max-height: 40px;
        max-width: 120px;
        width: auto;
        object-fit: contain;
        display: block;
      }

      .brand-text {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
        white-space: nowrap;
        transition: color 0.3s;
      }

      &:hover .brand-text {
        color: var(--text);
      }
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    @media (max-width: 768px) {
      .brand-logo {
        padding: 0 32px;
        img { max-height: 32px; max-width: 90px; }
        .brand-text { font-size: 1.1rem; }
      }

      .marquee-wrapper::before,
      .marquee-wrapper::after { width: 80px; }
    }
  `]
})
export class CollaborationsComponent {

  // ── Edita este array con tus marcas reales ──
  brands: { name: string; logo?: string }[] = [
    { name: 'BeFun',  logo: 'assets/brands/befun.png' },
    { name: 'Cooler Master',      logo: 'assets/brands/coolermaster.png' },
    { name: 'XBOX',    logo: 'assets/brands/xbox.png' },
    { name: 'Banco de Chile',    logo: 'assets/brands/bdechile.png' },
    { name: 'Festigame',      logo: 'assets/brands/festigame.png' },
    { name: 'Universidad Andres Bello',       logo: 'assets/brands/unab.png' },
    { name: 'Universidad Gabriela Mistral',       logo: 'assets/brands/ugm.png' },
    { name: 'ComicCon',    logo: 'assets/brands/comiccon.webp' },
    { name: 'Mega',    logo: 'assets/brands/mega.png' },
    { name: '13 Esports',    logo: 'assets/brands/13s.webp' },
    { name: 'ETC',    logo: 'assets/brands/etc.png' },
    { name: 'Twitch',    logo: 'assets/brands/twitch.png' },
    { name: 'Gamersclub',    logo: 'assets/brands/gamersclub.png' },
    { name: 'Pegasum',    logo: 'assets/brands/pegasum.png' },
    { name: 'SocialBuyers',    logo: 'assets/brands/sb.png' },
    { name: 'Wacom',    logo: 'assets/brands/wacom.png' },
    { name: 'Republic of Gamers',    logo: 'assets/brands/rog.png' },
    { name: 'Thermaltake',    logo: 'assets/brands/tt.png' },
    
  ];
}
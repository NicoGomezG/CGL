import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">
      <!-- Grid background -->
      <div class="hero-grid"></div>

      <!-- Scanline effect -->
      <div class="scanline"></div>

      <!-- Glowing orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="container">
        <div class="hero-content">
          <div class="section-tag">Productora de eventos — Soluciones Gamer</div>

          <h1 class="hero-title">
            <span class="line line-1">SOLUCIONES</span>
            <span class="line line-2 accent">GAMER</span>
          </h1>

          <p class="hero-desc">
            CGL Producciones potencia eventos, jugadores y marcas
            en el ecosistema del esports latinoamericano.
          </p>

          <div class="hero-actions">
            <a href="#contact" class="neon-btn-solid">Contáctanos</a>
            <a href="#gallery" class="neon-btn">Ver producciones</a>
          </div>

          <div class="hero-stats">
            <div class="stat" *ngFor="let s of stats">
              <span class="stat-value">{{s.value}}</span>
              <span class="stat-label">{{s.label}}</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="logo-display">
            <!-- Logo real de CGL -->
            <img class="brand-logo-img-real"
                 src="assets/logo.png"
                 alt="CGL Producciones"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"/>

            <!-- Fallback SVG si no carga la imagen -->
            <svg class="brand-diamond" style="display:none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="100" y="10" width="127" height="127" rx="8" transform="rotate(45 100 100)"
                    fill="none" stroke="#FF0049" stroke-width="10" opacity="0.2"/>
              <rect x="100" y="14" width="122" height="122" rx="6" transform="rotate(45 100 100)"
                    fill="none" stroke="#FF0049" stroke-width="9"/>
              <rect x="100" y="37" width="88" height="88" rx="5" transform="rotate(45 100 100)"
                    fill="none" stroke="#FF0049" stroke-width="7"/>
              <rect x="100" y="60" width="56" height="56" rx="4" transform="rotate(45 100 100)"
                    fill="none" stroke="#FF0049" stroke-width="6"/>
              <rect x="100" y="80" width="28" height="28" rx="2" transform="rotate(45 100 100)"
                    fill="#FF0049" opacity="0.9"/>
            </svg>

            <div class="brand-name">
              <span class="brand-cgl">CGL</span>
              <span class="brand-sub">PRODUCCIONES</span>
              <span class="brand-tag-line">SOLUCIONES GAMER</span>
            </div>

            <div class="hex-corner tl"></div>
            <div class="hex-corner tr"></div>
            <div class="hex-corner bl"></div>
            <div class="hex-corner br"></div>
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <span>SCROLL</span>
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding-top: 80px;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('/assets/banner.png') center/cover no-repeat;
        opacity: 0.12;
        z-index: 0;
      }
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,0,73,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,0,73,0.05) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }

    .scanline {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--neon), transparent);
      animation: scanline 6s linear infinite;
      opacity: 0.3;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    .orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(255,0,73,0.12) 0%, transparent 70%);
      top: -100px; left: -100px;
    }

    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255,0,73,0.08) 0%, transparent 70%);
      bottom: -50px; right: -50px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
      width: 100%;
    }

    .section-tag {
      animation: fadeUp 0.6s ease 0.2s both;
    }

    .hero-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: clamp(3.5rem, 7vw, 6.5rem);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      margin-bottom: 24px;

      .line { display: block; }
      .line-1 { animation: fadeUp 0.6s ease 0.3s both; }
      .line-2 {
        color: var(--neon);
        text-shadow: 0 0 40px rgba(255,0,73,0.5);
        animation: fadeUp 0.6s ease 0.4s both;
      }
      .line-3 {
        -webkit-text-stroke: 1px rgba(232,234,240,0.4);
        color: transparent;
        animation: fadeUp 0.6s ease 0.5s both;
      }
    }

    .hero-desc {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--muted);
      max-width: 420px;
      margin-bottom: 40px;
      animation: fadeUp 0.6s ease 0.6s both;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 60px;
      animation: fadeUp 0.6s ease 0.7s both;
    }

    .hero-stats {
      display: flex;
      gap: 48px;
      animation: fadeUp 0.6s ease 0.8s both;

      .stat {
        .stat-value {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--neon);
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-transform: uppercase;
          margin-top: 4px;
          display: block;
        }
      }
    }

    .logo-display {
      position: relative;
      max-width: 420px;
      margin: 0 auto;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      animation: fadeUp 0.8s ease 0.4s both;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle, rgba(255,0,73,0.1) 0%, transparent 70%);
        border-radius: 50%;
        animation: pulse-neon 3s ease infinite;
      }
    }

    .brand-diamond {
      width: 180px;
      height: 180px;
      margin-bottom: 24px;
      filter: drop-shadow(0 0 24px rgba(255, 0, 73, 0.6));
      animation: fadeUp 0.8s ease 0.5s both;
    }

    /* Use actual logo PNG if available */
    .brand-logo-img-real {
      max-width: 200px;
      margin-bottom: 28px;
      filter: drop-shadow(0 0 20px rgba(255,0,73,0.5));
      animation: fadeUp 0.8s ease 0.5s both;
    }

    .brand-name {
      text-align: center;
      animation: fadeUp 0.6s ease 0.7s both;

      .brand-cgl {
        display: block;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 4rem;
        font-weight: 900;
        letter-spacing: -0.02em;
        color: var(--neon);
        line-height: 1;
        text-shadow: 0 0 30px rgba(255,0,73,0.5);
      }

      .brand-sub {
        display: block;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: var(--text);
        text-transform: uppercase;
        margin-top: 4px;
      }

      .brand-tag-line {
        display: block;
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.3em;
        color: var(--muted);
        text-transform: uppercase;
        margin-top: 8px;
        border-top: 1px solid rgba(255,0,73,0.3);
        padding-top: 8px;
      }
    }

    .hex-corner {
      position: absolute;
      width: 24px; height: 24px;
      border-color: rgba(255,0,73,0.4);
      border-style: solid;

      &.tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
      &.tr { top: 16px; right: 16px; border-width: 2px 2px 0 0; }
      &.bl { bottom: 16px; left: 16px; border-width: 0 0 2px 2px; }
      &.br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }
    }

    .scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.3em;
      color: var(--muted);

      .scroll-line {
        width: 1px;
        height: 40px;
        background: linear-gradient(to bottom, var(--neon), transparent);
        animation: scanline 1.5s ease infinite;
      }
    }

    @media (max-width: 900px) {
      .container {
        grid-template-columns: 1fr;
        gap: 48px;
        text-align: center;
      }
      .section-tag { justify-content: center; }
      .hero-desc { margin: 0 auto 40px; }
      .hero-actions { justify-content: center; }
      .hero-stats { justify-content: center; }
      .hero-visual { order: -1; }
      .hex-frame { max-width: 300px; }
    }
  `]
})
export class HeroComponent {
  stats = [
    { value: '50+', label: 'Competencias' },
    { value: '120+', label: 'Eventos' },
    { value: '3M+', label: 'Alcance' },
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="services">

      <!-- Fondo geométrico moderno -->
      <div class="bg-geo" aria-hidden="true">
        <div class="geo-line geo-h1"></div>
        <div class="geo-line geo-h2"></div>
        <div class="geo-line geo-v1"></div>
        <div class="geo-corner geo-tl"></div>
        <div class="geo-corner geo-br"></div>
        <div class="geo-dot" *ngFor="let d of geoDots" [style.left]="d.x" [style.top]="d.y"></div>
      </div>

      <div class="container">
        <div class="section-head">
          <div class="section-tag">Qué hacemos</div>
          <h2 class="section-title">NUESTRAS <span>SOLUCIONES</span></h2>
          <p class="section-sub">Producción y gestión integral para el ecosistema gamer latinoamericano.</p>
        </div>

        <div class="services-grid">
          <div
            class="service-card"
            *ngFor="let s of services; let i = index"
            [style.--i]="i"
            [class.is-open]="activeIndex === i"
            (mouseenter)="activeIndex = i"
            (mouseleave)="activeIndex = 0"
          >
            <div class="card-closed">
              <span class="card-icon">{{ s.icon }}</span>
              <div class="card-index">{{ (i + 1).toString().padStart(2, '0') }}</div>
            </div>
            <div class="card-open">
              <span class="card-icon-sm">{{ s.icon }}</span>
              <div class="card-num">{{ (i + 1).toString().padStart(2, '0') }}</div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
              <div class="card-corner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      background: var(--bg);
      position: relative;
      overflow: hidden;
    }

    /* ── Fondo geométrico (reemplaza el "CGL" fantasma) ── */
    .bg-geo {
      position: absolute; inset: 0;
      pointer-events: none; z-index: 0;
    }

    .geo-line {
      position: absolute;
      background: rgba(255,0,73,0.04);
    }
    .geo-h1 {
      left: 0; right: 0; top: 35%;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,0,73,0.08) 30%, rgba(255,0,73,0.08) 70%, transparent);
    }
    .geo-h2 {
      left: 0; right: 0; top: 70%;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,0,73,0.04) 50%, transparent);
    }
    .geo-v1 {
      top: 0; bottom: 0; left: 50%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(255,0,73,0.05) 30%, rgba(255,0,73,0.05) 70%, transparent);
    }

    .geo-corner {
      position: absolute;
      width: 60px; height: 60px;
      border-color: rgba(255,0,73,0.12);
      border-style: solid;
    }
    .geo-tl {
      top: 80px; left: 40px;
      border-width: 1px 0 0 1px;
    }
    .geo-br {
      bottom: 80px; right: 40px;
      border-width: 0 1px 1px 0;
    }

    .geo-dot {
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,0,73,0.2);
      transform: translate(-50%, -50%);
    }

    /* ─────────────────────────────────────── */
    .container { position: relative; z-index: 1; }

    .section-head {
      text-align: center;
      margin-bottom: 72px;

      .section-tag { justify-content: center; }
      .section-sub {
        margin-top: 20px;
        color: var(--muted);
        font-size: 1rem;
        max-width: 500px;
        margin-left: auto; margin-right: auto;
        line-height: 1.6;
      }
    }

    /* ── Grid ── */
    .services-grid {
      display: flex;
      gap: 3px;
      height: 420px;
    }

    /* ── Card base ── */
    .service-card {
      position: relative;
      flex: 0 0 72px;
      height: 100%;
      overflow: hidden;
      background: var(--bg2);
      border: 1px solid var(--border);
      cursor: pointer;
      transition:
        flex 0.55s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.3s;
      animation: fadeUp 0.6s ease calc(var(--i) * 0.1s + 0.2s) both;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 2px;
        background: var(--neon);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
      }

      &.is-open {
        flex: 0 0 320px;
        border-color: rgba(255,0,73,0.35);

        &::before { transform: scaleX(1); }
        .card-closed { opacity: 0; transform: scale(0.8); }
        .card-open   { opacity: 1; transform: translateX(0); pointer-events: all; }
      }
    }

    /* ── Estado cerrado ── */
    .card-closed {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      transition: opacity 0.25s, transform 0.25s;

      .card-icon {
        font-size: 2rem;
        display: block;
        filter: grayscale(30%);
      }

      .card-index {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: var(--muted);
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
      }
    }

    /* ── Estado abierto ── */
    .card-open {
      position: absolute;
      inset: 0;
      padding: 32px 28px 28px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.35s 0.15s, transform 0.35s 0.15s;
      pointer-events: none;
      /* Gradiente diagonal más rico */
      background:
        linear-gradient(135deg, rgba(255,0,73,0.08) 0%, transparent 40%),
        linear-gradient(160deg, var(--bg3) 0%, var(--bg2) 100%);
      min-width: 280px;

      .card-icon-sm {
        font-size: 2.2rem;
        display: block;
        margin-bottom: auto;
        padding-top: 4px;
      }

      .card-num {
        font-family: 'DM Mono', monospace;
        font-size: 9px;
        letter-spacing: 0.25em;
        color: rgba(255,0,73,0.4);
        margin-bottom: 6px;
        margin-top: 20px;
      }

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text);
        margin-bottom: 10px;
        line-height: 1.1;
      }

      p {
        font-size: 0.88rem;
        line-height: 1.65;
        color: var(--muted);
      }

      .card-corner {
        position: absolute;
        bottom: 0; right: 0;
        width: 0; height: 0;
        border-left: 20px solid transparent;
        border-bottom: 20px solid rgba(255,0,73,0.25);
      }
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .services-grid {
        flex-direction: column;
        height: auto;
      }

      .service-card {
        flex: 0 0 64px !important;

        &.is-open {
          flex: 0 0 220px !important;
          .card-closed { opacity: 0; }
          .card-open { opacity: 1; transform: none; }
        }

        .card-closed .card-index {
          writing-mode: horizontal-tb;
          transform: none;
        }
      }

      .card-open { min-width: unset; }
    }

    @media (max-width: 480px) {
      .service-card.is-open { flex: 0 0 200px !important; }
      .card-open {
        padding: 24px 20px 20px;
        h3 { font-size: 1.3rem; }
        p { font-size: 0.82rem; }
      }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ServicesComponent {
  activeIndex = 0;

  // Puntos de intersección de la grilla decorativa
  geoDots = [
    { x: '50%', y: '35%' },
    { x: '50%', y: '70%' },
    { x: '25%', y: '35%' },
    { x: '75%', y: '35%' },
    { x: '25%', y: '70%' },
    { x: '75%', y: '70%' },
  ];

  services = [
    {
      icon: '🏆',
      title: 'Organización de Competencias',
      desc: 'Organizamos y producimos torneos esports de alta competencia para marcas y comunidades.'
    },
    {
      icon: '📣',
      title: 'Servicios de Streaming',
      desc: 'Producción de transmisiones en vivo con calidad profesional para eventos y contenido.'
    },
    {
      icon: '🎮',
      title: 'Activaciones Gamer',
      desc: 'Creamos experiencias interactivas y memorables para eventos, lanzamientos y campañas de marca.'
    },
    {
      icon: '📡',
      title: 'Conexión y distribución de redes',
      desc: 'Gestionamos infraestructura y uso eficiente de redes para eventos y recintos.'
    },
    {
      icon: '💻',
      title: 'Armado de Setups',
      desc: 'Ensamblamos y configuramos equipos gaming de alto rendimiento para competencias y streamers.'
    },
  ];
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="services">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">Qué hacemos</div>
          <h2 class="section-title">NUESTRAS <span>SOLUCIONES</span></h2>
          <p class="section-sub">Producción y gestión integral para el ecosistema gamer latinoamericano.</p>
        </div>

        <div class="services-grid">
          <div class="service-card" *ngFor="let s of services; let i = index" [style.--i]="i">
            <div class="card-closed">
              <span class="card-icon">{{ s.icon }}</span>
              <div class="card-index">{{ (i + 1).toString().padStart(2, '0') }}</div>
            </div>
            <div class="card-open">
              <span class="card-icon-sm">{{ s.icon }}</span>
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
      &::before {
        content: 'CGL';
        position: absolute;
        top: 60px; left: 50%;
        transform: translateX(-50%);
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 20vw; font-weight: 900;
        color: rgba(255,0,73,0.03);
        white-space: nowrap;
        pointer-events: none; z-index: 0;
      }
    }

    .section-head {
      text-align: center;
      margin-bottom: 72px;
      position: relative; z-index: 1;
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
      position: relative; z-index: 1;
    }

    /* ── Card base ── */
    .service-card {
      position: relative;
      flex: 0 0 72px;         /* colapsada */
      height: 100%;
      overflow: hidden;
      background: var(--bg2);
      border: 1px solid var(--border);
      cursor: pointer;
      transition:
        flex 0.55s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.3s;
      animation: fadeUp 0.6s ease calc(var(--i) * 0.1s + 0.2s) both;

      /* Línea neon arriba al hover */
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

      &:hover {
        flex: 0 0 320px;       /* expandida */
        border-color: rgba(255,0,73,0.35);
        &::before { transform: scaleX(1); }
        .card-closed { opacity: 0; transform: scale(0.8); }
        .card-open   { opacity: 1; transform: translateX(0); pointer-events: all; }
      }
    }

    /* ── Estado cerrado: solo emoji ── */
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
        transition: filter 0.3s;
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

    /* ── Estado abierto: contenido ── */
    .card-open {
      position: absolute;
      inset: 0;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.35s 0.15s, transform 0.35s 0.15s;
      pointer-events: none;
      background: linear-gradient(160deg, var(--bg3) 0%, var(--bg2) 100%);
      min-width: 280px;

      .card-icon-sm {
        font-size: 2.2rem;
        display: block;
        margin-bottom: auto;
        padding-top: 4px;
      }

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text);
        margin-bottom: 10px;
        margin-top: 24px;
      }

      p {
        font-size: 0.9rem;
        line-height: 1.65;
        color: var(--muted);
      }

      .card-corner {
        position: absolute;
        bottom: 0; right: 0;
        width: 48px; height: 48px;
        border-top: 1px solid var(--border);
        border-left: 1px solid var(--border);
        clip-path: polygon(0 0, 100% 0, 0 100%);
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

        &:hover {
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
  `]
})
export class ServicesComponent {
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
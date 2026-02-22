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
          <div class="service-card" *ngFor="let s of services; let i = index"
               [style.--i]="i">
            <div class="card-index">
              <span>{{ (i + 1).toString().padStart(2, '0') }}</span>
            </div>
            <div class="card-icon">{{ s.icon }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <div class="card-line"></div>
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
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 20vw;
        font-weight: 900;
        color: rgba(255,0,73,0.03);
        white-space: nowrap;
        pointer-events: none;
        z-index: 0;
      }
    }

    .section-head {
      text-align: center;
      margin-bottom: 72px;
      position: relative;
      z-index: 1;

      .section-tag { justify-content: center; }

      .section-sub {
        margin-top: 20px;
        color: var(--muted);
        font-size: 1rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2px;
      position: relative;
      z-index: 1;
    }

    .service-card {
      background: var(--bg2);
      padding: 40px 36px;
      position: relative;
      overflow: hidden;
      transition: background 0.3s;
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
      }

      &:hover {
        background: var(--bg3);
        &::before { transform: scaleX(1); }
        .card-index span { color: var(--neon); }
      }

      .card-index {
        margin-bottom: 24px;
        span {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--muted);
          transition: color 0.3s;
        }
      }

      .card-icon {
        font-size: 2.5rem;
        margin-bottom: 20px;
        display: block;
      }

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
        color: var(--text);
      }

      p {
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--muted);
      }

      .card-line {
        position: absolute;
        bottom: 0; right: 0;
        width: 60px; height: 60px;
        border-top: 1px solid var(--border);
        border-left: 1px solid var(--border);
        clip-path: polygon(0 0, 100% 0, 0 100%);
      }
    }

    @media (max-width: 768px) {
      .services-grid { grid-template-columns: 1fr; gap: 2px; }
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      icon: '🏆',
      title: 'Organización de Competencias',
      desc: 'Organizamos y producimos torneos.'
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
      desc: 'Gestionamos uso eficiente de redes.'
    },
    {
      icon: '💻',
      title: 'Armado de computadoras y setups',
      desc: 'Identificamos talento emergente y oportunidades de crecimiento con datos y performance analytics.'
    },
  ];
}

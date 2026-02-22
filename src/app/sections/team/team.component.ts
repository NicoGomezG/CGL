import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="team">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">Los mejores</div>
          <h2 class="section-title">NUESTRO <span>TEAM</span></h2>
          <p class="section-sub">Profesionales con años de experiencia en el mundo del esports y el entretenimiento digital.</p>
        </div>

        <div class="magazine-grid">
          <!-- Card destacada (grande) -->
          <div class="photo-card featured" [style.--i]="0">
            <div class="card-img">
              <img [src]="members[0].photo" [alt]="members[0].role"
                   onerror="this.style.display='none'; this.parentElement.classList.add('no-photo')"/>
              <div class="overlay"></div>
            </div>
            <div class="card-info">
              <span class="card-title">{{ members[0].role }}</span>
            </div>
          </div>

          <!-- Cards secundarias -->
          <div class="side-cards">
            <div class="photo-card" *ngFor="let m of members.slice(1); let i = index" [style.--i]="i + 1">
              <div class="card-img">
                <img [src]="m.photo" [alt]="m.role"
                     onerror="this.style.display='none'; this.parentElement.classList.add('no-photo')"/>
                <div class="overlay"></div>
              </div>
              <div class="card-info">
                <span class="card-title">{{ m.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { background: var(--bg); }

    .section-head {
      margin-bottom: 56px;
      .section-sub {
        margin-top: 16px;
        color: var(--muted);
        font-size: 1rem;
        max-width: 500px;
        line-height: 1.6;
      }
    }

    /* ── Magazine layout ── */
    .magazine-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: start;
    }

    .side-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    /* ── Card base ── */
    .photo-card {
      position: relative;
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
      animation: fadeUp 0.6s ease calc(var(--i) * 0.12s + 0.2s) both;
      cursor: pointer;

      .card-img {
        width: 100%;
        aspect-ratio: 3/4;
        background: var(--bg3);
        position: relative;
        overflow: hidden;

        img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(20%);
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.4s;
          display: block;
        }

        &.no-photo::after {
          content: '👤';
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 4rem; opacity: 0.3;
        }
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%);
        transition: opacity 0.3s;
      }

      .card-info {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        padding: 20px 18px 18px;

        .card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text);
          display: block;

          &::before {
            content: '';
            display: block;
            width: 24px; height: 2px;
            background: var(--neon);
            margin-bottom: 8px;
          }
        }
      }

      &:hover {
        .card-img img { transform: scale(1.06); filter: grayscale(0%); }
        .overlay { opacity: 0.85; }
      }
    }

    /* Carta featured más alta */
    .photo-card.featured .card-img {
      aspect-ratio: 2/3;
    }

    @media (max-width: 768px) {
      .magazine-grid { grid-template-columns: 1fr; }
      .side-cards { grid-template-columns: repeat(3, 1fr); }
    }

    @media (max-width: 480px) {
      .side-cards { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class TeamComponent {
  members = [
    {
      role: 'CEO & Founder',
      photo: 'assets/team/alex.jpg',
    },
    {
      role: 'Designer',
      photo: 'assets/team/sofia.jpg',
    },
    {
      role: 'Talent Manager',
      photo: 'assets/team/mateo.jpg',
    },
    {
      role: 'Content Lead',
      photo: 'assets/team/valeria.jpg',
    }
  ];
}
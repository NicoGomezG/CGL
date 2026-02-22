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

        <div class="team-grid">
          <div class="member-card" *ngFor="let m of members; let i = index" [style.--i]="i">
            <div class="member-photo">
              <img [src]="m.photo" [alt]="m.name"
                   onerror="this.style.display='none'; this.parentElement.classList.add('no-photo')"/>
              <div class="member-social">
                <a *ngFor="let s of m.socials" [href]="s.url" target="_blank">{{ s.icon }}</a>
              </div>
            </div>
            <div class="member-info">
              <div class="member-role">{{ m.role }}</div>
              <h3>{{ m.name }}</h3>
              <p>{{ m.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      background: var(--bg);
    }

    .section-head {
      margin-bottom: 64px;
      .section-tag { }
      .section-sub {
        margin-top: 20px;
        color: var(--muted);
        font-size: 1rem;
        max-width: 500px;
        line-height: 1.6;
      }
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }

    .member-card {
      animation: fadeUp 0.6s ease calc(var(--i) * 0.12s + 0.2s) both;

      .member-photo {
        position: relative;
        aspect-ratio: 3/4;
        overflow: hidden;
        background: var(--bg3);
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%);
        margin-bottom: 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          display: block;
          filter: grayscale(30%);
        }

        &.no-photo::after {
          content: '👤';
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          opacity: 0.3;
        }

        .member-social {
          position: absolute;
          bottom: -60px;
          left: 0; right: 0;
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(to top, rgba(6,6,8,0.95), transparent);
          transition: bottom 0.3s;

          a {
            width: 36px; height: 36px;
            background: rgba(0,255,136,0.1);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            text-decoration: none;
            color: var(--text);
            transition: background 0.2s, border-color 0.2s;
            &:hover { background: var(--neon); border-color: var(--neon); }
          }
        }

        &:hover {
          img { transform: scale(1.06); filter: grayscale(0%); }
          .member-social { bottom: 0; }
        }
      }

      .member-role {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: var(--neon);
        margin-bottom: 6px;
      }

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text);
        margin-bottom: 8px;
        letter-spacing: 0.02em;
      }

      p {
        font-size: 0.9rem;
        color: var(--muted);
        line-height: 1.6;
      }
    }

    @media (max-width: 600px) {
      .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    }
  `]
})
export class TeamComponent {
  // ─── REEMPLAZA con tu equipo real ─────────────────────────────────────────
  members = [
    {
      name: 'Alex Reyes',
      role: 'CEO & Founder',
      bio: '8 años de experiencia en la industria del esports latinoamericano.',
      photo: 'assets/team/alex.jpg',
      socials: [
        { icon: '𝕏', url: '#' },
        { icon: 'in', url: '#' }
      ]
    },
    {
      name: 'Sofia Mora',
      role: 'Brand Director',
      bio: 'Experta en identidad de marca para atletas digitales y equipos.',
      photo: 'assets/team/sofia.jpg',
      socials: [{ icon: '𝕏', url: '#' }, { icon: '📸', url: '#' }]
    },
    {
      name: 'Mateo Cruz',
      role: 'Talent Manager',
      bio: 'Scout profesional con red de contactos en los principales títulos.',
      photo: 'assets/team/mateo.jpg',
      socials: [{ icon: '𝕏', url: '#' }, { icon: 'in', url: '#' }]
    },
    {
      name: 'Valeria Kim',
      role: 'Content Lead',
      bio: 'Productora de contenido especializada en narrativas de competencia.',
      photo: 'assets/team/valeria.jpg',
      socials: [{ icon: '𝕏', url: '#' }, { icon: '📸', url: '#' }]
    }
  ];
}

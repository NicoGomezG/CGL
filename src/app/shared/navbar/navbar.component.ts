import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled">
      <div class="nav-inner">
        <a href="#" class="nav-logo">
          <svg class="nav-icon" width="32" height="32" viewBox="0 0 100 100" fill="none">
            <rect x="50" y="5" width="64" height="64" rx="4" transform="rotate(45 50 50)" fill="none" stroke="#FF0049" stroke-width="7"/>
            <rect x="50" y="18" width="44" height="44" rx="3" transform="rotate(45 50 50)" fill="none" stroke="#FF0049" stroke-width="5"/>
            <rect x="50" y="31" width="24" height="24" rx="2" transform="rotate(45 50 50)" fill="none" stroke="#FF0049" stroke-width="4"/>
          </svg>
          <span>CGL<em>.</em></span>
        </a>

        <div class="nav-links" [class.open]="menuOpen">
          <a href="#services" (click)="menuOpen=false">Servicios</a>
          <a href="#gallery" (click)="menuOpen=false">Galería</a>
          <a href="#team" (click)="menuOpen=false">Team</a>
          <a href="#contact" class="neon-btn" (click)="menuOpen=false">Contacto</a>
        </div>

        <button class="hamburger" (click)="menuOpen = !menuOpen" [class.open]="menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 20px 0;
      transition: background 0.3s, padding 0.3s, backdrop-filter 0.3s;

      &.scrolled {
        background: rgba(6, 6, 8, 0.92);
        backdrop-filter: blur(20px);
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
    }

    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;

      .nav-icon { flex-shrink: 0; }

      span {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: -0.03em;
        color: var(--text);
        em { color: var(--neon); font-style: normal; }
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;

      a {
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--muted);
        text-decoration: none;
        transition: color 0.2s;
        &:hover { color: var(--text); }
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--text);
        transition: all 0.3s;
      }

      &.open {
        span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      }
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        position: fixed;
        top: 0; right: -100%;
        height: 100vh;
        width: 280px;
        background: var(--bg2);
        border-left: 1px solid var(--border);
        flex-direction: column;
        justify-content: center;
        padding: 40px;
        gap: 32px;
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &.open { right: 0; }
        a { font-size: 18px; color: var(--text); }
      }
    }
  `]
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 60;
  }
}

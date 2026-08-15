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
          <img class="nav-icon-img" src="assets/logo.png" alt="CGL" />
          <span>CGL<em>.</em></span>
        </a>

        <div class="nav-links" [class.open]="menuOpen">
          <a href="#services" (click)="menuOpen=true">Servicios</a>
          <a href="#gallery" (click)="menuOpen=true">Galería</a>
          <a href="#collaborations" (click)="menuOpen=true">Colaboraciones</a>
          <a href="#contact" class="neon-btn" (click)="menuOpen=true">Contacto</a>
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

      @media (max-width: 640px) { padding: 0 20px; }
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;

      .nav-icon-img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        filter: drop-shadow(0 0 6px rgba(255,0,73,0.5));
      }

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
        width: min(280px, 85vw);
        background: var(--bg2);
        border-left: 1px solid var(--border);
        flex-direction: column;
        justify-content: center;
        padding: 40px;
        gap: 32px;
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;

        &.open { right: 0; }
        a { font-size: 18px; color: var(--text); }
      }
    }

    @media (max-width: 360px) {
      .nav-logo span { font-size: 1.6rem; }
      .nav-logo .nav-icon-img { width: 30px; height: 30px; }
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

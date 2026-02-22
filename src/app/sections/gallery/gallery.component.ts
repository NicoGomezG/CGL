import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumb: string;
  title: string;
  tag: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="gallery">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">Nuestro trabajo</div>
          <h2 class="section-title">GALERÍA <span>MEDIA</span></h2>
        </div>

        <!-- Filters -->
        <div class="filters">
          <button *ngFor="let f of filters"
                  [class.active]="activeFilter() === f"
                  (click)="setFilter(f)">{{ f }}</button>
        </div>

        <!-- Grid -->
        <div class="gallery-grid">
          <div class="gallery-item"
               *ngFor="let item of filteredItems(); let i = index"
               [class.wide]="i === 0 || i === 5"
               (click)="openLightbox(item)">

            <!-- Video badge -->
            <div class="video-badge" *ngIf="item.type === 'video'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>

            <!-- Thumb / placeholder -->
            <div class="item-thumb" [style.backgroundImage]="'url(' + item.thumb + ')'">
              <div class="fallback-thumb" *ngIf="!item.thumb">
                <span>{{ item.type === 'video' ? '▶' : '🖼' }}</span>
              </div>
            </div>

            <div class="item-overlay">
              <div class="item-tag">{{ item.tag }}</div>
              <h4>{{ item.title }}</h4>
              <div class="item-icon">
                <svg *ngIf="item.type === 'video'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg *ngIf="item.type === 'image'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div class="lightbox" [class.active]="lightboxItem()" (click)="closeLightbox()">
        <button class="lb-close" (click)="closeLightbox()">✕</button>

        <div class="lb-content" (click)="$event.stopPropagation()" *ngIf="lightboxItem()">
          <video *ngIf="lightboxItem()?.type === 'video'"
                 [src]="lightboxItem()?.src"
                 controls autoplay
                 style="width:100%; max-height:80vh; border-radius:4px;">
          </video>
          <img *ngIf="lightboxItem()?.type === 'image'"
               [src]="lightboxItem()?.src"
               [alt]="lightboxItem()?.title"
               style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:4px;"
               onerror="this.src=''; this.style.display='none'; this.nextElementSibling.style.display='flex'"/>
          <div class="lb-placeholder" style="display:none">
            <span>Vista previa no disponible</span>
          </div>

          <div class="lb-info">
            <span class="lb-tag">{{ lightboxItem()?.tag }}</span>
            <h3>{{ lightboxItem()?.title }}</h3>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      background: var(--bg2);
    }

    .section-head {
      margin-bottom: 48px;
      .section-tag { }
    }

    .filters {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 40px;

      button {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 8px 20px;
        background: transparent;
        color: var(--muted);
        border: 1px solid rgba(255,255,255,0.1);
        cursor: pointer;
        transition: all 0.2s;
        clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

        &:hover { color: var(--text); border-color: var(--text); }
        &.active {
          background: var(--neon);
          color: var(--bg);
          border-color: var(--neon);
        }
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 240px;
      gap: 4px;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: var(--bg3);

      &.wide {
        grid-column: span 2;
        @media (max-width: 600px) { grid-column: span 1; }
      }

      .item-thumb {
        width: 100%; height: 100%;
        background-size: cover;
        background-position: center;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fallback-thumb {
        width: 100%; height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        opacity: 0.3;
      }

      .video-badge {
        position: absolute;
        top: 12px; left: 12px;
        z-index: 2;
        background: rgba(0,0,0,0.8);
        border: 1px solid rgba(255,255,255,0.2);
        color: var(--neon);
        width: 32px; height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
      }

      .item-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.3) 60%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px;

        .item-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 6px;
        }

        h4 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text);
        }

        .item-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          color: var(--neon);
          transition: transform 0.3s;
          opacity: 0;
        }
      }

      &:hover {
        .item-thumb { transform: scale(1.05); }
        .item-overlay { opacity: 1; }
        .item-icon { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    }

    /* Lightbox */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      padding: 20px;

      &.active {
        opacity: 1;
        pointer-events: all;
      }
    }

    .lb-close {
      position: absolute;
      top: 24px; right: 24px;
      background: none;
      border: 1px solid var(--border);
      color: var(--text);
      font-size: 18px;
      width: 44px; height: 44px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      &:hover { background: var(--neon); color: var(--bg); border-color: var(--neon); }
    }

    .lb-content {
      max-width: 900px;
      width: 100%;
    }

    .lb-placeholder {
      width: 100%;
      height: 400px;
      background: var(--bg3);
      align-items: center;
      justify-content: center;
      color: var(--muted);
      font-family: 'DM Mono', monospace;
      font-size: 14px;
    }

    .lb-info {
      margin-top: 20px;
      .lb-tag {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--neon);
        display: block;
        margin-bottom: 6px;
      }
      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.8rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text);
      }
    }
  `]
})
export class GalleryComponent {
  // ─── AGREGA TUS MEDIOS AQUÍ ───────────────────────────────────────────────
  // Para usar Firebase Storage o Cloudinary, reemplaza 'src' y 'thumb' con las URLs de tus archivos.
  // Ejemplo Firebase: src: 'https://firebasestorage.googleapis.com/v0/b/TU_BUCKET/...'
  // Ejemplo Cloudinary: src: 'https://res.cloudinary.com/TU_CLOUD/image/upload/...'
  // ─────────────────────────────────────────────────────────────────────────
  allItems: MediaItem[] = [
    { type: 'image', src: 'assets/gallery/img1.jpg', thumb: 'assets/gallery/img1.jpg', title: 'Grand Final LATAM 2024', tag: 'Evento' },
    { type: 'video', src: 'assets/gallery/vid1.mp4', thumb: 'assets/gallery/vid1-thumb.jpg', title: 'Highlights Season 3', tag: 'Video' },
    { type: 'image', src: 'assets/gallery/img2.jpg', thumb: 'assets/gallery/img2.jpg', title: 'Team Photoshoot', tag: 'Branding' },
    { type: 'image', src: 'assets/gallery/img3.jpg', thumb: 'assets/gallery/img3.jpg', title: 'Behind the Scenes', tag: 'Evento' },
    { type: 'video', src: 'assets/gallery/vid2.mp4', thumb: 'assets/gallery/vid2-thumb.jpg', title: 'Player Promo Reel', tag: 'Video' },
    { type: 'image', src: 'assets/gallery/img4.jpg', thumb: 'assets/gallery/img4.jpg', title: 'Championship Trophy', tag: 'Logros' },
    { type: 'image', src: 'assets/gallery/img5.jpg', thumb: 'assets/gallery/img5.jpg', title: 'Setup & Bootcamp', tag: 'Equipo' },
    { type: 'video', src: 'assets/gallery/vid3.mp4', thumb: 'assets/gallery/vid3-thumb.jpg', title: 'Season Recap', tag: 'Video' },
  ];

  filters = ['Todos', 'Evento', 'Video', 'Branding', 'Logros', 'Equipo'];
  activeFilter = signal<string>('Todos');
  lightboxItem = signal<MediaItem | null>(null);

  filteredItems() {
    const f = this.activeFilter();
    if (f === 'Todos') return this.allItems;
    return this.allItems.filter(i => i.tag === f);
  }

  setFilter(f: string) {
    this.activeFilter.set(f);
  }

  openLightbox(item: MediaItem) {
    this.lightboxItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxItem.set(null);
    document.body.style.overflow = '';
  }
}

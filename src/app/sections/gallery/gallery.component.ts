import { Component, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_EVENTS, MediaItem } from './gallery.data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="gallery">
      <div class="container">
        <div class="section-head">
          <div class="section-tag">Nuestro trabajo</div>
          <h2 class="section-title">GALERÍA</h2>
        </div>

        <!-- Filtro de categoría simple -->
        <div class="cat-filters">
          <button [class.active]="activeCategory() === 'all'"     (click)="setCategory('all')">Todo</button>
          <button [class.active]="activeCategory() === 'eventos'" (click)="setCategory('eventos')">Eventos</button>
          <button [class.active]="activeCategory() === 'equipo'"  (click)="setCategory('equipo')">Equipo</button>
        </div>

        <!-- Grilla unificada -->
        <div class="gallery-grid">
          <div class="gallery-item"
               *ngFor="let item of visibleItems(); let i = index"
               [class.wide]="i % 7 === 0"
               (click)="openLightbox(i)">
            <div class="video-badge" *ngIf="item.type === 'video'">▶</div>
            <div class="item-thumb"
                 [style.backgroundImage]="'url(' + (item.thumb || item.src) + ')'">
            </div>
            <div class="item-overlay">
              <div class="overlay-content">
                <span class="overlay-date" *ngIf="item.date">{{ item.date | date:'dd MMM yyyy' }}</span>
                <h4>{{ item.title }}</h4>
                <p class="overlay-desc" *ngIf="item.description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox con slideshow automático -->
      <div class="lightbox" [class.active]="lightboxOpen()" (click)="closeLightbox()">
        <button class="lb-close" (click)="closeLightbox()">✕</button>

        <!-- Controles de navegación -->
        <button class="lb-prev" (click)="navigate(-1); $event.stopPropagation()">‹</button>
        <button class="lb-next" (click)="navigate(1);  $event.stopPropagation()">›</button>

        <div class="lb-content" (click)="$event.stopPropagation()" *ngIf="currentItem()">

          <video *ngIf="currentItem()!.type === 'video'"
                 [src]="currentItem()!.src"
                 controls autoplay
                 style="width:100%; max-height:68vh; border-radius:2px;">
          </video>
          <img *ngIf="currentItem()!.type === 'image'"
               [src]="currentItem()!.src"
               [alt]="currentItem()!.title"
               style="max-width:100%; max-height:68vh; object-fit:contain; display:block; margin:0 auto;"/>

          <div class="lb-info">
            <div class="lb-text">
              <span class="lb-date" *ngIf="currentItem()!.date">
                {{ currentItem()!.date | date:'dd MMM yyyy' }}
              </span>
              <h3>{{ currentItem()!.title }}</h3>
              <p class="lb-desc" *ngIf="currentItem()!.description">
                {{ currentItem()!.description }}
              </p>
            </div>

            <div class="lb-controls">
              <!-- Slideshow toggle -->
              <button class="lb-play" (click)="toggleSlideshow(); $event.stopPropagation()"
                      [class.playing]="slideshowActive()">
                <span *ngIf="!slideshowActive()">▶ Auto</span>
                <span *ngIf="slideshowActive()">⏸ Auto</span>
              </button>

              <!-- Progress bar del timer -->
              <div class="lb-progress" *ngIf="slideshowActive()">
                <div class="lb-progress-fill" [style.animation-duration]="slideshowDelay + 'ms'"></div>
              </div>

              <span class="lb-counter">{{ lightboxIndex() + 1 }} / {{ visibleItems().length }}</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .section { background: var(--bg2); }
    .section-head { margin-bottom: 28px; }

    /* ── Filtros ── */
    .cat-filters {
      display: flex;
      gap: 6px;
      margin-bottom: 32px;

      button {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 6px 16px;
        background: transparent;
        color: var(--muted);
        border: 1px solid rgba(255,255,255,0.08);
        cursor: pointer;
        transition: all 0.2s;
        clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);

        &:hover { color: var(--text); }
        &.active {
          background: rgba(255,0,73,0.12);
          color: var(--neon);
          border-color: var(--neon);
        }
      }
    }

    /* ── Grilla ── */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 200px;
      gap: 4px;

      @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: var(--bg3);

      &.wide {
        grid-column: span 2;
        grid-row: span 2;
        @media (max-width: 600px) { grid-column: span 1; grid-row: span 1; }
      }

      .video-badge {
        position: absolute;
        top: 10px; left: 10px;
        z-index: 2;
        background: rgba(0,0,0,0.75);
        color: var(--neon);
        font-size: 11px;
        width: 28px; height: 28px;
        display: flex; align-items: center; justify-content: center;
        border: 1px solid var(--border);
      }

      .item-thumb {
        width: 100%; height: 100%;
        background-size: cover;
        background-position: center;
        background-color: var(--bg3);
        transition: transform 0.4s ease;
      }

      .item-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(17,18,19,0.95) 0%, rgba(17,18,19,0.2) 60%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: flex-end;
        padding: 14px;

        .overlay-content {
          display: flex;
          flex-direction: column;
          gap: 3px;

          .overlay-date {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--neon);
          }

          h4 {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--text);
            line-height: 1.1;
          }

          .overlay-desc {
            font-size: 0.78rem;
            color: rgba(240,240,242,0.65);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }

      &:hover {
        .item-thumb { transform: scale(1.05); }
        .item-overlay { opacity: 1; }
      }
    }

    /* ── Lightbox ── */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.96);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
      padding: 20px;

      &.active { opacity: 1; pointer-events: all; }
    }

    .lb-close {
      position: absolute;
      top: 20px; right: 20px;
      background: none; border: 1px solid var(--border);
      color: var(--text); font-size: 18px;
      width: 40px; height: 40px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      &:hover { background: var(--neon); color: #111; border-color: var(--neon); }
    }

    .lb-prev, .lb-next {
      position: absolute;
      top: 50%; transform: translateY(-50%);
      background: rgba(0,0,0,0.6);
      border: 1px solid var(--border);
      color: var(--text); font-size: 28px;
      width: 48px; height: 80px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      &:hover { background: var(--neon); color: #111; border-color: var(--neon); }
    }
    .lb-prev { left: 12px; }
    .lb-next { right: 12px; }

    @media (max-width: 480px) {
      .lb-prev, .lb-next { width: 36px; height: 60px; font-size: 20px; }
      .lb-close { width: 34px; height: 34px; top: 12px; right: 12px; font-size: 16px; }
      .lb-info { gap: 12px; }
      .lb-controls { width: 100%; justify-content: space-between; }
    }

    .lb-content { max-width: 1000px; width: 100%; }

    .lb-info {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding-top: 14px;
      border-top: 1px solid var(--border);
      flex-wrap: wrap;

      .lb-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }

      .lb-date {
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.25em;
        color: var(--neon);
        text-transform: uppercase;
      }

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text);
        line-height: 1;
      }

      .lb-desc {
        font-size: 0.88rem;
        color: var(--muted);
        line-height: 1.5;
        max-width: 500px;
      }
    }

    .lb-controls {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
    }

    /* Botón play/pause slideshow */
    .lb-play {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 7px 14px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;

      &:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }
      &.playing {
        border-color: var(--neon);
        color: var(--neon);
        background: rgba(255,0,73,0.08);
      }
    }

    /* Barra de progreso del timer */
    .lb-progress {
      width: 80px;
      height: 2px;
      background: rgba(255,255,255,0.1);
      position: relative;
      overflow: hidden;

      .lb-progress-fill {
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 100%;
        background: var(--neon);
        transform-origin: left;
        animation: progressBar linear forwards;
        box-shadow: 0 0 6px rgba(255,0,73,0.5);
      }
    }

    .lb-counter {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.2em;
      white-space: nowrap;
    }

    @keyframes progressBar {
      from { transform: scaleX(1); }
      to   { transform: scaleX(0); }
    }
  `]
})
export class GalleryComponent implements OnDestroy {

  // Todas las imágenes de todos los eventos en un array plano
  allItems: (MediaItem & { eventName: string; category: string })[] = GALLERY_EVENTS.flatMap(ev =>
    ev.items.map(item => ({ ...item, eventName: ev.name, category: ev.category }))
  );

  activeCategory  = signal<string>('all');
  lightboxOpen    = signal<boolean>(false);
  lightboxIndex   = signal<number>(0);
  slideshowActive = signal<boolean>(false);
  slideshowDelay  = 4000; // ms entre fotos

  private slideshowTimer: any = null;
  private progressKey = 0; // fuerza re-render de la barra

  visibleItems = computed<(MediaItem & { eventName: string; category: string })[]>(() => {
    const filtered = this.activeCategory() === 'all'
      ? this.allItems
      : this.allItems.filter(i => i.category === this.activeCategory());

    // Ordena por date descendente (más reciente primero). Items sin date van al final.
    return [...filtered].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  currentItem = computed(() => {
    const items = this.visibleItems();
    const idx   = this.lightboxIndex();
    return items[idx] ?? null;
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
    this.stopSlideshow();
    this.lightboxOpen.set(false);
  }

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.stopSlideshow();
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  navigate(dir: number) {
    const len  = this.visibleItems().length;
    const next = (this.lightboxIndex() + dir + len) % len;
    this.lightboxIndex.set(next);
    // Si el slideshow está activo, reinicia el timer para que la barra empiece de 0
    if (this.slideshowActive()) this.startSlideshow();
  }

  toggleSlideshow() {
    if (this.slideshowActive()) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
      this.slideshowActive.set(true);
    }
  }

  private startSlideshow() {
    this.stopSlideshow();
    this.slideshowActive.set(true);
    this.slideshowTimer = setInterval(() => {
      this.navigate(1);
    }, this.slideshowDelay);
  }

  private stopSlideshow() {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = null;
    }
    this.slideshowActive.set(false);
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }
}
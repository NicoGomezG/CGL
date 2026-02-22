import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_EVENTS, GalleryEvent, MediaItem } from './gallery.data';

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

        <!-- Filtro de eventos -->
        <div class="filters">
          <button [class.active]="activeEventId() === 'all'"
                  (click)="setEvent('all')">Todos</button>
          <button *ngFor="let ev of events"
                  [class.active]="activeEventId() === ev.id"
                  (click)="setEvent(ev.id)">
            {{ ev.name }}
          </button>
        </div>

        <!-- Vista: TODOS los eventos agrupados -->
        <ng-container *ngIf="activeEventId() === 'all'">
          <div class="event-block" *ngFor="let ev of events">
            <div class="event-header">
              <div class="event-cover" [style.backgroundImage]="'url(' + ev.cover + ')'"></div>
              <div class="event-meta">
                <span class="event-date">{{ ev.date | date:'MMMM yyyy' }}</span>
                <h3>{{ ev.name }}</h3>
                <span class="event-count">{{ ev.items.length }} archivos</span>
              </div>
              <button class="event-filter-btn" (click)="setEvent(ev.id)">
                Ver solo este →
              </button>
            </div>

            <div class="gallery-grid">
              <div class="gallery-item"
                   *ngFor="let item of ev.items; let i = index"
                   [class.wide]="i === 0"
                   (click)="openLightbox(ev.id, item)">
                <div class="video-badge" *ngIf="item.type === 'video'">▶</div>
                <div class="item-thumb"
                     [style.backgroundImage]="item.thumb ? 'url(' + item.thumb + ')' : 'url(' + item.src + ')'">
                  <div class="fallback-thumb">{{ item.type === 'video' ? '▶' : '🖼' }}</div>
                </div>
                <div class="item-overlay"><h4>{{ item.title }}</h4></div>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Vista: evento individual -->
        <ng-container *ngIf="activeEventId() !== 'all' && activeEvent()">
          <div class="event-block">
            <div class="event-header">
              <div class="event-cover" [style.backgroundImage]="'url(' + activeEvent()!.cover + ')'"></div>
              <div class="event-meta">
                <span class="event-date">{{ activeEvent()!.date | date:'MMMM yyyy' }}</span>
                <h3>{{ activeEvent()!.name }}</h3>
                <span class="event-count">{{ activeEvent()!.items.length }} archivos</span>
              </div>
            </div>

            <div class="gallery-grid">
              <div class="gallery-item"
                   *ngFor="let item of activeEvent()!.items; let i = index"
                   [class.wide]="i === 0"
                   (click)="openLightbox(activeEvent()!.id, item)">
                <div class="video-badge" *ngIf="item.type === 'video'">▶</div>
                <div class="item-thumb"
                     [style.backgroundImage]="item.thumb ? 'url(' + item.thumb + ')' : 'url(' + item.src + ')'">
                  <div class="fallback-thumb">{{ item.type === 'video' ? '▶' : '🖼' }}</div>
                </div>
                <div class="item-overlay"><h4>{{ item.title }}</h4></div>
              </div>
            </div>
          </div>
        </ng-container>

      </div>

      <!-- Lightbox con navegación -->
      <div class="lightbox" [class.active]="lightboxItem()" (click)="closeLightbox()">
        <button class="lb-close" (click)="closeLightbox()">✕</button>
        <button class="lb-prev" (click)="navigate(-1); $event.stopPropagation()">‹</button>
        <button class="lb-next" (click)="navigate(1); $event.stopPropagation()">›</button>

        <div class="lb-content" (click)="$event.stopPropagation()" *ngIf="lightboxItem()">
          <video *ngIf="lightboxItem()!.type === 'video'"
                 [src]="lightboxItem()!.src"
                 controls autoplay
                 style="width:100%; max-height:75vh; border-radius:2px;">
          </video>
          <img *ngIf="lightboxItem()!.type === 'image'"
               [src]="lightboxItem()!.src"
               [alt]="lightboxItem()!.title"
               style="max-width:100%; max-height:75vh; object-fit:contain; border-radius:2px;"/>
          <div class="lb-info">
            <h3>{{ lightboxItem()!.title }}</h3>
            <span class="lb-counter">{{ lightboxIndex() + 1 }} / {{ lightboxPool().length }}</span>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .section { background: var(--bg2); }
    .section-head { margin-bottom: 40px; }

    .filters {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 48px;

      button {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 7px 18px;
        background: transparent;
        color: var(--muted);
        border: 1px solid rgba(255,255,255,0.1);
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);

        &:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }
        &.active { background: var(--neon); color: #111; border-color: var(--neon); }
      }
    }

    .event-block { margin-bottom: 64px; }

    .event-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 12px;
      padding: 14px 20px;
      background: var(--bg3);
      border-left: 3px solid var(--neon);
      flex-wrap: wrap;

      .event-cover {
        width: 60px; height: 60px;
        background-size: cover;
        background-position: center;
        background-color: var(--surface);
        flex-shrink: 0;
        clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
      }

      .event-meta {
        flex: 1;
        min-width: 120px;

        .event-date {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 3px;
        }
        h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text);
          line-height: 1;
          margin-bottom: 3px;
        }
        .event-count {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: var(--muted);
        }
      }

      .event-filter-btn {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        background: transparent;
        border: 1px solid var(--border);
        color: var(--muted);
        padding: 8px 16px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover { color: var(--neon); border-color: var(--neon); }
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 190px;
      gap: 4px;

      @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
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
        transition: transform 0.4s ease;

        .fallback-thumb {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; opacity: 0.2;
          background: var(--bg3);
        }
      }

      .item-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(17,18,19,0.9) 0%, transparent 60%);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex; align-items: flex-end;
        padding: 12px;

        h4 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text);
        }
      }

      &:hover {
        .item-thumb { transform: scale(1.05); }
        .item-overlay { opacity: 1; }
      }
    }

    /* Lightbox */
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

    .lb-content { max-width: 1000px; width: 100%; }

    .lb-info {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text);
      }
      .lb-counter {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        color: var(--muted);
        letter-spacing: 0.2em;
      }
    }
  `]
})
export class GalleryComponent {
  events = GALLERY_EVENTS;
  activeEventId = signal<string>('all');
  lightboxItem = signal<MediaItem | null>(null);
  lightboxIndex = signal<number>(0);
  lightboxPool = signal<MediaItem[]>([]);

  activeEvent = computed<GalleryEvent | null>(() =>
    this.events.find(e => e.id === this.activeEventId()) ?? null
  );

  setEvent(id: string) {
    this.activeEventId.set(id);
  }

  openLightbox(eventId: string, item: MediaItem) {
    const ev = this.events.find(e => e.id === eventId);
    const pool = ev?.items ?? [];
    const idx = pool.findIndex(i => i.src === item.src);
    this.lightboxPool.set(pool);
    this.lightboxIndex.set(idx >= 0 ? idx : 0);
    this.lightboxItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  navigate(dir: number) {
    const pool = this.lightboxPool();
    const next = (this.lightboxIndex() + dir + pool.length) % pool.length;
    this.lightboxIndex.set(next);
    this.lightboxItem.set(pool[next]);
  }

  closeLightbox() {
    this.lightboxItem.set(null);
    document.body.style.overflow = '';
  }
}

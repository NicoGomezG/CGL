// ============================================================
// ARCHIVO CENTRAL DE EVENTOS — Edita solo aquí
// Para agregar un evento: copia un bloque y rellena los datos
// ============================================================

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumb?: string; // opcional, si no se pone usa src
  title: string;
}

export interface GalleryEvent {
  id: string;           // slug único, sin espacios
  name: string;         // nombre que aparece en el filtro
  date: string;         // para ordenar y mostrar
  cover: string;        // imagen de portada del evento
  items: MediaItem[];
}

// ─── AGREGA TUS EVENTOS AQUÍ ─────────────────────────────────
// src puede ser:
//   - Local:      'assets/gallery/nombre-evento/img1.jpg'
//   - Firebase:   'https://firebasestorage.googleapis.com/...'
//   - Cloudinary: 'https://res.cloudinary.com/...'
// ─────────────────────────────────────────────────────────────

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: 'Eventos',
    name: 'Eventos CGL',
    date: '2024-05-20',
    cover: 'assets/gallery/eventos/cover.jpg',
    items: [
      { type: 'image', src: 'assets/gallery/eventos/img1.jpg', title: 'Panam 2023' },
      { type: 'image', src: 'assets/gallery/eventos/img2.jpg', title: 'Competidores' },
      { type: 'video', src: 'assets/gallery/eventos/recap.mp4', thumb: 'assets/gallery/eventos/recap-thumb.jpg', title: 'Recap del evento' },
    ]
  },
  {
    id: 'equipo',
    name: 'Equipo CGL',
    date: '2024-11-15',
    cover: 'assets/gallery/Equipo/img1.jpg',
    items: [
      { type: 'image', src: 'assets/gallery/Equipo/img1.jpg', title: 'ETC 2018' },
      { type: 'image', src: 'assets/gallery/Equipo/img2.jpg', title: 'Grand Final' },
      { type: 'video', src: 'assets/gallery/Equipo/highlights.mp4', thumb: 'assets/gallery/Equipo /highlights-thumb.jpg', title: 'Highlights Finales' },
    ]
  },
  // ── Copia este bloque para agregar un evento ──────────────
  // {
  //   id: 'nombre-del-evento',
  //   name: 'Nombre visible en filtro',
  //   date: 'YYYY-MM-DD',
  //   cover: 'assets/gallery/nombre-del-evento/cover.jpg',
  //   items: [
  //     { type: 'image', src: 'assets/gallery/nombre-del-evento/img1.jpg', title: 'Descripción' },
  //     { type: 'video', src: 'assets/gallery/nombre-del-evento/vid1.mp4', thumb: 'assets/gallery/nombre-del-evento/vid1-thumb.jpg', title: 'Video' },
  //   ]
  // },
];

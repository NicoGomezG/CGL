// ============================================================
// ARCHIVO CENTRAL DE EVENTOS — Edita solo aquí
// Para agregar un evento: copia un bloque y rellena los datos
// ============================================================

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumb?: string;
  title: string;
  date?: string;       
  description?: string; 
}

export interface GalleryEvent {
  id: string;
  name: string;
  date: string;
  cover: string;
  category: 'eventos' | 'equipo' | string; // 
  items: MediaItem[];
}

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: 'redbull-homeground',
    name: 'RedBull Homeground',
    date: '2024-05-20',
    cover: 'assets/gallery/eventos/redbull/cover.jpg',
    category: 'eventos',
    items: [
      {
        type: 'image',
        src: 'assets/gallery/eventos/redbull/img1.jpg',
        title: 'RedBull Homeground 2024',
        date: '2024-05-20',
        description: 'Final regional y Watchparty de Worlds 2024.'
      },
    ]
  },
  {
    id: 'panam-2023',
    name: 'Panam 2023',
    date: '2023-11-10',
    cover: 'assets/gallery/eventos/panam/cover.jpg',
    category: 'eventos',
    items: [
      {
        type: 'image',
        src: 'assets/gallery/eventos/panam/img1.jpg',
        title: 'Panam 2023',
        date: '2023-11-10',
        description: 'Juegos Panamericanos Santiago 2023.'
      },
    ]
  },
  {
    id: 'equipo',
    name: 'Equipo CGL',
    date: '2024-01-01',
    cover: 'assets/gallery/equipo/cover.jpg',
    category: 'equipo',
    items: [
      {
        type: 'image',
        src: 'assets/gallery/equipo/img1.jpg',
        title: 'ETC 2018',
        date: '2018-06-01',
        description: 'Final CSGO 2018 - OPEN.'
      },
    ]
  },
];
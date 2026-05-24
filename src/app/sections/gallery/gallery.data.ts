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
        src: 'assets/gallery/eventos/img2.jpg',
        title: 'RedBull Homeground 2024',
        date: '2024-05-20',
        description: 'Final regional y Watchparty de Worlds 2024.'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img1.jpg',
        title: 'PANAM 2023',
        date: '2023-11-10',
        description: 'Juegos Panamericanos Santiago 2023.'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img3.png',
        title: 'Axe Experience ',
        date: '2021-10-15',
        description: 'Final Axe Gaming Experience 2021. - Rocket League'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img4.png',
        title: 'GAMERCITY',
        date: '2023-04-13',
        description: 'Montaje de GAMERCITY 2021 - Main Stage'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img5.png',
        title: 'GAMERCITY',
        date: '2023-04-13',
        description: 'Montaje de GAMERCITY 2021 - Main Stage - Copa LLA 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img6.png',
        title: 'PANAMERICANOS 2023',
        date: '2023-10-20',
        description: 'Inicio PANAM 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img7.png',
        title: 'PANAMERICANOS 2023',
        date: '2023-10-24',
        description: 'Zona Sim Racing - PANAM 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img8.png',
        title: 'PANAMERICANOS 2023',
        date: '2023-10-24',
        description: 'Zona Arcade - PANAM 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img9.png',
        title: 'PANAMERICANOS 2023',
        date: '2023-11-03',
        description: 'COPA OFICIAL - PANAM 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img10.png',
        title: 'CAMPUS CLUTCH 2023',
        date: '2023-11-04',
        description: 'COPA OFICIAL - CAMPUS CLUTCH 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img11.png',
        title: 'LOLLAPALOOZA 2024',
        date: '2024-03-15',
        description: 'GAMING SPHERE - LOLLAPALOOZA 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img12.png',
        title: 'PANAMERICANOS 2023',
        date: '2023-10-24',
        description: 'ANTHARESS - PANAM 2023'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img13.png',
        title: 'GAMING SPHERE ON TOUR',
        date: '2024-07-05',
        description: 'FANTASILANDIA 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img14.png',
        title: 'FINAL MOBIL ESPORTS COPEC 2024',
        date: '2024-07-18',
        description: 'FINAL MOBIL ESPORTS COPEC 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img15.png',
        title: 'TROFEO FINAL MOBIL ESPORTS COPEC 2024',
        date: '2024-07-18',
        description: 'FINAL MOBIL ESPORTS COPEC 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img16.png',
        title: 'FELICITACIONES AL CAMPEON',
        date: '2024-07-18',
        description: 'FINAL MOBIL ESPORTS COPEC 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img17.png',
        title: 'GAMING SPHERE ON TOUR',
        date: '2024-07-27',
        description: 'SMARTCITY 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img18.png',
        title: 'FINAL TORNEO MARINELA - LEAGUE OF LEGENDS 2024',
        date: '2024-07-27',
        description: 'EN ETC TV'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img19.png',
        title: 'WATCHPARTY FINAL WORLDS 2024',
        date: '2024-11-02',
        description: 'FINAL REDBULL HOMEGROUND 2024 - WATCHPARTY WORLDS 2024'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img20.png',
        title: 'FESTIGAME 2025',
        date: '2025-10-25',
        description: 'ACTIVACION MOBIL ESPORTS - FESTIGAME 2025'
      },
      {
        type: 'image',
        src: 'assets/gallery/eventos/img21.png',
        title: 'FESTIGAME 2025',
        date: '2025-10-25',
        description: 'FINAL HOMEGROUND - FESTIGAME 2025'
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
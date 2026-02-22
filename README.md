# APEX Esports Agency — Landing Page

## Stack
- Angular 17 (standalone components)
- SCSS con custom properties
- Firebase Hosting + Firebase Storage (recomendado para deploy)

---

## Setup rápido

### Opción A — Copiar en proyecto existente
1. Copia todos los archivos a tu proyecto Angular
2. Asegúrate de tener Angular 17+

### Opción B — Proyecto nuevo desde cero
```powershell
ng new esports-agency --style=scss --standalone=true
# Copia el contenido de src/app y src/styles.scss al nuevo proyecto
```

### Instalar y correr
```powershell
npm install
ng serve
```

---

## Personalizar contenido

### 🖼 Galería (gallery.component.ts)
Edita el array `allItems`:
```typescript
allItems: MediaItem[] = [
  {
    type: 'image',                         // 'image' | 'video'
    src: 'URL_COMPLETA_DEL_ARCHIVO',       // Firebase Storage o Cloudinary
    thumb: 'URL_THUMBNAIL',                // Para videos, pon el frame thumb
    title: 'Nombre del item',
    tag: 'Evento'                          // Para los filtros
  }
]
```

**Firebase Storage:**
```typescript
src: 'https://firebasestorage.googleapis.com/v0/b/TU_BUCKET.appspot.com/o/gallery%2Fimg1.jpg?alt=media'
```

**Cloudinary:**
```typescript
src: 'https://res.cloudinary.com/TU_CLOUD/image/upload/v1234567890/gallery/img1.jpg'
// Para video:
src: 'https://res.cloudinary.com/TU_CLOUD/video/upload/v1234567890/gallery/vid1.mp4'
```

### 👥 Team (team.component.ts)
Edita el array `members` con nombre, rol, bio, foto y redes.

### 📬 Contacto (contact.component.ts)
En `onSubmit()` descomenta e implementa tu opción:
- **Formspree** (más fácil, sin backend): https://formspree.io
- **EmailJS** (client-side): https://emailjs.com
- **Tu propio API**: endpoint Node/Express

---

## Deploy en Firebase (recomendado)

```powershell
# 1. Instalar firebase tools
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Build producción
ng build

# 4. Inicializar Firebase (solo primera vez)
firebase init hosting
# - Public directory: dist/esports-agency/browser
# - Single-page app: YES
# - Overwrite index.html: NO

# 5. Deploy
firebase deploy
```

**URL gratuita:** https://TU-PROYECTO.web.app

---

## Deploy en Vercel (alternativa, más simple)

```powershell
npm install -g vercel
ng build
vercel dist/esports-agency/browser
```

---

## Assets locales
Coloca tus imágenes/videos en:
```
src/assets/
  gallery/
    img1.jpg
    vid1.mp4
    vid1-thumb.jpg
  team/
    alex.jpg
    sofia.jpg
  hero-player.jpg
```

Para **producción** te recomiendo usar Firebase Storage o Cloudinary
en lugar de assets locales (mejor performance con CDN).

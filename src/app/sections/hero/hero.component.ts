import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">

      <div class="hero-bg"></div>
      <div class="hero-grid"></div>
      <div class="scanline"></div>
      <div class="diagonal-slash"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="hero-wrap">

        <!-- ── IZQUIERDA ── -->
        <div class="hero-left">
          <div class="pretag">
            <span class="pt-line"></span>
            <span class="pt-text">Productora de eventos — Soluciones Gamer</span>
          </div>

          <h1 class="hero-title">
            <span class="ht-top">SOLUCIONES</span>
            <span class="ht-accent">GAMER</span>
          </h1>

          <p class="hero-desc">
            CGL Producciones potencia eventos, jugadores y marcas
            en el ecosistema del esports latinoamericano.
          </p>

          <div class="hero-cta">
            <a href="#contact" class="btn-primary">Contáctanos</a>
            <a href="#gallery" class="btn-ghost">Ver producciones</a>
          </div>
        </div>

        <!-- ── CENTRO: Logo con animación ── -->
        <div class="hero-center">

          <!-- Anillos de fondo -->
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>

          <!-- Rayos de energía en los 4 ejes del diamante -->
          <div class="energy-beam beam-top"></div>
          <div class="energy-beam beam-right"></div>
          <div class="energy-beam beam-bottom"></div>
          <div class="energy-beam beam-left"></div>

          <!-- SVG: borde del diamante que se dibuja solo -->
          <svg class="diamond-svg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer glow -->
            <polygon class="diamond-glow"
              points="150,4 296,150 150,296 4,150"
              stroke="#FF0049" stroke-width="1" fill="none" opacity="0.15"/>

            <!-- Borde principal animado -->
            <polygon class="diamond-border"
              points="150,8 292,150 150,292 8,150"
              stroke="#FF0049" stroke-width="1.5" fill="rgba(10,10,11,0.96)"/>

            <!-- Borde interior -->
            <polygon class="diamond-inner"
              points="150,40 260,150 150,260 40,150"
              stroke="#FF0049" stroke-width="0.8" fill="none" opacity="0.3"/>

            <!-- Línea scan vertical dentro del diamante -->
            <line class="diamond-scan"
              x1="150" y1="40" x2="150" y2="260"
              stroke="#FF0049" stroke-width="60" opacity="0.03"/>

            <!-- Chispas en esquinas -->
            <circle class="spark spark-top"    cx="150" cy="8"   r="3" fill="#FF0049"/>
            <circle class="spark spark-right"  cx="292" cy="150" r="3" fill="#FF0049"/>
            <circle class="spark spark-bottom" cx="150" cy="292" r="3" fill="#FF0049"/>
            <circle class="spark spark-left"   cx="8"   cy="150" r="3" fill="#FF0049"/>
          </svg>

          <!-- Logo con secuencia de power-up -->
          <div class="logo-wrap">
            <img
              src="assets/logo_solo.png"
              alt="CGL"
              class="logo-img"
              onerror="this.style.display='none'"
            />
            <!-- Barrido de luz que revela el logo -->
            <div class="logo-sweep"></div>
            <!-- Pulso radial -->
            <div class="logo-pulse"></div>
            <div class="logo-pulse p2"></div>
          </div>

          <!-- Coordenadas decorativas -->
          <div class="coord coord-top">N 33°27'</div>
          <div class="coord coord-bottom">W 70°40'</div>
          <div class="coord coord-left">LAT</div>
          <div class="coord coord-right">LNG</div>

          <div class="vticker">
            <span>CGL · PRODUCCIONES · ESPORTS · LATAM · SOLUCIONES GAMER · CGL · PRODUCCIONES · ESPORTS · </span>
          </div>
        </div>

        <!-- ── DERECHA ── -->
        <div class="hero-right">
          <div class="brand-vert">
            <span class="bv-main">CGL</span>
            <span class="bv-dot"></span>
            <span class="bv-sub">PROD.</span>
          </div>
          <div class="status-panel">
            <div class="sp-row">
              <span class="sp-dot active"></span>
              <span class="sp-label">Sistema activo</span>
            </div>
            <div class="sp-row">
              <span class="sp-dot"></span>
              <span class="sp-label">LATAM Region</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ── STATS BAR ── -->
      <div class="stats-bar">
        <div class="stats-inner">
          <div class="stat" *ngFor="let s of stats; let last = last">
            <div class="stat-num">{{ s.display }}</div>
            <div class="stat-lbl">{{ s.label }}</div>
            <div class="stat-sep" *ngIf="!last"></div>
          </div>
          <div class="stats-badge">
            <span class="sb-dot"></span>
            EST. 2017
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <div class="sh-line"></div>
        <span>SCROLL</span>
      </div>

    </section>
  `,
  styles: [`
    :host { display: contents; }

    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      padding-top: 80px;
    }

    .hero-bg {
      position: absolute; inset: 0;
      background: url('/assets/banner.png') center/cover no-repeat;
      opacity: 0.07; z-index: 0;
    }

    .hero-grid {
      position: absolute; inset: 0; z-index: 0;
      background-image:
        linear-gradient(rgba(255,0,73,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,0,73,0.03) 1px, transparent 1px);
      background-size: 50px 50px;
    }

    .scanline {
      position: absolute; left: 0; right: 0; top: 0;
      height: 1px; z-index: 1;
      background: linear-gradient(90deg, transparent, var(--neon), transparent);
      animation: scan 10s linear infinite;
      opacity: 0.15;
    }

    .diagonal-slash {
      position: absolute; top: -10%; right: 30%;
      width: 1px; height: 130%;
      background: linear-gradient(to bottom, transparent, rgba(255,0,73,0.12) 30%, rgba(255,0,73,0.08) 60%, transparent);
      transform: rotate(-15deg);
      z-index: 0;
    }

    .orb {
      position: absolute; border-radius: 50%;
      pointer-events: none; z-index: 0;
    }
    .orb-1 {
      width: 800px; height: 800px;
      background: radial-gradient(circle, rgba(255,0,73,0.08) 0%, transparent 65%);
      top: -200px; left: -200px; filter: blur(60px);
    }
    .orb-2 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(255,0,73,0.06) 0%, transparent 65%);
      bottom: -100px; right: 10%; filter: blur(80px);
    }

    /* ── Layout ── */
    .hero-wrap {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr auto 120px;
      gap: 0;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      padding: 40px 40px 20px;
      align-items: center;
      position: relative; z-index: 1;
    }

    /* ── Left ── */
    .hero-left { padding-right: 60px; }

    .pretag {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 24px;
      animation: fadeUp 0.5s ease 0.1s both;

      .pt-line { display: block; width: 36px; height: 1px; background: var(--neon); flex-shrink: 0; }
      .pt-text {
        font-family: 'DM Mono', monospace;
        font-size: 10px; letter-spacing: 0.25em;
        color: var(--neon); text-transform: uppercase;
      }
    }

    .hero-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900; line-height: 0.88;
      text-transform: uppercase; margin-bottom: 28px;

      .ht-top {
        display: block;
        font-size: clamp(3.8rem, 6.5vw, 7rem);
        color: var(--text); letter-spacing: -0.02em;
        animation: fadeUp 0.5s ease 0.2s both;
      }
      .ht-accent {
        display: block;
        font-size: clamp(4.5rem, 8vw, 8.5rem);
        color: var(--neon); letter-spacing: -0.03em;
        text-shadow: 0 0 40px rgba(255,0,73,0.5), 0 0 80px rgba(255,0,73,0.2);
        animation: fadeUp 0.5s ease 0.3s both;
      }
    }

    .hero-desc {
      font-size: 1rem; line-height: 1.75;
      color: var(--muted); max-width: 380px;
      margin-bottom: 40px;
      animation: fadeUp 0.5s ease 0.4s both;
    }

    .hero-cta {
      display: flex; gap: 14px; flex-wrap: wrap;
      animation: fadeUp 0.5s ease 0.5s both;
    }

    .btn-primary {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 13px;
      letter-spacing: 0.18em; text-transform: uppercase;
      padding: 14px 36px;
      background: var(--neon); color: #0a0a0b;
      border: none;
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      cursor: pointer; text-decoration: none;
      display: inline-block; position: relative; overflow: hidden;
      transition: filter 0.2s;

      &::after {
        content: ''; position: absolute; inset: 0;
        background: rgba(255,255,255,0.15);
        transform: translateX(-100%) skew(-15deg);
        transition: transform 0.4s;
      }
      &:hover { filter: brightness(1.12); &::after { transform: translateX(200%) skew(-15deg); } }
    }

    .btn-ghost {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 13px;
      letter-spacing: 0.18em; text-transform: uppercase;
      padding: 13px 36px;
      background: transparent; color: var(--text);
      border: 1px solid rgba(255,255,255,0.2);
      clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
      cursor: pointer; text-decoration: none;
      display: inline-block;
      transition: border-color 0.2s, color 0.2s;
      &:hover { border-color: var(--neon); color: var(--neon); }
    }

    /* ══════════════════════════════════
       CENTRO — Logo Animation
    ══════════════════════════════════ */
    .hero-center {
      position: relative;
      width: 380px; height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Anillos */
    .ring {
      position: absolute; border-radius: 50%;
    }
    .ring-1 {
      width: 370px; height: 370px;
      border: 1px dashed rgba(255,0,73,0.08);
      animation: spin 25s linear infinite;
    }
    .ring-2 {
      width: 310px; height: 310px;
      border: 1px solid rgba(255,0,73,0.13);
      animation: spin 18s linear infinite reverse;
      &::before {
        content: '';
        position: absolute; top: -4px; left: 50%;
        transform: translateX(-50%);
        width: 8px; height: 8px;
        background: var(--neon); border-radius: 50%;
        box-shadow: 0 0 10px var(--neon), 0 0 20px rgba(255,0,73,0.5);
      }
    }
    .ring-3 {
      width: 250px; height: 250px;
      border: 1px dotted rgba(255,0,73,0.08);
      animation: spin 12s linear infinite;
    }

    /* ── Rayos de energía ── */
    .energy-beam {
      position: absolute;
      background: linear-gradient(to var(--dir, right), var(--neon), transparent);
      opacity: 0;
      pointer-events: none;
      animation: beamShoot 4s ease infinite;
    }

    .beam-top {
      --dir: top;
      width: 1px; height: 130px;
      top: 50%; left: 50%;
      transform: translate(-50%, -100%);
      background: linear-gradient(to top, var(--neon), transparent);
      animation-delay: 1.2s;
    }
    .beam-right {
      --dir: right;
      width: 130px; height: 1px;
      top: 50%; left: 50%;
      transform: translateY(-50%);
      background: linear-gradient(to right, var(--neon), transparent);
      animation-delay: 1.4s;
    }
    .beam-bottom {
      width: 1px; height: 130px;
      top: 50%; left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(to bottom, var(--neon), transparent);
      animation-delay: 1.6s;
    }
    .beam-left {
      width: 130px; height: 1px;
      top: 50%; left: 50%;
      transform: translate(-100%, -50%);
      background: linear-gradient(to left, var(--neon), transparent);
      animation-delay: 1.8s;
    }

    /* ── SVG Diamante ── */
    .diamond-svg {
      position: absolute;
      width: 300px; height: 300px;
      z-index: 2;
      overflow: visible;
    }

    /* Borde principal: se dibuja al cargar */
    .diamond-border {
      stroke-dasharray: 820;
      stroke-dashoffset: 820;
      animation: drawBorder 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
      filter: drop-shadow(0 0 4px rgba(255,0,73,0.6));
    }

    .diamond-inner {
      stroke-dasharray: 600;
      stroke-dashoffset: 600;
      animation: drawBorder 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
    }

    .diamond-glow {
      animation: glowPulse 3s ease infinite 2s;
    }

    /* Chispas en las esquinas */
    .spark {
      filter: drop-shadow(0 0 4px #FF0049) drop-shadow(0 0 8px rgba(255,0,73,0.6));
      opacity: 0;
    }
    .spark-top    { animation: sparkOn 0.1s ease 1.5s forwards, sparkBlink 3s ease infinite 2s; }
    .spark-right  { animation: sparkOn 0.1s ease 1.6s forwards, sparkBlink 3s ease 0.5s infinite 2s; }
    .spark-bottom { animation: sparkOn 0.1s ease 1.7s forwards, sparkBlink 3s ease 1s infinite 2s; }
    .spark-left   { animation: sparkOn 0.1s ease 1.8s forwards, sparkBlink 3s ease 1.5s infinite 2s; }

    /* Scan dentro del diamante */
    .diamond-scan {
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      transform-origin: center;
      animation: scanDiamond 3s ease infinite 2.5s;
    }

    /* ── Logo y efectos ── */
    .logo-wrap {
      position: relative; z-index: 3;
      display: flex; align-items: center; justify-content: center;
      width: 180px; height: 180px;
    }

    .logo-img {
      width: 160px; height: 160px;
      object-fit: contain;
      position: relative; z-index: 2;
      opacity: 0;
      /* Secuencia: aparece con glitch luego de que el borde se dibuja */
      animation:
        logoReveal 0.8s steps(1, end) 1.5s forwards,
        logoBreath 4s ease infinite 2.5s,
        logoGlitch 8s ease infinite 3s;
    }

    /* Barrido de luz que revela el logo */
    .logo-sweep {
      position: absolute; inset: 0; z-index: 3; pointer-events: none;
      background: linear-gradient(135deg, transparent 30%, rgba(255,0,73,0.4) 50%, transparent 70%);
      opacity: 0;
      animation: sweepLight 0.6s ease 1.5s forwards;
    }

    /* Pulsos radiales que se expanden */
    .logo-pulse {
      position: absolute;
      width: 160px; height: 160px;
      border: 1px solid rgba(255,0,73,0.6);
      border-radius: 50%;
      opacity: 0;
      animation: pulseExpand 3s ease infinite 2s;
      pointer-events: none;
    }
    .logo-pulse.p2 {
      animation-delay: 2.8s;
    }

    /* Coordenadas */
    .coord {
      position: absolute;
      font-family: 'DM Mono', monospace;
      font-size: 8px; letter-spacing: 0.2em;
      color: rgba(255,0,73,0.25); text-transform: uppercase;
      opacity: 0;
      animation: fadeUp 0.4s ease 2s forwards;
    }
    .coord-top    { top: 8px;    left: 50%; transform: translateX(-50%); }
    .coord-bottom { bottom: 8px; left: 50%; transform: translateX(-50%); }
    .coord-left   { left: 8px;  top: 50%;  transform: translateY(-50%) rotate(-90deg); }
    .coord-right  { right: 8px; top: 50%;  transform: translateY(-50%) rotate(90deg); }

    .vticker {
      position: absolute; left: -28px; top: 0; bottom: 0;
      width: 20px; overflow: hidden;
      display: flex; align-items: center;

      span {
        font-family: 'DM Mono', monospace; font-size: 8px;
        letter-spacing: 0.3em; color: rgba(255,0,73,0.18);
        text-transform: uppercase; white-space: nowrap;
        writing-mode: vertical-rl;
        animation: tickerV 15s linear infinite;
      }
    }

    /* ── Right ── */
    .hero-right {
      display: flex; flex-direction: column;
      align-items: flex-end; justify-content: space-between;
      height: 280px; padding-left: 40px;
      border-left: 1px solid var(--border);
      animation: fadeUp 0.5s ease 0.6s both;
    }

    .brand-vert {
      display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
      .bv-main {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2.5rem; font-weight: 900;
        color: var(--neon); line-height: 1;
        text-shadow: 0 0 20px rgba(255,0,73,0.4);
      }
      .bv-dot {
        display: block; width: 6px; height: 6px;
        background: var(--neon); border-radius: 50%;
        margin-left: auto; box-shadow: 0 0 8px var(--neon);
      }
      .bv-sub {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.25em; color: var(--muted); text-transform: uppercase;
      }
    }

    .status-panel {
      display: flex; flex-direction: column; gap: 10px;
      .sp-row { display: flex; align-items: center; gap: 8px; flex-direction: row-reverse; }
      .sp-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.25);
        &.active {
          background: var(--neon); border-color: var(--neon);
          box-shadow: 0 0 8px var(--neon);
          animation: blink 2s ease infinite;
        }
      }
      .sp-label {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.15em; color: var(--muted); text-transform: uppercase;
      }
    }

    /* ── Stats bar ── */
    .stats-bar {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      background: rgba(10,10,11,0.7);
      backdrop-filter: blur(12px);
      animation: fadeUp 0.5s ease 0.8s both;
    }

    .stats-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 0 40px; display: flex; align-items: stretch;
    }

    .stat {
      display: flex; align-items: center; gap: 20px;
      padding: 24px 48px 24px 0; position: relative;

      .stat-num {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 2.8rem; font-weight: 900;
        color: var(--neon); line-height: 1;
        text-shadow: 0 0 30px rgba(255,0,73,0.4);
      }
      .stat-lbl {
        font-family: 'DM Mono', monospace; font-size: 9px;
        letter-spacing: 0.22em; color: var(--muted);
        text-transform: uppercase; line-height: 1.5; max-width: 70px;
      }
      .stat-sep {
        position: absolute; right: 24px; top: 25%; bottom: 25%;
        width: 1px; background: var(--border);
      }
    }

    .stats-badge {
      margin-left: auto; display: flex; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.25em; color: var(--muted); text-transform: uppercase;
      padding-left: 40px; border-left: 1px solid var(--border);
      .sb-dot {
        width: 8px; height: 8px;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        background: var(--neon); flex-shrink: 0;
      }
    }

    /* ── Scroll ── */
    .scroll-hint {
      position: absolute; bottom: 80px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace; font-size: 9px;
      letter-spacing: 0.35em; color: rgba(255,0,73,0.3); z-index: 2;
      .sh-line {
        width: 1px; height: 40px;
        background: linear-gradient(to bottom, rgba(255,0,73,0.4), transparent);
        animation: scrollPulse 2s ease infinite;
      }
    }

    /* ══════════════════════════════════
       KEYFRAMES
    ══════════════════════════════════ */
    @keyframes scan {
      0%   { top: 0; opacity: 0; }
      10%  { opacity: 0.15; }
      90%  { opacity: 0.15; }
      100% { top: 100%; opacity: 0; }
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    @keyframes tickerV {
      from { transform: translateY(0); }
      to   { transform: translateY(-50%); }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Dibuja el borde SVG */
    @keyframes drawBorder {
      to { stroke-dashoffset: 0; }
    }

    /* Logo aparece con glitch (steps = parpadeo brusco) */
    @keyframes logoReveal {
      0%   { opacity: 0; filter: drop-shadow(0 0 0px transparent); }
      10%  { opacity: 0.8; filter: drop-shadow(0 0 30px #FF0049); }
      20%  { opacity: 0; }
      30%  { opacity: 0.9; filter: drop-shadow(0 0 40px #FF0049) brightness(2); }
      40%  { opacity: 0; }
      60%  { opacity: 1; filter: drop-shadow(0 0 24px rgba(255,0,73,0.9)); }
      80%  { opacity: 0.7; filter: drop-shadow(0 0 50px #FF0049); }
      100% { opacity: 1; filter: drop-shadow(0 0 20px rgba(255,0,73,0.7)) drop-shadow(0 0 60px rgba(255,0,73,0.3)); }
    }

    /* Respiración continua del logo */
    @keyframes logoBreath {
      0%, 100% { filter: drop-shadow(0 0 16px rgba(255,0,73,0.7)) drop-shadow(0 0 40px rgba(255,0,73,0.25)); }
      50%       { filter: drop-shadow(0 0 28px rgba(255,0,73,1))   drop-shadow(0 0 70px rgba(255,0,73,0.5)); }
    }

    /* Glitch ocasional del logo */
    @keyframes logoGlitch {
      0%, 88%, 100% { transform: none; }
      90%  { transform: translate(-2px, 0) skewX(-1deg); filter: drop-shadow(-4px 0 rgba(255,0,73,0.8)) drop-shadow(4px 0 rgba(0,255,136,0.5)); }
      92%  { transform: translate(2px, 0)  skewX(1deg); }
      94%  { transform: none; }
      96%  { transform: translate(-1px, 1px); }
      98%  { transform: none; }
    }

    /* Barrido de luz inicial */
    @keyframes sweepLight {
      0%   { opacity: 0; transform: translateX(-100%) skewX(-20deg); }
      50%  { opacity: 1; transform: translateX(0%) skewX(-20deg); }
      100% { opacity: 0; transform: translateX(100%) skewX(-20deg); }
    }

    /* Pulsos radiales */
    @keyframes pulseExpand {
      0%   { opacity: 0.8; transform: scale(0.5); }
      100% { opacity: 0;   transform: scale(2.2); }
    }

    /* Rayos de energía */
    @keyframes beamShoot {
      0%, 100% { opacity: 0; transform-origin: center; }
      5%  { opacity: 0.8; }
      15% { opacity: 0; }
    }

    /* Chispas en las esquinas */
    @keyframes sparkOn {
      to { opacity: 1; }
    }
    @keyframes sparkBlink {
      0%, 40%, 60%, 100% { opacity: 1; r: 3; }
      50% { opacity: 0.2; r: 1.5; }
      55% { opacity: 1; r: 4; filter: drop-shadow(0 0 6px #FF0049); }
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.08; }
      50%       { opacity: 0.25; }
    }

    @keyframes scanDiamond {
      0%   { transform: translateY(-120px); opacity: 0; }
      10%  { opacity: 0.06; }
      90%  { opacity: 0.06; }
      100% { transform: translateY(120px); opacity: 0; }
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .hero-right { display: none; }
      .hero-wrap { grid-template-columns: 1fr auto; }
    }
    @media (max-width: 768px) {
      .hero-wrap { grid-template-columns: 1fr; padding: 20px 24px; text-align: center; gap: 40px; }
      .hero-left { padding-right: 0; }
      .pretag { justify-content: center; }
      .hero-desc { margin: 0 auto 40px; }
      .hero-cta { justify-content: center; }
      .hero-center { width: 280px; height: 280px; margin: 0 auto; order: -1; }
      .ring-1 { width: 270px; height: 270px; }
      .ring-2 { width: 225px; height: 225px; }
      .ring-3 { width: 180px; height: 180px; }
      .diamond-svg { width: 220px; height: 220px; }
      .logo-wrap { width: 130px; height: 130px; }
      .logo-img { width: 115px; height: 115px; }
      .vticker { display: none; }
      .stat { padding: 18px 24px 18px 0; }
      .stat .stat-num { font-size: 2.2rem; }
      .stats-badge { display: none; }
    }
  `]
})
export class HeroComponent implements OnInit {
  stats = [
    { value: '50+',  label: 'Competencias', display: '--' },
    { value: '120+', label: 'Eventos',       display: '--' },
    { value: '3M+',  label: 'Alcance',       display: '--' },
  ];

  private CHARS = '0123456789ABCDEF#@!%&';

  ngOnInit() {
    this.stats.forEach((stat, i) => {
      setTimeout(() => this.scrambleTo(stat), 900 + i * 350);
    });
  }

  private scrambleTo(stat: { value: string; display: string }) {
    const target = stat.value;
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * target.length);
      let result = '';
      for (let i = 0; i < target.length; i++) {
        result += i < revealed
          ? target[i]
          : this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
      }
      stat.display = result;
      if (progress < 1) requestAnimationFrame(tick);
      else stat.display = target;
    };
    requestAnimationFrame(tick);
  }
}
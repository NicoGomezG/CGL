import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section" id="contact">
      <div class="bg-glow"></div>
      <div class="container">
        <div class="contact-wrap">

          <!-- ── Columna 1: info ── -->
          <div class="contact-info">
            <div class="section-tag">Hablémos</div>
            <h2 class="section-title">Contáctanos</h2>
            <p class="contact-desc">
              Cuéntanos sobre tu proyecto, equipo o carrera.
              Nuestro equipo te responde en menos de 24 horas.
            </p>

            <div class="contact-data">
              <div class="data-item" *ngFor="let d of contactInfo">
                <div class="data-icon">{{ d.icon }}</div>
                <div>
                  <span class="data-label">{{ d.label }}</span>
                  <span class="data-value">{{ d.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Columna 2: formulario ── -->
          <div class="contact-form-col">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">

              <div class="form-row">
                <div class="form-field" [class.error]="isInvalid('name')">
                  <label>Nombre completo *</label>
                  <input type="text" formControlName="name" placeholder="Tu nombre">
                  <span class="err-msg" *ngIf="isInvalid('name')">Campo requerido</span>
                </div>
                <div class="form-field" [class.error]="isInvalid('email')">
                  <label>Email *</label>
                  <input type="email" formControlName="email" placeholder="tu@email.com">
                  <span class="err-msg" *ngIf="isInvalid('email')">Email inválido</span>
                </div>
              </div>

              <div class="form-field" [class.error]="isInvalid('service')">
                <label>Servicio de interés *</label>
                <select formControlName="service">
                  <option value="">Selecciona un servicio</option>
                  <option *ngFor="let s of serviceOptions" [value]="s">{{ s }}</option>
                </select>
                <span class="err-msg" *ngIf="isInvalid('service')">Selecciona una opción</span>
              </div>

              <div class="form-field" [class.error]="isInvalid('message')">
                <label>Mensaje *</label>
                <textarea formControlName="message" rows="5"
                          placeholder="Cuéntanos en qué podríamos ayudarte"></textarea>
                <span class="err-msg" *ngIf="isInvalid('message')">Mínimo 20 caracteres</span>
              </div>

              <div class="form-footer">
                <button type="submit" class="neon-btn-solid"
                        [disabled]="loading">
                  {{ loading ? 'Enviando...' : 'Enviar mensaje' }}
                </button>
                <div class="success-msg" *ngIf="success">
                  ✓ Mensaje enviado. Te contactamos pronto.
                </div>
                <div class="error-msg-box" *ngIf="error">
                  ✕ No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.
                </div>
              </div>
            </form>
          </div>

          <!-- ── Columna 3: Discord ── -->
          <div class="contact-discord">
            <div class="section-tag">Comunidad</div>
            <h3 class="discord-title">Únete a Discord</h3>
            <p class="discord-desc">
              Habla directo con el equipo, entérate de torneos y activaciones en tiempo real.
            </p>

            <div class="discord-widget-frame">
              <iframe
                [src]="discordWidgetUrl"
                width="100%" height="300"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                loading="lazy">
              </iframe>
            </div>

            <a href="https://discord.gg/cpxzAP3BGZ" target="_blank" rel="noopener" class="neon-btn discord-join-btn">
              Unirse al servidor →
            </a>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      background: var(--bg2);
      position: relative;
      overflow: hidden;
    }

    .bg-glow {
      position: absolute;
      bottom: -200px; right: -200px;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
      pointer-events: none;
    }

    .contact-wrap {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr 0.8fr;
      gap: 48px;
      align-items: start;

      @media (max-width: 1180px) {
        grid-template-columns: 1fr 1.2fr;
        .contact-discord { grid-column: 1 / -1; }
      }

      @media (max-width: 780px) {
        grid-template-columns: 1fr;
        gap: 48px;
      }
    }

    .contact-desc {
      font-size: 1rem;
      color: var(--muted);
      line-height: 1.7;
      margin: 24px 0 48px;
    }

    .contact-data {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .data-item {
        display: flex;
        align-items: center;
        gap: 16px;

        .data-icon {
          width: 44px; height: 44px;
          background: rgba(0,255,136,0.08);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .data-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 2px;
        }

        .data-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
          word-break: break-word;
        }
      }
    }

    /* ── Columna Discord ── */
    .contact-discord {
      display: flex;
      flex-direction: column;
    }

    .discord-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 1.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .discord-desc {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--muted);
      margin-bottom: 24px;
    }

    .discord-widget-frame {
      background: var(--bg3);
      border: 1px solid var(--border);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
      overflow: hidden;
      line-height: 0;
      margin-bottom: 20px;

      iframe { display: block; }
    }

    .discord-join-btn {
      align-self: flex-start;
      width: 100%;
      text-align: center;
    }

    /* Form styles */
    form {
      background: var(--bg3);
      padding: 48px;
      border: 1px solid var(--border);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);

      @media (max-width: 600px) { padding: 24px; }
      @media (max-width: 400px) { padding: 20px 16px; }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .form-field {
      margin-bottom: 20px;

      label {
        display: block;
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 8px;
      }

      input, select, textarea {
        width: 100%;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1);
        color: var(--text);
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        padding: 12px 16px;
        outline: none;
        transition: border-color 0.2s;
        resize: none;
        appearance: none;

        &::placeholder { color: var(--muted); opacity: 0.6; }
        &:focus { border-color: var(--neon); background: rgba(0,255,136,0.04); }
      }

      select {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        cursor: pointer;

        option { background: var(--bg3); color: var(--text); }
      }

      &.error input, &.error select, &.error textarea {
        border-color: var(--red);
      }

      .err-msg {
        display: block;
        font-family: 'DM Mono', monospace;
        font-size: 10px;
        color: var(--red);
        margin-top: 4px;
        letter-spacing: 0.1em;
      }
    }

    .form-footer {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;

      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .success-msg {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      color: var(--neon);
      letter-spacing: 0.1em;
    }

    .error-msg-box {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      color: #ff5470;
      letter-spacing: 0.05em;
    }
  `]
})
export class ContactComponent {
  form: FormGroup;
  loading = false;
  success = false;
  error = false;

  serviceOptions = [
    'Activaciones Gamer',
    'Armado de computadoras y setups',
    'Redes y distribución',
    'Servicios de Streaming',
    'Otro'
  ];

  contactInfo = [
    { icon: '✉️', label: 'Email', value: 'CGL.PRODUCCIONES.SPAʘGMAIL.COM' },
    { icon: '📱', label: 'WhatsApp', value: '+56 9 3293 0593' },
    { icon: '📍', label: 'Ubicación', value: 'Santiago, Chile' },
  ];

  // ID numérico de tu servidor de Discord (Ajustes del servidor → Widget →
  // activa "Habilitar widget del servidor" y copia el "ID del servidor" ahí mismo).
  private readonly DISCORD_SERVER_ID = '296252426921443339';

  discordWidgetUrl: SafeResourceUrl;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.discordWidgetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://discord.com/widget?id=${this.DISCORD_SERVER_ID}&theme=dark`
    );
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = false;

    try {
      const res = await fetch('/api/contact-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.value),
      });
      if (!res.ok) throw new Error('request failed');

      this.success = true;
      this.form.reset();
      setTimeout(() => this.success = false, 5000);
    } catch {
      this.error = true;
      setTimeout(() => this.error = false, 5000);
    } finally {
      this.loading = false;
    }
  }
}

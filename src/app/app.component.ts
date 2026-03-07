import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ServicesComponent } from './sections/services/services.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CollaborationsComponent } from './sections/collaborations/collaborations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    GalleryComponent,
    ContactComponent,
    CollaborationsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cursorX = 0;
  cursorY = 0;
  ringX = 0;
  ringY = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
    setTimeout(() => {
      this.ringX = e.clientX;
      this.ringY = e.clientY;
    }, 80);
  }

  ngOnInit() {}
}

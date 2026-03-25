import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {

  readonly techStack: string[] = [
    'Java',
    'Spring Boot',
    'Angular',
    'TypeScript',
    'Docker',
    'SQL',
    'Cibersegurança',
  ];

  glitchActive = false;

  private glitchIntervalId = 0;

  ngOnInit(): void {
    this.scheduleGlitch();
  }

  ngOnDestroy(): void {
    clearTimeout(this.glitchIntervalId);
  }

  private scheduleGlitch(): void {
    const next = () => {
      this.glitchIntervalId = window.setTimeout(() => {
        this.glitchActive = true;

        setTimeout(() => {
          this.glitchActive = false;
          next();
        }, 280);

      }, 4000 + Math.random() * 4000);
    };

    setTimeout(() => {
      this.glitchActive = true;

      setTimeout(() => {
        this.glitchActive = false;
        next();
      }, 280);

    }, 2000);
  }
}
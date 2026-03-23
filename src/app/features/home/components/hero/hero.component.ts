import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

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

  private ctx!: CanvasRenderingContext2D;
  private drops: number[] = [];
  private cols = 0;
  private animFrameId = 0;
  private glitchIntervalId = 0;
  private resizeHandler!: () => void;

  private readonly FONT_SIZE = 13;
  private readonly CHARS = 'アイウエオ01ABCDEFnullvoid</>{}[]';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.scheduleGlitch();
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.resizeHandler = () => this.onResize();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    clearInterval(this.glitchIntervalId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    this.ctx = canvas.getContext('2d')!;
    this.initDrops();

    this.ngZone.runOutsideAngular(() => this.loop());
  }

  private initDrops(): void {
    const canvas = this.canvasRef.nativeElement;
    this.cols = Math.floor(canvas.width / this.FONT_SIZE);
    this.drops = Array.from({ length: this.cols }, () => Math.random() * -80);
  }

  private loop(): void {
    this.drawFrame();
    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  private drawFrame(): void {
    const { ctx, FONT_SIZE, CHARS } = this;
    const canvas = this.canvasRef.nativeElement;

    ctx.fillStyle = 'rgba(1,12,3,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px Courier New`;

    for (let i = 0; i < this.cols; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SIZE;
      const y = this.drops[i] * FONT_SIZE;

      ctx.fillStyle =
        Math.random() > 0.96 ? '#ffffff' : Math.random() > 0.5 ? '#00ff46' : '#005520';

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) this.drops[i] = 0;
      this.drops[i] += 0.5;
    }
  }

  private scheduleGlitch(): void {
    const next = () => {
      this.glitchIntervalId = window.setTimeout(
        () => {
          this.glitchActive = true;
          setTimeout(() => {
            this.glitchActive = false;
            next();
          }, 280);
        },
        4000 + Math.random() * 4000,
      );
    };

    setTimeout(() => {
      this.glitchActive = true;
      setTimeout(() => {
        this.glitchActive = false;
        next();
      }, 280);
    }, 2000);
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    this.initDrops();
  }
}

import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [
    `
      canvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        /* fica só como textura ambiente, sem competir com o conteúdo */
        opacity: 0.4;
      }
    `,
  ],
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drops: number[] = [];
  private cols = 0;
  private animId = 0;
  private lastFrame = 0;

  private readonly FONT_SIZE = 20;
  private readonly CHARS = 'アイウエオ01ABCDEF<>/{}[]';
  private readonly FALL_SPEED = 0.25;
  private readonly FADE_ALPHA = 0.08; // opacidade do "apagador" translúcido -> cria o rastro
  private readonly FPS = 24; // throttle: menos trocas de caractere por segundo = menos ruído visual
  private readonly reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.init();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.ctx = ctx;

    this.resizeCanvas();
    this.initDrops();

    if (this.reducedMotion) {
      this.paintTrail();
      this.drawFrame();
      return;
    }

    this.ngZone.runOutsideAngular(() => this.loop(0));
  }

  private resizeCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private initDrops(): void {
    const canvas = this.canvasRef.nativeElement;
    this.cols = Math.floor(canvas.width / this.FONT_SIZE);
    this.drops = Array.from({ length: this.cols }, () => Math.random() * -100);
  }

  private loop = (timestamp: number) => {
    this.animId = requestAnimationFrame(this.loop);

    if (timestamp - this.lastFrame < 1000 / this.FPS) return;
    this.lastFrame = timestamp;

    this.paintTrail();
    this.drawFrame();
  };

  private paintTrail(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = `rgba(1, 10, 4, ${this.FADE_ALPHA})`;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private drawFrame(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.font = `${this.FONT_SIZE}px monospace`;

    for (let i = 0; i < this.cols; i++) {
      const char = this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
      const x = i * this.FONT_SIZE;
      const y = this.drops[i] * this.FONT_SIZE;

      this.ctx.fillStyle =
        Math.random() > 0.985 ? 'rgba(210, 255, 225, 0.85)' : 'rgba(0, 255, 70, 0.45)';

      this.ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i] += this.FALL_SPEED;
    }
  }

  private onResize = () => {
    this.resizeCanvas();
    this.initDrops();
  };
}
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

  private readonly FONT_SIZE = 14;
  private readonly CHARS = 'アイウエオ01ABCDEF<>/{}[]';

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

    this.ngZone.runOutsideAngular(() => this.loop());
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

  private loop = () => {
    this.draw();
    this.animId = requestAnimationFrame(this.loop);
  };

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = `${this.FONT_SIZE}px monospace`;

    for (let i = 0; i < this.cols; i++) {
      const char = this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
      const x = i * this.FONT_SIZE;
      const y = this.drops[i] * this.FONT_SIZE;

      this.ctx.fillStyle = Math.random() > 0.96 ? '#ffffff' : '#00ff46';

      this.ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i] += 0.35;
    }
  }

  private onResize = () => {
    this.resizeCanvas();
    this.initDrops();
  };
}

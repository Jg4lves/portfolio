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
import { Router } from '@angular/router';

interface HexNode {
  color: 'green' | 'amber';
}

@Component({
  selector: 'app-intro-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-auth.component.html',
  styleUrls: ['./intro-auth.component.css'],
})
export class IntroAuthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  threatLevel = 'LOW';
  scanPercent = 0;
  glitchActive = false;

  hexNodes: HexNode[] = [
    { color: 'green' },
    { color: 'green' },
    { color: 'green' },
    { color: 'amber' },
    { color: 'green' },
  ];

  terminalLogs: string[] = ['AUTH_MODULE_LOADED', 'PACKET_INSPECT: ON', 'IDS: MONITORING...'];

  private ctx!: CanvasRenderingContext2D;
  private drops: number[] = [];
  private cols = 0;
  private animFrameId = 0;
  private scanIntervalId = 0;
  private glitchIntervalId = 0;
  private logIntervalId = 0;
  private resizeHandler!: () => void;

  private readonly FONT_SIZE = 13;
  private readonly CHARS = 'アイウエオカキクケコ01アイウエオ10ABCDEF0011nullvoidhex';

  private readonly ALL_LOGS: string[] = [
    'AUTH_MODULE_LOADED',
    'PACKET_INSPECT: ON',
    'IDS: MONITORING...',
    'FIREWALL: UPDATED',
    'ENCRYPT: AES-256',
    'PORT_SCAN: CLEAR',
    'INTRUSION: NONE',
    'VPN_TUNNEL: UP',
    'HASH: SHA-512 OK',
    'CERT: VALID',
  ];

  constructor(
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.startScan();
    this.startGlitch();
    this.startLogRotation();
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.resizeHandler = () => this.onResize();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    clearInterval(this.scanIntervalId);
    clearInterval(this.glitchIntervalId);
    clearInterval(this.logIntervalId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    this.ctx = canvas.getContext('2d')!;
    this.initDrops();

    this.ngZone.runOutsideAngular(() => this.renderLoop());
  }

  private initDrops(): void {
    const canvas = this.canvasRef.nativeElement;
    this.cols = Math.floor(canvas.width / this.FONT_SIZE);
    this.drops = Array.from({ length: this.cols }, () => Math.random() * -80);
  }

  private renderLoop(): void {
    this.drawMatrix();
    this.animFrameId = requestAnimationFrame(() => this.renderLoop());
  }

  private drawMatrix(): void {
    const { ctx, FONT_SIZE, CHARS } = this;
    const canvas = this.canvasRef.nativeElement;

    ctx.fillStyle = 'rgba(1,12,3,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${FONT_SIZE}px Courier New`;

    for (let i = 0; i < this.cols; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SIZE;
      const y = this.drops[i] * FONT_SIZE;

      const bright = Math.random() > 0.95;
      ctx.fillStyle = bright ? '#ffffff' : Math.random() > 0.5 ? '#00ff46' : '#006622';

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i] += 0.5;
    }
  }

  private startScan(): void {
    this.scanIntervalId = window.setInterval(() => {
      this.scanPercent++;

      if (this.scanPercent === 100) {
        this.irParaHome();
        return;
      }

      if (this.scanPercent < 30) this.threatLevel = 'LOW';
      else if (this.scanPercent < 70) this.threatLevel = 'MEDIUM';
      else if (this.scanPercent < 90) this.threatLevel = 'HIGH';
      else this.threatLevel = 'LOW';
    }, 60);
  }

  private startGlitch(): void {
    this.glitchIntervalId = window.setInterval(() => {
      if (Math.random() > 0.7) {
        this.glitchActive = true;
        setTimeout(() => (this.glitchActive = false), 250);
      }
    }, 4000);
  }

  private startLogRotation(): void {
    this.logIntervalId = window.setInterval(() => {
      const next = this.ALL_LOGS[Math.floor(Math.random() * this.ALL_LOGS.length)];
      this.terminalLogs = [this.terminalLogs[1], this.terminalLogs[2], next];
    }, 2500);
  }

  private irParaHome(): void {
    clearInterval(this.scanIntervalId);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    this.initDrops();
  }
}

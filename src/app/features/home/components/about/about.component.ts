import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Stat {
  value: string;
  label: string;
}

interface StackItem {
  name: string;
  level: number;
}

interface Value {
  icon: SafeHtml;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  readonly age = 21;

  readonly stats: Stat[] = [
    { value: '21',  label: 'anos' },
    { value: '4+',  label: 'anos codando' },
    { value: '∞',   label: 'páginas de caderno' },
  ];

  readonly stackItems: StackItem[] = [
    { name: 'Java / Spring Boot', level: 90 },
    { name: 'Angular',            level: 85 },
    { name: 'TypeScript',         level: 82 },
    { name: 'SQL / Banco de dados', level: 75 },
    { name: 'Docker / DevOps',    level: 60 },
  ];

  readonly values: Value[];

  constructor(private sanitizer: DomSanitizer) {
    this.values = [
      {
        icon: this.svg(`<path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>`),
        title: 'Pensar antes de codar',
        desc:  'Caderno na mão, problema entendido, só então o teclado.',
      },
      {
        icon: this.svg(`<polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>`),
        title: 'Código limpo por padrão',
        desc:  'Legibilidade não é opcional, é parte da entrega.',
      },
      {
        icon: this.svg(`<circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>`),
        title: 'Consistência acima de tudo',
        desc:  'Qualidade em primeiro lugar, mesmo quando o projeto é só meu.',
      },
    ];
  }

  private svg(paths: string): SafeHtml {
    const raw = `
      <svg viewBox="0 0 24 24"
           width="13" height="13"
           fill="none"
           stroke="rgba(0,255,70,0.7)"
           stroke-width="1.5"
           stroke-linecap="round"
           stroke-linejoin="round">
        ${paths}
      </svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}
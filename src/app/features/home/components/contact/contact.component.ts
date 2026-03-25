import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  readonly contactLinks: ContactLink[];

  constructor(private sanitizer: DomSanitizer) {
    this.contactLinks = [
      {
        label: 'E-mail',
        value: 'jgalves04@gmail.com',
        href: 'mailto:jgalves04@gmail.com',
        icon: this.svg(`<rect x="2" y="4" width="20" height="16" rx="2"/>
                        <polyline points="2,4 12,13 22,4"/>`),
      },
      {
        label: 'LinkedIn',
        value: '/in/jg4lves',
        href: 'https://linkedin.com/in/jgalves',
        icon: this.svg(`<rect x="2" y="2" width="20" height="20" rx="3"/>
                        <line x1="8" y1="11" x2="8" y2="17"/>
                        <line x1="8" y1="7" x2="8" y2="8"/>
                        <line x1="12" y1="17" x2="12" y2="11"/>
                        <path d="M12 11a4 4 0 0 1 4 4v2"/>`),
      },
      {
        label: 'GitHub',
        value: 'github.com/jg4lves',
        href: 'https://github.com/jg4lves',
        icon: this.svg(`<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0
                        0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20
                        4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38
                        0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44
                        5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0
                        9 18.13V22"/>`),
      },
    ];
  }

  private svg(paths: string, size: number = 25): SafeHtml {
    const raw = `
    <svg viewBox="0 0 24 24"
         width="${size}" height="${size}"
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

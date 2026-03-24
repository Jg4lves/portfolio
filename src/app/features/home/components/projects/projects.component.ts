import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: 'psi' | 'space' | 'app';
  name: string;
  desc: string;
  previewClass: string;
  tags: string[];
  liveUrl: string;
  liveLabel: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    {
      id: 'psi',
      name: 'Elaine Sousa<br>Psicóloga',
      desc:
        'Site institucional para a psicóloga Elaine Sousa. Foco em acolhimento, ' +
        'transmitindo confiança e profissionalismo para novos pacientes.',
      previewClass: 'preview-psi',
      tags: ['WordPress', 'UI/UX', 'SEO'],
      liveUrl: 'https://elainesousapsi.com/',
      liveLabel: 'Ver site',
    },
    {
      id: 'space',
      name: 'Cruzeiro Espacial<br>Landing Page',
      desc: 'Landing page futurista de um cruzeiro espacial, com animações imersivas.',
      previewClass: 'preview-space',
      tags: ['Angular', 'TypeScript', 'SCSS'],
      liveUrl: 'https://cruzeiro-astra.vercel.app',
      liveLabel: 'Ver site',
      githubUrl: 'https://github.com/jg4lves',
    },
    {
      id: 'app',
      name: 'MediLembrete<br>App Mobile',
      desc: 'App de notificação de remédios com alertas personalizáveis.',
      previewClass: 'preview-app',
      tags: ['Flutter', 'Dart', 'Mobile', 'Notificação'],
      liveUrl: '',
      liveLabel: 'Em breve',
      githubUrl: 'https://github.com/jg4lves',
    },
  ];
}

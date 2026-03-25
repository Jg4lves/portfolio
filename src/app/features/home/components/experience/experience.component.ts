import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  period: string;
  current: boolean;
  role: string;
  company: string;
  desc: string;
  techs: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  readonly experiences: Experience[] = [
    {
      period: 'JUL 2025 – ATUAL',
      current: true,
      role: 'Técnico em Manutenção',
      company: 'UFS / CCV',
      desc: 'Sustentação e evolução de sistemas críticos de inscrição em vestibulares, garantindo alta disponibilidade e desempenho mesmo em períodos de grande volume de acessos. Sou responsável pela resolução de incidentes em produção, manutenção de servidores Linux e bancos de dados, além do desenvolvimento e aprimoramento de aplicações web e APIs que asseguram o processamento seguro das inscrições.',
      techs: ['Java', 'Angular', 'PostgreSQL', 'Docker', 'Linux'],
    },
    {
      period: 'JAN 2025 – JUN 2025',
      current: false,
      role: 'Desenvolvedor de Software',
      company: 'Banese',
      desc: 'Desenvolvimento de SDK de segurança para aplicativo bancário, APIs REST em arquitetura de microsserviços, criptografia JWE e portal administrativo para gestão de regras do SDK.',
      techs: ['Java', 'Spring Boot', 'Next.js', 'MongoDB', 'Docker'],
    },
    {
      period: 'DEZ 2023 – SET 2025',
      current: false,
      role: 'Assessor de Projetos',
      company: 'Softeam — Empresa Júnior',
      desc: 'Condução e desenvolvimento de projetos de software em ambiente ágil, participando desde o levantamento de requisitos até a entrega final das soluções. Fui responsável pela organização de backlog, definição de soluções técnicas e liderança de equipe no desenvolvimento de uma landing page, além de contribuir com o desenvolvimento backend e entrega de aplicações web.',
      techs: ['Node.js', 'WordPress', 'JavaScript', 'Scrum', 'Kanban'],
    },
  ];
}

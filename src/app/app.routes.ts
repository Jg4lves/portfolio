import { Routes } from '@angular/router';
import { IntroAuthComponent } from './features/intro-auth/intro-auth.component';

export const routes: Routes = [
  { path: '', component: IntroAuthComponent }, 

  // opcional (fallback)
  { path: '**', redirectTo: '' }
];
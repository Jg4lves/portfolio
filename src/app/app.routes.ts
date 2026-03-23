import { Routes } from '@angular/router';
import { IntroAuthComponent } from './features/intro-auth/intro-auth.component';
import { HomeComponent } from './features/home/home.component';


export const routes: Routes = [
  { path: '', component: IntroAuthComponent }, 
  { path: 'home', component: HomeComponent },

  { path: '**', redirectTo: '' }
];
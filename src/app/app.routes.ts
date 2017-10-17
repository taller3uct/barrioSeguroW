import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componente home
import { HomeComponent } from './components/home/home.component';

import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';



const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'heroes', component: HeroesComponent }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

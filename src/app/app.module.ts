import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';

  // rutas
import {APP_ROUTING} from './app.routes';
import {HeroesService} from './servicios/heroes.service';
import { HeroeComponent } from './components/heroe/heroe.component';
import { BuscadorComponent } from './components/buscador/buscador.component';

// firebase
import { AngularFireModule } from 'angularfire2';
// CONFIGURACION FIREBASE
import { firebaseConfig } from '../config/firebase.config';
import { MapaComponent } from './components/mapa/mapa.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    HeroeComponent,
    BuscadorComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBma13x3APDDc42KgCzM5NZOozZpdJfgNA'})
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

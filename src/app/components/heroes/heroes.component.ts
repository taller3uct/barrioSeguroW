import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { HeroesService, Heroe } from '../../servicios/heroes.service';
// importar la ruta

import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Heroe[]= [];

  constructor( private _heroesService: HeroesService,
               private router: Router) {
  //  console.log('constructor');

  }

  ngOnInit() {

     this.heroes = this._heroesService.getHeroes();

    // console.log(this.heroes);
  }

    verHeroe(idx: number) {
      // cargo la ruta de navegacion de los heroes con idx que es el ide del arreglo
      this.router.navigate(['/heroe', idx]);
    }
}

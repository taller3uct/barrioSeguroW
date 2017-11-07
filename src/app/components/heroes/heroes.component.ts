import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { HeroesService, Heroe } from '../../servicios/heroes.service';
// importar la ruta
import { map } from 'rxjs/operator/map';


import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  busqueda: string;
  heroes: {}[];
  alarmas: Observable<any[]>;
  result: string;
  listado: any;
  Policia = 'Policia';

  ultimas = [
    { nombre: '24 horas', valor: 24 },
    { nombre: '12 horas', valor: 12 },
    { nombre: '6 horas', valor: 6 },
    { nombre: '3 horas', valor: 3 },
    { nombre: '1 hora', valor: 1 }
  ];
  ultimoActivo = this.ultimas[0];
  tipo = [
    { nombre: 'Todas', valor: '' },
    { nombre: 'Policiales', valor: 'Policial' },
    { nombre: 'Incendios', valor: 'Incendio' },
    { nombre: 'Ambulancias', valor: 'Ambulancia' }
  ];
  tipoActivo = this.tipo[0];

  usuarioActivo = { correo: 'todos', valor: '' };

  constructor(private _heroesService: HeroesService,
    private router: Router,
    private db: AngularFireDatabase) {
      this.getAlarmas();
  }
  ngOnInit() {
  }

  getAlarmas() {
    console.log(this.ultimos(this.ultimoActivo.valor));
    
    this.alarmas = this.db.list('alertas', ref => ref.orderByChild('tiempo')
    .startAt(this.ultimos(this.ultimoActivo.valor))).valueChanges();

    this.listado = this.alarmas.map(a => {
      return a.filter(b => {
        // tslint:disable-next-line:max-line-length
        return (b.tipo.toLowerCase().indexOf(this.tipoActivo.valor.toLowerCase()) > -1)
          ;
        //          ;
      });
    });
  }
filtroTipo(item) {
  this.tipoActivo = item;
  this.getAlarmas();
}

filtroUltimo(item) {
  this.ultimoActivo = item;
  this.getAlarmas();
}
filtroUsuario(item) {
  this.usuarioActivo = item;
  this.getAlarmas();
}


  verHeroe(idx: number) {
    // cargo la ruta de navegacion de los heroes con idx que es el ide del arreglo
    this.router.navigate(['/heroe', idx]);
  }

  ultimos(horas) {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() - horas);
    return hoy.getTime();
  }

}

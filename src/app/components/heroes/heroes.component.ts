import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { map } from 'rxjs/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  alarmas: Observable<any[]>;
  listado: any;


  ultimas = [
    { nombre: '1 Año', valor: 8760},
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

  getDesc= '';

  tipoActivo = this.tipo[0];
  usuarios: Array<any>;
  usuarioActivo = { correo: 'todos', valor: '' };

  constructor(
    private db: AngularFireDatabase) {

  }
  ngOnInit() {

    this.alarmas = this.db.list('alertas', ref => ref.orderByChild('tiempo')
    .startAt(this.ultimos(8760))).valueChanges();
    this.getAlarmas();

  }

  getAlarmas() {

    this.listado = this.alarmas.map(a => {
      return a.filter(b => {
        b.ver = false;
        return (b.tipo.toLowerCase().indexOf(this.tipoActivo.valor.toLowerCase()) > -1) &&
               (b.tiempo > this.ultimos(this.ultimoActivo.valor)) &&
               (b.descripcion.toLowerCase().indexOf(this.getDesc.toLowerCase()) > -1)

          ;
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
filtroDec(event) {
  this.getDesc = event.target.value;
  this.getAlarmas();
}

  ultimos(horas) {
    const hoy = new Date();
    hoy.setHours(hoy.getHours() - horas);
    return hoy.getTime();
  }

}

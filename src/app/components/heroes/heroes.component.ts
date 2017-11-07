import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { HeroesService, Heroe } from '../../servicios/heroes.service';
// importar la ruta
import { map } from 'rxjs/operator/map';


import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    busqueda: string;
    db: AngularFireDatabase;
    heroes: {}[];
    alarmas: Observable<any[]>;
    result: string;
    listado: any;
    Policia = 'Policia';
  constructor( private _heroesService: HeroesService,
               private router: Router,
               db: AngularFireDatabase) {

                  this.alarmas = db.list('/alertas', ref => ref.orderByChild('tiempo').startAt(this.ultimos())).valueChanges();

                  this.listado = this.alarmas.map( a => {
                    // console.log(a); //MAPEO
                    return a.filter(b => {
                      console.log(b.tipo , 'tipoos');
                      return b;
                      // tslint:disable-next-line:max-line-length
                      // return (b.tipo.toLowerCase().indexOf(this.Policia.toLowerCase()) > -1);
                    }); });

  }
  ngOnInit() {
  }

    verHeroe(idx: number) {
      // cargo la ruta de navegacion de los heroes con idx que es el ide del arreglo
      this.router.navigate(['/heroe', idx]);
    }
    mostrar_fecha(num: any) {
      // tslint:disable-next-line:prefer-const
      let Nfecha = new Date(num);
      let dia = '';
      let mes = '';

      if (Nfecha.getDay() === 1) {
        dia = 'Lunes ';
      } else if (Nfecha.getDay() === 2) {
        dia = 'Martes ';
      } else if (Nfecha.getDay() === 3) {
        dia = 'Miercoles ';
      } else if (Nfecha.getDay() === 4) {
        dia = 'Jueves ';
      } else if (Nfecha.getDay() === 5) {
        dia = 'Viernes ';
      } else if (Nfecha.getDay() === 6) {
        dia = 'Sabado ';
      } else if (Nfecha.getDay() === 7) {
        dia = 'Domingo ';
      }
      if (Nfecha.getMonth() === 0) {
        mes = ' Enero, ';
      } else if (Nfecha.getMonth() === 1) {
        mes = ' Febrero, ';
      } else if (Nfecha.getMonth() === 2) {
        mes = ' Marzo, ';
      } else if (Nfecha.getMonth() === 3) {
        mes = ' Abril, ';
      } else if (Nfecha.getMonth() === 4) {
        mes = ' Mayo, ';
      } else if (Nfecha.getMonth() === 5) {
        mes = ' Junio, ';
      } else if (Nfecha.getMonth() === 6) {
        mes = ' Julio, ';
      } else if (Nfecha.getMonth() === 7) {
        mes = ' Agosto, ';
      } else if (Nfecha.getMonth() === 8) {
        mes = ' Septiembre, ';
      } else if (Nfecha.getMonth() === 9) {
        mes = ' Octubre, ';
      } else if (Nfecha.getMonth() === 10) {
        mes = ' Noviembre, ';
      } else if (Nfecha.getMonth() === 11) {
        mes = ' Diciembre, ';
      }
      return dia + Nfecha.getDate() + mes + Nfecha.getFullYear() + ', ' + Nfecha.toLocaleTimeString();
}

ultimos() {
  let hoy = new Date();
  hoy.setDate(hoy.getDate() - 1);
  return hoy.getTime();
}

}

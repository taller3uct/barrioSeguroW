import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from '../../servicios/heroes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

// tslint:disable-next-line:class-name
export interface xalarmas {
              descripcion: string;
              lat: number;
              lon: number;
              tiempo: number;
              tipo: string;
      }

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
})
// tslint:disable-next-line:one-line

export class BuscadorComponent implements OnInit {
    alarmas2: Observable<any[]>;
    db: AngularFireDatabase;
    heroes: {}[];
    alarmas: Observable<any[]>;
    result: string;
    listado: any;
    listado2: any;
    listado3: any;

    termino: string;
    constructor( private activatedRoute: ActivatedRoute,
      private _heroesService: HeroesService,
                db: AngularFireDatabase) {
                this.alarmas = db.list('alertas').valueChanges();
                this.alarmas2 = db.list('alertas').valueChanges();

                          this.listado = this.alarmas.map( a => {
                            // console.log(a); //MAPEO
                            return a.filter(b => {
                              return (b.tipo.toLowerCase().indexOf(this.termino.toLowerCase()) > -1) || (b.tipo.toLowerCase().indexOf(this.termino.toLowerCase()) > -1)
;
                            //          ;
                            }); });

                            this.listado2 = this.alarmas.map( a => {
                              // console.log(a); //MAPEO
                              return a.filter(b => {
                                console.log(b.descripcion , 'tipoos');
                                console.log(this.mostrar_fecha(b.tiempo));
                                // return b.tipo;
                                // tslint:disable-next-line:max-line-length
                                return (b.descripcion.toLowerCase().indexOf(this.termino.toLowerCase()) > -1) || (b.descripcion.toLowerCase().indexOf(this.termino.toLowerCase()) > -1)
                                        ;
                              }); });

                              this.listado3 = this.alarmas2.map( a => {
                                // console.log(a); //MAPEO
                                return a.filter(b => {
                                  console.log(b.descripcion , 'tipoos');
                                  console.log(this.mostrar_fecha(b.tiempo));
                                  // return b.tipo;
                                  // tslint:disable-next-line:max-line-length
                                  return ((b.tiempo).toLowerCase().indexOf(this.termino.toLowerCase()) > -1) || ((b.tiempo).toLowerCase().indexOf(this.termino.toLowerCase()) > -1)
                                          ;
                                }); });





      }
  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
    this.termino = params['termino'];
    this.heroes = this._heroesService.buscarHeroes( params['termino']);
    console.log(this.heroes);
    // console.log('hola');
    });

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
    // tslint:disable-next-line:one-line



}

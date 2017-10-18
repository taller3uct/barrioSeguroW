import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from '../../servicios/heroes.service';
import { MapaComponent } from '../mapa/mapa.component';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  agm-map {
    height: 300px;
  }
`],
template: `
<agm-map [latitude]="lat" [longitude]="lng"></agm-map>
`
})
export class HeroeComponent {

  heroe: any[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor( private activatedRoute: ActivatedRoute,
               private _heroesService: HeroesService ) {
    this.activatedRoute.params.subscribe( params => {
      console.log( params['id'] );
      this.heroe = this._heroesService.getHeroe( params['id']);
      console.log(this.heroe);
    });
  }
}

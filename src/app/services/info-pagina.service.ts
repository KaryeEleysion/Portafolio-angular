import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada = false;

  constructor( private http: HttpClient) { 
// console.log('servicio pagina dude');

   // leer archivo Json
    this.http.get('assets/data/data-pagina.json')
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe( (resp: infoPagina) => {

        this.cargada = true;
        this.info = resp;
        console.log(resp);
        // console.log( resp['email'] );
      });
  }
}

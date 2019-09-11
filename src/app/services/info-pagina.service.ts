import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada = false;
equipo: any[] = [];

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe( ( resp: infoPagina ) => {

      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-36f27.firebaseio.com/equipo.json')
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe( (resp: any[]) => {
      this.equipo = resp;
      // console.log(resp);
    });
  }
}

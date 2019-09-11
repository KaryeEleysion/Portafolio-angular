import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  pruductos: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos() {

    this.http.get('https://angular-html-36f27.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: Producto[]) => {
        console.log(resp);
        this.pruductos = resp;

        setTimeout(() => {
        this.cargando = false;
        }, 200);
      });

  }
}

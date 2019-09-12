import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  pruductos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos() {

    return new Promise( ( resolve, reject)=> {

      this.http.get('https://angular-html-36f27.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: Producto[]) => {
        this.pruductos = resp;
        this.cargando = false;
        resolve();
      });

    });

   
  }
    getProducto( id: string ) {

      return this.http.get(`https://angular-html-36f27.firebaseio.com/productos/${ id }.json`);

    }

    buscarProducto( termino: string ){

      if ( this.pruductos.length ===0 ) {
        // cargar productos
        this.cargarProductos().then(  ()=> {
          // ejecutar despues de tener los productos
          // aplicar filtro
          this.filtrarProductos( termino );
        });

      } else {
          // aplicar el fintro
          this.filtrarProductos( termino );
      }

    }
    private filtrarProductos( termino: string ) {

      // console.log(this.pruductos);
      this.productosFiltrado = [];

      termino = termino.toLocaleLowerCase();

      this.pruductos.forEach( prod => {

        const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
          this.productosFiltrado.push( prod );
        }
      } );
    }
}

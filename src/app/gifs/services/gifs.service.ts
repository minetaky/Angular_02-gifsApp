import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //Nivel global de la app
})
export class GifsService {

  private _historial:  string[] = [];

  get historial(){
    return [...this._historial];
  }

  buscarGifs( query: string ){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query ); //para que Inserte al principio del arreglo
      this._historial = this.historial.splice(0,10);
    }

    console.log( this._historial );

  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //Nivel global de la app
})
export class GifsService {

  private _historial:  string[] = [];
  private _apiKey: string = 'Bh8qhx85rQR6tbRNVoO7h32OOCOgyfsv';

  get historial(){
    return [...this._historial];
  }

  constructor( private _http: HttpClient ){

  }

buscarGifs( query: string ){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query ); //para que Inserte al principio del arreglo
      this._historial = this.historial.splice(0,10);
    }

    //Forma 1 con promesas
/*    fetch('https://api.giphy.com/v1/gifs/search?api_key=Bh8qhx85rQR6tbRNVoO7h32OOCOgyfsv&q=como%20conoci%20a%20tu%20madre&limit=10')
   .then( resp => {
     resp.json().then( data => { 
      console.log( data );
     } ) 
   }) */

   //Forma 2 mas resumida: se debe marcar la funcion como: async
/*    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Bh8qhx85rQR6tbRNVoO7h32OOCOgyfsv&q=como%20conoci%20a%20tu%20madre&limit=10')
   const data = await resp.json();
   console.log( data ); */

   this._http.get('https://api.giphy.com/v1/gifs/search?api_key=Bh8qhx85rQR6tbRNVoO7h32OOCOgyfsv&q=como%20conoci%20a%20tu%20madre&limit=10')
   .subscribe( resp => {
     console.log( resp );
   });

  }



}

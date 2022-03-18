import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Nivel global de la app
})
export class GifsService {

  private _apiKey: string = 'Bh8qhx85rQR6tbRNVoO7h32OOCOgyfsv';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial:  string[] = [];
  
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }


  constructor( private _http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

buscarGifs( query: string ){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query ); //para que Inserte al principio del arreglo
      this._historial = this.historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial) );
      
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


   const params = new HttpParams()
                      .set('api_key', this._apiKey)
                      .set('limit', '10')
                      .set('q', query);

                  

   this._http.get<SearchGifsResponse>(`${ this._servicioUrl }/search`, { params } )
   .subscribe( (resp ) => {
     this.resultados = resp.data;
     localStorage.setItem('resultados', JSON.stringify( this.resultados) );
   });

  }



}

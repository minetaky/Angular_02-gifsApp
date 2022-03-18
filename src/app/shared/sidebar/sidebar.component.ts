import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get historial(){
    return [...this.gifServise.historial];
  }

  constructor(private gifServise:  GifsService) { }

  buscar( terminoBusqueda: string){
    this.gifServise.buscarGifs(terminoBusqueda);
  }
 

}

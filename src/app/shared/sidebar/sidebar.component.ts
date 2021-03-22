import { Component, ElementRef, ViewChild  } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;


  get historial() {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService  ) { }

  searchLimit(valor:string){
    this.gifsService.criteria( valor );
  }

  search( termino:string){
    this.gifsService.buscarGifs( termino );
  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0 ) {
      return;
    }
    this.gifsService.buscarGifs( valor );
    this.txtBuscar.nativeElement.value = '';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
  private limit : string = '10';

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || this.buscarGifs('welcome');
  }

  criteria(criteria: string = '10'){
    this.limit = criteria;
  }

  buscarGifs( query: string = '') {
    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial )  );
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', this.limit)
          .set('q', query )
          .set('lang','es');
    console.log(this.limit)
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados )  );
      });
  }
}

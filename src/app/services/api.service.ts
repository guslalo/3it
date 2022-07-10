import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url = 'api-sbifv3/recursos_api/'
  private format = '&formato=json' 

  constructor(private http: HttpClient) { }

  //getValues
  getValues(params:any, lastTendaysBoolean?:boolean): Observable<any> {
    if(lastTendaysBoolean == true){
      if(params.valueType == 'ipc' || params.valueType == 'utm'){ 
        return this.http.get<any>(
          environment.baseUrl + 
          this.url + 
          params.valueType +
          `/periodo/${params.oldYear}/${params.oldMonth}/${params.year}/${params.month}`+ 
          '?apikey='+ environment.apiKey + 
          this.format 
        );
      } 
      else { 
        return this.http.get<any>(
          environment.baseUrl + this.url + params.valueType +
          `/periodo/${params.year}/${params.oldMonth}/dias_i/${params.lastTendays}/${params.year}/${params.month}/dias_f/${params.currentDay}`+ 
          '?apikey='+ environment.apiKey + 
          this.format 
        );
      }
    } else {
      if(params.valueType == 'ipc' || params.valueType == 'utm'){
        return this.http.get<any>(
          environment.baseUrl + this.url + params.valueType +
          `/${params.year}`
           + '?apikey='+ environment.apiKey + 
           this.format 
        );
      } else {
        return this.http.get<any>(
          environment.baseUrl + this.url + params.valueType +
          `/periodo/${params.year}/${params.oldMonth}/dias_i/${params.oldDay}/${params.year}/${params.month}/dias_f/${params.currentDay}`+ 
          '?apikey='+ environment.apiKey + 
          this.format 
        );
      }
    }

  }
 
}

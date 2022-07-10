import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class ObjectService {

  public object = new BehaviorSubject(null)
  public button: BehaviorSubject<any> = new BehaviorSubject(null);
  public mk = new BehaviorSubject(null);
  public noPrice = new BehaviorSubject(null);
  public href: string = "?code=841F0DD945E14C9C";
  public urlCode:string;
  public salesChannel:boolean;
  public langNative:string
  public lang:string
  public langEs:boolean 


  getObjectObs(): Observable<any> {
    return this.object.asObservable();
  }

  getButtonService(): Observable<any> {
    return this.button.asObservable();
  }

  getMkService(): Observable<any> {
    return this.mk.asObservable();
  }

  getNoPriceService(): Observable<any> {
    return this.noPrice.asObservable();
  }

  setMkService(state:boolean) {
    this.mk.next(state);
  }
  setNoPrice(state:boolean) {
    this.noPrice.next(state);
  }

  setObjectObs(object: any) {
    this.object.next(object);
  }

  constructor(
    public apiService: ApiService, 
    private route: ActivatedRoute,
    private router: Router) {

      if(window.location.href.indexOf('type=mk') != -1){
        this.setMkService(true)
        } else {
        this.setMkService(false)
      }

      /*
      this.route.queryParams.subscribe(params => {
        console.log(params);
        if( params['type'] == 'mk' ){
          this.setMkService(true)
        } else {
          this.setMkService(false)
        }
      });*/


      this.langNative = window.navigator.language
      let lang = window.navigator.language.toLowerCase()
      if(lang.indexOf('-') != -1){
        this.lang = lang.split('-')[0]
        //console.log(this.lang )
        this.langFilter(this.lang)
      } else {
        this.lang = lang
        this.langFilter(this.lang)
      }
    }

    //filtro idioma
    langFilter(lang){
      console.log(lang)
      if(lang != 'es') {
        console.log('no espanol')
        let script = "app.goEvent('lang')"
        try {
          eval(script);
        } catch (error) {
          console.log(error)
        }
        this.langEs = false;
      } else {
        this.langEs = true;
        //console.log('espanol')
      }
      return lang
    }

  getEquipments(){
    if( this.langEs == true ) {

      if(window.location.href.indexOf('=') != -1){
        let urlCompleta = window.location.href
        let urlCodeSplit = urlCompleta.split('=')
        let urlParam = urlCodeSplit[1].split('?')[0]
        this.urlCode = urlParam
        console.log('code recibido', this.urlCode)

        } else {
          this.urlCode = '841F0DD945E14C9C'
          console.log('asigna code ',this.urlCode )
      }
      if(this.urlCode != '841F0DD945E14C9C' ){
        this.apiService.getEquipments(this.urlCode).subscribe(
          data => {
            console.log(data)
            let valor =  data.equipment.equipment_details[0].adscreen[0].equipment_plan[0].price_1;
            console.log(valor)
            let cantCouta =  data.equipment.equipment_details[0].adscreen[0].equipment_plan[0].cuote_number;
            console.log(cantCouta)
            if(valor == null || valor == 0 ){
              this.setNoPrice(true)
            } else {
              this.setNoPrice(false)
            }
    
          let typePrice = data.equipment.equipment_details[0].adscreen[0].plan[0].type_price?.name.toLowerCase()
    
        
            if(data.device.subsidiary_relation.sales_channel != 1){
              this.salesChannel = false
              console.log('canal1', this.salesChannel)
              console.log(typePrice)
    
              switch(typePrice) { 
                  case 'prepago': { 
                    this.router.navigate(['prepago'])
                    break; 
                  } 
                  case 'mandato': { 
                    this.router.navigate(['mandato'])
                    break; 
                  } 
                  case 'mandatolight': { 
                    this.router.navigate(['mandato-light'])
                    break; 
                  } 
                  case 'PlanSinPrecio': { 
                    this.router.navigate(['mandato-light'])
                    break; 
                  } 
                 /* case 'prepago': { 
                    this.router.navigate(['prepago-peru'])
                    break; 
                  } 
                  default: { 
                    break; 
                  } */
              } 
              
            } else {
              this.salesChannel = true
              console.log('canal1', this.salesChannel)
              this.router.navigate([''])
            }
            this.setObjectObs(data)
          }, 
          error => {
            console.log(error)
          }
        )
      } else {
        this.apiService.getEquipments(this.urlCode).subscribe(
          data => {
            console.log(data)
            let valor =  data.equipment.equipment_details[0].adscreen[0].equipment_plan[0].price_1;
            console.log(valor)
            let cantCouta =  data.equipment.equipment_details[0].adscreen[0].equipment_plan[0].cuote_number;
            console.log(cantCouta)
            if(valor == null || valor == 0 ){
              this.setNoPrice(true)
            } else {
              this.setNoPrice(false)
            }
    
          let typePrice = data.equipment.equipment_details[0].adscreen[0].plan[0].type_price?.name.toLowerCase()
    
        
            if(data.device.subsidiary_relation.sales_channel != 1){
              this.salesChannel = false
              console.log('canal1', this.salesChannel)
              console.log(typePrice)
    
              this.router.navigate(['plan-peru'])
              
            } else {
              this.salesChannel = true
              console.log('canal1', this.salesChannel)
              this.router.navigate(['plan-peru'])
            }
            this.setObjectObs(data)
          }, 
          error => {
            console.log(error)
          }
        )
      }
     


    } else {
      //alert( 'la aplicación necesita idioma español')
    }

  
  }


}

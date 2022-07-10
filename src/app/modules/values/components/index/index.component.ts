import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import * as moment from 'moment';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class IndexComponent implements OnInit {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public loaded:boolean = true
  public loaderChart:boolean = true
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public params = { }
  public object:any = { }
  public valueType:string = ''
  public oldDay:string = ''
  public currentDay:string = ''
  public oldMonth:string = ''
  public month:string = ''
  public year:string = ''
  public oldYear:string = ''
  public values:Array<any> = []
  public valuesChart:Array<any> = []
  public lastTendays:string = ''
  public typeRange: string = ''

  constructor(
    private route : ActivatedRoute,
    private ApiService : ApiService
    ) { }

  ngOnInit(): void {
    this.valueType = this.route.snapshot.params['type'];
    this.year = moment().year().toString()
    this.oldDay = moment().subtract(30, 'days').format('DD') 
    this.currentDay = moment().date().toString()
    this.oldMonth =  moment().subtract().month().toString()  
    this.month =  moment().format('MM')
    this.getValues(this.valueType)
  }

  //open modal
  openModal(item:any) {
    this.object = item
    if(this.valueType == 'ipc' || this.valueType == 'utm'){ 
      this.typeRange = '12 meses'
      this.oldMonth =  moment(item.Fecha).format('MM') 
      this.oldYear = moment().subtract(12, 'months').format('YYYY') 
      this.month =  moment(item.Fecha).format('MM')
     } else {
      this.typeRange = '10 días'
      this.currentDay =  moment(item.Fecha).format('DD') 
      this.lastTendays =  moment(item.Fecha).subtract(10, 'days').format('DD')
      this.oldMonth =  moment(item.Fecha).subtract(10, 'days').format('MM')
      this.month =  moment(item.Fecha).format('MM') 
    }
    this.getValues(this.valueType, true)
  }

  //chart
  chart(data:[any]){
    this.lineChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Últimos' + this.typeRange,
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        },
      ],
    };
    data.forEach(element => {
      this.lineChartData.datasets[0].data.push(parseFloat(element.Valor))
      this.lineChartData.labels?.push(moment(element.Fecha).format('DD-MM-YYYY') )
    });
  }

  //get Values
  getValues(type:string, lastTendaysBoolean?:boolean){
    this.loaderChart = true
    this.params = {
      'valueType': this.valueType,
      'year': this.year,
      'oldYear': this.oldYear,
      'oldDay': this.oldDay,
      'currentDay': this.currentDay,
      'oldMonth': this.oldMonth,
      'month': this.month,
      'lastTendays': this.lastTendays 
    }
    if(lastTendaysBoolean == true){
      this.ApiService.getValues(this.params, true).subscribe(
        data => {
          this.loaderChart = false
          switch(type) { 
            case 'dolar': { 
              this.chart(data.Dolares)
              break; 
            } 
            case 'euro': { 
              this.chart(data.Euros)
              break; 
            } 
            case 'ipc': { 
              this.chart(data.IPCs)
              break; 
            } 
            case 'uf': { 
              this.chart(data.UFs)
              break; 
            } 
            case 'utm': { 
              this.chart(data.UTMs)
              break; 
            } 
          } 
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.ApiService.getValues(this.params, false).subscribe(
        data => {
          this.loaded = false
          switch(type) { 
            case 'dolar': { 
              this.values = data.Dolares
              break; 
            } 
            case 'euro': { 
              this.values = data.Euros
              break; 
            } 
            case 'ipc': { 
              this.values = data.IPCs
              break; 
            } 
            case 'uf': { 
              this.values = data.UFs
              break; 
            } 
            case 'utm': { 
              this.values = data.UTMs
              break; 
            } 
          }
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}

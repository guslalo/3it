import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { IndexRoutingModule } from './index-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgChartsModule
  ]
})

export class IndexModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [IndexComponent, HeaderComponent],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})

export class IndexModule { }

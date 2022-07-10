import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path:'', component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./../index/index.module').then((m) => m.IndexModule)
      },
      {
        path: 'values/:type',
        loadChildren: () => import('./../values/index.module').then((m) => m.IndexModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexRoutingModule { }

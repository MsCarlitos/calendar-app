import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

@NgModule({
  exports:[
    TableModule,
    PanelModule
  ]
})
export class PrimeNgModule { }

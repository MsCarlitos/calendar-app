import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    PrimeNgModule,
    CalendarComponent
  ]
})

export class SharedModule { }

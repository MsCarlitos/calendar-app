import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export interface MonthDetails {
  year: number;
  totalDays: number;
  month: string;
  semana: Semana[];
}

export interface Semana {
  diaSemana: string;
  dias: number[];
}

@Component({
  selector: 'shared-calendar',
  templateUrl: './calendar.component.html',
  styles: [
  ]
})

export class CalendarComponent implements OnInit{

  public calendario!: MonthDetails[]|any;
  public next: number = 0;
  public currentDay: any;

  public holyDays = [
    'January 1',
    'February 5',
    'March 18',
    'May 1',
    'September 16',
    'November 20',
    'December 25',
  ]
  // Holy Days

  constructor() {}

  ngOnInit(): void {
    moment().locale('es');
    this.getMonth();
  }
  getMonth(month: number = -1) {
    this.currentDay = parseInt(moment().format().split('-')[2]);
    const currentMonth: number = parseInt(moment().format().split('-')[1]);
    const currentYear: number = new Date().getFullYear();
    const months: string = moment([currentYear, 0, 31])
                          .month(currentMonth + month)
                          .format('YYYY-MMMM-DD');
    const monthDetail = this.getDayAndMonth(months);
    const week = this.getWeek(monthDetail);
    const calendar =  [{
      ...monthDetail,
      semana: week
    }];

    this.calendario = calendar;
  }

  nextMonth() {
    this.getMonth(this.next++)
  }
  previousMonth() {
    this.getMonth(this.next--)
  }
  getDayAndMonth(months: string) {
    const month: string = months.split('-')[1];
    const year: number = parseInt(months.split('-')[0]);
    const totalDays: number = parseInt(months.split('-')[2]);
    return {
      year: year,
      month: month,
      totalDays: totalDays
    };
  }

  getWeek({ totalDays, year, month }: any) {
    let domingo   = [];
    let lunes     = [];
    let martes    = [];
    let miercoles = [];
    let jueves    = [];
    let viernes   = [];
    let sabado    = [];

    for (let i = 0; i <= totalDays; i++) {
      let weekDay = new Date(`${month} ${i}, ${year}`).getUTCDay();

      if( i === 1 ){
        if( weekDay === 1) {
          domingo.push([0, false]);
        }
        if( weekDay === 2) {
          domingo.push([0, false]);
          lunes.push([0, false]);
        }
        if( weekDay === 3) {
          domingo.push([0, false]);
          lunes.push([0, false]);
          martes.push([0, false]);
        }
        if( weekDay === 4) {
          domingo.push([0, false]);
          lunes.push([0, false]);
          martes.push([0, false]);
          miercoles.push([0, false]);
        }
        if( weekDay === 5) {
          domingo.push([0, false]);
          lunes.push([0, false]);
          martes.push([0, false]);
          miercoles.push([0, false]);
          jueves.push([0, false]);
        }
        if( weekDay === 6) {
          domingo.push([0, false]);
          lunes.push([0, false]);
          martes.push([0, false]);
          miercoles.push([0, false]);
          jueves.push([0, false]);
          viernes.push([0, false]);
        }
      }

      if(weekDay === 0) domingo.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 1) lunes.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 2) martes.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 3) miercoles.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 4) jueves.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 5) viernes.push([i, this.getHolyDay(`${month} ${i}`)]);
      if(weekDay === 6) sabado.push([i, this.getHolyDay(`${month} ${i}`)]);

    }
    if( lunes.length === 4 ) lunes.push(0);
    if( martes.length === 4 ) martes.push(0);
    if( miercoles.length === 4 ) miercoles.push(0);
    if( jueves.length === 4 ) jueves.push(0);
    if( viernes.length === 4 ) viernes.push(0);
    if( sabado.length === 4 ) sabado.push(0);
    if( domingo.length === 4 ) domingo.push(0);

    if( lunes.length === 6 ) lunes.pop();
    if( martes.length === 6 ) martes.pop();
    if( miercoles.length === 6 ) miercoles.pop();
    if( jueves.length === 6 ) jueves.pop();
    if( viernes.length === 6 ) viernes.pop();
    if( sabado.length === 6 ) sabado.pop();
    if( domingo.length === 6 ) domingo.pop();

    return ([
      { diaSemana: 'Domingo', dias: domingo, color: 'yellow', festivo: false },
      { diaSemana: 'Lunes', dias: lunes, color: 'green', festivo: false },
      { diaSemana: 'Martes', dias: martes, color: 'green', festivo: false },
      { diaSemana: 'Miercoles', dias: miercoles, color: 'green', festivo: false },
      { diaSemana: 'Jueves', dias: jueves, color: 'green', festivo: false },
      { diaSemana: 'Viernes', dias: viernes, color: 'green', festivo: false },
      { diaSemana: 'Sabado', dias: sabado, color: 'yellow', festivo: false },
    ]);
  }

  getHolyDay(calendar: any) {
    if( this.holyDays.includes( calendar )) {
      return true
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Week, Months } from '../interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl:string = environments.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getWeek(): Observable<Week[]> {
    return this.http.get<Week[]>(`${this.baseUrl}/week`)
  }

  getMonth(): Observable<Months[]> {
    return this.http.get<Months[]>(`${this.baseUrl}/months`)
  }
}

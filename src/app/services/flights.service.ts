import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightsWeather } from './types/report';
import { map, Observable } from 'rxjs';

interface IataResponse {
  iataKeys: string[]; // O simplemente 'string[]' si no hay más propiedades
}

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getFlightsWeeather(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('csvFile', file);
    return this.http.post<any>(`${this.apiUrl}flight/weather`, formData);
  }

  getIataKeys(): Observable<IataResponse> {
    return this.http.get<IataResponse>(`${this.apiUrl}flight/iatakeys`);
  }
}

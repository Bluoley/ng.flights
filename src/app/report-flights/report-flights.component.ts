import { Component } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { FlightsWeather } from '../services/types/report';

@Component({
  selector: 'app-report-flights',
  standalone: true,
  imports: [],
  templateUrl: './report-flights.component.html',
  styleUrl: './report-flights.component.css',
})
export class ReportFlightsComponent {
  fileName: string = '';
  IataCodes: Array<string> = [];
  uniqueIataCodes: Array<string> = [];
  dataFlights: FlightsWeather[] = [];

  constructor(private flightService: FlightsService) {
    this.getIataKeys();
  }

  getIataKeys() {
    this.flightService.getIataKeys().subscribe({
      next: (iata) => {
        this.uniqueIataCodes = iata.iataKeys;
      },
    });
  }

  getFlights(file: File) {
    this.flightService.getFlightsWeeather(file).subscribe({
      next: (data) => {
        this.dataFlights = data.resultArray.flat();
      },
    });
  }

  truncate(value: number): number {
    return Math.trunc(value);
  }

  processCSV(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.getFlights(file);
    }
  }
}

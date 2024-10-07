import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./report-flights/report-flights.component').then(
        (comp) => comp.ReportFlightsComponent
      ),
  },
];

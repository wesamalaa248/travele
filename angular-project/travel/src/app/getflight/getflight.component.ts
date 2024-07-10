import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-getflight',
  templateUrl: './getflight.component.html',
  styleUrls: ['./getflight.component.css']
})
export class GetflightComponent implements OnInit {
  flights: any[] = [];
  isSidebarOpen: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(): void {
    this.apiService.getFlights().subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  deleteFlight(id: number): void {
    this.apiService.deleteFlight(id).subscribe(
      () => {
        this.flights = this.flights.filter(flight => flight.id !== id);
        alert('Flight deleted successfully!');
      },
      (error) => {
        console.error('Error deleting flight:', error);
      }
    );
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  searchForm: FormGroup;
  adults = 1;
  showPassengerForm = false;
  noFlightsFound = false;
  showMessage = false;
  messageText = '';

  constructor(private apiService: ApiService,private router: Router,
    private fb: FormBuilder,private authService:AuthService) {

    this.searchForm = this.fb.group({
      leavingFrom: ['', Validators.required],
      goingTo: ['', Validators.required],
      departDate: ['', Validators.required],
      classType: ['Economy', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(): void {
    this.apiService.getFlights().subscribe((flights) => {
      this.flights = flights;
      this.filteredFlights = flights;
    });
  }

  searchFlights(): void {
    const searchCriteria = this.searchForm.value;
    this.apiService.searchFlights(searchCriteria).subscribe((flights) => {
      this.filteredFlights = flights;
      this.noFlightsFound = flights.length === 0;
    });
  }

  togglePassengerForm(): void {
    this.showPassengerForm = !this.showPassengerForm;
  }

  updateCount(type: string, change: number): void {
    if (type === 'adults') {
      this.adults += change;
    }
  }

  
  navigateToTicket(flight: any): void {
    if (!this.authService.isLogin()) {
      // Show message and redirect to login
      alert('Please log in to reserve a flight.');
      // this.showMessage = true;
      this.router.navigate(['/login']);
      return;
    }

    if (!this.searchForm.value.travelClass) {
      alert('Please choose a class type.');
      return;
    }
    const updatedDetails = {
      travel_class: this.searchForm.value.classType,
      price: flight.price
    };
    this.apiService.updateFlightDetails(flight.id, updatedDetails).subscribe({
      next: () => {
        this.router.navigate(['/ticket'], { state: { flight, travelClass: this.searchForm.value.travelClass } });
      },
      error: (err) => {
        console.error('Error updating flight details:', err);
      }
    });
  }

  
  
  
}

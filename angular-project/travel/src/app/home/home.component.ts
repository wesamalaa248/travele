import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  trips: any[] = [];

  searchForm: FormGroup;

  searchCriteria = {
    destination: '',
    start_date: '',
    end_date: '',
    guests: '1 room, 2 adults, 0 children'
  };

  constructor(private fb: FormBuilder,private apiservice: ApiService,private router: Router) { 
    this.searchForm = this.fb.group({
      destination: ['']
    });
  }

  ngOnInit(): void {
    this.fetchTrips();
  }

  fetchTrips(): void {
    this.apiservice.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
      }
    });
  }
  

  getFlagImage(destination: string): string {
    switch (destination.toLowerCase()) {
      case 'hurghada':
        return 'cairo.png';
      case 'makkah':
        return 'saudi.png';
      case 'cairo':
        return 'cairo.png';
      case 'dubai':
        return 'dubai.png';
      case 'alexandria':
        return 'cairo.png';
      case 'turkey':
        return 'turkey.png';
      default:
        return 'default.png';
    }
  }

  searchHotels(): void {
    const destination = this.searchForm.get('destination')?.value;
    this.router.navigate(['/hotels'], { queryParams: { destination } });
  }
  
  navigateHotelsdeal(): void {
    this.router.navigate(['/hotels'], { queryParams: { discount: true } });
  }
  
  
  navigateToHotels(tripId: number): void {
    this.router.navigate(['/hotels', tripId]);
  }

}

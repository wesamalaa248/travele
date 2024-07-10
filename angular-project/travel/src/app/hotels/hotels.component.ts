import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  allHotels: any[] = [];
  filteredHotels: any[] = [];
  searchForm: FormGroup;
  totalPrice: number | null = null;
  adults: number = 1;
  rooms: number = 1;
  showPassengerForm: boolean = false;
  tripId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      numguests: [1, Validators.required],
      numrooms: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tripId = params['id'] ? +params['id'] : null;
      this.fetchHotels();
    });
    
    this.route.queryParams.subscribe(params => {
      if (params['discount']) {
        this.fetchHotelsWithDiscount();
      } else {
        this.fetchHotels();
      }
    });
    
  }

  fetchHotels(): void {
    if (this.tripId !== null) {
      this.apiService.getHotelsByTrip(this.tripId).subscribe({
        next: (data) => {
          this.filteredHotels = data;
        },
        error: (err) => {
          console.error(`Error fetching hotels for trip ${this.tripId}:`, err);
        }
      });
    } else {
      this.apiService.getHotels().subscribe({
        next: (data) => {
          this.allHotels = data;
          this.filteredHotels = this.allHotels;
        },
        error: (err) => {
          console.error('Error fetching all hotels:', err);
        }
      });
    }
  }
  fetchHotelsWithDiscount(): void {
    this.apiService.getHotelsWithDiscount().subscribe({
      next: (data) => {
        this.filteredHotels = data;
      },
      error: (err) => {
        console.error('Error fetching hotels with discount:', err);
      }
    });
  }

  searchHotels(): void {
    const { destination, checkin, checkout, numguests, numrooms } = this.searchForm.value;

    this.apiService.searchHotels({ destination }).subscribe({
      next: (data) => {
        this.filteredHotels = data;
        
        // Update hotels in database
        this.apiService.updateHotels({
          checkin,
          checkout,
          duration: this.calculateDuration(checkin, checkout),
          numguests,
          numrooms,
          totalprice: this.totalPrice  // Assuming you have totalPrice properly calculated
        }).subscribe({
          next: (updatedHotels) => {
            this.filteredHotels = updatedHotels;
          },
          error: (err) => {
            console.error('Error updating hotels:', err);
          }
        });

        // Calculate total price for each hotel
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error searching hotels:', err);
      }
    });
}


  calculateDuration(checkin: string, checkout: string): number {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24);
    return Math.ceil(duration);
  }

  calculateTotalPrice(): void {
    const { checkin, checkout, numguests, numrooms } = this.searchForm.value;

    this.filteredHotels.forEach(hotel => {
      const bookingData = {
        checkin,
        checkout,
        numguests,
        numrooms,
        price_per_night: hotel.price_per_night, // Use price_per_night from hotel object
      };

      this.apiService.calculateTotalPrice(bookingData).subscribe({
        next: (response) => {
          hotel.duration = response.duration;
          hotel.totalPrice = response.totalprice;
          hotel.numguests = numguests;
          hotel.numrooms = numrooms;
        },
        error: (err) => {
          console.error('Error calculating total price:', err);
        }
      });
    });
}

  viewHotelDetails(hotel: any): void {
    if (hotel && hotel.id) {
      // Update hotel details before navigating
      const updatedHotelDetails = {
        checkin: this.searchForm.value.checkin,
        checkout: this.searchForm.value.checkout,
        duration: hotel.duration,
        numguests: hotel.numguests,
        numrooms: hotel.numrooms,
        totalprice: hotel.totalPrice
      };
  
      this.apiService.updateHotelDetails(hotel.id, updatedHotelDetails).subscribe({
        next: () => {
          this.router.navigate(['/hoteldetails', hotel.id], {
            queryParams: updatedHotelDetails
          });
        },
        error: (err) => {
          console.error('Error updating hotel details:', err);
        }
      });
    } else {
      console.error('Hotel ID is undefined or null:', hotel);
    }
  }

  updateCount(type: string, increment: number): void {
    if (type === 'adults' && this.adults + increment >= 1) {
      this.adults += increment;
    } else if (type === 'rooms' && this.rooms + increment >= 1) {
      this.rooms += increment;
    }
    this.searchForm.patchValue({ numguests: this.adults, numrooms: this.rooms });
  }

  togglePassengerForm(): void {
    this.showPassengerForm = !this.showPassengerForm;
  }
}

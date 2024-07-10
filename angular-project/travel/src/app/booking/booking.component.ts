// src/app/booking/booking.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  hotel: any = {};
  form: FormGroup;
  totalPriceAfterDiscount: number = 0;
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const hotelId = +params['id'];
      this.fetchHotelDetails(hotelId);
    });
  }

  fetchHotelDetails(id: number): void {
    this.apiService.getHotelDetails(id).subscribe({
      next: (data) => {
        this.hotel = data;
        this.calculateTotalPriceAfterDiscount();
      },
      error: (err) => {
        console.error('Error fetching hotel details:', err);
      }
    });
  }

  calculateTotalPriceAfterDiscount(): void {
    if (this.hotel) {
      const discount = this.hotel.discount || 0;
      this.totalPriceAfterDiscount = this.hotel.totalprice - (this.hotel.totalprice * (discount / 100));
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const bookingDetails = {
        ...this.form.value,
        hotel_id: this.hotel.id,
        total_price: this.hotel.totalprice  // Send the original price to the backend
      };

      // Update the UI with the discounted price before sending to the backend
      this.totalPriceAfterDiscount = this.hotel.totalprice - (this.hotel.totalprice * (this.hotel.discount / 100));

      this.apiService.createBooking(bookingDetails).subscribe({
        next: (response) => {
          console.log('Booking successful:', response);
          this.successMessage = 'booking has been successfully';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000); 
        },
        error: (err) => {
          console.error('Error creating booking:', err);
        }
      });
    }
  }

  changeSelection(): void {
    alert('Change your selection clicked!');
    this.router.navigate(['/hotels']);
  }
}

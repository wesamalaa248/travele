import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hoteldetails',
  templateUrl: './hoteldetails.component.html',
  styleUrls: ['./hoteldetails.component.css']
})
export class HoteldetailsComponent implements OnInit {
  hotel: any = {};
  form: FormGroup;
  hotelId!: number;
  reviews: any[] = [];
  
  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router,private apiservice: ApiService ,private authService:AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['id'];
      this.fetchHotelDetails(this.hotelId);
      this.loadReviews();
    });

  }
  fetchHotelDetails(id: number): void {
    this.apiservice.getHotelDetails(id).subscribe({
      next: (data) => {
        this.hotel = data;
      },
      error: (err) => {
        console.error('Error fetching hotel details:', err);
      }
    });
  }

  reserveNow(): void {
    if (!this.authService.isLogin()) {
      // Show message and redirect to login
      alert('Please log in to reserve a Hotel.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/booking', this.hotel.id]);
  }

  loadReviews(): void {
    if (this.hotelId) {
      this.apiservice.getReviews(this.hotelId).subscribe(
        (data) => {
          this.reviews = data;
        },
        (error) => {
          console.error('Error loading reviews: ', error);
        }
      );
    }
  }

  addReview(): void {
    if (this.form.valid && this.hotelId) {
      this.apiservice.addReview(this.hotelId, this.form.value).subscribe(
        () => {
          this.loadReviews();
          this.form.reset();
        },
        (error) => {
          console.error('Error adding review: ', error);
        }
      );
    } else {
      console.log('Form is invalid or hotelId is missing');
    }
  }

  onSubmit(): void {
    this.addReview();
  }

  
}

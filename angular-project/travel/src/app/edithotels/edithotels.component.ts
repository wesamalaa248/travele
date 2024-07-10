import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edithotels',
  templateUrl: './edithotels.component.html',
  styleUrls: ['./edithotels.component.css']
})
export class EdithotelsComponent {
  hotelForm: FormGroup;
  selectedFile: File | null = null;
  hotelId: number;
  trips: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiservice: ApiService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      rate: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      discount: ['', Validators.required],
      hoteldetails: ['', Validators.required],
      price_per_night: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      trip_id: ['', Validators.required],
    });

    this.hotelId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchTrips();
    this.loadHotel();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  fetchTrips(): void {
    this.apiservice.getTrips().subscribe(
      (trips) => {
        this.trips = trips;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  loadHotel(): void {
    this.apiservice.getHotelDetails(this.hotelId).subscribe({
      next: (hotel) => {
        this.hotelForm.patchValue(hotel);
      },
      error: (err) => {
        console.error('Error loading hotel:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      const formData = new FormData();
      formData.append('name', this.hotelForm.get('name')?.value);
      formData.append('location', this.hotelForm.get('location')?.value);
      formData.append('rate', this.hotelForm.get('rate')?.value);
      formData.append('discount', this.hotelForm.get('discount')?.value);
      formData.append('hoteldetails', this.hotelForm.get('hoteldetails')?.value);
      formData.append('price_per_night', this.hotelForm.get('price_per_night')?.value);
      formData.append('trip_id', this.hotelForm.get('trip_id')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.apiservice.updateHotel(this.hotelId, formData).subscribe({
        next: response => {
          console.log('Hotel updated successfully!', response);
          this.successMessage = 'Hotel updated successfully!';
          this.router.navigate(['/gethotel']);
        },
        error: err => {
          console.error('Error updating hotel:', err);
          this.errorMessage = 'Form is invalid or no files selected';
        }
      });
    }
  }

}

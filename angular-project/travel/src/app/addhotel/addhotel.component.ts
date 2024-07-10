import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css']
})
export class AddhotelComponent {
  hotelForm: FormGroup;
  selectedFile: File | null = null;
  trips: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiservice: ApiService, private fb: FormBuilder,private router: Router) {
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
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  ngOnInit(): void {
    this.fetchTrips();
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

      this.apiservice.addHotel(formData).subscribe({
        next: response => {
          console.log('Hotel added successfully!', response);
          this.successMessage = 'Hotel added successfully!';
          this.hotelForm.reset();
          this.router.navigate(['/gethotel']);
        },
        error: err => {
          console.error('Error adding hotel:', err);
          this.errorMessage = 'Form is invalid or no files selected';
        }
      });
    }
  }
}

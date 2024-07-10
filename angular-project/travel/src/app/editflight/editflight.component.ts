import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editflight',
  templateUrl: './editflight.component.html',
  styleUrls: ['./editflight.component.css']
})
export class EditflightComponent implements OnInit {
  flightForm: FormGroup;
  selectedFile: File | null = null;
  flightId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  trips: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private apiservice: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      flight_number: ['', Validators.required],
      departure_airport: ['', Validators.required],
      departure_time: ['', Validators.required],
      arrival_airport: ['', Validators.required],
      arrival_time: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      travel_class: ['', Validators.required],
      trip_id: ['', Validators.required],
      airline_image: ['']
    });
  }

  ngOnInit(): void {
    this.fetchTrips();
    this.flightId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.flightId;
    if (this.isEditMode) {
      this.loadFlight();
    }
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

  loadFlight(): void {
    this.apiservice.getFlight(this.flightId!).subscribe({
      next: (flight) => {
        this.flightForm.patchValue(flight);
      },
      error: (err) => {
        console.error('Error loading flight:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const formData = new FormData();
      formData.append('airline', this.flightForm.get('airline')?.value);
      formData.append('flight_number', this.flightForm.get('flight_number')?.value);
      formData.append('departure_airport', this.flightForm.get('departure_airport')?.value);
      formData.append('departure_time', this.flightForm.get('departure_time')?.value);
      formData.append('arrival_airport', this.flightForm.get('arrival_airport')?.value);
      formData.append('arrival_time', this.flightForm.get('arrival_time')?.value);
      formData.append('duration', this.flightForm.get('duration')?.value);
      formData.append('price', this.flightForm.get('price')?.value);
      formData.append('travel_class', this.flightForm.get('travel_class')?.value);
      formData.append('trip_id', this.flightForm.get('trip_id')?.value);
      if (this.selectedFile) {
        formData.append('airline_image', this.selectedFile, this.selectedFile.name);
      }

      if (this.isEditMode) {
        this.apiservice.updateFlight(this.flightId!, formData).subscribe({
          next: response => {
            this.successMessage = 'Flight updated successfully!';
            this.router.navigate(['/getflight']);
          },
          error: err => {
            console.error('Error updating flight:', err);
            this.errorMessage = 'Error updating flight';
          }
        });
      } else {
        this.apiservice.addFlight(formData).subscribe({
          next: response => {
            this.successMessage = 'Flight added successfully!';
            this.router.navigate(['/getflight']);
          },
          error: err => {
            console.error('Error adding flight:', err);
            this.errorMessage = 'Error adding flight';
          }
        });
      }
    } else {
      this.errorMessage = 'Form is invalid';
    }
  }
}

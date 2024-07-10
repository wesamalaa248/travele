import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {
  flightForm: FormGroup;
  selectedFile: File | null = null;
  flightId: number | null = null;
  isEditMode: boolean = false;
  trips: any[] = [];
  message: string = ''; // Define message property
  messageClass: string = ''; // Define messageClass property

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.flightForm = this.formBuilder.group({
      airline: ['', Validators.required],
      flight_number: ['', Validators.required],
      departure_airport: ['', Validators.required],
      departure_time: ['', Validators.required],
      arrival_airport: ['', Validators.required],
      arrival_time: ['', Validators.required],
      price: ['', Validators.required],
      travel_class: ['', Validators.required],
      duration: ['', Validators.required],
      trip_id: [''],
      airline_image: ['']
    });
  }

  ngOnInit(): void {
    this.fetchTrips();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.flightId = +idParam;
        if (this.flightId) {
          this.isEditMode = true;
          this.loadFlight(this.flightId);
        }
      }
    });
  }

  fetchTrips(): void {
    this.apiService.getTrips().subscribe(
      (trips) => {
        this.trips = trips;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  loadFlight(id: number): void {
    this.apiService.getFlight(id).subscribe(
      (flight) => {
        // Populate form fields with flight data
        console.log('Fetched flight:', flight); // Check the fetched flight data
        this.flightForm.patchValue({
          airline: flight.airline,
          flight_number: flight.flight_number,
          departure_airport: flight.departure_airport,
          departure_time: flight.departure_time,
          arrival_airport: flight.arrival_airport,
          arrival_time: flight.arrival_time,
          price: flight.price,
          travel_class: flight.travel_class,
          duration: flight.duration,
          trip_id: flight.trip_id,
          airline_image: flight.airline_image // Assuming you're showing existing image if any
        });
      },
      (error) => {
        console.error('Error fetching flight:', error);
      }
    );
  }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const formData = new FormData();
      Object.keys(this.flightForm.controls).forEach(key => {
        if (this.flightForm.get(key)?.value) {
          formData.append(key, this.flightForm.get(key)?.value);
        }
      });
  
      if (this.selectedFile) {
        formData.append('airline_image', this.selectedFile, this.selectedFile.name);
      }
  
      if (this.isEditMode && this.flightId !== null) {
        this.apiService.updateFlight(this.flightId, formData).subscribe(
          () => {
            this.message = 'Flight updated successfully';
            this.messageClass = 'success';
            this.router.navigate(['/getflight']);
          },
          (error) => {
            if (error.status === 422) {
              // Handle validation errors
              const validationErrors = error.error.errors;
              this.message = 'Validation error: ' + JSON.stringify(validationErrors);
            } else {
              this.message = 'Error updating flight: ' + error.message;
            }
            this.messageClass = 'error';
          }
        );
      } else {
        this.apiService.addFlight(formData).subscribe(
          () => {
            this.message = 'Flight added successfully';
            this.messageClass = 'success';
            this.router.navigate(['/getflight']);
          },
          (error) => {
            if (error.status === 422) {
              // Handle validation errors
              const validationErrors = error.error.errors;
              this.message = 'Validation error: ' + JSON.stringify(validationErrors);
            } else {
              this.message = 'Error adding flight: ' + error.message;
            }
            this.messageClass = 'error';
          }
        );
      }
    } else {
      this.message = 'Please fill out all required fields correctly';
      this.messageClass = 'error';
    }
  }
  
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  
}

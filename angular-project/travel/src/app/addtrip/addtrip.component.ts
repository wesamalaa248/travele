import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtrip',
  templateUrl: './addtrip.component.html',
  styleUrls: ['./addtrip.component.css']
})
export class AddtripComponent {
  tripForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiservice: ApiService, private fb: FormBuilder,private router: Router) {

    this.tripForm = this.fb.group({
      destination: ['', Validators.required],
      image: [''],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    if (this.tripForm.valid) {
      const formData = new FormData();
      formData.append('destination', this.tripForm.get('destination')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.apiservice.addTrip(formData).subscribe({
        next: response => {
          console.log('Trip added successfully!', response);
          this.successMessage = 'Trip added successfully!';
          
        },
        error: err => {
          console.error('Error adding hotel:', err);
          this.errorMessage = 'Form is invalid or no files selected';
        }
      });
    }
  }
}

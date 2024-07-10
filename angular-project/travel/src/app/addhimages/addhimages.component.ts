import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addhimages',
  templateUrl: './addhimages.component.html',
  styleUrls: ['./addhimages.component.css']
})
export class AddhimagesComponent implements OnInit {
  hotelForm: FormGroup;
  hotels: any[] = [];
  selectedFiles: File[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService,private router:Router) {
    this.hotelForm = this.fb.group({
      hotelId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.apiService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadImages(): void {
    if (this.selectedFiles.length > 0 && this.hotelForm.valid) {
      const hotelId = this.hotelForm.get('hotelId')?.value;
      this.apiService.uploadImages(hotelId, this.selectedFiles).subscribe(
        (response) => {
          console.log('Upload successful:', response);
          this.successMessage = 'Images uploaded successfully!';
          this.hotelForm.reset();
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/dashboard']);}, 2000);
        },
        (error) => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Image upload failed. Please try again.';
        }
      );
    } else {
      console.error('Form is invalid or no files selected');
      this.errorMessage = 'Form is invalid or no files selected';
    }
  }
}

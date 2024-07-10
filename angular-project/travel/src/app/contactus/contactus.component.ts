import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };
  
  constructor(private http: HttpClient) {}

  getCsrfToken() {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token ? token : '';
  }

  onSubmit() {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': this.getCsrfToken(),
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8000/api/contact-us', this.contact, { headers })
      .subscribe(
        (response: any) => {
          window.alert(response.message); // Show success message in alert
          this.contact = { name: '', email: '', message: '' }; // Reset form
        },
        (error) => {
          window.alert(error.error.message || 'An error occurred. Please try again later.'); // Show error message in alert
        }
      );
  }
}

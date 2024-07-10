import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gethotel',
  templateUrl: './gethotel.component.html',
  styleUrls: ['./gethotel.component.css']
})
export class GethotelComponent implements OnInit {
  hotels: any[] = [];
  isSidebarOpen: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.apiService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
      }
    });
  }

  deleteHotel(id: number) {
    this.apiService.deleteHotel(id).subscribe({
      next: () => {
        this.hotels = this.hotels.filter(hotel => hotel.id !== id);
        alert('Hotel deleted successfully!');
      },
      error: (err) => {
        console.error('There was an error!', err);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-gettrip',
  templateUrl: './gettrip.component.html',
  styleUrls: ['./gettrip.component.css']
})
export class GettripComponent {
  isSidebarOpen: boolean = false;
  trips = [
    // Example trips, replace with actual data
    { destination: 'Paris', checkin: '2023-07-01', checkout: '2023-07-07' },
    { destination: 'New York', checkin: '2023-08-15', checkout: '2023-08-20' },
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

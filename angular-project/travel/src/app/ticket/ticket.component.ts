import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  flight: any;
  travelClass: string='';
  userName: string | null = '';

  constructor(private router: Router,private authService: AuthService) {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { flight: any; travelClass: string };

    if (state) {
      this.flight = state.flight;
      this.travelClass = state.travelClass;
    }
    // Get the user's name from AuthService
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {}

  // Method to trigger print functionality
  printTicket(): void {
    // Get the element to print
    const printContents = document.getElementById('printTicketSection')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      console.error('Could not find element to print');
    }
  }
}

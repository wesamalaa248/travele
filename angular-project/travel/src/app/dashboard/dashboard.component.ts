import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  hotel(){
    this.router.navigate(['/gethotel']);
  }
  flight(){
    this.router.navigate(['/getflight']);
  }
  home(){
    this.router.navigate(['/home']);
  }
}

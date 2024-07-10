import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'travel';
  isScrolled = false;
  islogin = true;
  islogout = true;
  showNav = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.islogin = !this.authService.isLogin();
    this.islogout = this.authService.isLogin();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNav = !this.isLogged(event.urlAfterRedirects);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50; // Adjust the scroll value as needed
  }

  isLogged(url: string): boolean {
    const pathsWithoutNav = [
      '/dashboard', '/addflight', '/getflight', '/gethotel', '/addhotel',
      '/himages', '/addtrip', '/gettrip', '/edithotel','/editflight','/signup','/login'
    ];

    // Check if the URL matches any path that should hide the nav
    return pathsWithoutNav.some(path => url.startsWith(path)) || !!url.match(/^\/edithotel\/\d+$/);
  }

  logout(): void {
    console.log('Attempting to log out');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Logout failed', error);
        localStorage.removeItem('user_data_login');
        localStorage.removeItem('token');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}

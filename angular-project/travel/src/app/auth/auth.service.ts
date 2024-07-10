import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roleAs:any;
  private apiUrl = 'http://localhost:8000/api';
  private token: string | null = null;
  
  constructor(private http: HttpClient, private router: Router) {}

  adduser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('user_data_login', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('user_data_login');
        localStorage.removeItem('token');
        this.token = null;
      })
    );
  }

  isLogin(){
    return !!localStorage.getItem('user_data_login');
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    return !!this.token;
  }

  getRole(): string | null {
    const userData = localStorage.getItem('user_data_login');
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user.type);
      this.roleAs = user.type; 
      return this.roleAs;
    }
    return null;
  }
  
  getUserName(): string | null {
    const userData = localStorage.getItem('user_data_login');
    if (userData) {
      const user = JSON.parse(userData);
      return user.name; // Adjust this to the actual key where the user's name is stored
    }
    return null;
  }

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }
  
}

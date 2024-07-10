import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMessage!: string;
  

  constructor(private formBuilder:FormBuilder,private router: Router ,private authService: AuthService){
    
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required]],
  });
   }

  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const userRole = this.authService.getRole();
          if (userRole) {
            if (userRole === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.router.navigate(['/home']); // Default route if no role is found
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed';
        }
      });
    }
  }
}

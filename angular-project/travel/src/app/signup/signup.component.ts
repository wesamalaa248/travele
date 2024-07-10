import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form:FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder:FormBuilder,private router: Router,private authService: AuthService){

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone:['',[Validators.required]],
      image: [null],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/)]],
      password_confirmation: ['', Validators.required],},{validator: this.passwordMatchValidator});
  
  }
  passwordMatchValidator(formGroup: FormGroup) {
  
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('password_confirmation');
  
    if (passwordControl && confirmPasswordControl) {
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;
    
        if (password !== confirmPassword) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
  }

  get f(){
    return this.form.controls;
  }
  ngOnInit():void{

  }

  submit(){
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('email', this.form.value.email);
    formData.append('phone', this.form.value.phone || '');
    formData.append('password', this.form.value.password);
    formData.append('password_confirmation', this.form.value.password_confirmation);
    if (this.form.value.image) {
      formData.append('image', this.form.value.image);
    }

    this.authService.adduser(formData).subscribe(
      (response: any) => {
        console.log('User registered successfully!',response);
        this.successMessage = 'User registered successfully!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);}, 1000);
        },
      (error: any) => {
        console.error('Error registering user:', error);
        this.errorMessage = 'Email or Name already exist. Please try again.';
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        image: file
      });
      const imageControl = this.form.get('image');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }
    }
  }

}

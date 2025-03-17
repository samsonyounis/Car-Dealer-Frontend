import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserServiceService,
              private router: Router
  ){}

  isLoading: boolean = false; // Loading state

  userFullName = '';
  userEmail = '';
  userphoneNumber = '';
  userType = '';
  userPassword = '';
  confirmPassword = '';
  passwordStrength = '';
  showPassword = false;


  // Live validation for password strength
  checkPasswordStrength() {
    const password = this.userPassword;
    if (password.length < 6) {
      this.passwordStrength = 'Weak';
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      this.passwordStrength = 'Strong';
    } else {
      this.passwordStrength = 'Medium';
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister(form:any){
    if (form.valid) {
      console.log(form.value);
      const userData = {
        fullName: this.userFullName,
        email: this.userEmail,
        phone: this.userphoneNumber,
        userType: this.userType,
        password: this.userPassword
      }
      this.isLoading = true;
      // Send POST request
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            //navigate to login
            this.isLoading = false;
            this.router.navigateByUrl("/login")
          }
          this.isLoading = false;
          alert(response.message);
          //navigate to error page with the response message
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
          alert(error.message);
          //navigate to error page with the error meesage
        }
      });
    }
    }
}

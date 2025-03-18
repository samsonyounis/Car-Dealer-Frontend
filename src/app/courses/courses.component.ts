import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../courses.service';
import { ItCourse } from '../interfaces/ItCourse';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { ItCar } from '../interfaces/ItCar';
import { BuyerService } from '../buyer.service';



@Component({
  selector: 'app-courses',
  imports: [CommonModule,FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  cars: any[] = [];
  errorMessage ="";

  enteredSearchValue = '';
  displayLoadingIndicator = true;
  loading = false;

  constructor(private service: CoursesService, private route: Router,
    private buyerService: BuyerService
  ){}

  ngOnInit(){
    this.getCars();
    
  }

  onSearch(){
    console.log(this.enteredSearchValue);
  }
  navigateToLogin(){
    this.route.navigateByUrl("login")
  }

  callSeller(phoneNumber: string) {
    window.location.href = `tel:${phoneNumber}`;
  }

  getCars(){
    this.displayLoadingIndicator = true;
    console.log("Fetching cars");
    this.buyerService.fetchCars()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.displayLoadingIndicator = false;
            console.log("No properties data found",data.meesage);
          } else {
            this.cars = Object.values(data.data);
            this.displayLoadingIndicator = false;
          }
          console.log("Loaded properties:", this.displayLoadingIndicator);
        },
        error: () => {
          this.displayLoadingIndicator = false;
          console.log("Error occured:");
        }
      });
  }
  
}

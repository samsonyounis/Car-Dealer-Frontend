import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
declare var bootstrap: any;
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-sellerdashboard',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './sellerdashboard.component.html',
  styleUrl: './sellerdashboard.component.css'
})
export class SellerdashboardComponent {

  constructor(private sellerService: SellerService,
    private route:ActivatedRoute, private router:Router, private userService:UserServiceService){}

    fullName = localStorage.getItem("username");
    email = localStorage.getItem("email");
    phone = localStorage.getItem("phone");

  currentSection: string = '';
  sectionTitle: string = '';
  loading = false;
  cars:any[] =[];
  newCar = { id:'', carName: '', model:'', price: 0, brand:'',imageUrl:'', milleage:'', seats:'', engine:''};
  newReply = { inquiryId:'', replyMessage:''};

  inquiries:any[] = [ ];
  payments: any[] = [];

  profile = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 234 567 890'
  };

  ngOnInit(): void {
    this.currentSection = 'cars';  // Default section
    this.sectionTitle = 'Cars';
    this.getCars();
    this.viewInquiry();
    this.getPayments();
  }
  openAddCarModal() {
    const modalElement = document.getElementById('addCarModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openEditCarModal(car:any){
    console.log("Car id "+car.id)
    this.newCar.id = car.id; // Prefill propertyId
    this.newCar.carName = car.carName;
    this.newCar.model = car.model;
    this.newCar.engine = car.engine;
    this.newCar.price = car.price;
    this.newCar.brand = car.brand;
    this.newCar.milleage = car.milleage;
    this.newCar.imageUrl = car.imageUrl;
    const modalElement = document.getElementById('editCarModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openReplyInqueryModal(inquiry:any){
    console.log("Car id "+inquiry.id)
    this.newReply.inquiryId = inquiry.id; // Prefill propertyId
    const modalElement = document.getElementById('replyModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openDeleteCarModal(car:any){
    console.log("car id "+car.carId)
    this.newCar.id = car.id; // Prefill propertyId

    const modalElement = document.getElementById('deleteCarModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  getPayments(){
    this.loading = true;
    console.log("Fetching payments");
    this.sellerService.fetchPayments()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.loading = false;
            console.log("No payments data found",data.meesage);
          } else {
            this.payments = Object.values(data.data);
            this.loading = false;
          }
          console.log("Loaded payments:", this.loading);
        },
        error: () => {
          this.loading = false;
          console.log("Error occured:");
        }
      });
  }

  addCar(){
      this.loading = true;
      // Send POST request
      console.log("new car: "+this.newCar)
      this.sellerService.addCar(this.newCar).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            //navigate to login
            this.loading = false;
            this.cars.unshift(response.data);
          }
          this.loading = false;
          alert(response.message);
          const modalElement = document.getElementById('addCarModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
          //navigate to error page with the response message
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert(error.message);
          //navigate to error page with the error meesage
        }
      });
  }
  getCars(){
    this.loading = true;
    console.log("Fetching properties");
    this.sellerService.fetchCars()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.loading = false;
            console.log("No properties data found",data.meesage);
          } else {
            this.cars = Object.values(data.data);
            this.loading = false;
          }
          console.log("Loaded properties:", this.loading);
        },
        error: () => {
          this.loading = false;
          console.log("Error occured:");
        }
      });
  }

  editCar(){
    this.loading = true;
    // Send POST request
    console.log("Car id: "+this.newCar.id);
    this.sellerService.editCar(this.newCar).subscribe({
      next: (response) => {
        console.log(response.message);
        if(response.status==='00'){
          alert(response.message);
          this.loading = false;
          const index = this.cars.findIndex(p => p.id === this.newCar.id);
          if (index !== -1) {
            this.cars[index] = { ...response.data }; // Update the property in the array
          }
        }
        this.loading = false;
        alert(response.message);
        const modalElement = document.getElementById('editCarModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
        //navigate to error page with the response message
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        alert(error.message);
        //navigate to error page with the error meesage
      }
    });
  }
  deleteCar(){
    this.loading = true;
    // Send POST request
    this.sellerService.deleteCar(this.newCar).subscribe({
      next: (response) => {
        console.log(response.message);
        if(response.status==='00'){
          alert(response.message);
          //navigate to login
          this.loading = false;
          const index = this.cars.findIndex(p => p.id === this.newCar.id);
          if (index !== -1) {
            this.cars.splice(index, 1); // Remove the property from the array
          }
        }
        this.loading = false;
        alert(response.message);
        const modalElement = document.getElementById('deleteCarModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
        //navigate to error page with the response message
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        alert(error.message);
        //navigate to error page with the error meesage
      }
    });

  }
  viewInquiry(){

    this.loading = true;
    // Send POST request
    this.sellerService.viewInquiries().subscribe({
      next: (response) => {
        console.log(response.message);
        if(Object.values(response.data).length !==0){
          alert(response.message);
          this.loading = false;
          this.inquiries = Object.values(response.data);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        alert(error.message);
        //navigate to error page with the error meesage
      }
    });

  }
  replyInquiry(){

    this.loading = true;
      // Send POST request
      this.sellerService.replyInquiry(this.newReply).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            //navigate to login
            this.loading = false;
          }
          this.loading = false;
          alert(response.message);
          const modalElement = document.getElementById('replyModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert(error.message);
          //navigate to error page with the error meesage
        }
      });
  }

  // Method to handle section change
  changeSection(section: string) {
    this.currentSection = section;
    this.sectionTitle = this.capitalizeFirstLetter(section);
  }

  // Helper method to capitalize section titles
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  logout() {
    this.userService.logout();
  }
}

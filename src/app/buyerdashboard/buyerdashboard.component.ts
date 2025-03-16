import { Component } from '@angular/core';
import { BuyerService } from '../buyer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-buyerdashboard',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './buyerdashboard.component.html',
  styleUrl: './buyerdashboard.component.css'
})
export class BuyerdashboardComponent {

  fullName = localStorage.getItem("username");
  email = localStorage.getItem("email");
  phone = localStorage.getItem("phone");

  currentSection: string = '';
  sectionTitle: string = '';
  newPaymentCarName = '';
  loading = false;
  newCar = { propertyId:'', propertyName: '', propertyType:'', price: 0, description:'',imageUrl:'', location:'', status:''};
  newInquiry = { carId:'', customerName: '', customerEmail:'', message: ''};
  newPayment = { carId:'', debitAmount: '', debitAccount:'', paymentMethod: 'MPESA'};



  // Example data for Properties, Orders, Payments, and Profile
  cars: any[] = [];

  payments: any[]= [];

  profile = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 234 567 890'
  };

  constructor(private router: Router, private buyerService: BuyerService) { }

  ngOnInit(): void {
    this.currentSection = 'car Listings';  // Default section
    this.sectionTitle = 'car Listings';
    this.getCars();
    this.getPayments();
  }
  openAddInquiryModal(car:any){
    console.log("Car id "+car.id)
    this.newInquiry.carId = car.id;
    const modalElement = document.getElementById('addInquiryModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openPaymentModal(car:any){
    console.log("Property id "+car.id)
    this.newPayment.carId = car.id;
    this.newPayment.debitAmount = car.price;
    this.newPayment.paymentMethod = 'MPESA';
    this.newPaymentCarName = car.carName;
    const modalElement = document.getElementById('paymentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  getCars(){
    this.loading = true;
    console.log("Fetching cars");
    this.buyerService.fetchCars()
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

  getPayments(){
    this.loading = true;
    console.log("Fetching payments");
    this.buyerService.fetchPayments()
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

  addInquiry(){
    this.loading = true;
      // Send POST request
      this.buyerService.addInquiry(this.newInquiry).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            this.loading = false;
          }
          this.loading = false;
          alert(response.message);
          const modalElement = document.getElementById('addInquiryModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert(error.message);
        }
      });
  }
  makePayment(){
    this.loading = true;
      // Send POST request
      this.buyerService.makePayment(this.newPayment).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            this.loading = false;
          }
          this.loading = false;
          alert(response.message);
          const modalElement = document.getElementById('paymentModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading = false;
          alert(error.message);
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

  // Handle logout
  logout() {
    // Logic to handle logout
    console.log('Logging out...');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}

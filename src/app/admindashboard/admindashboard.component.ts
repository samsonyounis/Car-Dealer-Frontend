import { Component } from '@angular/core';
declare var bootstrap: any;
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './Admindashboard.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./Admindashboard.component.css']
})
export class AdminDashboardComponent {
    constructor(private adminService: AdminserviceService,
      private route:ActivatedRoute, private router:Router, private userService:UserServiceService){}
  
      fullName = localStorage.getItem("username");
      email = localStorage.getItem("email");
      phone = localStorage.getItem("phone");
  
    currentSection: string = '';
    sectionTitle: string = '';
    loading = false;
    totalPayment = 0;
    totalCommission = 0;
    cars:any[] =[];
    users:any[] =[];
    newCar = { id:0, carName: '', model:'', price: 0, brand:'', imageUrl:'', milleage:'', seats:'', engine:''};
    newReply = { inquiryId:'', replyMessage:''};
    selectedImage: File | null = null;
  
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
      this.getAnalytics();
      this.getUsers();
    }
 
    getAnalytics(){
      this.loading = true;
      console.log("Fetching analytics");
      this.adminService.fetchAnalytics()
        .subscribe({
          next: (data) => {
            if (data.status ==='00') {
              this.loading = false;
              console.log("Total cars: "+ data.data.totalCars);
              this.totalPayment = data.data.totalAmount;
              this.totalCommission = data.data.totalCommission;
            } else {
              this.loading = false;
            }
            console.log("Loaded analytics:", this.loading);
          },
          error: () => {
            this.loading = false;
            console.log("Error occured:");
          }
        });
    }
  
    downloadReport() {
      const doc = new jsPDF();
  
      doc.setFontSize(18);
      doc.text('Financial Report', 14, 15);
  
      autoTable(doc, {
        startY: 25,
        head: [['Metric', 'Value']],
        body: [
          ['Total Cars', this.cars.length.toString()+ " Cars"],
          ['Total Payments', this.payments.length.toString()+" Payments"],
          ['Total Amount', `KES ${this.totalPayment}`],
          ['Total Commission', `KES ${this.totalCommission}`]
        ]
      });
  
      doc.save('report.pdf');
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
  
    getPayments(){
      this.loading = true;
      console.log("Fetching payments");
      this.adminService.fetchPayments()
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

    getCars(){
      this.loading = true;
      console.log("Fetching Cars");
      this.adminService.fetchCars()
        .subscribe({
          next: (data) => {
            if (Object.values(data.data).length === 0) {
              this.loading = false;
              console.log("No Cars data found",data.meesage);
            } else {
              this.cars = Object.values(data.data);
              this.loading = false;
            }
            console.log("Loaded Cars:", this.loading);
          },
          error: () => {
            this.loading = false;
            console.log("Error occured:");
          }
        });
    }
    getUsers(){
      this.loading = true;
      console.log("Fetching Users");
      this.adminService.fetchUser()
        .subscribe({
          next: (data) => {
            if (Object.values(data.data).length === 0) {
              this.loading = false;
              console.log("No users data found",data.meesage);
            } else {
              this.users = Object.values(data.data);
              this.loading = false;
            }
            console.log("Loaded Cars:", this.loading);
          },
          error: () => {
            this.loading = false;
            console.log("Error occured:");
          }
        });
    }
    viewInquiry(){
  
      this.loading = true;
      // Send POST request
      this.adminService.viewInquiries().subscribe({
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
        this.adminService.replyInquiry(this.newReply).subscribe({
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

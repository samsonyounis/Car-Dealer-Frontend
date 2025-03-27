import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDeactivateComponent } from '../services/ContactDeactivateRouteGuard';
import { BuyerService } from '../buyer.service';
import { Router, RouterModule } from '@angular/router';
declare var bootstrap: any;



@Component({
  selector: 'app-contact',
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements IDeactivateComponent{

  constructor(private buyerService:BuyerService){};
  name='';
  email='';
  message='';
  loading=false;
  newInquiry = { carId:'', customerName: '', customerEmail:'', message: ''};

  onSubmit(){

  }

  canExit(){
    if(this.name || this.email || this.message){
      return confirm("You have unsaved changes, Do you want to exit contact page?");
    }
    else{
      return true
    }
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
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './Admindashboard.component.html',
  styleUrls: ['./Admindashboard.component.css']
})
export class AdminDashboardComponent {
  activeTab = 'dashboard';

  totalCars = 120;
  totalSellers = 45;
  totalPayments = 78;
  totalQueries = 12;

  cars = [
    { model: 'Toyota Corolla', seller: 'John Doe', price: 15000, status: 'Available' },
    { model: 'Honda Civic', seller: 'Jane Smith', price: 18000, status: 'Sold' }
  ];

  payments = [
    { carModel: 'Toyota Corolla', buyer: 'Mike Adams', status: 'Completed' },
    { carModel: 'Honda Civic', buyer: 'Sarah Lee', status: 'Pending' }
  ];
  quries: any[] = [];
  sellers: any[]= [];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.totalCars = 120;
    this.totalSellers = 45;
    this.totalPayments = 78;
    this.totalQueries = 12;
    this.activeTab='dashboard';
  }
}

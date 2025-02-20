import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sellerdashboard',
  imports: [CommonModule],
  templateUrl: './sellerdashboard.component.html',
  styleUrl: './sellerdashboard.component.css'
})
export class SellerdashboardComponent {

  activeTab = 'dashboard';

  totalCars = 120;
  totalSellers = 45;
  totalOrders = 78;
  totalQueries = 12;

  cars = [
    { model: 'Toyota Corolla', seller: 'John Doe', price: 15000, status: 'Available' },
    { model: 'Honda Civic', seller: 'Jane Smith', price: 18000, status: 'Sold' }
  ];

  orders = [
    { carModel: 'Toyota Corolla', buyer: 'Mike Adams', status: 'Completed' },
    { carModel: 'Honda Civic', buyer: 'Sarah Lee', status: 'Pending' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

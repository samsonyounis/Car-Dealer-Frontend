import { Component } from '@angular/core';
import { ItCar } from '../interfaces/ItCar';
import { CommonModule } from '@angular/common';
import { ICartItem } from '../interfaces/IcartItem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shoppingcart',
  imports: [CommonModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  totalPrice=0;
  discount =0;
  finalAmount=0;
  cartItems:ICartItem[]=[
    {"name":"Toyota v8", "type":"Toyota","price":"2000000","image":"v8.JPG","quantity":"1"}
  ];

  constructor(private router: Router){}

  decreaseQuantity(item:ICartItem){
    console.log('decreased cart items');
  }
  increaseQuantity(item:ICartItem){
    console.log('increased card items');
  }
  removeItem(item:ICartItem){
    console.log('removed car item');
  }
  checkout(){
    console.log('checked out');
  }
  navigateToCheckout(){
    this.router.navigateByUrl("checkout")
  }
}

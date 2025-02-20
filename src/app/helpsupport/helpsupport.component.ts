import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-helpsupport',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './helpsupport.component.html',
  styleUrl: './helpsupport.component.css'
})
export class HelpsupportComponent {

  model: any = {};

  onSubmit(){

  }
}

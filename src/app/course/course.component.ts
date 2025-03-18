import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItCourse } from '../interfaces/ItCourse';
import { CoursesService } from '../courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItCar } from '../interfaces/ItCar';
import { BuyerService } from '../buyer.service';


@Component({
  selector: 'app-course',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  car: any = {};
  carId: String | null='';
  errorMessage ="";
  constructor(private activatedRoute: ActivatedRoute, 
    private buyerService: BuyerService,
    private route: Router
  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.carId = param.get("id");
      this.buyerService.fetchCars().subscribe({
        next: (data: any[]) => {
          this.car = data.find((c: any) => c.id == this.carId);
        },
        error: (error) => (this.errorMessage = error.message),
      });
    });

  }
  navigateToCart(){
    this.route.navigateByUrl("cart")
  }
}

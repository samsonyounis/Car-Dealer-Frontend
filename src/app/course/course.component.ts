import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItCourse } from '../interfaces/ItCourse';
import { CoursesService } from '../courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItCar } from '../interfaces/ItCar';


@Component({
  selector: 'app-course',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  car?: ItCar;
  carId: String | null='';
  errorMessage ="";
  constructor(private activatedRoute: ActivatedRoute, 
    private coursesService: CoursesService,
    private route: Router
  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.carId = param.get("id");
      this.coursesService.getCarsFromApi()
      .subscribe({
        next: (data) => (this.car = data.find(c=> c.id == this.carId)),
        error: (error) => (this.errorMessage = error.message)
    });
    });

  }
  navigateToCart(){
    this.route.navigateByUrl("cart")
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private activatedRoute: ActivatedRoute){}
  public greeting:String = "Welcome to Kivu Car Business";

  ngOnInit(){
    this.activatedRoute.fragment.subscribe((value)=>{
      this.jumpToSection(value ?? "testimonial");
    })
  }
  jumpToSection(section: string){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
  }

}

import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnrollRouteGuardService } from './EnrollRouteGaurdService';
import { ContactDeactivateRouteGuard } from './services/ContactDeactivateRouteGuard';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HelpsupportComponent } from './helpsupport/helpsupport.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { SellerdashboardComponent } from './sellerdashboard/sellerdashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'course/:id', component: CourseComponent},
    {path: 'support', component: HelpsupportComponent},
    {path: 'contact', component: ContactComponent, canDeactivate: [ContactDeactivateRouteGuard]},
    {path: 'login',component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cart', component: ShoppingcartComponent},
    {path: 'checkout', component: CheckoutComponent, canActivate: [EnrollRouteGuardService]},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'seller-dashboard', component: SellerdashboardComponent},
    {path: '**', component: ErrorComponent}
];

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient,private router: Router,
    private userService: UserServiceService
  ) { }

private localUrl ="http://localhost:8081/api/v1/seller";
private tokenKey = 'auth_token';

  private getFullUrl(endpoint: string): string {
    return `${this.localUrl}${endpoint}`;
  }

  addCar(car: any): Observable<any> {
    console.log("Car details :"+car)
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/post-car"), car, {headers})
    .pipe(catchError(this.handleError));
  }

  fetchCars(): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/view-cars"), {}, {headers})
    .pipe(catchError(this.handleError));
  }

  fetchPayments(): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/view-payments"), {}, {headers})
    .pipe(catchError(this.handleError));
  }
  editCar(property: any): Observable<any> {
    console.log(property)
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/edit-car"), property, {headers})
    .pipe(catchError(this.handleError));
  }

  deleteCar(property: any): Observable<any> {
    console.log(property)
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/delete-car"), property, {headers})
    .pipe(catchError(this.handleError));
  }

  viewInquiries(): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/view-inquiries"), {} , {headers})
    .pipe(catchError(this.handleError));
  }

  replyInquiry(queryReply: any): Observable<any> {
    console.log(queryReply)
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.getFullUrl("/reply-inquiry"), queryReply , {headers})
    .pipe(catchError(this.handleError));
  }

    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An error occurred.';
  
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
  
      console.error(errorMessage); // Log the error to the console for debugging
      return throwError(() => new Error(errorMessage)); // Return an observable with a user-facing error message
    }
}

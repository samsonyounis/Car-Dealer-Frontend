import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  constructor(private http:HttpClient,private router: Router,
    private userService: UserServiceService
  ) { }

private localUrl ="http://localhost:8081/api/v1/customer";
private tokenKey = 'auth_token';

  private getFullUrl(endpoint: string): string {
    return `${this.localUrl}${endpoint}`;
  }


    addInquiry(inquiry: any): Observable<any> {
      console.log(inquiry)
      const token = this.userService.getToken();
      // Set up headers with Bearer Token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post(this.getFullUrl("/add-inquery"), inquiry, {headers})
      .pipe(catchError(this.handleError));
    }

    addGeneralInquiry(inquiry: any): Observable<any> {
      console.log(inquiry)
      // const token = this.userService.getToken();
      // // Set up headers with Bearer Token
      // const headers = new HttpHeaders({
      //   'Authorization': `Bearer ${token}`,
      //   'Content-Type': 'application/json'
      // });
      return this.http.post(this.getFullUrl("/add-general-inquery"), inquiry, {})
      .pipe(catchError(this.handleError));
    }

    fetchCars(): Observable<any> {
      const token = this.userService.getToken();
      // Set up headers with Bearer Token
      // const headers = new HttpHeaders({
      //   'Authorization': `Bearer ${token}`,
      //   'Content-Type': 'application/json'
      // });
      return this.http.post(this.getFullUrl("/view-cars"), {}, {})
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

    makePayment(paymentDetails: any): Observable<any> {
      console.log(paymentDetails)
      const token = this.userService.getToken();
      // Set up headers with Bearer Token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post(this.getFullUrl("/make-payment"), paymentDetails, {headers})
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

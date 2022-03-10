import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, throwError } from 'rxjs';
import { Order } from '../models/Order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Orgin': '*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SendOrderService {
  private orders = new Subject<Order[]>();
  public orders$: Observable<Order[]> = this.orders.asObservable();
  private order: Order = {
    createdBy: '',
    paymentMethod: '',
    totalPrice: 0,
    id: 0,
    companyId: 0,
    orderRows: []
  }
  order$: Observable<Order> = of(this.order);
  constructor(private http: HttpClient) { }

  sendOrder(order: Order){
    console.log(httpOptions);
    
    this.http.post<Order>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order, httpOptions)
    .pipe(catchError(this.handleError)).subscribe(data => {
      console.log(data);
    })

  }

  getOrder():void {
    this.http.get<Order[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=8')
    .subscribe((orders) => {
      this.orders.next(orders);
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public deleteOrder(endPoints:number) {
    this.http.delete('https://medieinstitutet-wie-products.azurewebsites.net/api/orders'+'/'+ endPoints).subscribe(data => {
      console.log(data);
      this.getOrder();
    });
  }

}




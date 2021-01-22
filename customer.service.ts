import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/Customer';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    customerInfor: Customer;
    editor

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          //Authorization: 'my-auth-token'
        })
      };
    private REST_API_SERVER = 'http://localhost:3000';
    private REST_API_SERVE = 'http://localhost:5000';
    constructor(private httpClient: HttpClient) { }
// //Lấy danh sách khách hàng
//     public getListCustomer(): Observable<any>{
//     const url = `${this.REST_API_SERVER}/customers`;
//     return this.httpClient.get<any>(url, this.httpOptions)
//                             .pipe(catchError(this.handleError));
//     }
    getEditor(editor){
        this.editor = editor;
    }
      getCustomerInfor(){
          return this.customerInfor
      }
      setCustomerInfor(customer){
          this.customerInfor = customer;
      }
//Lấy danh sách khách hàng
public getListCustomer(pageIndex:number, pageSize: number, textSearch: string): Observable<any>{
    const url = `${this.REST_API_SERVE}/requests`;
    //const url = `${this.REST_API_SERVER}/customers`;
    console.log("pageIndex in service: " + pageIndex);
    console.log("pageSize in service: " + pageSize);
    return this.httpClient.post<any>(url,{pageIndex,pageSize,textSearch}, this.httpOptions)
                            .pipe(catchError(this.handleError));
    
    }
//thêm khách hàng mới
    public addCustomer(customer: Customer): Observable<any>{
        const url = `${this.REST_API_SERVE}/addCustomer`;
        return this.httpClient.post<any>(url,customer, this.httpOptions)
                .pipe(catchError(this.handleError));
    }
//Xóa khách hàng
    public deleteCustomer(idCustomer: number): Observable<any>{
        const url = `${this.REST_API_SERVE}/deleteCustomer` ;
        return this.httpClient.post<any>(url,{Id:idCustomer}, this.httpOptions).pipe(catchError(this.handleError));
    }

//Update
    // public getCustomerById(idCustomer: number) Observable<any>{
    //     const url = `${this.REST_API_SERVER}/customers/` + idCustomer;
    //     return this.httpClient.get<any>(url, this.httpOptions)
    //                             .pipe(catchError(this.handleError));
    // }
//Lấy tt khách hàng theo id
    public getCustomerById(idCustomer: number) {
        const url = `${this.REST_API_SERVE}/getById`;
        return this.httpClient
            .post<any>(url,JSON.stringify({Id: idCustomer}), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
//Update tt khách hàng
    // public updateCustomer(idCustomer: number, data: Customer){
    //     const url = `${this.REST_API_SERVER}/edit`;
    //     return this.httpClient
    //         .put<any>(url,{Id: idCustomer, datajson: data}, this.httpOptions)
    //         .pipe(catchError(this.handleError));
    // }
  public updateCustomer(idCustomer: number, data: Customer){
        const url = `${this.REST_API_SERVE}/edit`;
        return this.httpClient
            .post<any>(url,JSON.stringify({Id: idCustomer, datajson: data}), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
//Tìm khách hàng theo tên
    public getByName(name: string){
        const url = `${this.REST_API_SERVER}/customers?name=` + name;
        //const url = `${this.REST_API_SERVER}/customers?keyword=` + name;
        return this.httpClient.get<any>(url, this.httpOptions)
                                .pipe(catchError(this.handleError));
    }



//
public findLessons(id:number, filter = '', sortOrder = 'asc',pageNumber = 0, pageSize = 3): Observable<any>{

    //const url = `${this.REST_API_SERVER}/customers?id=` + `&filter=` + filter + `&sortOrder=` + sortOrder + `&pageNumber=` + pageNumber + `&pageSize=` + pageSize;
    const url = `${this.REST_API_SERVER}/customers` ;
    return this.httpClient.get<any>(url, {
        params: new HttpParams()
            .set('courseId', id.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        map(res =>  console.log(res))
    );
}
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
    }

}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NXB } from '../models/NXB';
import { LoaiSach } from '../models/LoaiSach';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
          //Authorization: 'my-auth-token'
        })
    };
    private REST_API_SERVER = 'http://localhost:5000';
    constructor(private httpClient: HttpClient) { }
//---------------------------NHA XUAT BAN------------------------
    //Lấy danh sách NXB
    public getListNXB(): Observable<any>{
        const url = `${this.REST_API_SERVER}/listNXB`;
        return this.httpClient.get<any>(url, this.httpOptions)
                                .pipe(catchError(this.handleError));
        
    }
    //Thêm NXB
    public addNXB(nxb: NXB): Observable<any>{
        const url = `${this.REST_API_SERVER}/addNXB`;
        return this.httpClient.post<any>(url, nxb, this.httpOptions)
                                .pipe(catchError(this.handleError));
    }





//--------------------LOAI SACH-------------------------------
    //Lấy danh sách LoaiSach
    public getListLoaiSach(): Observable<any>{
        const url = `${this.REST_API_SERVER}/listLoaiSach`;
        return this.httpClient.get<any>(url, this.httpOptions)
                                .pipe(catchError(this.handleError));
        
    }
    //Thêm LoaiSach
    public addLoaiSach(ls: LoaiSach): Observable<any>{
        const url = `${this.REST_API_SERVER}/addLoaiSach`;
        return this.httpClient.post<any>(url, ls, this.httpOptions)
                                .pipe(catchError(this.handleError));
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

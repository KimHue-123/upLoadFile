import { DataSource } from '@angular/cdk/table';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';
import { CustomerService } from '../Services/customer.service';

@Component({
  selector: 'app-list-customer-dialog',
  templateUrl: './list-customer-dialog.component.html',
  styleUrls: ['./list-customer-dialog.component.scss']
})
export class ListCustomerDialogComponent implements OnInit {
    public listCustomers:Customer[] = [];
    public dataSource: MatTableDataSource<Customer>;
    //public textSearch = '';
    public length = 50;
    public pageSize = 10;
    public pageIndex = 1;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public pageEvent = {} as PageEvent;
    displayedColumns: string[] = ['id', 'name', 'sex', 'address', 'score', 'phoneNumber'];
    constructor( 
        private httpService: CustomerService,
        private router: Router,
        public dialogRef: MatDialogRef<ListCustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Customer) { }

    ngOnInit(): void {
        this.loadListCustomer(this.pageIndex,this.pageSize,"");
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    private loadListCustomer(pageIndex:number, pageSize: number, textSearch: string){
        this.listCustomers = [];
        console.log("in loadListCustomer");
        console.log("pageIndex" + pageIndex)
        console.log("pageSize: " + pageSize)
        this.httpService.getListCustomer(pageIndex, pageSize, textSearch).subscribe((data)=>{
            
            console.log("in subrice loadListCustomer ")
            for(let i = 0; i < data.recordset.length; i++){
                let temp = new Customer();
                temp.id = data.recordset[i].Id;
                temp.name = data.recordset[i].FullName;
                temp.sex = data.recordset[i].Sex;
                temp.address = data.recordset[i].AddressCustomer;
                temp.score = data.recordset[i].Score;
                temp.phoneNumber = data.recordset[i].PhoneNumber;
                console.log("temp.address: " + temp.address)
                this.listCustomers.push(temp)
            }
            this.dataSource = new MatTableDataSource(this.listCustomers) ;
            this.length = data.output.totalRecord;
            console.log("listCustomers 0 .name: ", this.listCustomers[0].name)
        });
        
    }

    public getServerData(event:PageEvent){
        this.pageIndex = event.pageIndex + 1;
        console.log("pageIndex + 1: ", this.pageIndex)
        this.pageSize = event.pageSize;
        //this.length = event.length;
        //this.listCustomers = [];
        this.loadListCustomer(this.pageIndex,this.pageSize, "");
        console.log("pageevent.pageSize: " + this.pageSize + "pageevent.pageIndex: " + this.pageIndex)
        return event;
    }
    clickTest(row){
        console.log(row)
        this.httpService.setCustomerInfor(row)
        this.httpService.editor.insertContent(row.name);
        
    }
}



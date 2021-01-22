import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogElementsExampleDialog } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Customer } from '../models/Customer';
import { CommonService } from '../Services/common.service';
import { CustomerService } from '../Services/customer.service';
import { CustomersDataSource } from '../Services/customers.datasource';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

    @Input()
    dataInput: string;
    public listCustomers:Customer[] = [];
    public startistCustomers:Customer[] = [];
    public listSearchByName: Customer[] = [];
    public checkSearch = false;
    public textSearch = '';
    public length = 50;
    public pageSize = 10;
    public pageIndex = 1;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public pageEvent = {} as PageEvent;
    public resultConfirm: string = '';
    
    public dataSource = new CustomersDataSource(this.httpService);
    //@ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private common: CommonService, 
                private httpService: CustomerService,
                private router: Router,
                private dialog: MatDialog) { }

    private loadListCustomer(pageIndex:number, pageSize: number, textSearch: string){
        this.listCustomers = [];
        console.log("in loadListCustomer");
        console.log("pageIndex" + pageIndex)
        console.log("pageSize: " + pageSize)
        this.httpService.getListCustomer(pageIndex, pageSize, textSearch).subscribe((data)=>{
            //this.listCustomers = data;
            // for(let customer in data.recordset){
            //     let temp = new Customer();
            //     temp.id = customer.Id;
            //     temp.name = customer.FullName;
            //     temp.sex = customer.Sex;
            //     temp.address = customer.AddressCustomer;
            //     temp.score = customer.Score;
            //     temp.phoneNumber = customer.PhoneNumber;
            //     console.log("temp.address: " + temp.address)
            //     this.listCustomers.push(temp)
            // }
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
            this.length = data.output.totalRecord;
            console.log("length of recordsets: output " + this.length);
            console.log("length of recordsets " + data.recordsets.length);
            //console.log("data[0]: " + data[0]);
            this.common.setTotalCustomer( data.length );
            console.log("total: " + this.common.totalCustomer$);
        });
        // this.dataSource = new CustomersDataSource(this.httpService);
        // this.dataSource.loadCustomers(1,'', 'asc', 0, 3);
    }

    //Hàm trong chức năng phân trang
    // private loadListCustomerNew(){
    //     this.httpService.findLessons(1,'','asc',1,4).subscribe((data)=>{
    //         console.log("data: " + data);
    //     })
    // }

    ngOnInit(): void {
        this.loadListCustomer(this.pageIndex,this.pageSize, this.textSearch);
        console.log("pageSize: " + this.pageSize);
        //this.datasource. = this.paginator;
        // this.loadListCustomerNew();
        console.log(this.dataInput)
    }

    public addCustomer(){
        this.router.navigate(['AddCustomer', 0]);
    }

    public deleteCustomer(idCustomer: number){
        const message = "Are you sure you want to delete?";
        const dialogData = new ConfirmDialogModel("Confirm Action", message);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
        this.resultConfirm = dialogResult;
        //console.log("resultConfirm 1: " + this.resultConfirm);
        if(this.resultConfirm){
            this.httpService.deleteCustomer(idCustomer).subscribe((data)=>{
                console.log("delete: " + data);
                this.loadListCustomer(this.pageIndex,this.pageSize, this.textSearch);
            });
        }
        });
        
        
        
    }

    public editCustomer(idCustomer: number){
        this.router.navigate(['AddCustomer', idCustomer]);
    }

    public searchByname(){
        //this.listCustomers = [];
        this.loadListCustomer(this.pageIndex, this.pageSize, this.textSearch);
        // if(!this.textSearch)
        //     this.loadListCustomer(this.pageIndex, this.pageSize, this.textSearch);
        //console.log("dl search: "+ this.listCustomers[0].name)
        // var totalSearch = 0;
        // this.httpService.getByName(this.textSearch).subscribe((data)=>{
        //     this.listSearchByName = data.recordsets;
        //     totalSearch = this.listSearchByName.length;
        //     console.log("number rows 1: " + totalSearch);
        //     //this.checkSearch = true;
        //     //this.textSearch = '';
        //     //console.log("list search:" + this.listSearchByName[0].name);
        //     if(totalSearch === 0){
        //         const title = "Alert";
        //         const message = "This customer was not found!"
        //         console.log("vao ham thong bao " );
        //         const dialogData = new ConfirmDialogModel(title, message);
    
        //         this.dialog.open(DialogElementsExampleDialog);
        //     }
        // });
        // console.log("number rows 2: " + totalSearch);
        
    }

    public stopSearch(){
        console.log("thay đổi")
        if(this.textSearch === "")
            this.loadListCustomer(this.pageIndex, this.pageSize, this.textSearch);
    }
    public getServerData(event:PageEvent){
        this.pageIndex = event.pageIndex + 1;
        console.log("pageIndex + 1: ", this.pageIndex)
        this.pageSize = event.pageSize;
        //this.length = event.length;
        //this.listCustomers = [];
        this.loadListCustomer(this.pageIndex,this.pageSize, this.textSearch);
        console.log("pageevent.pageSize: " + this.pageSize + "pageevent.pageIndex: " + this.pageIndex)
        return event;
    }
}

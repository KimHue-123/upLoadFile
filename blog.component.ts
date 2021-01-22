import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListCustomerDialogComponent } from '../list-customer-dialog/list-customer-dialog.component';
import { Customer } from '../models/Customer';
import { CustomerService } from '../Services/customer.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
    public listCustomers:Customer[] = [];
    text: string = "<div>hello</div>"
    title = "CodeSandbox";
    textAdd: string = "T.T";
    customerInfor: Customer;
    editor;

    public content = "Initial content";

    // handleChange = (event: any) => {
    //     this.content = event.editor.getContent();
    // };
    constructor(private httpService: CustomerService,
                private router: Router,
                private dialog: MatDialog) { }

    ngOnInit(): void {
        this.customerInfor = this.httpService.getCustomerInfor();
        console.log(this.customerInfor)
    }

    addText(){
        this.editor.insertContent(this.textAdd);
    }
    showText(event){
        console.log("you clicked on editor");
        console.log("event", event);
        // set content for editor
        // event.editor.setContent(this.textAdd);
        //event.editor.insertContent(this.textAdd);
        this.editor = event.editor;
    }
    // private setContentEditor(editor, content){
    //     if(editor && content){
    //         this.editor.setContent(content);
    //     }
    // }

    initEditor(event){
        this.editor = event.editor;
        this.httpService.getEditor(event.editor);
    }
    openListCustomer(){
        const dialogRef = this.dialog.open(ListCustomerDialogComponent);
    
        dialogRef.afterClosed().subscribe(result => {
            this.customerInfor = this.httpService.getCustomerInfor();
            console.log(`Dialog result: ${result}`);
        });
    }
}
// @Component({
//     selector: 'dialog-overview-example-dialog',
//     templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//     constructor(
//         public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//         @Inject(MAT_DIALOG_DATA) public data: Customer) {}

//     onNoClick(): void {
//         this.dialogRef.close();
//     }

// }
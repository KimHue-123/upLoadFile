import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatCarouselModule } from '@ngmodule/material-carousel';

// import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { from } from 'rxjs';

import {LayoutModule} from '@angular/cdk/layout';
import { ContactComponent } from './contact/contact.component';

import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ProductComponent } from './product/product.component';
import { BlogComponent } from './blog/blog.component';
import { ListCustomerDialogComponent } from './list-customer-dialog/list-customer-dialog.component';
//import { AddProductComponent } from './add-product/add-product.component';
import { NxbComponent } from './nxb/nxb.component';
import { AddNxbComponent } from './add-nxb/add-nxb.component';
import { LoaisachComponent } from './loaisach/loaisach.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    CustomerComponent,
    AddCustomerComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    ProductComponent,
    BlogComponent,
    ListCustomerDialogComponent,
    NxbComponent,
    AddNxbComponent,
    MatGridListModule,
    LoaisachComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatSliderModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatCarouselModule.forRoot(),
    EditorModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [LayoutModule,
                {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
// import { AddProductComponent } from './add-product/add-product.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoaisachComponent } from './loaisach/loaisach.component';
import { LoginComponent } from './login/login.component';
import { NxbComponent } from './nxb/nxb.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [{path: 'Login', component: LoginComponent},
                        {path: 'About', component: AboutComponent},
                        {path: 'Contact', component: ContactComponent},
                        {path: 'Home', component: HomeComponent},
                        {path: 'Customers', component: CustomerComponent},
                        {path: 'AddCustomer/:id', component: AddCustomerComponent},
                        {path: 'Products', component: ProductComponent},
                        {path: 'Blogs', component: BlogComponent},
                        {path: 'LoaiSach', component: LoaisachComponent},
                        {path: 'NXB', component: NxbComponent}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

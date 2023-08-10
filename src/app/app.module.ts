import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * App routing
 */
import { AppRoutingModule } from './app-routing.module';

/**
 * Third-party Modules
 */
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MaterialModule } from './material/material.module';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HomeComponent } from './Component/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CartComponent } from './Component/cart/cart.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { ProfileSidenavComponent } from './Component/user-profile/profile-sidenav/profile-sidenav.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { BillingAddressComponent } from './Component/billing-address/billing-address.component';
import { DeleteAddressComponent } from './Component/billing-address/delete-address/delete-address.component';
import { CreateAddressComponent } from './Component/billing-address/create-address/create-address.component';
import { UpdateAddressComponent } from './Component/billing-address/update-address/update-address.component';

/**
 * Interceptors
 */
import { HttpReqInterceptor } from './Interceptor/httpreq.interceptor';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { LoaderComponent } from './Component/loader/loader.component';
import { UpdateProductComponent } from './Component/Admin/update-product/update-product.component';
import { CreateProductComponent } from './Component/Admin/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    NotificationComponent,
    UserProfileComponent,
    ProfileSidenavComponent,
    ChangePasswordComponent,
    BillingAddressComponent,
    CreateAddressComponent,
    UpdateAddressComponent,
    DeleteAddressComponent,
    LoaderComponent,
    UpdateProductComponent,
    CreateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * sonartoken : 90b8d28646ee3296e44a2f3a71705bf559c6bef5
 */

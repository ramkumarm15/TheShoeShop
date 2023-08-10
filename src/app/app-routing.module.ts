import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { AuthGuard } from './Guard/auth.guard';
import { CartComponent } from './Component/cart/cart.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { BillingAddressComponent } from './Component/billing-address/billing-address.component';
import { UpdateProductComponent } from './Component/Admin/update-product/update-product.component';
import { AdminGuard } from './Guard/admin.guard';
import { CreateProductComponent } from './Component/Admin/create-product/create-product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'profile',
    children: [
      {
        path: '',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'address',
        component: BillingAddressComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'user/cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product',
    children: [
      {
        path: 'create',
        component: CreateProductComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'update/:id',
        component: UpdateProductComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

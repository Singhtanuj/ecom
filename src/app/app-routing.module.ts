import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAuthGuard } from './app-assets/guard/seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'seller-auth', component: SellerAuthComponent},
  { path: 'seller-home', component: SellerHomeComponent, canActivate:[SellerAuthGuard]},
  { path: 'seller-add-product', component: SellerAddProductComponent, canActivate:[SellerAuthGuard]},
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent, canActivate:[SellerAuthGuard]},
  { path: 'search/:query', component: SearchComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent},
  { path: 'user-auth', component: UserAuthComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

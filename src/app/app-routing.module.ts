import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './product/edit/edit.component';
import { AddComponent } from './product/add/add.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin=()=> redirectUnauthorizedTo(['login'])
const redirectToHome=()=> redirectLoggedInTo(['home'])


const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: '', component: SignupComponent, ...canActivate(redirectToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },
  { path: 'addProduct', component: AddComponent, ...canActivate(redirectToLogin) },
  { path: 'editProduct', component: EditComponent, ...canActivate(redirectToLogin) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

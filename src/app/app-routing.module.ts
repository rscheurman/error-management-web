import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { ErrorDashboardComponent } from './pages/error-dashboard/error-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetConfirmComponent } from './pages/password-reset/password-reset-confirm/password-reset-confirm.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: ErrorDashboardComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'password-reset', component: PasswordResetComponent, 
    children :[
      {path: 'confirm', component: PasswordResetConfirmComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorDashboardComponent } from './pages/error-dashboard/error-dashboard.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './pages/password-reset/password-reset-confirm/password-reset-confirm.component';
import { AuthGuard } from './core/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDashboardComponent,
    SignUpComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

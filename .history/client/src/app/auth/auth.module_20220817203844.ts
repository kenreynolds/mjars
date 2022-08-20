import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    FormsModule,
    MatSnackBarModule,
  ]
})
export class AuthModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { LoginWithPhoneComponent } from "./components/phoneAuth/phoneAuth.component";
import { GoogleAuthComponent } from "./components/googleAuth/googleAuth.component";
import { EmailAuthComponent } from "./components/emailAuth/emailAuth.component";

import { LoginService } from "./login.service";

@NgModule({
  declarations: [
    LoginWithPhoneComponent,
    GoogleAuthComponent,
    EmailAuthComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [LoginWithPhoneComponent, GoogleAuthComponent, EmailAuthComponent],
  providers: [LoginService]
})
export class LoginModule {}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}

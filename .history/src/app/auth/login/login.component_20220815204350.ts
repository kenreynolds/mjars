import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  closeIcon = faCircleXmark;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value.email, form.value.password);
  }
}

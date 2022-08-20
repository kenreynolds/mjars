import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  closeIcon = faCircleXmark;

  // TODO: Add loading indicator
  // TODO: Add form validaions

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onClose() { }

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}

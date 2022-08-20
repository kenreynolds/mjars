import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onClose() { }

  onLogin() { }
}

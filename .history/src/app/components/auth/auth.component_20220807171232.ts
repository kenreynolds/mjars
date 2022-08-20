import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  closeIcon = faCircleXmark;
  errorMessage = '';
  hasError = false;
  isInvalid = true;
  loginForm!: FormGroup;
  isSignin = false;

  // TODO: Add loading indicator
  // TODO: Add form validaions

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setupLoginFormControls();
  }

  clearFormData() {
    this.loginForm.reset();
    this.loginForm.get('email')?.clearValidators();
    this.loginForm.get('email')?.updateValueAndValidity();
    this.loginForm.get('password')?.clearValidators();
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  onClose() {
    this.hasError = false;
  }

  onSignin() {
    if (!this.loginForm.valid) {
      // this.isInvalid = false;
      return;
    }

    const email = this.loginForm.value.email.trim();
    const password = this.loginForm.value.password.trim();

    this.authService
      .signin(email, password)
      .subscribe({
        next: () => {
          this.clearFormData();
          this.router.navigate(['/members']);
        },
        error: errorMessage => this.showError(errorMessage)
      });
  }

  onSignup() {
    if (this.loginForm.valid) {
      this.isInvalid = false;
    }

    const email = this.loginForm.value.email.trim();
    const password = this.loginForm.value.password.trim();

    this.authService
      .signup(email, password)
      .subscribe({
        next: () => {
          this.clearFormData();
        },
        error: errorMessage => this.showError(errorMessage)
      });
  }

  setupLoginFormControls() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  showError(error: any) {
    this.clearFormData();
    this.hasError = true;
    this.errorMessage = error;
    throw error;
  }
}

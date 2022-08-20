import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthResponseData } from './auth.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
}

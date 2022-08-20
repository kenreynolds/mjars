import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}

import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  message = this.data;
}

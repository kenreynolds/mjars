import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repeaters',
  templateUrl: './repeaters.component.html',
  styleUrls: ['./repeaters.component.scss']
})
export class RepeatersComponent implements OnInit {
  sectionTitle = 'Repeaters';
  showAllstar = false;
  showEchoLink = false;
  showRepeaters = true;

  constructor() { }

  ngOnInit(): void { }

  shouldShowAllstar() {
    this.sectionTitle = 'Allstar';
    this.showAllstar = true;
    this.showEchoLink = false;
    this.showRepeaters = false;
  }

  shouldShowEchoLink() {
    this.sectionTitle = 'EchoLink';
    this.showEchoLink = true;
    this.showAllstar = false;
    this.showRepeaters = false;
  }

  shouldShowRepeaters() {
    this.sectionTitle = 'Repeaters';
    this.showRepeaters = true;
    this.showAllstar = false;
    this.showEchoLink = false;
  }
}
